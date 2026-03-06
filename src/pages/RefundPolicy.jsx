import { useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const RefundPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout title="Refund Policy">
            <p className="last-updated">Last updated: March 6, 2026</p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="page-section">
                    <p>
                        Thank you for choosing to work with Kabilan K. This Refund Policy outlines the
                        terms regarding refunds for freelance services and digital products offered through
                        this website.
                    </p>
                </div>

                <h2>Freelance Services</h2>
                <div className="page-section">
                    <p>
                        For custom development and freelance projects, the following refund guidelines apply:
                    </p>
                    <ul>
                        <li><strong>Before project commencement:</strong> A full refund of any advance payment will be provided if the project has not yet started.</li>
                        <li><strong>During development:</strong> A partial refund may be issued based on the work completed. The refund amount will be calculated proportionally.</li>
                        <li><strong>After delivery:</strong> No refunds will be issued once the final deliverables have been approved and handed over to the client.</li>
                    </ul>
                </div>

                <h2>Digital Products</h2>
                <div className="page-section">
                    <p>
                        For any digital products (templates, themes, tools) sold through this website:
                    </p>
                    <ul>
                        <li>Refund requests must be submitted within <strong>7 days</strong> of purchase.</li>
                        <li>The product must not have been substantially used or deployed in a production environment.</li>
                        <li>Refunds will not be granted if the product functions as described.</li>
                    </ul>
                </div>

                <h2>Refund Process</h2>
                <div className="page-section">
                    <p>To request a refund, please follow these steps:</p>
                    <ul>
                        <li>Send an email to <a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a> with the subject line "Refund Request".</li>
                        <li>Include your order/project details and the reason for the refund request.</li>
                        <li>We will review your request and respond within <strong>3–5 business days</strong>.</li>
                    </ul>
                </div>

                <h2>Refund Timeframe</h2>
                <div className="page-section">
                    <p>
                        Once a refund is approved, the amount will be processed within <strong>7–10 business
                            days</strong>. The refund will be credited back to the original payment method used
                        for the transaction.
                    </p>
                </div>

                <h2>Non-Refundable Items</h2>
                <div className="page-section">
                    <p>The following are not eligible for refunds:</p>
                    <ul>
                        <li>Consultation fees or hourly work already completed.</li>
                        <li>Rush or expedited service charges.</li>
                        <li>Domain registration, hosting, or third-party service fees paid on your behalf.</li>
                        <li>Projects where deliverables have been approved by the client.</li>
                    </ul>
                </div>

                <h2>Cancellation</h2>
                <div className="page-section">
                    <p>
                        Either party may cancel an ongoing project with written notice. In case of
                        cancellation, payment for work completed up to the cancellation date will be due
                        and any excess advance payment will be refunded.
                    </p>
                </div>

                <h2>Contact Us</h2>
                <div className="page-section">
                    <p>
                        For any refund-related queries, please contact us at{" "}
                        <a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a>.
                    </p>
                </div>
            </motion.div>
        </PageLayout>
    );
};

export default RefundPolicy;
