const form = document.querySelector("#form")
const firstnameInput = document.querySelector("#firstname")
const lastnameInput = document.querySelector("#lastname")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const dataEmailInput = document.querySelector("[data-input-email]")
const dataPasswordInput = document.querySelector("[data-input-password]")
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;




form.addEventListener("submit", signUp)

function checkValue(value, regex, element, type) {
    if (!regex.test(value)) {
      element.setAttribute(`data-input-${type}`, "error");
      element.innerText = `${type} is invalid`.toUpperCase();
      element.style.display = "block";
    }
    return regex.test(value);
  }
  
  async function signUp(e) {
    e.preventDefault();
  
    const isEmailValid = checkValue(emailInput.value, EMAIL_REGEX, dataEmailInput, "email");
    const isPasswordValid = checkValue(passwordInput.value, PASSWORD_REGEX, dataPasswordInput, "password");
  
    if (isEmailValid && isPasswordValid) {
      try {
        await axios
          .post(`http://localhost:3000/api/auth/signup`, {
            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status == 201) {
              location.replace(
                location.origin + "/pages/login.html"
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
      // fetch(`http://localhost:3000/api/auth/signup`, {
      //     method: "POST",
      //     body: JSON.stringify({
      //         firstname: firstnameInput.value,
      //         lastname : lastnameInput.value,
      //         email: emailInput.value,
      //         password: passwordInput.value,
      //     }),
      //     headers: {
      //         "Content-type": "application/json",
      //     },
      // })
      // .then(res => res.json())
      // .then(data => console.log(data))
    } else {
      $mainMessage.setAttribute("data-main-message", "error");
      $mainMessage.innerText = "You entered something wrong!";
    }
  }

// document.querySelector(".eye-btn").addEventListener("click", (e)=>{
//   if(e.target.closest('.eye-btn').previousElementSibling.type === "password"){
//     e.target.closest(".eye-btn").previousElementSibling.type === "text";
//     e.target.closest(".eye-btn").firstElementChild.className === "fa-solid fa-eye-slash";
//   }else{
//   e.target.closest(".eye-btn").previousElementSibling.type === "password";
//   e.target.closest(".eye-btn").firstElementChild.className === "fa-solid fa-eye";
//   }
// })

const btn = document.querySelector("#btn")
const password = document.querySelector("#password")

btn.addEventListener("click", () => {
  if(password.type == "password") {
    password.type = "text"
  }
  else {
    password.type = "password"
  }
})