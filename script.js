const PASSWORD = "1234";

function checkPassword() {
  const enteredPassword = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (enteredPassword === PASSWORD) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "block";
  } else {
    error.textContent = "Wrong password ❌";
  }
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (text === "") return;

  const message = document.createElement("div");
  message.className = "message sent";
  message.textContent = text;

  document.getElementById("messages").appendChild(message);

  input.value = "";

  const messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("messageInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
