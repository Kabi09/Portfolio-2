
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot, FaUser, FaProjectDiagram, FaCode, FaEnvelope, FaLink, FaChevronRight, FaTrash, FaRocket } from "react-icons/fa";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("chat"); // chat, contact
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem("kabi_chat_history");
        return savedMessages ? JSON.parse(savedMessages) : [
            { role: "ai", content: "Hi! I'm KabiGPT, Kabilan's personal AI assistant. I can tell you about his projects, skills, or his **Website Creation freelance service (Starting ₹499)**! How can I help you today?" }
        ];
    });
    const [isLoading, setIsLoading] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear your chat history?")) {
            const initialMessage = [{ role: "ai", content: "Hi! I'm KabiGPT, Kabilan's personal AI assistant. I can tell you about his projects, skills, or his **Website Creation freelance service (Starting ₹499)**! How can I help you today?" }];
            setMessages(initialMessage);
            localStorage.setItem("kabi_chat_history", JSON.stringify(initialMessage));
        }
    };

    useEffect(() => {
        localStorage.setItem("kabi_chat_history", JSON.stringify(messages));
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
                const aiContent = res.data.message.content;
                setMessages(prev => [...prev, { role: "ai", content: aiContent }]);
                
                // Auto-open contact form if AI suggests it
                if (aiContent.toLowerCase().includes("contact kabilan") || aiContent.toLowerCase().includes("contact form")) {
                    setTimeout(() => setMode("contact"), 2000);
                }
            } else if (res.data && res.data.choices) {
                const aiContent = res.data.choices[0].message.content;
                setMessages(prev => [...prev, { role: "ai", content: aiContent }]);

                if (aiContent.toLowerCase().includes("contact kabilan") || aiContent.toLowerCase().includes("contact form")) {
                    setTimeout(() => setMode("contact"), 2000);
                }
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
        { 
            name: "Website Service", 
            icon: <FaRocket />, 
            action: () => setMessages(prev => [...prev, { 
                role: "ai", 
                content: `### 🌐 Freelance Website Services
I can create a professional, responsive, and SEO-friendly website for you!

💰 **Starting Price**: ₹499
⏱️ **Delivery**: within 5 days
🛠️ **Tech**: React, Node.js, Tailwind CSS

Interested? Just ask me more details or click the **Contact Kabilan** button to get started!`
            }]) 
        },
        { 
            name: "Projects", 
            icon: <FaProjectDiagram />, 
            action: () => setMessages(prev => [...prev, { 
                role: "ai", 
                content: `Here are some of Kabilan's top projects:

🚀 **Dude Quizz AI**
An AI-powered quiz platform for Tamil medium students.
🔗 [Demo](https://dude-quiz.vercel.app/) | [Code](https://github.com/Kabi09/Dude-Quizz-AI)

🛒 **InstaShop E-Commerce**
Secure shopping with Razorpay & Nodemailer integration.
🔗 [Demo](https://insta-shop-umber.vercel.app/) | [Code](https://github.com/Kabi09/InstaShop-Ecommerce)

🤖 **KabiGPT**
Personalized Tanglish AI Telegram bot with a custom personality.
🔗 [Demo](https://t.me/Dude09_bot) | [Code](https://github.com/Kabi09/Telegram-Bot)

🔗 **Dynamic QR Generator**
Generate live-updateable QR codes with tracking.
🔗 [Demo](https://dynamic-qr-zeta.vercel.app/) | [Code](https://github.com/Kabi09/Dynamic-QR)`
            }]) 
        },
        { 
            name: "Tech Stack", 
            icon: <FaCode />, 
            action: () => setMessages(prev => [...prev, { 
                role: "ai", 
                content: `### 🔧 Front‑end
- **HTML** & **CSS**
- **React.js**
- **Tailwind CSS**

### 🛠️ Back‑end
- **Node.js**
- **Express.js**
- **MongoDB**

### 📦 Other Tools & Services
- **Git** & **GitHub**
- **RESTful APIs** (Postman for testing)  
- **JWT** for authentication  
- **KaTeX** (math rendering)  
- **Razorpay** (payment gateway)  
- **Nodemailer** (email service)  
- **Ollama AI** (AI integration)  
- **Vercel** (deployment)

### 🗣️ Languages
- **JavaScript** (ES6+)
- **Python**

Feel free to explore any of these in my projects or reach out if you’d like more details! 🚀`
            }]) 
        },
        { 
            name: "Links", 
            icon: <FaLink />, 
            action: () => setMessages(prev => [...prev, { 
                role: "ai", 
                content: `You can find Kabilan on:
- **GitHub**: https://github.com/Kabi09
- **LinkedIn**: https://linkedin.com/in/kabilan09
- **Email**: mailto:kabilan.fullstack@gmail.com` 
            }]) 
        },
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
                                <div className="chatbot-avatar">
                                    <FaRobot />
                                    <span className="active-dot"></span>
                                </div>
                                <div className="chatbot-info">
                                    <h4>KabiGPT</h4>
                                    <p>AI Assistant • Active</p>
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: '10px'}}>
                                {messages.length > 1 && (
                                    <button className="action-btn" style={{border: 'none', background: 'transparent'}} title="Clear Chat" onClick={clearHistory}>
                                        <FaTrash />
                                    </button>
                                )}
                                <button className="action-btn" style={{border: 'none', background: 'transparent'}} onClick={() => { setMode("chat"); setIsOpen(false); }}>
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="chatbot-messages" style={{whiteSpace: 'pre-wrap'}}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    {msg.content.split(/(\[.*?\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s!)]+|mailto:[^\s)]+)/g).map((part, i) => {
                                        // Handle Markdown [Text](URL)
                                        const mdMatch = part.match(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/);
                                        if (mdMatch) {
                                            return (
                                                <a key={i} href={mdMatch[2]} target="_blank" rel="noopener noreferrer" style={{color: '#38bdf8', textDecoration: 'underline'}}>
                                                    {mdMatch[1]}
                                                </a>
                                            );
                                        }
                                        
                                        // Handle mailto:
                                        if (part.startsWith("mailto:")) {
                                            const email = part.replace("mailto:", "");
                                            return (
                                                <a key={i} href={part} style={{color: '#38bdf8', textDecoration: 'underline'}}>
                                                    {email}
                                                </a>
                                            );
                                        }
                                        
                                        // Handle Raw URL
                                        if (part.match(/^https?:\/\//)) {
                                            // Clean URL if trailing punctuation exists
                                            const cleanUrl = part.replace(/[!)]+$/, "");
                                            const trailing = part.slice(cleanUrl.length);
                                            return (
                                                <span key={i}>
                                                    <a href={cleanUrl} target="_blank" rel="noopener noreferrer" style={{color: '#38bdf8', textDecoration: 'underline'}}>
                                                        {cleanUrl}
                                                    </a>
                                                    {trailing}
                                                </span>
                                            );
                                        }
                                        
                                        return part;
                                    })}
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
