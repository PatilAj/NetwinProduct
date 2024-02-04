import React from "react";
import "./footer.css";
import { FacebookOutlined, YouTube, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer () {
    return (
        <footer className="footer" style={{ backgroundColor: "#EEEFFB" }}>
            <div className="container">
                <div className="footer-row">
                    <div className="col-md-6">
                    <form className="footer-form">
                            <h5 style={{ fontWeight: "bold", fontSize: "44px" , textAlign:'justify'}}>
                                <Link to="/" style={{ color: '#0D0E43', textDecoration: 'none' }}>
                                    Netwin
                                </Link>
                            </h5>
                            <div>
                                <label className="visually-hidden">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="footer-form-control"
                                    placeholder="Email Address"
                                />
                                <button className="footer-btn btn-primary" type="button">
                                    Sign Up
                                </button>
                                <p style={{ marginBottom: "0", color: "#8A8FB9" }}>Contact Info</p>
                                <p style={{ color: "#8A8FB9" }}>
                                IT-29/5, IT Park , Opp. Siemens, MIDC Ambad, Nashik – 422010, Maharashtra
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="footer-details">
                        <FacebookOutlined className="social-logo" />
                        <YouTube className="social-logo" />
                        <Twitter className="social-logo" />
                        <p style={{paddingTop:"5px"}}> ©Netwin 2024 - All Rights Reserved</p> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
