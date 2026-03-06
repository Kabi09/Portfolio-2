import { useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout title="Terms & Conditions">
            <p className="last-updated">Last updated: March 6, 2026</p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="page-section">
                    <p>
                        Welcome to the portfolio website of Kabilan K. By accessing and using this website,
                        you agree to comply with and be bound by the following terms and conditions. Please
                        read them carefully before using the site.
                    </p>
                </div>

                <h2>Acceptance of Terms</h2>
                <div className="page-section">
                    <p>
                        By accessing this website, you acknowledge that you have read, understood, and
                        agree to be bound by these Terms & Conditions. If you do not agree with any
                        part of these terms, please do not use this website.
                    </p>
                </div>

                <h2>Intellectual Property</h2>
                <div className="page-section">
                    <p>
                        All content on this website, including but not limited to text, graphics, logos,
                        images, code, and design elements, is the intellectual property of Kabilan K unless
                        otherwise stated. You may not reproduce, distribute, or create derivative works
                        without prior written permission.
                    </p>
                    <ul>
                        <li>Project showcases and descriptions are owned by the respective creators and clients.</li>
                        <li>Open-source project contributions are subject to their respective licenses.</li>
                        <li>Third-party icons and fonts are used under their respective licenses.</li>
                    </ul>
                </div>

                <h2>Use of the Website</h2>
                <div className="page-section">
                    <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
                    <ul>
                        <li>Infringe upon the rights of others or restrict their use of the website.</li>
                        <li>Attempt to gain unauthorized access to any part of the website or its systems.</li>
                        <li>Introduce malicious code, viruses, or other harmful material.</li>
                        <li>Use automated tools to scrape, crawl, or extract content without permission.</li>
                    </ul>
                </div>

                <h2>Services & Freelance Work</h2>
                <div className="page-section">
                    <p>
                        Any freelance or contract work discussed or initiated through this website is subject
                        to separate agreements between the parties involved. The portfolio website serves
                        as a showcase and does not constitute a binding offer for services.
                    </p>
                    <ul>
                        <li>Project timelines, pricing, and deliverables will be agreed upon separately.</li>
                        <li>All work agreements are subject to mutual consent and written confirmation.</li>
                    </ul>
                </div>

                <h2>Limitation of Liability</h2>
                <div className="page-section">
                    <p>
                        This website is provided "as is" without warranties of any kind, either express
                        or implied. Kabilan K shall not be held liable for any damages arising from the
                        use of this website, including but not limited to:
                    </p>
                    <ul>
                        <li>Direct, indirect, incidental, or consequential damages.</li>
                        <li>Loss of data or business interruption.</li>
                        <li>Errors, inaccuracies, or omissions in the content.</li>
                        <li>Unavailability or downtime of the website.</li>
                    </ul>
                </div>

                <h2>External Links</h2>
                <div className="page-section">
                    <p>
                        This website may contain links to external websites. We are not responsible for the
                        content, privacy practices, or availability of those external sites. Accessing linked
                        websites is at your own risk.
                    </p>
                </div>

                <h2>Modifications</h2>
                <div className="page-section">
                    <p>
                        We reserve the right to update or modify these Terms & Conditions at any time
                        without prior notice. Continued use of the website after any changes constitutes
                        your acceptance of the revised terms.
                    </p>
                </div>

                <h2>Governing Law</h2>
                <div className="page-section">
                    <p>
                        These terms shall be governed by and construed in accordance with the laws of India.
                        Any disputes arising under these terms shall be subject to the exclusive jurisdiction
                        of the courts in Tamil Nadu, India.
                    </p>
                </div>

                <h2>Contact Us</h2>
                <div className="page-section">
                    <p>
                        If you have any questions about these Terms & Conditions, please reach out at{" "}
                        <a href="mailto:kabilan.fullstack@gmail.com">kabilan.fullstack@gmail.com</a>.
                    </p>
                </div>
            </motion.div>
        </PageLayout>
    );
};

export default Terms;
