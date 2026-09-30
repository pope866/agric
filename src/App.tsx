import { useState } from "react";
import type { ReactNode } from "react";

import {
  LayoutDashboard,
  BookOpen,
  Sprout,
  Wheat,
  ShoppingBag,
  Wallet,
  Users,
  CloudSun,
  MessageSquare,
  User,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  ChevronRight,
} from "lucide-react";

import "./App.css";

// NEW PAGES
import FarmDiaryPage from "./pages/FarmDiary";
import MyFarmPage from "./pages/MyFarm";
import CropsPage from "./pages/Crops";
import MarketPage from "./pages/Market";
import SellProducePage from "./pages/SellProduce";

type Page =
  | "Dashboard"
  | "My Farm"
  | "Farm Diary"
  | "Crops"
  | "Market"
  | "Sell Produce"
  | "Expenses"
  | "Experts"
  | "Weather"
  | "Messages"
  | "Profile";

interface MenuItem {
  name: Page;
  icon: ReactNode;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Farm",
    icon: <Sprout size={20} />,
  },
  {
    name: "Farm Diary",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Crops",
    icon: <Wheat size={20} />,
  },
  {
    name: "Market",
    icon: <ShoppingBag size={20} />,
  },
  {
    name: "Sell Produce",
    icon: <Plus size={20} />,
  },
  {
    name: "Expenses",
    icon: <Wallet size={20} />,
  },
  {
    name: "Experts",
    icon: <Users size={20} />,
  },
  {
    name: "Weather",
    icon: <CloudSun size={20} />,
  },
  {
    name: "Messages",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "Profile",
    icon: <User size={20} />,
  },
];

