import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaJava,
    FaPython,
    FaLock,
    FaServer,
    FaCode,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostman, SiVercel, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import "../styles/TechStack.css";

const TechStack = () => {
    const tabs = ["Programming", "Frontend", "Backend"];

    // Tech icons map (can be colored if preferred, currently using default inheritance)
    const techs = [
        // Programming
        { id: 1, icon: <FaPython />, name: "Python", category: "Programming" },
        { id: 2, icon: <FaJs />, name: "JavaScript", category: "Programming" },

        // Frontend
        { id: 10, icon: <FaHtml5 />, name: "HTML", category: "Frontend" },
        { id: 11, icon: <FaCss3Alt />, name: "CSS", category: "Frontend" },
        { id: 12, icon: <FaReact />, name: "React.js", category: "Frontend" },
        { id: 13, icon: <SiTailwindcss />, name: "Tailwind CSS", category: "Frontend" },

        // Backend
        { id: 20, icon: <FaNodeJs />, name: "Node.js", category: "Backend" },
        { id: 21, icon: <SiExpress />, name: "Express.js", category: "Backend" },
        { id: 22, icon: <SiMongodb />, name: "MongoDB", category: "Backend" },
        { id: 23, icon: <FaGitAlt />, name: "Git", category: "Backend" },
        { id: 24, icon: <FaGithub />, name: "GitHub", category: "Backend" },
        { id: 25, icon: <FaServer />, name: "RESTful API", category: "Backend" },
        { id: 26, icon: <SiPostman />, name: "Postman", category: "Backend" },
        { id: 27, icon: <FaLock />, name: "JWT", category: "Backend" },
    ];


    return (
        <section name="tech stack" className="tech-stack">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Tech Stack
            </motion.h2>

            <div className="tech-container">
                {tabs.map((category, catIndex) => (
                    <div key={category} className="tech-category">
                        {catIndex > 0 && <div className="tech-divider"></div>}
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="category-title"
                        >
                            {category}
                        </motion.h3>

                        <div className="tech-row">
                            {techs
                                .filter((tech) => tech.category === category)
                                .map((tech, index) => (
                                    <motion.div
                                        key={tech.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        viewport={{ once: true }}
                                        className="tech-item glass"
                                    >
                                        <div className="tech-content-animate">
                                            <div className="tech-icon">{tech.icon}</div>
                                            <p className="tech-name">{tech.name}</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
