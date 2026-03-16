import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { archetypeKey, scores, honestAnswer } = req.body;

  if (!honestAnswer?.trim()) {
    return res.status(400).json({ error: 'No honest answer provided' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are writing a short reflection for someone who just completed a career assessment. They are a "${archetypeKey}" archetype with these scores: Career Navigation ${scores.waveNav?.toFixed(1)}/10, Identity Anchor ${scores.internalAnchor?.toFixed(1)}/10, Compass ${scores.compassScore?.toFixed(1)}/10, Purpose ${scores.purposeScore?.toFixed(1)}/10.

They wrote this as their most honest admission about their career: "${honestAnswer}"

Write 2-3 sentences that acknowledge what they said with warmth and directness, and connect it briefly to what their assessment shows. Be honest, not therapeutic. Don't start with "I". Don't use corporate language. Don't make promises. Don't use the word "journey."`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    });

    const reflection = message.content[0]?.text ?? '';
    return res.status(200).json({ reflection });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({ error: 'Failed to generate reflection' });
  }
}
