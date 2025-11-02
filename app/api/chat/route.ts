import { generateText } from "ai"

// Knowledge base for the chatbot
const KNOWLEDGE_BASE = `You are an AI onboarding assistant for a company. You have access to the following information:

COMPANY POLICIES:
- Work hours: 9 AM - 5 PM Monday to Friday
- Dress code: Business casual
- Remote work: Available on Tuesdays and Thursdays
- Vacation days: 20 days per year
- Health insurance: Available for all full-time employees

ONBOARDING PROCESS:
1. Welcome meeting with HR (Day 1)
2. IT setup and equipment distribution (Day 1)
3. Office tour and introductions (Day 1)
4. Meet your team (Day 2)
5. Complete training modules (Week 1)
6. Project assignment (Week 2)

EQUIPMENT PROVIDED:
- Laptop (MacBook or Dell)
- Monitor and keyboard
- Headphones
- Phone
- ID badge

BENEFITS:
- Health, dental, and vision insurance
- 401(k) retirement plan with company match
- Life insurance
- Paid time off: 20 vacation days, 10 sick days
- Flexible work arrangements
- Professional development budget: $2,000 per year

FREQUENTLY ASKED QUESTIONS:
Q: How do I access the office WiFi?
A: Use the network "CompanyWiFi" and login with your employee credentials.

Q: Where is the office cafeteria?
A: Located on the 3rd floor. Lunch is subsidized at 50% off menu items.

Q: How do I request time off?
A: Submit requests through the HR portal at least 2 weeks in advance.

Q: What's the parking situation?
A: Free parking is available in the building's parking garage. You'll receive a parking pass on Day 1.

Q: How do I get in touch with IT support?
A: Email: it-support@company.com or call ext. 2500

Always be helpful, friendly, and professional. If you don't know something, suggest they contact HR at hr@company.com.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const conversationHistory = messages
      .map((msg: { role: string; content: string }) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const prompt = `${KNOWLEDGE_BASE}

Conversation history:
${conversationHistory}`

    // Generate response using the AI model
    const response = await generateText(prompt)

    return new Response(JSON.stringify({ response }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error processing chat request:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing your request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