function App() {
  const [activePage, setActivePage] =
    useState<Page>("Dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigateTo = (page: Page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard onNavigate={navigateTo} />;

      case "My Farm":
        return <MyFarmPage />;

      case "Farm Diary":
        return <FarmDiaryPage />;

      case "Crops":
        return <CropsPage />;

      case "Market":
        return <MarketPage />;

      case "Sell Produce":
        return <SellProducePage />;

      case "Expenses":
        return <Expenses />;

      case "Experts":
        return <Experts />;

      case "Weather":
        return <Weather />;

      case "Messages":
        return <Messages />;

      case "Profile":
        return <Profile />;

      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="app">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="logo-area">

          <div className="logo-icon">
            <Sprout size={25} />
          </div>

          <div>
            <h2>AgriConnect</h2>
            <span>Smart Agriculture</span>
          </div>

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>

        </div>


        {/* MENU TITLE */}

        <div className="menu-title">
          MAIN MENU
        </div>


        {/* NAVIGATION */}

        <nav className="sidebar-menu">

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigateTo(item.name)
              }
            >

              {item.icon}

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </nav>


        {/* HELP CARD */}

        <div className="sidebar-bottom">

          <div className="help-card">

            <div className="help-icon">
              ?
            </div>

            <div>
              <strong>
                Need help?
              </strong>

              <p>
                Talk to an agricultural expert.
              </p>
            </div>

          </div>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        {/* HEADER */}

        <header className="header">

          <button
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>


          {/* SEARCH */}

          <div className="search-box">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search crops, markets, experts..."
            />

          </div>


          {/* HEADER ACTIONS */}

          <div className="header-actions">

            <button
              className="notification"
              aria-label="Notifications"
            >

              <Bell size={21} />

              <span>
                3
              </span>

            </button>


            <div className="user-profile">

              <div className="avatar">
                F
              </div>

              <div className="user-info">

                <strong>
                  Farmer
                </strong>

                <span>
                  Bondo, Kenya
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <section className="content">

          {renderPage()}

        </section>

      </main>

    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

function Dashboard({
  onNavigate,
}: DashboardProps) {

  return (
    <>

      {/* WELCOME */}

      <div className="welcome-section">

        <div>

          <p className="eyebrow">
            FARMER DASHBOARD
          </p>

          <h1>
            Good morning, Farmer 👋
          </h1>

          <p>
            Here's what's happening on your
            farm today.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            onNavigate("Crops")
          }
        >

          <Plus size={18} />

          Add Crop

        </button>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid">

        <StatCard
          title="My Farms"
          value="1"
          subtitle="3 acres total"
          icon={<Sprout />}
          onClick={() =>
            onNavigate("My Farm")
          }
        />

        <StatCard
          title="Active Crops"
          value="3"
          subtitle="2 growing"
          icon={<Wheat />}
          onClick={() =>
            onNavigate("Crops")
          }
        />

        <StatCard
          title="Revenue"
          value="KSh 32,500"
          subtitle="+12.5% this month"
          icon={<ArrowUpRight />}
          positive
        />

        <StatCard
          title="Expenses"
          value="KSh 17,500"
          subtitle="This month"
          icon={<Wallet />}
          onClick={() =>
            onNavigate("Expenses")
          }
        />

      </div>


      {/* WEATHER + MARKET */}

      <div className="dashboard-grid">

        <WeatherCard />

        <MarketCard
          onNavigate={onNavigate}
        />

      </div>


      {/* CROPS */}

      <div className="section-heading">

        <div>

          <h2>
            My Crops
          </h2>

          <p>
            Monitor your current crops
          </p>

        </div>


        <button
          className="text-button"
          onClick={() =>
            onNavigate("Crops")
          }
        >

          View all

          <ChevronRight size={17} />

        </button>

      </div>


      <div className="crop-grid">

        <CropCard
          icon="🌽"
          name="Maize"
          location="Field A"
          status="Growing"
          progress={65}
          harvest="45 days"
        />

        <CropCard
          icon="🫘"
          name="Beans"
          location="Field B"
          status="Growing"
          progress={48}
          harvest="32 days"
        />

        <CropCard
          icon="🍅"
          name="Tomatoes"
          location="Field C"
          status="Harvest Soon"
          progress={88}
          harvest="10 days"
        />

      </div>


      {/* BOTTOM */}

      <div className="bottom-grid">

        <div className="activity-card">

          <div className="card-heading">

            <div>

              <h3>
                Recent Activity
              </h3>

              <p>
                Your latest farm activities
              </p>

            </div>

            <button
              className="icon-button"
              onClick={() =>
                onNavigate("My Farm")
              }
            >
              <ChevronRight size={18} />
            </button>

          </div>


          <Activity
            icon="🌱"
            title="Maize fertilizer applied"
            date="Today, 10:30 AM"
          />

          <Activity
            icon="💰"
            title="Sold 100kg of beans"
            date="Yesterday, 3:20 PM"
          />

          <Activity
            icon="🌧"
            title="Rain forecast updated"
            date="Yesterday, 9:15 AM"
          />

        </div>


        <div className="market-summary">

          <div className="card-heading">

            <div>

              <h3>
                Market Prices
              </h3>

              <p>
                Today's average prices
              </p>

            </div>

            <button
              className="text-button"
              onClick={() =>
                onNavigate("Market")
              }
            >
              Market
              <ChevronRight size={17} />
            </button>

          </div>


          <MarketRow
            crop="Maize"
            price="KSh 65/kg"
            change="+4.5%"
            positive
          />

          <MarketRow
            crop="Beans"
            price="KSh 120/kg"
            change="+2.1%"
            positive
          />

          <MarketRow
            crop="Tomatoes"
            price="KSh 85/kg"
            change="-1.4%"
          />

        </div>

      </div>

    </>
  );
}


/* =====================================================
   STAT CARD
===================================================== */

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  positive?: boolean;
  onClick?: () => void;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  positive,
  onClick,
}: StatCardProps) {

  return (
    <button
      className="stat-card"
      onClick={onClick}
      style={{
        textAlign: "left",
        width: "100%",
        border: "1px solid #e4e9e4",
        cursor: onClick
          ? "pointer"
          : "default",
      }}
    >

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        {positive && (
          <span className="positive">
            ↗
          </span>
        )}

      </div>


      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

      <div className="stat-subtitle">
        {subtitle}
      </div>

    </button>
  );
}


/* =====================================================
   WEATHER CARD
===================================================== */

