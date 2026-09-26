import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { useEffect } from 'react';

const marketData = [
  {
    name: "OPC 53 Grade Cement",
    unit: "per 50 Kg Bag",
    price: "₹410",
    low: "₹390",
    avg: "₹410",
    high: "₹430",
    change: "↓ 1.2%",
    direction: "down",
    icon: "🧱",
  },
  {
    name: "TMT Rebar 12mm",
    unit: "per Ton",
    price: "₹66,100",
    low: "₹64,200",
    avg: "₹66,100",
    high: "₹67,800",
    change: "↑ 2.4%",
    direction: "up",
    icon: "▤",
  },
  {
    name: "Red Bricks",
    unit: "per 1000 Pcs",
    price: "₹8,200",
    low: "₹7,600",
    avg: "₹8,200",
    high: "₹8,800",
    change: "↓ 0.8%",
    direction: "down",
    icon: "🧱",
  },
  {
    name: "Coarse Aggregate 20mm",
    unit: "per Ton",
    price: "₹1,250",
    low: "₹1,150",
    avg: "₹1,250",
    high: "₹1,350",
    change: "↑ 1.6%",
    direction: "up",
    icon: "⛰",
  },
];

const trends = [
  {
    name: "TMT Rebar 12mm",
    price: "₹66,100",
    change: "↑ 2.4%",
    type: "up",
    points: "0,32 12,25 24,28 36,17 48,23 60,14 72,18 84,8 96,11 108,4 120,8 132,5 144,7",
  },
  {
    name: "OPC 53 Grade Cement",
    price: "₹410",
    change: "↓ 1.2%",
    type: "down",
    points: "0,25 12,19 24,23 36,15 48,21 60,13 72,17 84,8 96,13 108,7 120,12 132,8 144,14",
  },
  {
    name: "Red Bricks",
    price: "₹8,200",
    change: "↓ 0.8%",
    type: "down",
    points: "0,29 12,25 24,27 36,19 48,23 60,15 72,17 84,12 96,13 108,11 120,16 132,18 144,14",
  },
  {
    name: "Coarse Aggregate 20mm",
    price: "₹1,250",
    change: "↑ 1.6%",
    type: "up",
    points: "0,30 12,23 24,27 36,17 48,21 60,11 72,15 84,5 96,12 108,7 120,13 132,10 144,4",
  },
];

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8001"
    : "https://construction-project-gll3.vercel.app";

