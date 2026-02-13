import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import "../styles/Hero.css";

const Hero = () => {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const fullText = "MERN Stack Developer";
    const typingSpeed = 150;
    const deletingSpeed = 100;

    useEffect(() => {
        const handleTyping = () => {
            if (isDeleting) {
                setText(fullText.substring(0, text.length - 1));
            } else {
                setText(fullText.substring(0, text.length + 1));
            }

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting]);

    const socialLinks = [
        {
            id: 1,
            icon: <FaGithub />,
            name: "GitHub",
            href: "https://github.com/Kabi09",
        },
        {
            id: 2,
            icon: <FaLinkedin />,
            name: "LinkedIn",
            href: "https://linkedin.com/in/kabilan09",
        },
        {
            id: 3,
            icon: <FaEnvelope />,
            name: "Email",
            href: "mailto:kabilan.fullstack@gmail.com",
        },
        {
            id: 4,
            icon: <FaGlobe />,
            name: "Website",
            href: "https://www.kabilankaliyaperumal.in/",
        },
    ];

    return (
        <section name="profile" className="hero">
            <div className="hero-content">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hero-subtitle"
                >
                    Hi, I am
                </motion.h3>
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-title"
                >
                    Kabilan K
                </motion.h1>

                <h2 className="hero-role">
                    <span className="typing-text">{text}</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="cursor"
                    >
                        |
                    </motion.span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }} // Reduced delay
                    className="hero-description"
                >
                    Recent B.E. Computer Science graduate with hands-on experience in MERN
                    stack development. Built real-world applications including AI-powered quiz
                    platforms, role-based billing systems, and secure e-commerce solutions.
                </motion.p>

                <div className="hero-socials">
                    {socialLinks.map(({ id, icon, href, name }, index) => (
                        <motion.a
                            key={id}
                            href={href}
                            target={href.startsWith("mailto") ? undefined : "_blank"}
                            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, color: "#38bdf8" }}
                            className="social-card glass"
                        >
                            <div className="social-content-animate">
                                <span className="social-icon">{icon}</span>
                                <span className="social-name">{name}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.a
                    href="/resume.pdf" // Placeholder
                    download={true}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                >
                    Download CV
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
