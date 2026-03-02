const show = document.querySelector("#openform");
const info = document.querySelector("#list");

show.addEventListener("click", function () {
    info.classList.toggle("hidden");

    if (info.classList.contains("hidden")) {
        show.textContent = "Katso kesän 2026 esiintyjät";
    } else {
        show.textContent = "Piilota kesän 2026 esiintyjät";
    }
});
