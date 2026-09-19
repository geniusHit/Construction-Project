import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Login from './Login'
import Signup from './Signup'


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

const suppliers = [
  {
    name: "Sri Venkateshwara Building Materials",
    location: "Hebbal, Bangalore",
    distance: "4.2 km",
    material: "OPC 53 Cement",
    price: "₹405",
    unit: "/bag",
  },
  {
    name: "Chamundi Steel & Cement Yard",
    location: "Nagavara, Bangalore",
    distance: "6.1 km",
    material: "TMT Rebar 12mm",
    price: "₹65,500",
    unit: "/ton",
  },
  {
    name: "Mahaveer Bricks & Aggregates",
    location: "Hennur, Bangalore",
    distance: "7.8 km",
    material: "Red Bricks",
    price: "₹8,000",
    unit: "/1000 pcs",
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

function Hero() {
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
                />
              </div>

              <div className="popular-tags">
                <span>Popular:</span>
                <button>Cement</button>
                <button>TMT Rebar</button>
                <button>Bricks</button>
                <button>Sand</button>
                <button>Aggregates</button>
              </div>
            </div>

            <div className="field location-field">
              <label>Enter Location</label>

              <div className="input-box">
                <span className="location-icon">●</span>
                <input
                  type="text"
                  placeholder="Enter city or pin code"
                />
                <span className="target-icon">◎</span>
              </div>
            </div>

            <button className="compare-btn">
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

function SupplierList() {
  return (
    <div className="supplier-list">
      {suppliers.map((supplier) => (
        <div className="supplier-item" key={supplier.name}>
          <div className="supplier-image">
            🏪
          </div>

          <div className="supplier-details">
            <div className="supplier-name">
              {supplier.name}
              <span className="verified">
                Verified
              </span>
            </div>

            <div className="supplier-location">
              {supplier.distance} • {supplier.location}
            </div>

            <div className="supplier-price-info">
              <span>{supplier.material}</span>
              <strong>
                {supplier.price}
                <small>{supplier.unit}</small>
              </strong>
            </div>
          </div>

          <div className="supplier-actions">
            <button className="call-btn">
              ☎ Call
            </button>

            <button className="quote-btn">
              Request Quote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Suppliers() {
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
        <SupplierList />
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
    return (
        <div>
            <div className="app">
                <NavBar />

                <main>
                    <Hero />

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