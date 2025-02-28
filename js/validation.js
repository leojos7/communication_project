function validateRegistration() {
  let usernameValue = document.getElementById("username").value;
  let emailValue = document.getElementById("email").value;
  let passwordValue = document.getElementById("password").value;
  let confirmPasswordValue = document.getElementById("confirm_password").value;
  if (usernameValue === "") {
    alert("Please enter username");
    return false;
    } else if (emailValue === "") {
    alert("Please enter email");
    return false;
    } else if (!validateEmail(emailValue)) {
    alert("Please enter a valid email address");
    return false;
    } else if (passwordValue === "") {
    alert("Please enter password");
    return false;
  } else if (confirmPasswordValue === "") {
    alert("Please enter confirm password");
    return false;
  } else if (passwordValue != confirmPasswordValue) {
    alert("confirm password is not matching with password");
    return false;
  }
  return true;
}

function validateEmail(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateLogin() {
  let usernameValue = document.getElementById("username").value;
  let passwordValue = document.getElementById("password").value;
  if (usernameValue === "") {
    alert("Please enter username");
    return false;
  } else if (passwordValue === "") {
    alert("Please enter password");
    return false;
  } else {
    let users = loadUsersFromLocalStorage();
    let user = findUserbyUsername(users, usernameValue);
    if (user) {
      if (user.password != passwordValue) {
        alert("Password is not matching");
        return false;
      }
      sessionStorage.setItem("email", user.email);
    } else {
      alert(
        "User is not found in the system, first register for logging into the system"
      );
      return false;
    }
    return true;
  }
}

function validateUserOnLoad() {
  let userString = sessionStorage.getItem("email");
  if (userString === null) {
    alert("Session is expired, please login again...");
    redirect("Welcome.html");
  }
}

function validateUpdateUser() {
  let usernameValue = document.getElementById("username").value;
  if (usernameValue === "") {
    alert("Please enter username");
    return false;
  }
}