function WeatherCard() {

  return (
    <div className="weather-card">

      <div className="card-heading">

        <div>

          <h3>
            Today's Weather
          </h3>

          <p>
            <MapPin size={14} />
            Bondo, Siaya
          </p>

        </div>

        <CloudSun size={35} />

      </div>


      <div className="weather-main">

        <div className="temperature">

          28°

          <span>
            C
          </span>

        </div>

        <div>

          <strong>
            Partly Cloudy
          </strong>

          <p>
            Feels like 29°C
          </p>

        </div>

      </div>


      <div className="weather-details">

        <div>

          <span>
            Rain
          </span>

          <strong>
            40%
          </strong>

        </div>

        <div>

          <span>
            Humidity
          </span>

          <strong>
            72%
          </strong>

        </div>

        <div>

          <span>
            Wind
          </span>

          <strong>
            14 km/h
          </strong>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   MARKET CARD
===================================================== */

interface MarketCardProps {
  onNavigate: (page: Page) => void;
}

function MarketCard({
  onNavigate,
}: MarketCardProps) {

  return (
    <div className="market-card">

      <div className="card-heading">

        <div>

          <h3>
            Market Prices
          </h3>

          <p>
            Average prices today
          </p>

        </div>

        <ShoppingBag size={24} />

      </div>


      <MarketRow
        crop="Maize"
        price="KSh 65/kg"
        change="+4.5%"
        positive
      />

      <MarketRow
        crop="Beans"
        price="KSh 120/kg"
        change="+2.1%"
        positive
      />

      <MarketRow
        crop="Tomatoes"
        price="KSh 85/kg"
        change="-1.4%"
      />


      <button
        className="market-button"
        onClick={() =>
          onNavigate("Market")
        }
      >

        View all market prices

        <ArrowUpRight size={17} />

      </button>

    </div>
  );
}


/* =====================================================
   MARKET ROW
===================================================== */

interface MarketRowProps {
  crop: string;
  price: string;
  change: string;
  positive?: boolean;
}

function MarketRow({
  crop,
  price,
  change,
  positive,
}: MarketRowProps) {

  return (
    <div className="market-row">

      <div className="market-crop">

        <div className="crop-mini">

          {crop === "Maize"
            ? "🌽"
            : crop === "Beans"
            ? "🫘"
            : "🍅"}

        </div>

        <strong>
          {crop}
        </strong>

      </div>


      <strong>
        {price}
      </strong>


      <span
        className={
          positive
            ? "positive"
            : "negative"
        }
      >

        {positive ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}

        {change}

      </span>

    </div>
  );
}


/* =====================================================
   CROP CARD
===================================================== */

interface CropCardProps {
  icon: string;
  name: string;
  location: string;
  status: string;
  progress: number;
  harvest: string;
}

function CropCard({
  icon,
  name,
  location,
  status,
  progress,
  harvest,
}: CropCardProps) {

  return (
    <div className="crop-card">

      <div className="crop-card-top">

        <div className="crop-emoji">
          {icon}
        </div>

        <span className="crop-status">
          {status}
        </span>

      </div>


      <h3>
        {name}
      </h3>


      <p>

        <MapPin size={14} />

        {location}

      </p>


      <div className="progress-header">

        <span>
          Growth
        </span>

        <strong>
          {progress}%
        </strong>

      </div>


      <div className="progress-bar">

        <div
          style={{
            width: `${progress}%`,
          }}
        />

      </div>


      <div className="harvest">

        Expected harvest

        <strong>
          {harvest}
        </strong>

      </div>

    </div>
  );
}


/* =====================================================
   ACTIVITY
===================================================== */

interface ActivityProps {
  icon: string;
  title: string;
  date: string;
}

function Activity({
  icon,
  title,
  date,
}: ActivityProps) {

  return (
    <div className="activity-row">

      <div className="activity-icon">
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {date}
        </span>

      </div>

    </div>
  );
}


/* =====================================================
   PAGE HEADER
===================================================== */

interface PageHeaderProps {
  title: string;
  description: string;
}

function PageHeader({
  title,
  description,
}: PageHeaderProps) {

  return (
    <div className="page-header">

      <div>

        <p className="eyebrow">
          AGRICONNECT
        </p>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

      <button className="primary-button">

        <Plus size={18} />

        Add New

      </button>

    </div>
  );
}


/* =====================================================
   EXPENSES
===================================================== */

function Expenses() {

  return (
    <>

      <PageHeader
        title="Farm Expenses"
        description="Track your farming expenses and profit."
      />


      <div className="stats-grid">

        <StatCard
          title="Total Expenses"
          value="KSh 17,500"
          subtitle="This month"
          icon={<Wallet />}
        />

        <StatCard
          title="Revenue"
          value="KSh 32,500"
          subtitle="+12.5%"
          icon={<ArrowUpRight />}
          positive
        />

        <StatCard
          title="Estimated Profit"
          value="KSh 15,000"
          subtitle="Current season"
          icon={<Wallet />}
          positive
        />

        <StatCard
          title="Transactions"
          value="24"
          subtitle="This season"
          icon={<ShoppingBag />}
        />

      </div>


      <div className="large-empty-card">

        <Wallet size={45} />

        <h2>
          Expense Records
        </h2>

        <p>
          Your expense records and financial
          charts will appear here.
        </p>

      </div>

    </>
  );
}


/* =====================================================
   EXPERTS
===================================================== */

function Experts() {

  return (
    <>

      <PageHeader
        title="Agricultural Experts"
        description="Connect with agricultural professionals."
      />


      <div className="expert-grid">

        <div className="expert-card">

          <div className="expert-avatar">
            JO
          </div>

          <h3>
            John Ochieng
          </h3>

          <span>
            Crop Specialist
          </span>

          <p>
            Maize • Beans • Vegetables
          </p>

          <button className="secondary-button">
            Ask Expert
          </button>

        </div>


        <div className="expert-card">

          <div className="expert-avatar">
            MA
          </div>

          <h3>
            Mary Akinyi
          </h3>

          <span>
            Livestock Specialist
          </span>

          <p>
            Dairy • Poultry • Livestock
          </p>

          <button className="secondary-button">
            Ask Expert
          </button>

        </div>


        <div className="expert-card">

          <div className="expert-avatar">
            PO
          </div>

          <h3>
            Peter Odhiambo
          </h3>

          <span>
            Soil Specialist
          </span>

          <p>
            Soil • Fertilizer • Crops
          </p>

          <button className="secondary-button">
            Ask Expert
          </button>

        </div>

      </div>

    </>
  );
}


/* =====================================================
   WEATHER
===================================================== */

function Weather() {

  return (
    <>

      <PageHeader
        title="Weather"
        description="Monitor weather conditions for your farm."
      />


      <WeatherCard />


      <div className="forecast-grid">

        <div>

          <strong>
            Today
          </strong>

          <span>
            🌤 28°C
          </span>

        </div>


        <div>

          <strong>
            Tomorrow
          </strong>

          <span>
            🌧 26°C
          </span>

        </div>


        <div>

          <strong>
            Wednesday
          </strong>

          <span>
            ☀️ 29°C
          </span>

        </div>

      </div>


      <div className="large-empty-card">

        <CloudSun size={45} />

        <h2>
          Farming Weather Advice
        </h2>

        <p>
          Weather-based farming recommendations
          will appear here.
        </p>

      </div>

    </>
  );
}


/* =====================================================
   MESSAGES
===================================================== */

function Messages() {

  return (
    <>

      <PageHeader
        title="Messages"
        description="Communicate with buyers and agricultural experts."
      />


      <div className="large-empty-card">

        <MessageSquare size={45} />

        <h2>
          No conversations yet
        </h2>

        <p>
          Your conversations with buyers and
          agricultural experts will appear here.
        </p>

      </div>

    </>
  );
}


/* =====================================================
   PROFILE
===================================================== */

function Profile() {

  return (
    <>

      <PageHeader
        title="My Profile"
        description="Manage your farmer account."
      />


      <div className="profile-card">

        <div className="profile-large-avatar">
          F
        </div>

        <h2>
          Farmer
        </h2>

        <p>
          farmer@example.com
        </p>

        <p>

          <MapPin size={15} />

          Bondo, Siaya, Kenya

        </p>


        <div className="profile-information">

          <div>
            <span>Farm</span>
            <strong>Simba Farm</strong>
          </div>

          <div>
            <span>Farm Size</span>
            <strong>3 Acres</strong>
          </div>

          <div>
            <span>Active Crops</span>
            <strong>3</strong>
          </div>

        </div>


        <button className="secondary-button">
          Edit Profile
        </button>

      </div>

    </>
  );
}


export default App;