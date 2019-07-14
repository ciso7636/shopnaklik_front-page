  
  // DOM elements
  const guideList = document.querySelector('.guides');
  const loggedOutLinks = document.querySelectorAll('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');

  const setupUI = (user) => {
    if (user) {
      // toggle user UI elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
      // toggle user elements
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  };


class Auth {
  static onAuthStateChanged() {
    // listen for auth status changes
    auth.onAuthStateChanged(user => {
      if (user) {
        setupUI(user);
      } else {
        setupUI();
      }
    });
  }

  // signup
  static signUp() {
    const signupForm = document.querySelector("#signup-form");
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      // get user info
      const email = signupForm["signup-email"].value;
      const password = signupForm["signup-password"].value;

      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // close the signup modal & reset form
        $("#modal-signup").modal("hide");
        signupForm.reset();
      });
    });
  }

  // logout
  static logout() {
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", e => {
      e.preventDefault();
      auth.signOut();
    });
  }

  // login
  static login() {
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      // get user info
      const email = loginForm["login-email"].value;
      const password = loginForm["login-password"].value;

      // log the user in
      auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        $("#modal-login").modal("hide");
        loginForm.reset();
      });
    });
  }
}

export default Auth;
