// Vercel Serverless Function for VAPI Chat
// This securely handles VAPI text chat requests

export default async function handler(req, res) {
  // Enable CORS for your domain (adjust in production)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change to your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, previousChatId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get API credentials from environment variables
    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;

    if (!VAPI_API_KEY || !VAPI_ASSISTANT_ID) {
      console.error('Missing VAPI credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Make request to VAPI
    const response = await fetch('https://api.vapi.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`
      },
      body: JSON.stringify({
        assistantId: VAPI_ASSISTANT_ID,
        input: message,
        previousChatId: previousChatId || null
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('VAPI API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'VAPI API error',
        details: errorText
      });
    }

    const data = await response.json();

    // Return the response to the client
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error in VAPI chat endpoint:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
