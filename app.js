/**
 * Service Workers Push API hands-on
 */

$(function () {
  if (location.protocol !== "https:") {
    location.protocol = "https:";
    return;
  }

  navigator.serviceWorker.register("worker.js")
  .then(function (reg) {
    if (window.Notification.permission === "denied") {
      throw new Error("The user has blocked notification");
    }

    return reg.pushManager.getSubscription();
  }).then(function (sub) {
    if (! sub) {
      // enable subscription button
      $("#btn").prop("disabled", false);
      return console.log("Unsubscribed.");
    }

    console.log("subscription:", sub.subscriptionId);
  }).catch(function (err) {
    console.error("register:", err);
    alert("Failed.");
  });

  $("#btn").click(function () {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager.subscribe().then(function (sub) {
        // disable subscription button
        $("#btn").prop("disabled", true);

        console.log("subscribe:", sub.subscriptionId);
      }).catch(function (err) {
        console.error("subscribe:", err);
        alert("Failed.");
      });
    });
  });
});
