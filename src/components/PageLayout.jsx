import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";
import "../styles/PageLayout.css";

const PageLayout = ({ title, children }) => {
    return (
        <div className="page-layout">
            <nav className="page-navbar glass">
                <Link to="/" className="page-navbar-logo">
                    Kabilan K
                </Link>
                <Link to="/" className="back-home-link">
                    <FaArrowLeft /> Back to Home
                </Link>
            </nav>

            <main className="page-content">
                <div className="page-header">
                    <h1>{title}</h1>
                    <div className="page-header-line"></div>
                </div>
                <div className="page-body">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PageLayout;
