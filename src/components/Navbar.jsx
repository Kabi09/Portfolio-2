import { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    const links = [
        { id: 1, link: "profile" },
        { id: 2, link: "tech stack" },
        { id: 3, link: "projects" },
        { id: 4, link: "contact" },
    ];

    return (
        <nav className="navbar glass">
            <div className="navbar-logo" onClick={toggleHome}>
                Kabilan K
            </div>

            <ul className="nav-links desktop">
                {links.map(({ id, link }) => (
                    <li key={id} className="nav-item">
                        <Link to={link} smooth duration={500}>
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="nav-toggle"
            >
                {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {isOpen && (
                <ul className="nav-links mobile">
                    {links.map(({ id, link }) => (
                        <li key={id} className="nav-item">
                            <Link
                                onClick={() => setIsOpen(false)}
                                to={link}
                                smooth
                                duration={500}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
