// ===== NAPIT =====
const pieniBtn = document.querySelector("#pieni");
const isoBtn = document.querySelector("#iso");
const teltatBtn = document.querySelector("#teltat");
const asuntoautoBtn = document.querySelector("#asuntoauto");
const hotelliBtn = document.querySelector("#hotelli");
const globalMessage = document.querySelector("#global-message");

// ===== LOMAKKEET =====
const PIENI = document.querySelector("#PIENI");
const ISO = document.querySelector("#ISO");
const TELTAT = document.querySelector("#TELTAT");
const ASUNTOAUTO = document.querySelector("#ASUNTOAUTO");
const HOTELLI = document.querySelector("#HOTELLI");

// ===== NÄYTÄ / PIILOTA LOMAKE =====
function toggleForm(form) {
  form.classList.toggle("hidden");
}

pieniBtn.addEventListener("click", () => toggleForm(PIENI));
isoBtn.addEventListener("click", () => toggleForm(ISO));
teltatBtn.addEventListener("click", () => toggleForm(TELTAT));
asuntoautoBtn.addEventListener("click", () => toggleForm(ASUNTOAUTO));
hotelliBtn.addEventListener("click", () => toggleForm(HOTELLI));

// ===== LOMAKKEEN KÄSITTELY =====
function handleForm(form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Submit painettu");

    // ===== HAE TIEDOT =====
    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();
    const arrival = form.querySelector("input[name='arrival']").value;
    const departure = form.querySelector("input[name='departure']").value;

    let errors = [];

    // ===== VALIDOINNIT =====
    if (!name || name.length < 2) {
      errors.push("Nimi on liian lyhyt.");
    }

    if (!email.includes("@")) {
      errors.push("Sähköpostiosoite ei ole kelvollinen.");
    }

    if (!phone || phone.length < 5) {
      errors.push("Puhelinnumero on liian lyhyt.");
    }

    if (!arrival || !departure) {
      errors.push("Valitse saapumis- ja lähtöpäivä.");
    }

    const totalNights =
      (new Date(departure) - new Date(arrival)) / (1000 * 3600 * 24);

    if (totalNights <= 0) {
      errors.push("Lähtöpäivän täytyy olla saapumisen jälkeen.");
    }

    // ===== POISTA VANHA VIESTI =====
    const oldMessage = form.querySelector(".form-message");
    if (oldMessage) oldMessage.remove();

    const message = document.createElement("div");
    message.classList.add("form-message");

    if (errors.length > 0) {
      message.innerHTML = errors.join("<br>");
      message.classList.add("error");
      form.appendChild(message);
      return;
    }

    // ===== HINNAN LASKENTA =====
    let totalPrice = 0;

    switch (form.id) {
      case "PIENI":
        totalPrice = totalNights * 70;
        break;
      case "ISO":
        totalPrice = totalNights * 100;
        break;
      case "TELTAT":
        const guestsInput = form.querySelector("#guests-tent");
        const guests = parseInt(guestsInput.value, 10);
        if (isNaN(guests) || guests < 1 || guests > 20) {
          message.textContent = "Yöpyjien määrä pitää olla välillä 1–20.";
          message.classList.add("error");
          form.appendChild(message);
          return;
        }
        totalPrice = totalNights * 5 + guests * 10;
        break;
      case "ASUNTOAUTO":
        totalPrice = totalNights * 20;
        break;
      case "HOTELLI":
        const roomType = form.querySelector(
          "input[name='room-type']:checked"
        );
        if (!roomType) {
          message.textContent = "Valitse huonetyyppi.";
          message.classList.add("error");
          form.appendChild(message);
          return;
        }
        totalPrice =
          totalNights * (roomType.value === "2" ? 90 : 130);
        break;
      default:
        break;
    }

    // ===== ONNISTUMISVIESTI =====
    globalMessage.innerHTML = `Varausvahvistus on lähetetty osoitteeseen ${email}. 
Loppusumma on ${totalPrice} €`;
    globalMessage.className = "form-message success";

    form.reset();
    form.classList.add("hidden");
  });
}

// ===== LIITETÄÄN KAIKKI LOMAKKEET =====
handleForm(PIENI);
handleForm(ISO);
handleForm(TELTAT);
handleForm(ASUNTOAUTO);
handleForm(HOTELLI);
