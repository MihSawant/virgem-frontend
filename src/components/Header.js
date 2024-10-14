import React from "react";

const Header = () => (
    <div id="page" className="hfeed site">
        <header id="masthead" className="site-header" role="banner" style={{ background: "linear-gradient(135deg, #1b2356, #1b2356)", padding: "15px 0" }}>
            <div className="wc-inner-header">
                <a className="skip-link screen-reader-text" href="#site-navigation">Skip to navigation</a>
                <a className="skip-link screen-reader-text" href="#content">Skip to content</a>

                {/* Logo with Diamond Effect */}
                <div className="site-branding">
                    <a href="#" className="custom-logo-link" rel="home" aria-current="page">
                        <div className="diamond-logo-container">
                            <img 
                                src="/virgems.png" 
                                alt="Vir Gems Logo" 
                                className="diamond-logo" 
                                decoding="async" 
                                style={{
                                    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
                                    borderRadius: "50%",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0px 0px 30px rgba(255, 255, 255, 0.9)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.8)";
                                }}
                            />
                        </div>
                    </a>
                </div>

                {/* Navigation Section */}
                <nav id="site-navigation" className="main-navigation" role="navigation" aria-label="Primary Navigation">
                    <button id="site-navigation-menu-toggle" className="menu-toggle" aria-controls="site-navigation" aria-expanded="false">
                        <span>Menu</span>
                    </button>
                    <div className="primary-navigation">
                        <ul id="menu-main-menu" className="menu">
                            {["About us", "Compare", "Wishlist", "Cart", "Checkout"].map((item, index) => (
                                <li key={index} className="menu-item menu-item-type-post_type" style={{ listStyleType: "none" }}>
                                    <a href="#" style={{
                                        color: "#ffffff",
                                        padding: "10px 15px",
                                        fontWeight: "500",
                                        transition: "color 0.3s, border-bottom 0.3s",
                                        borderBottom: "2px solid transparent"
                                    }} onMouseOver={(e) => {
                                        e.currentTarget.style.color = "#d1d4e9";
                                        e.currentTarget.style.borderBottom = "2px solid #d1d4e9";
                                    }} onMouseOut={(e) => {
                                        e.currentTarget.style.color = "#ffffff";
                                        e.currentTarget.style.borderBottom = "2px solid transparent";
                                    }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Additional Premium Links */}
                    <div className="menu">
                        <ul>
                            {["Home", "About US", "Cart", "Checkout", "Compare", "Documentation", "My Account", "RapNet Shop", "Shop", "Wishlist"].map((item, index) => (
                                <li key={index} className="page_item" style={{ display: "inline-block", margin: "0 10px" }}>
                                    <a href="#" style={{
                                        color: "#ffffff",
                                        padding: "10px 15px",
                                        fontWeight: "500",
                                        transition: "color 0.3s, border-bottom 0.3s",
                                        borderBottom: "2px solid transparent"
                                    }} onMouseOver={(e) => {
                                        e.currentTarget.style.color = "#d1d4e9";
                                        e.currentTarget.style.borderBottom = "2px solid #d1d4e9";
                                    }} onMouseOut={(e) => {
                                        e.currentTarget.style.color = "#ffffff";
                                        e.currentTarget.style.borderBottom = "2px solid transparent";
                                    }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    </div>
);

export default Header;
