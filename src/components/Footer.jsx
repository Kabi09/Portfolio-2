import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaHeart, FaEnvelope } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                Designed & Built by <span className="highlight">Kabilan K</span>
            </p>
            <div className="footer-socials">
                <a href="https://github.com/Kabi09" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/kabilan-fullstack" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
                <a href="mailto:kabilan.fullstack@gmail.com" target="_blank" rel="noreferrer">
                    <FaEnvelope />
                </a>
              <a href="https://kabilan.in/payment" target="_blank" rel="noreferrer">
                    <RiMoneyRupeeCircleFill />
                </a>
            </div>
            <div className="footer-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span className="footer-divider">|</span>
                <Link to="/terms">Terms & Conditions</Link>
                <span className="footer-divider">|</span>
                <Link to="/refund-policy">Refund Policy</Link>
                <span className="footer-divider">|</span>
                <Link to="/contact">Contact</Link>
            </div>
            <p className="copyright">
                © {new Date().getFullYear()} All rights reserved. Made with <FaHeart className="heart-icon" />
            </p>
        </footer>
    );
};

export default Footer;
