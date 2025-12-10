export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: "blocking",
        user: "shopify-user"
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dify request failed" });
  }
}
