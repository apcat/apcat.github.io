/**
 * Web Audio API MIC sample
 *
 * MIC input => Gain => Destination
 *                 ┗==> Splitter -> CH1 => Analyser -> Script (Canvas)
 *                             └-->(CH2 => Analyser -> Script (Canvas))
 */

var mic = {};

(_ => {
  if (location.protocol !== "https:") {
    location.protocol = "https:";
    return;
  }

  var context = new AudioContext();
  var gainNode = context.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(context.destination);

  var scriptNode = context.createScriptProcessor(2048, 1, 1);
  scriptNode.connect(context.destination);

  var micON = _ => {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
      mic.stream = stream;

      // マルチトラック対応
      var audioTracks = stream.getAudioTracks();
      // 擬似的にトラックを増やすテスト
      // audioTracks = [audioTracks[0], audioTracks[0]];
      var splitterNode = context.createChannelSplitter(audioTracks.length);
      gainNode.connect(splitterNode);
      mic.analysers = audioTracks.map((track, index) => {
        var analyserNode = context.createAnalyser();
        analyserNode.smoothingTimeConstant = 0.0;
        analyserNode.fftSize = 1024;
        splitterNode.connect(analyserNode, index, 0);

        if (index === 0) {
          // scriptNode へ繋ぐのは1つだけで良い
          analyserNode.connect(scriptNode);
        }

        return analyserNode;
      });

      var source = context.createMediaStreamSource(stream);
      source.connect(gainNode);
    })
    .catch(err => {
      console.error(`${err.name}: ${err.message}`);
    });
  };

  var micOFF = _ => {
    // 全てのオーディオトラックを停止する
    mic.stream.getAudioTracks().forEach(track => {
      track.stop();
    });
  };

  addEventListener("load", _ => {
    // 描画設定
    var canvas = document.querySelector("#level-meter");
    canvas.width = 60;
    canvas.height = 260;
    var ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, "#000000");
    gradient.addColorStop(0.75, "#ff0000");
    gradient.addColorStop(0.25, "#ffff00");
    gradient.addColorStop(0, "#ffffff");

    var getAverageVolume = array => {
        var values = 0;
        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        return values / length;
    };

    // 音量レベルメーターの描画
    scriptNode.addEventListener("audioprocess", _ => {
      if (! Array.isArray(mic.analysers)) {
        return;
      }

      ctx.clearRect(0, 0, 60, 130);
      ctx.fillStyle = gradient;

      var size = mic.analysers.length;
      mic.analysers.forEach((analyserNode, index) => {
        var data = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(data);
        var average = getAverageVolume(data);
        var barSize = 60 / size;
        ctx.fillRect(index * barSize, 130 - average, barSize - barSize / 6, 130);
      });
    });

    // マイクの ON/OFF UI
    document.querySelector("#mic").addEventListener("click", _ => {
      // toggle
      if (mic.stream && mic.stream.active) {
        micOFF();
      } else {
        micON();
      }
    });

    // マイクボリュームの変更 UI
    document.querySelector("#volume").addEventListener("input", event => {
      var volume = event.target.value / event.target.max;
      gainNode.gain.value = volume;
    });
  });
})();
