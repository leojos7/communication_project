function saveUser() {
  let emailValue = document.getElementById("email").value;
  if (!validateRegistration()) {
    return false;
  } else {
    let users = loadUsersFromLocalStorage();
    if (!users.some((user) => user.email === emailValue)) {
      let user = {
        id: Date.now(),
        username: document.getElementById("username").value,
        email: emailValue,
        password: document.getElementById("password").value,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem("email", user.email);
      console.log("User added:", user);
    } else {
      alert("Email already exist.");
      return false;
    }
  }
  return true;
}

function updateUser(userId) {
  let usernameValue = document.getElementById("username").value;

  if (usernameValue === "") {
    alert("Please enter username");
    return false;
  }
  let users = loadUsersFromLocalStorage();
  let user = findUserbyId(users, userId);

  if (user) {
    let newUser = {
      id: user.id,
      username: usernameValue,
      email: user.email,
      password: user.password,
    };
    Object.assign(user, newUser);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    alert("user not found");
  }
  return true;
}

function deleteUser() {
  let userId = getUserIdFromURL();
  if (userId) {
    let confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      let usersList = loadUsersFromLocalStorage();
      let updatedUsersList = usersList.filter((user) => user.id != userId);
      localStorage.setItem("users", JSON.stringify(updatedUsersList));
    }
    redirect("Userlist.html");
  }
}

function loadUsers() {
  let usersList = loadUsersFromLocalStorage();
  let sessionEmailId = sessionStorage.getItem("email");

  let tableBody = document.getElementById("userTable");
  tableBody.innerHTML = "";

  usersList.forEach((user) => {
    let isCurrentUser = sessionEmailId === `${user.email}`;
    let deleteLink = isCurrentUser
      ? `<a href="javascript:void(0);" style="color:gray; pointer-events:none;">Delete</a>`
      : `<a href="DeleteUser.html?id=${user.id}">Delete</a>`;

    let row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <a href="EditUser.html?id=${user.id}">Edit</a> 
                    ${deleteLink}
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

function loadUserForEditPage() {
  let users = loadUsersFromLocalStorage();
  let userId = getUserIdFromURL();
  let user = findUserbyId(users, userId);
  if (user) {
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
  }
}

function logoutUser() {
  sessionStorage.clear();
}
