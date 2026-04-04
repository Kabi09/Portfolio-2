
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
    
    Tech Stack: 
    - Frontend: HTML, CSS, React.js, Tailwind CSS
    - Backend: Node.js, Express.js, MongoDB
    - Other: Git, GitHub, RESTful API, Postman, JWT, KaTeX, Razorpay, Nodemailer, Ollama AI, Vercel
    - Languages: Python, JavaScript
    
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
    
    Behavior: 
    - Be professional, friendly, and concise. 
    - Use a mix of English and Tamil (Tanglish) if appropriate, as Kabilan's background is Tamil.
    - If asked to send a message to Kabilan, tell them to use the "Send Message" button in the chat or on the contact page.
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
