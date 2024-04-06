const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const passIndicator = document.querySelector(".pass-indicator")
const generator = document.querySelector(".generate-btn");
const copyIcon = document.querySelector(".input-box span")
let passwordBox = document.querySelector(".input-box input");
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "`~!#$%^&*()_+-=;:/?><.,[]{}@",
};

const generatorPassword = function () {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exclude-Duplicate" && option.id !== "include-Space"){

        staticPassword += characters[option.id.toLowerCase()];
      } else if (option.id === "include-Space") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true ;
      }
    }
  });
  for (let index = 0; index < passLength; index++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
if(excludeDuplicate){
  !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : index--;
} else{
  randomPassword += randomChar;
}
  }
  passwordBox.value = randomPassword;
};

const updatePassIndicator = function(){
  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = function () {
  //passing slider value as counter text
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
 generatorPassword();
 updatePassIndicator();

};
const copyPassword = function(){
  navigator.clipboard.writeText(passwordBox.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all"
  }, 1500);
}
updateSlider();
lengthSlider.addEventListener("input", updateSlider);
generator.addEventListener("click", generatorPassword);
copyIcon.addEventListener("click", copyPassword);
