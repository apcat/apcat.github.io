/**
 * Service Worker script
 */

// プッシュ通知を受け取った時の処理
self.addEventListener("push", function (event) {
  console.log("push event");

  // GET request
  var promise = self.fetch("http://api.openweathermap.org/data/2.5/weather?q=Sapporo,JP")
  .then(function (res) {
    var err;
    if (res.status !== 200) {
      err = new Error(res.status);
      err.status = res.status;
      throw err;
    }

    // get response body (json)
    return res.json();
  }).then(function (data) {
    return self.registration.showNotification("天気情報", {
      body: [
        "都市: " + data.name.split("-")[0],
        "天気: " + data.weather[0].main,
        "気温: " + Math.round(data.main.temp - 273.15) + "℃"
      ].join("\n"),
      icon: "html5.png",
      tag: "weather"
    });
  }).catch(function (err) {
    if (err.status === 404) {
      return console.log(err);
    }

    console.error(err);
  });

  // 非同期処理が実行し終わるのを待つ
  event.waitUntil(promise);
});

// 通知がクリックされた時の処理
self.addEventListener("notificationclick", function (event) {
  console.log("notification click event:", event.notification.tag);

  event.notification.close();

  var promise = clients.matchAll({
    type: "window"
  }).then(function (client_list) {
    client_list = client_list.filter(function (client) {
      return client.url === "/" && "focus" in client;
    });

    if (client_list[0]) {
      client_list[0].focus();
    } else {
      clients.openWindow("/");
    }

    console.log(client_list);
  });

  event.waitUntil(promise);
});
