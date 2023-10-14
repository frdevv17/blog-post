const $form = document.querySelector("#form");
const $emailInput = $form.querySelector("#email");
const $passwordInput = $form.querySelector("#password");
const $emailMessage = $form.querySelector("[data-message-email]");
const $passwordMessage = $form.querySelector("[data-message-password]");
const $mainMessage = $form.querySelector("[data-main-message]");
const $btn = $form.querySelector("button");
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

$form.addEventListener("submit", createNewUser);

function checkValue(value, regex, element, type) {
  if (!regex.test(value)) {
    element.setAttribute(`data-message-${type}`, "error");
    element.innerText = `${type} is invalid`.toUpperCase();
    element.style.display = "block";
  }
  return regex.test(value);
}

async function createNewUser(e) {
  e.preventDefault();
  const isEmailValid = checkValue(
    $emailInput.value,
    EMAIL_REGEX,
    $emailMessage,
    "email"
  );
  const isPasswordValid = checkValue(
    $passwordInput.value,
    PASSWORD_REGEX,
    $passwordMessage,
    "password"
  );

  if (isEmailValid && isPasswordValid) {
    try {
      $btn.setAttribute("disabled", true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: $emailInput.value,
          password: $passwordInput.value,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        $btn.removeAttribute("disabled");
        localStorage.setItem("user-token", response.data.token);
        location.replace(
          location.origin +
            "/pages/dashboard.html?page=create"
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    $mainMessage.setAttribute("data-main-message", "error");
    $mainMessage.innerText = "You entered something wrong!";
  }
}

const btn = document.querySelector("#btn");
const password = document.querySelector("#password");

btn.addEventListener("click", () => {
  if (password.type == "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});