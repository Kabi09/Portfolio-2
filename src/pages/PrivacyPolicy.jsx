import { useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout title="Privacy Policy">
            <p className="last-updated">Last updated: March 6, 2026</p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="page-section">
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how Kabilan K
                        ("we", "us", or "our") collects, uses, and protects your information when you
                        visit our portfolio website.
                    </p>
                </div>

                <h2>Information We Collect</h2>
                <div className="page-section">
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, and phone number when you voluntarily submit them through our contact form.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers collected automatically.</li>
                    </ul>
                </div>

                <h2>How We Use Your Information</h2>
                <div className="page-section">
                    <p>The information we collect is used for:</p>
                    <ul>
                        <li>Responding to your inquiries and messages submitted through the contact form.</li>
                        <li>Improving our website's content and user experience.</li>
                        <li>Analyzing website traffic and usage patterns.</li>
                        <li>Communicating about potential project opportunities or collaborations.</li>
                    </ul>
                </div>

                <h2>Cookies & Tracking</h2>
                <div className="page-section">
                    <p>
                        Our website may use cookies and similar tracking technologies to enhance your
                        browsing experience. You can control cookie preferences through your browser settings.
                        We may also use third-party analytics services (such as Google Analytics) that collect
                        anonymous usage data.
                    </p>
                </div>

                <h2>Data Sharing & Third Parties</h2>
                <div className="page-section">
                    <p>
                        We do not sell, trade, or rent your personal information to third parties. We may
                        share information only in the following circumstances:
                    </p>
                    <ul>
                        <li>With service providers who assist in operating our website (e.g., hosting, email services).</li>
                        <li>When required by law or to protect our legal rights.</li>
                        <li>With your explicit consent.</li>
                    </ul>
                </div>

                <h2>Data Security</h2>
                <div className="page-section">
                    <p>
                        We implement reasonable security measures to protect your personal information
                        from unauthorized access, alteration, or destruction. However, no method of
                        transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                <h2>Your Rights</h2>
                <div className="page-section">
                    <p>You have the right to:</p>
                    <ul>
                        <li>Request access to the personal data we hold about you.</li>
                        <li>Request correction or deletion of your personal data.</li>
                        <li>Opt out of any marketing communications.</li>
                        <li>Withdraw consent at any time where processing is based on consent.</li>
                    </ul>
                </div>

                <h2>Contact Us</h2>
                <div className="page-section">
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a>.
                    </p>
                </div>
            </motion.div>
        </PageLayout>
    );
};

export default PrivacyPolicy;
