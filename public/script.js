pdocument.getElementById("submit").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");
  responseDiv.innerHTML = "🔮 Interpretando tu tirada...";

  const res = await fetch("https://TON_BACKEND_RENDER.onrender.com/tarot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();
  responseDiv.innerHTML = `<pre class="whitespace-pre-wrap">${data.answer}</pre>`;
});

