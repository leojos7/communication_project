function loadChats() {
  let chats = loadChatsFromLocalStorage();
  let divBody = document.getElementById("chatBox");
  divBody.innerHTML = "";
  chats.forEach((chat) => {
    let chatDiv = document.createElement("div");
    chatDiv.style.color = "black";
    chatDiv.innerHTML = `<p>${chat.message}</p>`;
    divBody.appendChild(chatDiv);
  });
}

function sendMessage() {
  let input = document.getElementById("messageInput");
  let message = input.value.trim();
  let chatBox = document.getElementById("chatBox");

  if (message) {
    let messageElement = document.createElement("div");
    let currentTime = new Date().toLocaleString();
    let modifiedMessage = `[${currentTime}] ${sessionStorage.getItem(
      "email"
    )} : ${message}`;
    messageElement.textContent = modifiedMessage;
    messageElement.style.color = "black";

    let chats = loadChatsFromLocalStorage();
    let chat = {
      message: modifiedMessage,
    };
    chats.push(chat);
    localStorage.setItem("chats", JSON.stringify(chats));

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
  }
}
