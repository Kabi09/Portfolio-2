import { FaGithub, FaLinkedin, FaHeart,FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                Designed & Built by <span className="highlight">Kabilan K</span>
            </p>
            <div className="footer-socials">
                <a href="https://github.com/StartLord-09" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/in/kabilan-k" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
                  <a href="mailto:kabilan.fullstack@gmail.com" target="_blank" rel="noreferrer">
                    <FaEnvelope />
                </a>
            </div>
            <p className="copyright">
                © {new Date().getFullYear()} All rights reserved. Made with <FaHeart className="heart-icon" />
            </p>
        </footer>
    );
};

export default Footer;
