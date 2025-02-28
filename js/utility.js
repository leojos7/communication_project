function findEmailById(userId) {
  let users = loadUsersFromLocalStorage();
  let user = findUserbyId(users, userId);
  return user.email;
}

function findUserbyId(userList, userId) {
  return userList.find((user) => user.id == userId);
}

function findDocumentbyId(documentList, documentId) {
  return documentList.find((document) => document.id == documentId);
}

function findUserbyUsername(userList, username) {
  return userList.find((user) => user.username === username);
}

function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function loadUsersFromLocalStorage() {
  let usersListString = localStorage.getItem("users");
  return usersListString ? JSON.parse(usersListString) : [];
}

function loadFilesFromLocalStorage() {
  let uploadsListString = localStorage.getItem("uploads");
  return uploadsListString ? JSON.parse(uploadsListString) : [];
}

function loadChatsFromLocalStorage() {
  let uploadsListString = localStorage.getItem("chats");
  return uploadsListString ? JSON.parse(uploadsListString) : [];
}

function redirect(type) {
  window.location.href = type;
}
