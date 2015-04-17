/**
 * Service Worker script
 */

self.addEventListener("push", function (event) {
  console.log("push event");

  var promise = self.fetch("http://api.openweathermap.org/data/2.5/weather?q=Sapporo,JP")
  .then(function (res) {
    var err = new Error(res.status);
    if (res.status !== 200) {
      err.status = res.status;
      throw err;
    }
    return res.text();
  }).then(function (text) {
    var data = JSON.parse(text);

    return self.registration.showNotification("天気情報", {
      body: [
        "都市: " + data.name.split("-")[0],
        "天気: " + data.weather[0].main,
        "気温: " + Math.round(data.main.temp - 273.15) + "℃"
      ].join("\n"),
      icon: "html5.png",
      tag: "earthquake"
    });
  }).catch(function (err) {
    if (err.status === 404) {
      return console.log(err);
    }
    console.error(err);
  });

  event.waitUntil(promise);
});
