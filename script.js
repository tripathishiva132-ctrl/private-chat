const firebaseConfig = {
  // यहाँ Firebase से copy किया हुआ पूरा firebaseConfig paste करो
};

// Firebase start
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const PASSWORD = "1234";

// Login
function checkPassword() {
  const enteredPassword =
    document.getElementById("password").value;

  const error = document.getElementById("error");

  if (enteredPassword === PASSWORD) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "block";

    startChat();
  } else {
    error.textContent = "Wrong password";
  }
}

// Send message
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text) return;

  await db.collection("messages").add({
    text: text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}

// Receive messages
function startChat() {
  db.collection("messages")
    .orderBy("createdAt")
    .onSnapshot((snapshot) => {

      const messages = document.getElementById("messages");
      messages.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();

        const message = document.createElement("div");
        message.className = "message sent";
        message.textContent = data.text;

        messages.appendChild(message);
      });

      messages.scrollTop = messages.scrollHeight;
    });
}

// Enter key
document
  .getElementById("messageInput")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

document
  .getElementById("password")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkPassword();
    }
  });
