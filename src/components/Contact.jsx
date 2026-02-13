import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Contact.css"; // Ensure this file is created

const Contact = () => {
    const [status, setStatus] = useState(null);

    return (
        <section name="contact" className="contact">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Contact Us
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="contact-subtitle"
            >
               If you have an opportunity, project idea, or any questions, I’d be happy to connect with you.            </motion.p>

            <div className="contact-container">
                {/* Contact Info */}
                {/* <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="contact-info glass"
                >
                    <h3>Contact Information</h3>
                    <p className="contact-desc">
                        Feel free to reach out for collaborations or just a friendly hello!
                    </p>

                    <div className="info-item">
                        <FaPhoneAlt className="info-icon" />
                        <p>+91 8883280816</p>
                    </div>
                    <div className="info-item">
                        <FaEnvelope className="info-icon" />
                        <p>mailtokabilan009@gmail.com</p>
                    </div>
                    <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <p>Tamil Nadu, India</p>
                    </div>
                </motion.div> */}

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="contact-form glass"
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
                                setStatus({ type: "success", message: "Your message has been sent successfully." });
                                e.target.reset();
                            } else {
                                setStatus({ type: "error", message: "Failed to send. Please try again." });
                            }
                        } catch (error) {
                            console.error(error);
                            setStatus({ type: "error", message: "Error sending message." });
                        } finally {
                            btn.disabled = false;
                            btn.innerHTML = originalText;
                            setTimeout(() => setStatus(null), 5000);
                        }
                    }}
                >
                    <h3>Send a Message</h3>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`status-message ${status.type}`}
                        >
                            <span className="status-text">
                                <strong>{status.type === 'success' ? 'Thank you!' : 'Error!'}</strong> {status.message}
                            </span>
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
                            placeholder="Your Message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-send">
                        Send Message <FaPaperPlane />
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
