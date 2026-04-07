import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaCreditCard,
    FaCheckCircle,
    FaTimesCircle,
    FaShieldAlt,
    FaLock,
    FaGlobe,
    FaBriefcase,
    FaCode,
    FaComments,
    FaFileContract,
    FaRocket,
    FaUndoAlt,
    FaTruck,
    FaEnvelope,
    FaInfoCircle,
} from "react-icons/fa";
import PageLayout from "../components/PageLayout";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const services = [
    {
        icon: <FaGlobe />,
        title: "Portfolio Websites",
        desc: "Clean, responsive personal portfolio sites to showcase your work and skills.",
    },
    {
        icon: <FaBriefcase />,
        title: "Business Websites",
        desc: "Professional business landing pages and multi-page sites for brands.",
    },
    {
        icon: <FaCode />,
        title: "Full-Stack Web Apps",
        desc: "End-to-end web applications with custom backends, databases, and APIs.",
    },
];

const steps = [
    { icon: <FaComments />, step: "01", title: "Contact Us", desc: "Reach out via the contact form or email to discuss your project idea." },
    { icon: <FaFileContract />, step: "02", title: "Agreement", desc: "We discuss requirements, pricing, and timelines and finalize the scope." },
    { icon: <FaCreditCard />, step: "03", title: "Payment", desc: "Secure payment is made via Razorpay after mutual agreement." },
    { icon: <FaRocket />, step: "04", title: "Project Kickoff", desc: "Work begins immediately after payment confirmation." },
];

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        setPaymentStatus(null);
        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to create order");
            const data = await res.json();

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "Kabilan K",
                description: "Freelance Web Development Payment",
                order_id: data.orderId,
                handler: function (response) {
                    setPaymentStatus("success");
                    console.log("Payment successful:", response);
                },
                prefill: { name: "", email: "", contact: "" },
                theme: { color: "#38bdf8" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                setPaymentStatus("error");
                console.error("Payment failed:", response.error);
            });
            rzp.open();
        } catch (err) {
            console.error("Payment error:", err);
            setPaymentStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout title="Payments & Services">
            <motion.div {...fadeUp}>

                {/* ── Intro ──────────────────────────────────────────────── */}
                <div className="page-section">
                    <p>
                        We offer freelance web development services through this website, including portfolio
                        websites, business websites, and full-stack web applications. All payments are
                        processed securely via <strong>Razorpay</strong> after a discussion and agreement
                        with the client.
                    </p>
                </div>

                {/* ── Services ───────────────────────────────────────────── */}
                <h2>Services We Offer</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "2.5rem",
                }}>
                    {services.map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "16px",
                                padding: "1.5rem",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div style={{
                                fontSize: "1.6rem",
                                background: "linear-gradient(135deg, var(--accent-color), #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                marginBottom: "0.75rem",
                            }}>
                                {svc.icon}
                            </div>
                            <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem", color: "var(--text-color)" }}>
                                {svc.title}
                            </h3>
                            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--secondary-color)", lineHeight: 1.6 }}>
                                {svc.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Service Process ────────────────────────────────────── */}
                <h2>Service Process</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "2.5rem",
                }}>
                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "16px",
                                padding: "1.5rem",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div style={{
                                position: "absolute",
                                top: "0.75rem",
                                right: "1rem",
                                fontSize: "2.5rem",
                                fontWeight: "800",
                                color: "rgba(255,255,255,0.04)",
                                lineHeight: 1,
                                userSelect: "none",
                            }}>
                                {s.step}
                            </div>
                            <div style={{
                                fontSize: "1.4rem",
                                background: "linear-gradient(135deg, var(--accent-color), #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                marginBottom: "0.75rem",
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem", color: "var(--text-color)" }}>
                                {s.title}
                            </h3>
                            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--secondary-color)", lineHeight: 1.6 }}>
                                {s.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Refund Policy ──────────────────────────────────────── */}
                <h2><FaUndoAlt style={{ marginRight: "0.5rem", fontSize: "1rem" }} />Refund Policy</h2>
                <div className="page-section">
                    <ul>
                        <li>Payments once made are <strong>generally non-refundable</strong>.</li>
                        <li>Refunds may be considered only in cases where the project has <strong>not been started</strong> or due to <strong>mutual agreement</strong>.</li>
                        <li>Any refund requests must be raised <strong>within 3 days of payment</strong>.</li>
                    </ul>
                </div>

                {/* ── Delivery Policy ────────────────────────────────────── */}
                <h2><FaTruck style={{ marginRight: "0.5rem", fontSize: "1rem" }} />Delivery Policy</h2>
                <div className="page-section">
                    <ul>
                        <li>Project delivery timelines <strong>depend on the agreed scope of work</strong>.</li>
                        <li>Typical delivery ranges from <strong>3–15 working days</strong>.</li>
                    </ul>
                </div>

                {/* ── Contact for Payment Issues ─────────────────────────── */}
                <h2><FaEnvelope style={{ marginRight: "0.5rem", fontSize: "1rem" }} />Contact for Payment Issues</h2>
                <div className="page-section">
                    <p>
                        For any payment-related queries, please contact:{" "}
                        <a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a>
                    </p>
                </div>

                {/* ── Payment Card ───────────────────────────────────────── */}
                <h2><FaCreditCard style={{ marginRight: "0.5rem", fontSize: "1rem" }} />Make a Payment</h2>
                <div className="page-section" style={{ textAlign: "center", maxWidth: "460px", margin: "0 auto 2rem" }}>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "rgba(56,189,248,0.08)",
                        border: "1px solid rgba(56,189,248,0.2)",
                        borderRadius: "10px",
                        padding: "0.85rem 1rem",
                        marginBottom: "1.75rem",
                        textAlign: "left",
                        fontSize: "0.88rem",
                        color: "var(--secondary-color)",
                    }}>
                        <FaInfoCircle style={{ color: "var(--accent-color)", flexShrink: 0 }} />
                        Payment is only required after requirements and pricing have been finalized in discussion with the client.
                    </div>

                    {paymentStatus === "success" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                background: "rgba(34,197,94,0.1)",
                                border: "1px solid rgba(34,197,94,0.3)",
                                color: "#22c55e",
                                marginBottom: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                fontSize: "1rem",
                            }}
                        >
                            <FaCheckCircle /> Payment Successful! We'll be in touch shortly.
                        </motion.div>
                    )}

                    {paymentStatus === "error" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                color: "#ef4444",
                                marginBottom: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                fontSize: "1rem",
                            }}
                        >
                            <FaTimesCircle /> Payment Failed. Please try again.
                        </motion.div>
                    )}

                    <button
                        id="pay-now-btn"
                        onClick={handlePayment}
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "1rem",
                            background: loading
                                ? "rgba(255,255,255,0.1)"
                                : "linear-gradient(135deg, var(--accent-color), #a855f7)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.3s ease",
                            fontFamily: "var(--font-main)",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        {loading ? "Processing..." : <><FaLock /> Pay via Razorpay</>}
                    </button>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginTop: "1.25rem",
                        color: "var(--secondary-color)",
                        fontSize: "0.83rem",
                        opacity: 0.7,
                    }}>
                        <FaShieldAlt /> 100% Secure Payment via Razorpay
                    </div>
                </div>

            </motion.div>
        </PageLayout>
    );
};

export default PaymentPage;
