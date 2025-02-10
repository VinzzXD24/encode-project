export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
