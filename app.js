
const signup_form = document.querySelector("#signup_form");
const signup_email = document.querySelector("#signup_email");
const signup_password = document.querySelector("#signup_password");
const User_name = document.querySelector("#User_name");



const login_form = document.querySelector("#login_form");
const login_email = document.querySelector("#login_email");
const login_password = document.querySelector("#login_password");
const login_age = document.querySelector("#login_age")


const chk = document.getElementById("chk");
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const loginLabel = document.querySelector(".login label");
const signupLabel = document.querySelector(".signup label");

const User_auth_data = JSON.parse(localStorage.getItem("User_auth_data"));


let User_auth_arr;

User_auth_data == null
  ? (User_auth_arr = [])
  : (User_auth_arr = User_auth_data);


alertify.set("notifier", "position", "top-center");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{5,}$/;
const usernameRegex = /^.{5,}$/;

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let check_method = true;

  
  if (!emailRegex.test(signup_email.value)) {
    alertify.error("Invalid email format");
    return;
  }

  
  if (!passwordRegex.test(signup_password.value)) {
    alertify.error(
      "Password must be at least 5 characters long, with special Character,Captial letter "
    );
    return;
  }

  
  if (!usernameRegex.test(User_name.value)) {
    alertify.error("Username must be at least 5 characters long");
    return;
  }

  

  check_method = User_auth_arr.some(
    (item) => item.email === signup_email.value
  );

  if (!check_method) {
    User_auth_arr.push({
      name: User_name.value,
      email: signup_email.value,
      password: signup_password.value,
      age: login_age.value,
    });
    localStorage.setItem("User_auth_data", JSON.stringify(User_auth_arr));
    alertify.success("Success Sign Up");
    login.style.transform = "translateY(-500px)";
    loginLabel.style.transform = "scale(1)";
    signupLabel.style.transform = "scale(0.6)";

    setTimeout(() => {
      User_name.value = "";
      signup_email.value = "";
      signup_password.value = "";
    }, 900);
  } else {
    alertify.error("Email already taken");
  }
});



login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('work');
  

  if (!emailRegex.test(login_email.value)) {
    alertify.error("Invalid email format");
    return;
  }

  

  let check_method = User_auth_arr.filter(
    (item) => item.email === login_email.value
  );
  if (check_method.length === 0) {
    alertify.error("Email does not exist. Sign up first");
    login.style.transform = "translateY(-180px)";
    loginLabel.style.transform = "scale(0.6)";
    signupLabel.style.transform = "scale(1)";
    login_email.value = "";
    login_password.value = "";
    login_age.value ="";
  } else {
    console.log(check_method[0].password);
    check_method[0].password === login_password.value
      ? (alertify.success("Success login"),
        (login_email.value = ""),
        (login_password.value = ""),
        (window.location = "about.html"))
      : (alertify.error("Incorrect password"), (login_password.value = ""));
  }
});

chk.addEventListener("change", () => {
  if (chk.checked) {
    login.style.transform = "translateY(-500px)";
    loginLabel.style.transform = "scale(1)";
    signupLabel.style.transform = "scale(0.6)";
  } else {
    login.style.transform = "translateY(-180px)";
    loginLabel.style.transform = "scale(0.6)";
    signupLabel.style.transform = "scale(1)";
  }
});