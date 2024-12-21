console.log("Hello World");

// Here we are checking if service worker is supported by the browser
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
