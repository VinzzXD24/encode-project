async function sendMessage() {
    const message = document.getElementById("message").value;
    if (!message) {
        alert("Tulis pesan dulu!");
        return;
    }

    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Menunggu respon...";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    const data = await res.json();
    responseBox.innerHTML = data.choices?.[0]?.message?.content || "Terjadi kesalahan.";
}
