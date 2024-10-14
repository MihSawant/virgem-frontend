import React from "react";

const Header = () => (
    <div id="page" className="hfeed site">
        <header id="masthead" className="site-header" role="banner">
            <div className="wc-inner-header">
                <a className="skip-link screen-reader-text" href="#site-navigation">Skip to navigation</a>
                <a className="skip-link screen-reader-text" href="#content">Skip to content</a>

                <div className="site-branding">
                    <a href="#" className="custom-logo-link" rel="home" aria-current="page">
                        {/* Vir Gems logo with link */}
                        <img 
                            src="/virgems.png" 
                            alt="Vir Gems Logo" 
                            className="diamond-logo diamond-logo-container" 
                            style={{ maxWidth: '150px', height: 'auto', borderRadius: '50%' }} 

                            decoding="async" 
                        />
                    </a>
                </div>

                <div className="storefront-primary-navigation">
                    <div className="col-full"></div>
                    <nav id="site-navigation" className="main-navigation" role="navigation" aria-label="Primary Navigation">
                        <button id="site-navigation-menu-toggle" className="menu-toggle" aria-controls="site-navigation" aria-expanded="false">
                            <span>Menu</span>
                        </button>

                        <div className="primary-navigation">
                            <ul id="menu-main-menu" className="menu">
                                <li id="menu-item-194" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-194">
                                    <a href="https://rapnet.webbytemplate.com/about-us/">About us</a>
                                </li>
                                <li id="menu-item-219" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-219">
                                    <a href="https://rapnet.webbytemplate.com/compare/">Compare</a>
                                </li>
                                <li id="menu-item-220" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-220">
                                    <a href="https://rapnet.webbytemplate.com/wishlist/">Wishlist</a>
                                </li>
                                <li id="menu-item-212" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-212">
                                    <a href="https://rapnet.webbytemplate.com/cart/">Cart</a>
                                </li>
                                <li id="menu-item-213" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-213">
                                    <a href="https://rapnet.webbytemplate.com/checkout/">Checkout</a>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="menu">
                            <ul>
                                <li className="current_page_item">
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="page_item page-item-8">
                                    <a href="https://rapnet.webbytemplate.com/about-us/">About US</a>
                                </li>
                                <li className="page_item page-item-175">
                                    <a href="https://rapnet.webbytemplate.com/cart/">Cart</a>
                                </li>
                                <li className="page_item page-item-105">
                                    <a href="https://rapnet.webbytemplate.com/checkout/">Checkout</a>
                                </li>
                                <li className="page_item page-item-217">
                                    <a href="https://rapnet.webbytemplate.com/compare/">Compare</a>
                                </li>
                                <li className="page_item page-item-19">
                                    <a href="https://rapnet.webbytemplate.com/documetation/">Documentation</a>
                                </li>
                                <li className="page_item page-item-35">
                                    <a href="https://rapnet.webbytemplate.com/my-account/">My Account</a>
                                </li>
                                <li className="page_item page-item-38 current_page_item">
                                    <a href="index.html" aria-current="page">RapNet Shop</a>
                                </li>
                                <li className="page_item page-item-32">
                                    <a href="https://rapnet.webbytemplate.com/shop/">Shop</a>
                                </li>
                                <li className="page_item page-item-214">
                                    <a href="https://rapnet.webbytemplate.com/wishlist/">Wishlist</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    </div>
);

export default Header;
