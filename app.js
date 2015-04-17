/**
 * Service Workers Push API hands-on
 */

$(function () {
  navigator.serviceWorker.register("worker.js")
  .then(function (reg) {
    if (window.Notification.permission === "denied") {
      throw new Error("The user has blocked notification");
    }

    return reg.pushManager.getSubscription();
  }).then(function (sub) {
    if (! sub) {
      $("#btn").prop("disabled", false);
      return console.log("Unsubscribed.");
    }

    console.log("subscription:", sub.subscriptionId);
  }).catch(function (err) {
    console.error("serviceWorker.register:", err);
  });

  $("#btn").click(function () {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager.subscribe().then(function (sub) {
        console.log("subscribe:", sub.subscriptionId);
      }).catch(function (err) {
        console.error("subscribe:", err);
        alert("failed.");
      });
    });
  });
});
