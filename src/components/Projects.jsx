import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/Projects.css";

const projectsData = [
    {
        id: 1,
        title: "Dude Quizz AI",
        desc: "An AI-powered quiz platform focused on one-mark questions for Tamil medium students (Class 10, 11, 12). Features mathematical formula rendering using KaTeX.",
        techs: ["MERN Stack", "Ollama AI", "KaTeX", "Vercel"],
        github: "https://github.com/StartLord-09", // Placeholder
        demo: "https://dude-quiz.vercel.app/",
    },
    {
        id: 2,
        title: "Billing Software",
        desc: "Role-Based Billing & Inventory System. Handles workers, products, reports, GST invoice generation, barcode scanning, and thermal printer integration.",
        techs: ["React.js", "Node.js", "MongoDB", "JWT"],
        github: "https://github.com/StartLord-09", // Placeholder
        demo: "https://billing-kabi09.vercel.app/",
    },
    {
        id: 3,
        title: "E-Commerce Website",
        desc: "Secure e-commerce application with Razorpay payment gateway, fake review prevention using verified-buyer capability, and account blocking for invalid attempts.",
        techs: ["MERN Stack", "Razorpay", "Nodemailer"],
        github: "https://github.com/StartLord-09", // Placeholder
        demo: "#", // No link in resume
    },
    {
        id: 4,
        title: "Pet Adoption Platform",
        desc: "Full-stack platform connecting pet adopters and shelters. Features role-based access for admins and adopters to manage listings and requests.",
        techs: ["React.js", "Node.js", "Express.js", "MongoDB"],
        github: "https://github.com/StartLord-09", // Placeholder
        demo: "#", // No link in resume
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