function Hero({ searchKeys, setSearchKeys, products, setProducts }) {
  const [materialActive, setMaterialActive] = useState({
    cement: false,
    tmt: false,
    bricks: false,
    sand: false,
    aggregates: false
  })


  const comparePrices = async () => {
    const compare = await fetch(`${API_URL}/compare-prices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchKeys)
    })

    const result = await compare.json()
    setProducts(result)
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="building building-one"></div>
        <div className="building building-two"></div>
        <div className="crane"></div>
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <h1>
            Real-time Construction
            <br />
            Material Prices. Compare.
            <br />
            Save More. Build Smart.
          </h1>

          <p>
            Compare latest market rates from verified suppliers in your
            area and get the best deals for your construction needs.
          </p>
        </div>

        <div className="search-card">
          <div className="search-tabs">
            <button className="active">Compare Prices</button>
            <button>Find Suppliers</button>
          </div>

          <div className="search-fields">
            <div className="field material-field">
              <label>Search Material</label>

              <div className="input-box">
                <span className="search-icon">⌕</span>
                <input
                  type="text"
                  placeholder="e.g., OPC 53 Grade Cement, 12mm TMT Rebar"
                  onChange={(e) => setSearchKeys(prev => ({ ...prev, text: e.target.value }))}
                />
              </div>

              <div className="popular-tags">
                <button className={materialActive?.cement === true ? `!border !border-[#1253dc] !text-[#1253dc]` : ``} onClick={
                  (e) => {
                    setSearchKeys(prev => ({ ...prev, category: "cement" }))
                    setMaterialActive({ cement: true, tmt: false, bricks: false, sand: false, aggregates: false })
                  }
                }>Cement</button>
                <button className={materialActive?.tmt === true ? `!border !border-[#1253dc] !text-[#1253dc]` : ``} onClick={
                  (e) => {
                    setSearchKeys(prev => ({ ...prev, category: "tmt rebar" }))
                    setMaterialActive({ cement: false, tmt: true, bricks: false, sand: false, aggregates: false })
                  }
                }>TMT Rebar</button>
                <button className={materialActive?.bricks === true ? `!border !border-[#1253dc] !text-[#1253dc]` : ``} onClick={
                  (e) => {
                    setSearchKeys(prev => ({ ...prev, category: "bricks" }))
                    setMaterialActive({ cement: false, tmt: false, bricks: true, sand: false, aggregates: false })
                  }
                }>Bricks</button>
                <button className={materialActive?.sand === true ? `!border !border-[#1253dc] !text-[#1253dc]` : ``} onClick={
                  (e) => {
                    setSearchKeys(prev => ({ ...prev, category: "sand" }))
                    setMaterialActive({ cement: false, tmt: false, bricks: false, sand: true, aggregates: false })
                  }
                }>Sand</button>
                <button className={materialActive?.aggregates === true ? `!border !border-[#1253dc] !text-[#1253dc]` : ``} onClick={
                  (e) => {
                    setSearchKeys(prev => ({ ...prev, category: "aggregates" }))
                    setMaterialActive({ cement: false, tmt: false, bricks: false, sand: false, aggregates: true })
                  }
                }>Aggregates</button>
              </div>
            </div>

            <div className="field location-field">
              <label>Enter Location</label>

              <div className="input-box">
                <span className="location-icon">●</span>
                <input
                  type="number"
                  placeholder="Enter city or pin code"
                  onChange={(e) => setSearchKeys(prev => ({ ...prev, pincode: e.target.value }))}
                />
              </div>
            </div>

            <button className="compare-btn" onClick={comparePrices}>
              Compare Prices
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketCard({ item }) {
  return (
    <div className="market-card">
      <div className="market-icon">{item.icon}</div>

      <div className="market-main">
        <div className="market-title">
          {item.name}
        </div>

        <div className="market-unit">
          ({item.unit})
        </div>

        <div className="market-price">
          {item.price}
        </div>

        <div className="market-range">
          <span className="low">
            Low: <b>{item.low}</b>
          </span>

          <span className="avg">
            Avg: <b>{item.avg}</b>
          </span>

          <span className="high">
            High: <b>{item.high}</b>
          </span>
        </div>
      </div>

      <span className={`change ${item.direction}`}>
        {item.change}
      </span>
    </div>
  );
}

function MarketSnapshot() {
  return (
    <section className="market-section">
      <div className="section-heading">
        <div>
          <h2>
            Today's Market Snapshot
            <span className="updated">
              <i></i> Updated 2 hrs ago
            </span>
          </h2>
        </div>

        <a href="#prices">
          View All Prices →
        </a>
      </div>

      <div className="market-grid">
        {marketData.map((item) => (
          <MarketCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

function ProductsSnapshot({ products }) {
  return (
    <section className="market-section">
      <div className="section-heading">
        <div>
          <h2>
            Materials
          </h2>
        </div>

        <a href="#prices">
          View All Prices →
        </a>
      </div>

      <div className="market-grid">
        {products.map((item, index) => (
          <ProductsCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function ProductsCard({ item }) {
  return (
    <div className="market-card">
      <div className="market-icon">
        {
          item.category === "cement" ? <div>🌫️</div> :
            item.category === "tmt" ? <div>▤</div> :
              item.category === "bricks" ? <div>🧱</div> :
                item.category === "aggregates" ? <div>⛰</div> : ""
        }
      </div>

      <div className="market-main">
        <div className="market-title">
          {item.title}
        </div>

        <div className="market-unit">
          ({item.unit})
        </div>

        <div className="market-price">
          ₹{item.unitPrice}
        </div>

        <div className='text-[9px]'>
          {item.brand}
        </div>
      </div>

      <span className={`change ${item.direction}`}>
        {item.change}
      </span>
    </div>
  );
}

function MapPanel() {
  return (
    <div className="map">
      <div className="map-road road-one"></div>
      <div className="map-road road-two"></div>
      <div className="map-road road-three"></div>
      <div className="map-road road-four"></div>

      <span className="map-label label-one">Hebbal</span>
      <span className="map-label label-two">NAGAVARA</span>
      <span className="map-label label-three">INDIRANAGAR</span>
      <span className="map-label label-four">JAYANAGAR</span>
      <span className="map-label label-five">HSR LAYOUT</span>
      <span className="map-label label-six">BTM Layout</span>

      <div className="radius"></div>

      <div className="map-marker marker-one">●</div>
      <div className="map-marker marker-two">●</div>
      <div className="map-marker marker-three">●</div>
    </div>
  );
}

function SupplierList({ recentPr }) {
  const [quoteDetails, setQuoteDetails] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const requestQuote = async (data) => {
    const request = await fetch(`${API_URL}/quote-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data, ...quoteDetails })
    })

  }

  return (
    <div className="supplier-list">
      {recentPr.map((supplier, index) => (
        <div className="supplier-item" key={index}>
          <div className="supplier-image">
            🏪
          </div>

          <div className="supplier-details">
            <div className="supplier-name">
              {supplier.user.supplier}
              <span className="verified">
                Verified
              </span>
            </div>
          </div>

          <div className="supplier-actions">
            <button className="call-btn" onClick={async () => {
              await navigator.clipboard.writeText(supplier.user.phone)
            }}>
              ☎ Call
            </button>

            <button className="quote-btn" onClick={
              () => {
                setShowMessage(true)
                setQuoteDetails(supplier?.user)
              }
            }>
              Request Quote
            </button>
          </div>
        </div>
      ))}

      {showMessage === true
        &&
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Quote</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowMessage(false)}></button>
              </div>
              <div className="modal-body">
                <form className='flex flex-col gap-y-[14px]' onSubmit={handleSubmit(requestQuote)}>
                  <input type='text' value={quoteDetails?.supplier} readOnly className='border-bottom !text-[13px] p-1 w-full text-[#6c757d] focus:outline-none' />

                  <input type='email' value={quoteDetails?.email} readOnly className='border-bottom !text-[13px] p-1 w-full text-[#6c757d] focus:outline-none' />

                  <input type='text' value={quoteDetails?.phone} readOnly className='border-bottom !text-[13px] p-1 w-full text-[#6c757d] focus:outline-none' />

                  <input type='text' value={quoteDetails?.pincode} readOnly className='border-bottom !text-[13px] p-1 w-full text-[#6c757d] focus:outline-none' />

                  <input type='text' value={quoteDetails?.city} readOnly className='border-bottom !text-[13px] p-1 w-full text-[#6c757d] focus:outline-none' />

                  <table className='w-full quote-table'>
                    <tbody>
                      <tr className='text-[13px]'>
                        <td className='px-2'>Cement</td>
                        <td className='px-2'>
                          <div>
                            <input type='number' className='border focus:outline-none p-1 w-[58%] rounded-sm'
                              {...register("cementQuantity", {
                                required: { value: true, message: "Cement quantity is required" }
                              })}
                            />
                            <span className='!m-[10px]'>50kg bag</span>
                          </div>
                          <div className='text-[10px] text-[#6c757d] p-1 w-[58%]'>{errors?.cementQuantity?.message}</div>
                        </td>
                        <td className='px-2'>
                          <input type='number' placeholder='Quote Price' className='border focus:outline-none p-1 w-[70px] rounded-sm w-full'
                            {...register("cementPrice", {
                              required: { value: true, message: "Cement Price is required" }
                            })}
                          />

                          <div className='text-[10px] text-[#6c757d] p-1'>{errors?.cementPrice?.message}</div>
                        </td>
                      </tr>

                      <tr className='text-[13px]'>
                        <td className='px-2'>TMT Rebar</td>
                        <td className='px-2'>
                          <div>
                            <input type='number' className='border focus:outline-none p-1 w-[58%] rounded-sm'
                              {...register("tmtQuantity", {
                                required: { value: true, message: "TMT Rebar quantity is required" }
                              })}
                            />
                            <span className='!m-[10px]'>Pieces</span>
                          </div>

                          <div className='text-[10px] text-[#6c757d] p-1 w-[58%]'>{errors?.tmtQuantity?.message}</div>
                        </td>
                        <td className='px-2'>
                          <input type='number' placeholder='Quote Price' className='border focus:outline-none p-1 w-[70px] rounded-sm w-full'
                            {...register("tmtPrice", {
                              required: { value: true, message: "TMT rebar price is required" }
                            })}
                          />

                          <div className='text-[10px] text-[#6c757d] p-1'>{errors?.tmtPrice?.message}</div>
                        </td>
                      </tr>

                      <tr className='text-[13px]'>
                        <td className='px-2'>Bricks</td>
                        <td className='px-2'>
                          <div>
                            <input type='number' className='border focus:outline-none p-1 w-[58%] rounded-sm'
                              {...register("bricksQuantity", {
                                required: { value: true, message: "Bricks quantity is required" }
                              })}
                            />
                            <span className='!m-[10px]'>Pieces</span>
                          </div>

                          <div className='text-[10px] text-[#6c757d] p-1 w-[58%]'>{errors?.bricksQuantity?.message}</div>
                        </td>
                        <td className='px-2'>
                          <input type='number' placeholder='Quote Price' className='border focus:outline-none p-1 w-[70px] rounded-sm w-full'
                            {...register("bricksPrice", {
                              required: { value: true, message: "Bricks price is required" }
                            })}
                          />

                          <div className='text-[10px] text-[#6c757d] p-1'>{errors?.bricksPrice?.message}</div>
                        </td>
                      </tr>

                      <tr className='text-[13px]'>
                        <td className='px-2'>Sand</td>
                        <td className='px-2'>
                          <div>
                            <input type='number' className='border focus:outline-none p-1 w-[58%] rounded-sm'
                              {...register("sandQuantity", {
                                required: { value: true, message: "Sand quantity is required" }
                              })}
                            />
                            <span className='!m-[10px]'>Load Truck</span>
                          </div>

                          <div className='text-[10px] text-[#6c757d] p-1 w-[58%]'>{errors?.sandQuantity?.message}</div>
                        </td>
                        <td className='px-2'>
                          <input type='number' placeholder='Quote Price' className='border focus:outline-none p-1 w-[70px] rounded-sm w-full'
                            {...register("sandPrice", {
                              required: { value: true, message: "Sand price is required" }
                            })}
                          />

                          <div className='text-[10px] text-[#6c757d] p-1'>{errors?.sandPrice?.message}</div>
                        </td>
                      </tr>

                      <tr className='text-[13px]'>
                        <td className='px-2'>Aggregate</td>
                        <td className='px-2'>
                          <div>
                            <input type='number' className='border focus:outline-none p-1 w-[58%] rounded-sm'
                              {...register("aggregateQuantity", {
                                required: { value: true, message: "Aggregate quantity is required" }
                              })}
                            />
                            <span className='!m-[10px]'>Load Truck</span>
                          </div>

                          <div className='text-[10px] text-[#6c757d] p-1 w-[58%]'>{errors?.aggregateQuantity?.message}</div>
                        </td>
                        <td className='px-2'>
                          <input type='number' placeholder='Quote Price' className='border focus:outline-none p-1 w-[70px] rounded-sm w-full'
                            {...register("aggregatePrice", {
                              required: { value: true, message: "Aggregate price is required" }
                            })}
                          />

                          <div className='text-[10px] text-[#6c757d] p-1'>{errors?.aggregatePrice?.message}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="modal-footer">
                    <input type="submit" className="btn text-white !text-[12px] !bg-[#1253dc]" value="Send Request" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

function Suppliers() {
  const [recentPr, setRecentPr] = useState([])

  const recentProds = async () => {
    const prods = await fetch(`${API_URL}/recent-products`)
    const result = await prods.json()
    setRecentPr(result)
  }

  useEffect(() => {
    recentProds()
  }, [])

  return (
    <section className="suppliers-section" id="suppliers">
      <div className="section-heading">
        <h2>Top Suppliers Near You</h2>

        <a href="#all-suppliers">
          View All Suppliers →
        </a>
      </div>

      <div className="supplier-content">
        <MapPanel />
        <SupplierList recentPr={recentPr} />
      </div>
    </section>
  );
}

function Sparkline({ points }) {
  return (
    <svg
      className="sparkline"
      viewBox="0 0 150 40"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PriceTrends() {
  return (
    <section className="trends-section" id="trends">
      <div className="section-heading">
        <h2>Price Trends</h2>

        <a href="#all-trends">
          View All Trends →
        </a>
      </div>

      <div className="trend-list">
        {trends.map((trend) => (
          <div className="trend-card" key={trend.name}>
            <div className="trend-info">
              <div className="trend-name">
                {trend.name}
              </div>

              <div className="trend-unit">
                (per Ton)
              </div>

              <div className="trend-price">
                {trend.price}
                <span className={trend.type}>
                  {trend.change}
                </span>
              </div>
            </div>

            <div className={`chart ${trend.type}`}>
              <Sparkline points={trend.points} />
            </div>

            <div className="chart-controls">
              <button className="selected">
                7D
              </button>
              <button>30D</button>
              <button>90D</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BulkQuote() {
  return (
    <section className="bulk-section" id="bulk-quotes">
      <div className="bulk-icon">
        ➤
      </div>

      <h2>Request Bulk Quote</h2>

      <p>
        Save more on bulk orders. Send your requirement
        to multiple suppliers and get the best quotes.
      </p>

      <form className="quote-form">
        <label>Select Material</label>

        <select defaultValue="">
          <option value="" disabled>
            Select material
          </option>
          <option>Cement</option>
          <option>TMT Rebar</option>
          <option>Bricks</option>
          <option>Sand</option>
          <option>Aggregates</option>
        </select>

        <label>Quantity</label>

        <input
          type="text"
          placeholder="e.g., 10 Tons, 500 Bags"
        />

        <label>Delivery Location</label>

        <input
          type="text"
          placeholder="Enter city or pin code"
        />

        <button type="submit">
          Request Quotes Now →
        </button>
      </form>
    </section>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="feature">
        <div className="feature-icon">⌁</div>
        <div>
          <h3>Real-time Prices</h3>
          <p>Get latest market rates updated daily</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-icon">⚖</div>
        <div>
          <h3>Compare & Save</h3>
          <p>Compare prices from multiple verified suppliers</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-icon">♢</div>
        <div>
          <h3>Verified Suppliers</h3>
          <p>Deal with trusted and verified local suppliers</p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-icon">%</div>
        <div>
          <h3>Bulk Savings</h3>
          <p>Get better deals on bulk orders</p>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const [searchKeys, setSearchKeys] = useState({
    text: "",
    category: "",
    pincode: ""
  })
  const [products, setProducts] = useState()

  return (
    <div>
      <div className="app">
        <NavBar />

        <main>
          <Hero searchKeys={searchKeys} setSearchKeys={setSearchKeys} products={products} setProducts={setProducts} />

          {
            products?.length > 0 ?
              <ProductsSnapshot products={products} /> :
              products !== undefined ?
                <div className='text-center !py-[40px] text-gray '>No materials available for searched filters.</div> :
                <div></div>
          }

          <MarketSnapshot />

          <div className="dashboard-grid">
            <Suppliers />
            <PriceTrends />
            <BulkQuote />
          </div>

          <Features />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Home