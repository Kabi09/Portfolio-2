
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot, FaUser, FaProjectDiagram, FaCode, FaEnvelope, FaLink, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("chat"); // chat, contact
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hi! I'm KabiGPT, Kabilan's personal AI assistant. How can I help you today? I know about his projects, skills, and can even help you send him a message!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await axios.post("/api/chat", {
                messages: messages.concat(userMessage).map(m => ({ role: m.role, content: m.content }))
            });

            if (res.data && res.data.message) {
                setMessages(prev => [...prev, { role: "ai", content: res.data.message.content }]);
            } else if (res.data && res.data.choices) {
                // Fallback for different API response formats
                setMessages(prev => [...prev, { role: "ai", content: res.data.choices[0].message.content }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm having a hard time connecting to my brain right now. Please try again or use the Contact form!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("/api/contact", contactForm);
            setMessages(prev => [...prev, { role: "ai", content: `Thank you, ${contactForm.name}! I've sent your details to Kabilan. He will reach out to you at ${contactForm.email} shortly.` }]);
            setMode("chat");
            setContactForm({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", content: "Oops, something went wrong while sending the email. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickActions = [
        { name: "Projects", icon: <FaProjectDiagram />, action: () => setMessages(prev => [...prev, { role: "ai", content: "Kabilan has built some amazing projects like 'Dude Quizz AI', 'InstaShop', and 'KabiGPT'. Which one would you like to know about?" }]) },
        { name: "Tech Stack", icon: <FaCode />, action: () => setMessages(prev => [...prev, { role: "ai", content: "He is proficient in the MERN stack (MongoDB, Express, React, Node.js), Python, and JavaScript. He also works with AI integrations!" }]) },
        { name: "Links", icon: <FaLink />, action: () => setMessages(prev => [...prev, { role: "ai", content: "You can find Kabilan on GitHub (https://github.com/Kabi09) and LinkedIn (https://linkedin.com/in/kabilan09)!" }]) },
        { name: "Contact Kabilan", icon: <FaEnvelope />, action: () => setMode("contact") },
    ];

    return (
        <div className="chatbot-container">
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaRobot />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="chatbot-window"
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-profile">
                                <div className="chatbot-avatar"><FaRobot /></div>
                                <div className="chatbot-info">
                                    <h4>KabiGPT</h4>
                                    <p>AI Assistant • Active</p>
                                </div>
                            </div>
                            <button className="action-btn" style={{border: 'none'}} onClick={() => { setMode("chat"); setIsOpen(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    {msg.content}
                                </div>
                            ))}
                            
                            {isLoading && mode === "chat" && (
                                <div className="message ai">
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>typing...</motion.span>
                                </div>
                            )}

                            {mode === "chat" && (
                                <div className="chatbot-actions">
                                    {quickActions.map((action, i) => (
                                        <button key={i} className="action-btn" onClick={action.action}>
                                            {action.icon} {action.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {mode === "contact" && (
                                <motion.form 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="contact-form-mini"
                                    onSubmit={handleContactSubmit}
                                >
                                    <h5 style={{color: '#38bdf8', margin: '0 0 10px 0'}}>Client Information</h5>
                                    <p style={{fontSize: '0.75rem', color: '#94a3b8', marginBottom: '10px'}}>Fill this to send a direct message to Kabilan:</p>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        required 
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        required 
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number (Optional)" 
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                                    />
                                    <textarea 
                                        placeholder="How can Kabilan help you?" 
                                        rows="3" 
                                        required
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                    />
                                    <div style={{display: 'flex', gap: '10px', marginTop: '5px'}}>
                                        <button type="submit" disabled={isLoading} style={{flex: 1}}>
                                            {isLoading ? "Sending..." : "Submit & Send Mail"}
                                        </button>
                                        <button type="button" onClick={() => setMode("chat")} style={{background: 'rgba(255,255,255,0.1)', flex: 0.5}}>Back</button>
                                    </div>
                                </motion.form>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {mode === "chat" && (
                            <form className="chatbot-input" onSubmit={handleSend}>
                                <input 
                                    type="text" 
                                    placeholder="Ask me anything..." 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()}>
                                    <FaPaperPlane />
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
