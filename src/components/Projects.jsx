import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/Projects.css";

const projectsData = [
    {
        id: 1,
        title: "🧠 Dude Quizz AI 📚",
        desc: "An AI-powered quiz platform focused on one-mark questions for Tamil medium students (Class 10, 11, 12). Features mathematical formula rendering using KaTeX.",
        techs: ["MERN Stack", "Ollama AI", "KaTeX", "Vercel"],
        github: "https://github.com/Kabi09/Dude-Quizz-AI",
        demo: "https://dude-quiz.vercel.app/",
    },
    {
        id: 2,
        title: "🛒💳 E-Commerce Website",
        desc: "Secure e-commerce application with Razorpay payment gateway, user authentication, and email notifications using Nodemailer for order confirmations and updates.",
        techs: ["MERN Stack", "Razorpay", "Nodemailer"],
        github: "https://github.com/Kabi09/InstaShop-Ecommerce",
        demo: "https://insta-shop-umber.vercel.app/",
    },
    {
        id: 3,
        title: "KabiGPT 🤖✨",
        desc: "A personalized Tanglish AI Telegram bot powered by Ollama. It features a custom personality, provides natural, friendly responses in a mix of Tamil and English.",
        techs: ["Node.js", "Express.js", "MongoDB", "Telegram API", "Ollama Cloud"],
        github: "https://github.com/Kabi09/Telegram-Bot",
        demo: "https://t.me/Dude09_bot",
    },
    {
        id: 4,
        title: "🔗📱 Dynamic QR Code Generator",
        desc: "MERN stack application that generates permanent QR codes with dynamic redirect links. Users can update destination URLs anytime without changing the QR image.",
        techs: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose"],
        github: "https://github.com/Kabi09/Dynamic-QR",
        demo: "https://dynamic-qr-zeta.vercel.app/"
    },
    {
        id: 5,
        title: "🧾📊 Billing Software",
        desc: "Role-Based Billing & Inventory System. Handles workers, products, reports, GST invoice generation, barcode scanning, and thermal printer integration.",
        techs: ["React.js", "Node.js", "MongoDB", "JWT"],
        github: "https://github.com/Kabi09/Billing_Software",
        demo: "https://billing-kabi09.vercel.app/",
    },
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="project-card glass"
            whileHover={{ y: -10 }}
        >
            <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-techs">
                    {project.techs.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="project-links">
                    <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project"
                        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Demo <FaExternalLinkAlt />
                    </motion.a>
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project outline"
                        whileHover={{ scale: 1.05, borderColor: "var(--accent-color)", color: "var(--accent-color)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Code <FaGithub />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );

};

const Projects = () => {
    return (
        <section name="projects" className="projects">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Projects
            </motion.h2>

            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
