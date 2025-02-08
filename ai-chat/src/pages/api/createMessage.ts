import { NextApiRequest, NextApiResponse } from 'next';

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;
  
  const url = 'http://localhost:11435/api/generate'; // Use local Ollama endpoint

  const body = JSON.stringify({
    model: "deepseek-coder-v2",
    prompt: messages[messages.length - 1].content,
    max_tokens: 200,
    stream: false // 🚀 Add this to get the full response at once
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    const data = await response.json();
    console.log(data);
    
    res.status(200).json({ data }); // Send the full response
  } catch (error) {
    res.status(500).json({ error });
  }
}
