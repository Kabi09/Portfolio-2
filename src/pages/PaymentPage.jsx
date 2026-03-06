import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaLock } from "react-icons/fa";
import PageLayout from "../components/PageLayout";

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load Razorpay script
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
            // Create order on server
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
                description: "Payment of ₹10",
                order_id: data.orderId,
                handler: function (response) {
                    setPaymentStatus("success");
                    console.log("Payment successful:", response);
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                theme: {
                    color: "#38bdf8",
                },
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
        <PageLayout title="Payment">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Payment Card */}
                <div className="page-section" style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
                    <div style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "2rem",
                        color: "var(--accent-color)",
                    }}>
                        <FaCreditCard />
                    </div>

                    <h2 style={{ paddingLeft: 0, marginTop: 0, fontSize: "1.3rem", color: "var(--text-color)", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", textAlign: "center" }}>
                        Make a Payment
                    </h2>

                    {/* Amount Display */}
                    <div style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        background: "linear-gradient(135deg, var(--accent-color), #a855f7)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        margin: "1.5rem 0",
                    }}>
                        ₹10.00
                    </div>

                    <p style={{ color: "var(--secondary-color)", marginBottom: "2rem", fontSize: "0.95rem" }}>
                        Secure payment powered by Razorpay
                    </p>

                    {/* Status Messages */}
                    {paymentStatus === "success" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                background: "rgba(34, 197, 94, 0.1)",
                                border: "1px solid rgba(34, 197, 94, 0.3)",
                                color: "#22c55e",
                                marginBottom: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                fontSize: "1rem",
                            }}
                        >
                            <FaCheckCircle /> Payment Successful!
                        </motion.div>
                    )}

                    {paymentStatus === "error" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
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

                    {/* Pay Button */}
                    <button
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
                            if (!loading) e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        {loading ? "Processing..." : <><FaLock /> Pay ₹10.00</>}
                    </button>

                    {/* Security Badge */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginTop: "1.5rem",
                        color: "var(--secondary-color)",
                        fontSize: "0.85rem",
                        opacity: 0.7,
                    }}>
                        <FaShieldAlt /> 100% Secure Payment
                    </div>
                </div>
            </motion.div>
        </PageLayout>
    );
};

export default PaymentPage;
