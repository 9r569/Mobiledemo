const installBtn = document.getElementById("installBtn");
let installEvent = null;

function setMode() {
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = window.navigator.standalone === true;
  const installed = standalone || iosStandalone;
  document.body.classList.toggle("app-mode", installed);
  document.body.classList.toggle("website-mode", !installed);
}
setMode();
const modeQuery = window.matchMedia("(display-mode: standalone)");
if (modeQuery.addEventListener) modeQuery.addEventListener("change", setMode);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installEvent = event;
  installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  installBtn.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
