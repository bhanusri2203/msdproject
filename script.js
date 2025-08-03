document.addEventListener("DOMContentLoaded", () => {
  const signInTab = document.getElementById("signInTab");
  const signUpTab = document.getElementById("signUpTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Switch tabs
  if (signInTab && signUpTab) {
    signInTab.addEventListener("click", () => {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      signInTab.classList.add("active");
      signUpTab.classList.remove("active");
    });

    signUpTab.addEventListener("click", () => {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
      signUpTab.classList.add("active");
      signInTab.classList.remove("active");
    });
  }

  // Handle Sign Up
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const newUsername = document.getElementById("newUsername").value;
      const newPassword = document.getElementById("newPassword").value;

      if (newUsername && newPassword) {
        localStorage.setItem("signupUsername", newUsername);
        localStorage.setItem("signupPassword", newPassword);
        alert("Signup successful! Please sign in now.");
        signInTab.click();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  // Handle Sign In
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const storedUsername = localStorage.getItem("signupUsername");
      const storedPassword = localStorage.getItem("signupPassword");

      if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("username", username);
        window.location.href = "home.html";
      } else {
        alert("Incorrect username or password!");
      }
    });
  }

  // Show username on Home
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    const username = localStorage.getItem("username");
    if (username) {
      welcomeMessage.textContent = `Hi, ${username}!`;
    }
  }

  // Block access if not logged in
  if (!document.location.href.includes("index.html")) {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "index.html";
    }
  }
});

// Logout
function logout() {
  localStorage.removeItem("username");
  alert("You have been logged out!");
  window.location.href = "index.html";
}
