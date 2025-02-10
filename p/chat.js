async function sendMessage() {
    const message = document.getElementById("message").value;
    if (!message) {
        alert("Tulis pesan dulu!");
        return;
    }

    const apiKey = "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"; // Ganti dengan API key OpenAI
    const responseBox = document.getElementById("response");

    responseBox.innerHTML = "Menunggu respon...";

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
        }),
    });

    const data = await res.json();
    responseBox.innerHTML = data.choices?.[0]?.message?.content || "Terjadi kesalahan.";
}
