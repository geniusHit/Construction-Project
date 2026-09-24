const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")

const users = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  pincode: {
    type: Number
  },
  city: {
    type: String
  },
})
const usersModel = mongoose.model("users", users)
exports.addUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const user = await new usersModel({ ...req.body, password: hashedPassword })
    const result = await user.save();

    res.status(200).json(result)
  }
  catch (err) {
    res.status(400).json({ success: false, message: `Unable to add user. ${err.message}` })
  }
}

exports.sendSignupOtp = async (req, res) => {
  try {
    let a = Math.random()
    a = Math.ceil(a * 999999)

    const auth = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "rohitthakur792002@gmail.com",
        pass: "omzd rsxw zwql xvrb"
      }
    })

    const receiver = {
      from: "rohitthakur792002@gmail.com",
      to: `${req.body?.email}`,
      subject: `Team ConstructPrice. Signup otp.`,
      html: `Your Otp is ${a}`
    }

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) {
        throw error;
        return;
      }
      console.log("success!")
      res.status(200).json({ signup_otp: a })
    })
  }
  catch (err) {
    res.status(400).json({ success: false, message: `Unable to send signup otp. ${err.message}` })
  }
}

const loggedUsers = mongoose.Schema({
  email: {
    type: String,
  },
  IP: {
    type: String,
  },
  expiry: {
    type: Date
  }
})
const loggedUsersModel = mongoose.model("loggedUsers", loggedUsers)

exports.loginUser = async (req, res) => {
  console.log("req.body : ", req.body)

  try {
    const { email, password, expiry, IP } = req.body;
    const deletePreviousLogins = await loggedUsersModel.deleteMany({ IP: IP })

    const user = await usersModel.findOne({ email: email })
    if (user?.email) {
      const match = await bcrypt.compare(password, user?.password)

      if (match === true) {
        const newLoggedUser = await new loggedUsersModel({ email: email, IP: IP, expiry: expiry })
        await newLoggedUser.save()

        res.send({ ...user, success: true })
      }
      else {
        res.json({ success: false, message: "Incorrect password." })
      }
    }
  }
  catch (err) {
    return res.status(400).json({ success: false, message: `Unable to login. ${err.message}` })
  }
}

exports.getCurrentLogin = async (req, res) => {
  try {
    const { IP } = req.body;
    const currentLogin = await loggedUsersModel.findOne({ IP: IP });
    const user = await usersModel.findOne({ email: currentLogin?.email });

    if (user?.email) {
      const { name, email, phone, pincode, city } = user;
      res.json({ name, email, phone, pincode, city, success: true })
    }
    else {
      res.json({ success: false, message: "No logged in user." })
    }
  }
  catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Material title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["cement", "steel", "bricks", "aggregates"],
    },
    brand: {
      type: String,
      trim: true,
      default: "Unbranded",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: [true, "Unit of measurement is required"],
      enum: [
        "per 50 kg Bag",
        "per Ton",
        "per 1000 Pcs",
        "per Cubic Ft",
        "per Load / Truck",
      ],
    },
    moq: {
      type: Number,
      default: 1,
      min: [1, "MOQ must be at least 1"],
    },
    bulkPrice: {
      type: Number,
      min: [0, "Bulk price cannot be negative"],
    },
    images: {
      type: [String],
      default: [],
    },
    isVerifiedSupplier: {
      type: Boolean,
      default: true,
    },
    user: {
      name: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      },
      pincode: {
        type: Number
      },
      city: {
        type: String
      },
    }
  },
  {
    timestamps: true,
  }
);

const materialModel = mongoose.model("Material", materialSchema);
exports.createMaterial = async (req, res) => {
  try {
    const {
      title,
      category,
      brand,
      description,
      unitPrice,
      unit,
      moq,
      bulkPrice,
      images,
      user
    } = req.body;

    if (!title || !category || !unitPrice || !unit) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (title, category, unitPrice, unit).",
      });
    }

    const material = await materialModel.create({
      title,
      category,
      brand,
      description,
      unitPrice: Number(unitPrice),
      unit,
      moq: moq ? Number(moq) : 1,
      bulkPrice: bulkPrice ? Number(bulkPrice) : undefined,
      images: Array.isArray(images) ? images : [],
      user: user
    });

    return res.status(201).json({
      success: true,
      message: "Material published successfully",
      data: material,
    });
  } catch (error) {
    console.error("Error creating material:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while saving material",
      error: error.message,
    });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const materials = await materialModel.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching materials",
      error: error.message,
    });
  }
};


exports.comparePrices = async (req, res) => {
  try {
    console.log("req.body : ", req.body)
    const { text, category, pincode } = req.body;
    let getMaterials = [];

    if (text && category && pincode) {
      console.log("all active")

      getMaterials = await materialModel.find({
        $or: [
          { title: { $regex: `${text}`, $options: 'i' } },
          { category: { $regex: `${text}`, $options: 'i' } },
          { title: { $regex: `${category}`, $options: 'i' } },
          { category: category },
          { "user.pincode": pincode }
        ]
      })
    }
    else if (text) {
      console.log("text active")
      getMaterials = await materialModel.find({
        $or: [
          { title: { $regex: `${text}`, $options: 'i' } },
          { category: { $regex: `${text}`, $options: 'i' } },
        ]
      })
    }
    else if (category) {
      console.log("category active")
      getMaterials = await materialModel.find({
        $or: [
          { title: { $regex: `${category}`, $options: 'i' } },
          { category: category },
        ]
      })
    }
    else if (pincode) {
      console.log("pincode active")
      getMaterials = await materialModel.find({
        "user.pincode": pincode
      })
    }

    console.log(getMaterials)

    res.json(getMaterials)
  }
  catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}