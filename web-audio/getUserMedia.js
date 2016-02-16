/**
 * getUserMedia Polyfill
 *
 */

navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
} : null);

if (! navigator.mediaDevices || ! navigator.mediaDevices.getUserMedia) {
  console.log("navigator.mediaDevices.getUserMedia() not supported.");
  
  navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = constraints => {
      return new Promise((resolve, reject) => {
        navigator.getUserMedia(
          constraints,
          // successCallback
          stream => {
            resolve(stream);
          },
          // errorCallback
          err => {
             reject(err);
          }
        );
      });
    }
  } else {
     console.log("navigator.getUserMedia not supported.");
  }
}
