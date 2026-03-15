import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import PageLayout from "../components/PageLayout";

const ContactPage = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout title="Get In Touch">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="page-section" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <p>
                        Have a project idea, a question, or just want to say hello? I'd love to hear
                        from you. Fill out the form below or reach out through any of the channels listed.
                    </p>
                </div>

                <div className="contact-page-grid">
                    {/* Contact Info */}
                    <div className="contact-info-card">
                        <h2>Contact Information</h2>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3>Email</h3>
                                <p><a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a></p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h3>Phone</h3>
                                <p><a href="tel:+918883280816">+91 8883280816</a></p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3>Location</h3>
                                <p>Tamil Nadu, India</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <FaLinkedin />
                            </div>
                            <div>
                                <h3>LinkedIn</h3>
                                <p><a href="https://linkedin.com/in/kabilan-k" target="_blank" rel="noreferrer">linkedin.com/in/kabilan-k</a></p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <FaGithub />
                            </div>
                            <div>
                                <h3>GitHub</h3>
                                <p><a href="https://github.com/kabi09" target="_blank" rel="noreferrer">github.com/StartLord-09</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        className="contact-form-card"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData.entries());
                            const btn = e.target.querySelector("button");
                            const originalText = btn.innerHTML;

                            try {
                                btn.disabled = true;
                                btn.innerHTML = "Sending...";

                                const response = await fetch("/api/contact", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(data),
                                });

                                if (response.ok) {
                                    setStatus({ type: "success", message: "Your message has been sent successfully!" });
                                    e.target.reset();
                                } else {
                                    setStatus({ type: "error", message: "Failed to send. Please try again." });
                                }
                            } catch (error) {
                                console.error(error);
                                setStatus({ type: "error", message: "Error sending message. Please try again later." });
                            } finally {
                                btn.disabled = false;
                                btn.innerHTML = originalText;
                                setTimeout(() => setStatus(null), 5000);
                            }
                        }}
                    >
                        <h2>Send a Message</h2>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`status-message ${status.type}`}
                            >
                                <strong>{status.type === "success" ? "Thank you!" : "Error!"}</strong>{" "}
                                {status.message}
                            </motion.div>
                        )}

                        <div className="input-group">
                            <input type="text" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="input-group">
                            <input type="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="input-group">
                            <input type="tel" name="phone" placeholder="Phone Number (Optional)" />
                        </div>
                        <div className="input-group">
                            <textarea
                                name="message"
                                placeholder="Tell me about your project or question..."
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-send">
                            Send Message <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </motion.div>
        </PageLayout>
    );
};

export default ContactPage;
