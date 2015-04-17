Service Workers Push API Hands-on
=================================

[発表資料](https://speakerdeck.com/ww24/service-workers-push-api-hands-on)

manifest.json
-------------
`gcm_sender_id` は適切な値に書き換える。

localhost でテストする限りに於いては変更する必要なし。

Windows
-------
`push.cmd` を開き API_KEY と SUBSCRIPTION_ID を適切に入力し、実行する。

Mac or Linux
------------
`push.sh` を開き API_KEY と SUBSCRIPTION_ID を適切に入力し、実行する。

参考資料
------
* [Service Worker の紹介: Service Worker の使い方 - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/service-worker/introduction/)
* [ServiceWorker API - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API)
* [Push Notifications on the Open Web](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web)
* [Is ServiceWorker ready? (ブラウザの対応状況)](https://jakearchibald.github.io/isserviceworkerready/)
* [W3C Working Draft](http://www.w3.org/TR/service-workers/)
* [GCM HTTP Connection Server | Android Developers](https://developer.android.com/google/gcm/http.html)
* [Chrome - Service Worker 開発するときのデバッグ方法 - Qiita](http://qiita.com/tmtysk/items/f77e31d6e9380e1c94a2)
