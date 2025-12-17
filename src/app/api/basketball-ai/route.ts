import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * BASKETBALL AI API ROUTE
 * =======================
 * Handles chat messages for the MH5 Basketball AI Assistant
 * Uses Gemini to provide basketball knowledge with Springfield/Hall of Fame context
 */

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '')

const SYSTEM_PROMPT = `You are the MH5 Basketball AI Assistant, an expert on all things basketball.
You're powered by the spirit of Springfield, Massachusetts - the birthplace of basketball where Dr. James Naismith invented the game in 1891.

Your knowledge includes:
- Basketball history, rules, and strategy
- The Basketball Hall of Fame (located in Springfield, MA)
- NBA/WNBA players, teams, and statistics
- Training tips and skill development
- Basketball culture and street ball
- Milan Harrison (MH5) - a rising basketball star from Springfield, MA who:
  - Was a 4x Super 7 selection in Western Mass
  - Played at Prodigy Prep alongside Julian Newman
  - Scored 65 points in his first 2 games at Prodigy Prep
  - Has 500K+ social media followers
  - Hosts basketball tournaments and events
  - Is pursuing professional basketball opportunities

Your personality:
- Enthusiastic about basketball
- Knowledgeable but accessible
- Proud of Springfield's basketball heritage
- Supportive of youth basketball development
- Keep responses concise (2-4 sentences for simple questions)
- Be engaging and use basketball terminology naturally

Always remember: You represent MH5 and Springfield - the birthplace of basketball!`

export async function POST(request: Request) {
  let userMessage = ''

  try {
    const body = await request.json()
    userMessage = body.message || ''

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: "I understand! I'm the MH5 Basketball AI, ready to share basketball knowledge from the birthplace of the game. Let's talk hoops!" }],
        },
      ],
    })

    const result = await chat.sendMessage(userMessage)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Basketball AI Error:', error)

    // Fallback responses for common topics
    const fallbackResponses: Record<string, string> = {
      'hall of fame': "The Naismith Memorial Basketball Hall of Fame is located right here in Springfield, MA! It honors the greatest players, coaches, and contributors to basketball. Springfield is also where Dr. James Naismith invented basketball in 1891.",
      'invented': "Basketball was invented by Dr. James Naismith in Springfield, Massachusetts in December 1891. He created the game using a soccer ball and two peach baskets. That's why Springfield is called the 'Birthplace of Basketball'!",
      'mh5': "Milan Harrison (MH5) is a rising basketball star from Springfield, MA. He was a 4x Super 7 selection, played at Prodigy Prep with Julian Newman, and scored 65 points in his first two games there. He now hosts basketball tournaments and events while pursuing professional opportunities.",
      'training': "For guard training, focus on ball handling drills, shooting form, and court vision. Practice the hesi pull-up, crossovers, and change of pace moves. Consistency is key - even 30 minutes of focused practice daily makes a huge difference!",
    }

    // Check if message matches any fallback
    const lowerMessage = userMessage.toLowerCase()
    for (const [key, fallbackResponse] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(key)) {
        return NextResponse.json({ response: fallbackResponse })
      }
    }

    return NextResponse.json({
      response: "I'm having trouble connecting right now, but I'm still here to talk basketball! Springfield, MA is where it all started in 1891, and the Basketball Hall of Fame carries on that legacy today. What would you like to know about the game?"
    })
  }
}
