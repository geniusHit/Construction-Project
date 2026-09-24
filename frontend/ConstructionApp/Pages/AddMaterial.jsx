import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../Style/AddMaterialStyle.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const CATEGORIES = [
  { id: "cement", label: "Cement & Binders" },
  { id: "steel", label: "Steel & TMT Bars" },
  { id: "bricks", label: "Bricks & Concrete Blocks" },
  { id: "aggregates", label: "Sand & Aggregates" },
];

const POPULAR_TAGS = [
  "Cement",
  "TMT Rebar",
  "Red Bricks",
  "M-Sand",
  "Coarse Aggregate",
];

const UNITS = [
  "per 50 kg Bag",
  "per Ton",
  "per 1000 Pcs",
  "per Cubic Ft",
  "per Load / Truck",
];

export default function AddMaterial() {
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:8001"
      : "https://rental-project-backend.vercel.app";

  const [selectedTag, setSelectedTag] = useState("Cement");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLogin, setCurrentLogin] = useState()
  const [IP, setIP] = useState()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "OPC 53 Grade Cement",
      category: "cement",
      brand: "UltraTech",
      description: "",
      unitPrice: 410,
      unit: "per 50 kg Bag",
      moq: 50,
      bulkPrice: 395,
    },
  });

  const watchedTitle = watch("title");
  const watchedCategory = watch("category");
  const watchedUnitPrice = watch("unitPrice");
  const watchedUnit = watch("unit");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setValue("title", `${tag} Premium Grade`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        unitPrice: Number(data.unitPrice),
        moq: data.moq ? Number(data.moq) : 1,
        bulkPrice: data.bulkPrice ? Number(data.bulkPrice) : undefined,
        images,
        user: currentLogin
      };

      const response = await fetch("http://localhost:8001/create-material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("Material listed successfully!");
      } else {
        alert(result.message || "Failed to publish listing.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLogin = async () => {
    const currentLogin = await fetch(`${API_URL}/get-current-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ IP: IP })
    })

    const result = await currentLogin.json()
    setCurrentLogin(result)
  }

  console.log("currentLogin : ", currentLogin)

  useEffect(() => {
    getIP()
  }, [])
  const getIP = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    setIP(data.ip)
  };

  useEffect(()=> {
    IP!==undefined && getCurrentLogin()
  }, [IP])

  return (
    <div className="add-product-page">
      <NavBar />

      <main className="page-wrapper">
        <div className="page-header">
          <div className="breadcrumb">
            <a href="#dashboard">Dashboard</a> / <a href="#inventory">Inventory</a> / Add New Product
          </div>
          <h2>List New Construction Material</h2>
          <p>
            Submit verified real-time rates so regional contractors and buyers can order directly.
          </p>
        </div>

        <form className="grid-container" onSubmit={handleSubmit(onSubmit)}>
          {/* Main Input Column */}
          <div className="form-main">
            {/* Basic Details */}
            <section className="form-card">
              <div className="card-title">
                <i className="fa-solid fa-layer-group"></i>
                Basic Material Details
              </div>
              <div className="card-subtitle">
                Specify product name, brand grade, and classification
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Material / Product Title <span className="req">*</span>
                </label>
                <div className="input-wrapper has-icon">
                  <i className="fa-solid fa-cube prefix-icon"></i>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., OPC 53 Grade UltraTech Cement"
                    {...register("title", {
                      required: "Material title is required",
                      minLength: { value: 3, message: "Title must be at least 3 characters" },
                    })}
                  />
                </div>
                {errors.title && (
                  <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.title.message}
                  </span>
                )}

                <div className="quick-tags">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`quick-tag ${selectedTag === tag ? "active" : ""}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">
                    Category <span className="req">*</span>
                  </label>
                  <div className="input-wrapper">
                    <select
                      id="category"
                      {...register("category", { required: "Category is required" })}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                      {errors.category.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand / Manufacturer</label>
                  <div className="input-wrapper has-icon">
                    <i className="fa-regular fa-building prefix-icon"></i>
                    <input
                      id="brand"
                      type="text"
                      placeholder="e.g. UltraTech, Tata Tiscon, ACC"
                      {...register("brand")}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group full">
                <label htmlFor="description">Product Description & Specification</label>
                <textarea
                  id="description"
                  placeholder="Mention compressive strength, IS codes (e.g. IS 12269), bag packaging, or batch details..."
                  {...register("description")}
                />
              </div>
            </section>

            {/* Pricing & Units */}
            <section className="form-card">
              <div className="card-title">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                Pricing & Unit Terms
              </div>
              <div className="card-subtitle">
                Configure market rates and bulk discount brackets
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="unitPrice">
                    Selling Price (INR) <span className="req">*</span>
                  </label>
                  <div className="input-wrapper has-icon">
                    <i className="fa-solid fa-indian-rupee-sign prefix-icon"></i>
                    <input
                      id="unitPrice"
                      type="number"
                      placeholder="410"
                      {...register("unitPrice", {
                        required: "Selling price is required",
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                    />
                  </div>
                  {errors.unitPrice && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                      {errors.unitPrice.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="unit">
                    Unit of Measurement <span className="req">*</span>
                  </label>
                  <div className="input-wrapper">
                    <select
                      id="unit"
                      {...register("unit", { required: "Unit is required" })}
                    >
                      {UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.unit && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                      {errors.unit.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="moq">Minimum Order Quantity (MOQ)</label>
                  <div className="input-wrapper">
                    <input
                      id="moq"
                      type="number"
                      min="1"
                      placeholder="50"
                      {...register("moq", {
                        min: { value: 1, message: "MOQ must be at least 1" },
                      })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="bulkPrice">Bulk Discount Price (100+ units)</label>
                  <div className="input-wrapper has-icon">
                    <i className="fa-solid fa-tag prefix-icon"></i>
                    <input
                      id="bulkPrice"
                      type="number"
                      placeholder="395"
                      {...register("bulkPrice", {
                        min: { value: 0, message: "Bulk price cannot be negative" },
                      })}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Live Preview & CTA Sidebar */}
          <aside className="sidebar-sticky">
            <div className="preview-card">
              <h3>Live Marketplace Preview</h3>
              <div className="item-preview">
                <div className="item-img-placeholder">
                  {images[0] ? (
                    <img src={images[0]} alt="Preview" className="preview-thumbnail-img" />
                  ) : (
                    <i className="fa-solid fa-cube"></i>
                  )}
                </div>
                <div className="preview-info">
                  <span className="preview-tag">
                    {CATEGORIES.find((c) => c.id === watchedCategory)?.label || "Material"}
                  </span>
                  <h4>{watchedTitle || "Material Title"}</h4>
                  <p className="supplier-indicator">Verified Supplier Deal</p>
                </div>
              </div>

              <div className="preview-price">
                <span>Price ({watchedUnit})</span>
                <h2>₹{Number(watchedUnitPrice || 0).toLocaleString("en-IN")}</h2>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              <span>{loading ? "Publishing..." : "Publish Material"}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}