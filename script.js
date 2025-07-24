// script.js

// Contact form submission ke liye event listener
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Form reload na ho

  // Form se values lena
  const name = form.querySelector("input[type='text']").value;
  const email = form.querySelector("input[type='email']").value;
  const message = form.querySelector("textarea").value;

  // Dummy action: Console me dikhana
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // Alert user ko
  alert("Thanks " + name + "! Your message has been received. ☕");

  // Form reset kar dena
  form.reset();
});
