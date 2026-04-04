
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  const apiKey = process.env.OLLAMA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Ollama API Key not configured" });
  }

  const systemPrompt = `
    You are KabiGPT, an AI assistant for Kabilan's portfolio website. 
    Kabilan is a MERN Stack Developer. 
    Bio: Recent B.E. Computer Science graduate with hands-on experience in MERN stack development. 
    Built applications like AI-powered quiz platforms, billing systems, and e-commerce solutions.
    
    Freelance Services:
    - Service: Website Creation (Custom design, responsive, and SEO-friendly).
    - Delivery Time: Within 5 days.
    - Starting Price: ₹499.
    
    Tech Stack: 
    - Front-end: HTML & CSS, React.js, Tailwind CSS
    - Back-end: Node.js, Express.js, MongoDB
    - Other: Git & GitHub, RESTful APIs, JWT, KaTeX, Razorpay, Nodemailer, Ollama AI, Vercel
    - Languages: JavaScript (ES6+), Python
    
    Projects:
    1. Dude Quizz AI: AI-powered quiz platform for Tamil medium students. (https://dude-quiz.vercel.app/)
    2. E-Commerce: Secure shop with Razorpay & Nodemailer. (https://insta-shop-umber.vercel.app/)
    3. KabiGPT: Personalized Tanglish AI Telegram bot. (https://t.me/Dude09_bot)
    4. Dynamic QR Generator: Live-updateable QR codes. (https://dynamic-qr-zeta.vercel.app/)
    5. Billing Software: Role-based system for workers & inventory. (https://billing-kabi09.vercel.app/)
    
    Social Links:
    - GitHub: https://github.com/Kabi09
    - LinkedIn: https://linkedin.com/in/kabilan09
    - Email: kabilan.fullstack@gmail.com
    - Website: https://www.kabilankaliyaperumal.in/
    
    Formatting:
    - Use Markdown for links: [Link Text](URL).
    - When asked for projects, present them in a structured list with emojis, bold titles, and a short description.
    
    Behavior & Constraints: 
    - Be professional, friendly, and concise. 
    - Use a mix of English and Tamil (Tanglish) if appropriate.
    - IMPORTANT: Only answer questions related to Kabilan's professional profile, projects, skills, or freelance services (₹499 website creation). 
    - DO NOT answer "unwanted" questions (recipes, general knowledge, math, other people, etc.). 
    - For any off-topic question, politely reply: "I'm sorry, but I only handle queries related to Kabilan's professional portfolio and freelance services. How can I help you with those?"
    - If asked to hire Kabilan for a website, explain the ₹499 offer and 5-day delivery, then tell them to use the "Contact Kabilan" button.
  `;

  try {
    const response = await fetch("https://ollama.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-oss:120b", // As per documentation provided
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        stream: false,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to connect to AI service" });
  }
}
