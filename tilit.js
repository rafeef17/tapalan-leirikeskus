const form = document.querySelector("#form");
const show = document.querySelector("#button");

show.addEventListener("click", function () {
  form.classList.toggle("hidden");
});

function handleForm(form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();

    let errors = [];

    if (!name || name.length < 2) {
      errors.push("Nimi on liian lyhyt.");
    }

    if (!email.includes("@")) {
      errors.push("Sähköpostiosoite ei ole kelvollinen.");
    }

    if (!phone || phone.length < 5) {
      errors.push("Puhelinnumero on liian lyhyt.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      alert("Lomake lähetetty onnistuneesti!");
      form.reset();
    }
  });
}

handleForm(form);