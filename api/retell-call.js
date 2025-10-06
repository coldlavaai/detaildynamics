// Vercel Serverless Function for Retell Voice Call
// This securely handles Retell AI voice call creation

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
    const { metadata } = req.body;

    // Get API credentials from environment variables
    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID;

    if (!RETELL_API_KEY || !RETELL_AGENT_ID) {
      console.error('Missing Retell credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Make request to Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: RETELL_AGENT_ID,
        metadata: metadata || {
          user_name: 'Cold Lava User',
          session_id: Date.now().toString()
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Retell API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'Retell API error',
        details: errorText
      });
    }

    const data = await response.json();

    // Return the access token and call ID to the client
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error in Retell call endpoint:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
