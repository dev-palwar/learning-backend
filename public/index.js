var userName = prompt("Enter your name");

if (!userName) {
  var noName = document.getElementById("noName");
  noName.innerHTML = "Enter your name first";
} else {
  const socket = io();
  console.log(socket.name);
  var form = document.getElementById("form");
  var input = document.getElementById("input");
  var messagesDiv = document.querySelector(".messages");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat-message", input.value, { name: userName });
      input.value = "";
    }
  });

  socket.on("chat message", (msg) => {
    var text = document.createElement("div");
    text.textContent = msg;
    messagesDiv.appendChild(text);
  });
}
