document.getElementById("submit").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");
  responseDiv.innerHTML = "🔮 Interpretando tu tirada...";

  try {
    const res = await fetch("https://tarot-backend1.onrender.com/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    if (data.answer) {
      responseDiv.innerHTML = `<pre class="whitespace-pre-wrap">${data.answer}</pre>`;
    } else {
      responseDiv.innerHTML = "⚠️ No se pudo generar respuesta. Intenta de nuevo más tarde.";
    }
  } catch (error) {
    console.error("Erreur côté client :", error);
    responseDiv.innerHTML = "🚫 Error al conectar con el servidor.";
  }
});
