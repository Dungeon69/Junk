function isLocalStorageAvailable() {
  try {
    var _0x2c8be2 = "__storage_test__";
    localStorage.setItem(_0x2c8be2, _0x2c8be2);
    localStorage.removeItem(_0x2c8be2);
    return true;
  } catch (_0x2cdda3) {
    return false;
  }
}
function saveVolume(_0x560e48) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem("globalVolume", _0x560e48);
  }
}
function loadVolume() {
  if (isLocalStorageAvailable()) {
    var _0x5079b2 = localStorage.getItem("globalVolume");
    if (_0x5079b2 !== null) {
      return parseFloat(_0x5079b2);
    } else {
      return 1;
    }
  }
  return 1;
}
function saveVideoData(_0x24d93c, _0x468a83) {
  if (isLocalStorageAvailable()) {
    var _0x5b781c = {
      playbackTime: _0x468a83,
    };
    var _0x12f987 = _0x5b781c;
    localStorage.setItem("videoData_" + _0x24d93c, JSON.stringify(_0x12f987));
  }
}
function loadVideoData(_0x48d918) {
  if (isLocalStorageAvailable()) {
    var _0x259be1 = localStorage.getItem("videoData_" + _0x48d918);
    if (_0x259be1) {
      return JSON.parse(_0x259be1);
    } else {
      return null;
    }
  }
  return null;
}
function srt2webvtt(_0x284240) {
  var _0x319284 = _0x284240.replace(/\r+/g, "");
  _0x319284 = _0x319284.replace(/^\s+|\s+$/g, "");
  var _0x7ca395 = _0x319284.split("\n\n");
  var _0x28db0a = "";
  if (_0x7ca395.length > 0) {
    _0x28db0a += "WEBVTT\n\n";
    for (
      var _0x5cbf4d = 0;
      _0x5cbf4d < _0x7ca395.length;
      _0x5cbf4d = _0x5cbf4d + 1
    ) {
      _0x28db0a += convertSrtCue(_0x7ca395[_0x5cbf4d]);
    }
  }
  return _0x28db0a;
}
function convertSrtCue(_0x255d83) {
  var _0x38695c = "";
  var _0x405af8 = _0x255d83.split(/\n/);
  while (_0x405af8.length > 3) {
    for (var _0x4f26fb = 3; _0x4f26fb < _0x405af8.length; _0x4f26fb++) {
      _0x405af8[2] += "\n" + _0x405af8[_0x4f26fb];
    }
    _0x405af8.splice(3, _0x405af8.length - 3);
  }
  var _0x33021d = 0;
  if (
    !_0x405af8[0].match(/\d+:\d+:\d+/) &&
    _0x405af8[1] &&
    _0x405af8[1].match(/\d+:\d+:\d+/)
  ) {
    _0x38695c += _0x405af8[0].match(/\w+/) + "\n";
    _0x33021d += 1;
  }
  if (_0x405af8[_0x33021d].match(/\d+:\d+:\d+/)) {
    var _0x2a7f1b = _0x405af8[1].match(
      /(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/
    );
    if (_0x2a7f1b) {
      _0x38695c +=
        _0x2a7f1b[1] +
        ":" +
        _0x2a7f1b[2] +
        ":" +
        _0x2a7f1b[3] +
        "." +
        _0x2a7f1b[4] +
        " --> " +
        _0x2a7f1b[5] +
        ":" +
        _0x2a7f1b[6] +
        ":" +
        _0x2a7f1b[7] +
        "." +
        _0x2a7f1b[8] +
        "\n";
      _0x33021d += 1;
    } else {
      return "";
    }
  } else {
    return "";
  }
  if (_0x405af8[_0x33021d]) {
    _0x38695c += _0x405af8[_0x33021d] + "\n\n";
  }
  return _0x38695c;
}
function isiOS() {
  return /iP(hone|od|ad)/.test(navigator.userAgent);
}
function addPlaysinlineToVideos() {
  if (isiOS()) {
    var _0x22367d = document.querySelectorAll("video");
    _0x22367d.forEach(function (_0x2dbbaa) {
      _0x2dbbaa.setAttribute("playsinline", "");
    });
  }
}
function moveElToParentEl(_0x18c46f, _0x5a19e3) {
  const _0x4188b4 = document.querySelector("." + _0x18c46f);
  const _0xb83009 = document.getElementById(_0x5a19e3);
  _0xb83009.appendChild(_0x4188b4);
}
function hexToBinary(_0x49b42e) {
  let _0x128bf7 = "";
  for (let _0x30b4eb = 0; _0x30b4eb < _0x49b42e.length; _0x30b4eb += 2) {
    _0x128bf7 += String.fromCharCode(
      parseInt(_0x49b42e.substr(_0x30b4eb, 2), 16)
    );
  }
  return _0x128bf7;
}
function xorDecrypt(_0x19166e, _0x582beb) {
  let _0x482661 = "";
  for (let _0x10788 = 0; _0x10788 < _0x19166e.length; _0x10788++) {
    _0x482661 += String.fromCharCode(
      _0x19166e.charCodeAt(_0x10788) ^
        _0x582beb.charCodeAt(_0x10788 % _0x582beb.length)
    );
  }
  return _0x482661;
}
function decryptHexWithKey(_0x182980, _0x430bdb) {
  const _0x542a4a = hexToBinary(_0x182980);
  const _0xeb89c1 = _0x430bdb;
  return xorDecrypt(_0x542a4a, _0xeb89c1);
}
function formatPlaybackTime(_0x2339db) {
  if (typeof _0x2339db !== "number" || _0x2339db < 0) {
    return "00:00";
  }
  var _0x402417 = Math.floor(_0x2339db / 3600);
  var _0x10041a = Math.floor((_0x2339db % 3600) / 60);
  var _0x3cb887 = Math.floor(_0x2339db % 60);
  var _0x5a1564 = _0x402417 > 0 ? String(_0x402417).padStart(2, "0") + ":" : "";
  var _0x23cc24 = String(_0x10041a).padStart(2, "0");
  var _0x32100b = String(_0x3cb887).padStart(2, "0");
  return _0x5a1564 + _0x23cc24 + ":" + _0x32100b;
}
function hideCursor() {
  xPlayer.addClass("vjs-hide-crsr");
}
function showCursor() {
  skipButtonsAvailable = true;
  xPlayer.removeClass("vjs-hide-crsr");
  clearTimeout(hideCursorTimeout);
  hideCursorTimeout = setTimeout(hideCursor, 2000);
}
var startSkipButton = document.getElementById("startSkipButton");
var endSkipButton = document.getElementById("endSkipButton");
function handleSkipButtons(_0x207c65) {
  var _0x19c94a = xPlayer.currentTime();
  var _0x4e3819 = xPlayer.duration();
  if (
    _0x207c65 &&
    typeof _0x207c65 === "object" &&
    _0x207c65.skips &&
    Array.isArray(_0x207c65.skips) &&
    skipButtonsAvailable
  ) {
    _0x207c65.skips.forEach(function (_0x34d7d4) {
      if (_0x34d7d4.skip_position === "start") {
        if (
          _0x19c94a >= 1 &&
          _0x19c94a <= _0x34d7d4.time &&
          !$(startSkipButton).is(":visible")
        ) {
          $(startSkipButton).show(200);
        } else if (
          _0x19c94a > _0x34d7d4.time &&
          $(startSkipButton).is(":visible")
        ) {
          $(startSkipButton).hide(200);
        }
      } else if (_0x34d7d4.skip_position === "end") {
      }
    });
  } else {
    $(startSkipButton).hide();
    $(endSkipButton).hide();
  }
}
function handleSkipButtonClick(_0x4fdfce) {
  if (_0x4fdfce == "start") {
    if (
      skipButtonsData &&
      typeof skipButtonsData === "object" &&
      skipButtonsData.skips &&
      Array.isArray(skipButtonsData.skips) &&
      skipButtonsAvailable
    ) {
      skipButtonsData.skips.forEach(function (_0x281821) {
        if (_0x281821.skip_position === "start") {
          xPlayer.currentTime(_0x281821.time);
          skipButtonsAvailable = false;
          $(startSkipButton).hide(100);
        }
      });
    }
  } else if (_0x4fdfce == "end") {
    $(endSkipButton).html("Button coming in the next update :)");
  }
}
startSkipButton.addEventListener("click", function () {
  handleSkipButtonClick("start");
});
endSkipButton.addEventListener("click", function () {
  handleSkipButtonClick("end");
});
var skipButtonsAvailable = false;
var skipButtonsData = null;
var initialSubsLoaded = false;
var hideCursorTimeout;
var xPlayer = null;
var sub_shown_lang = null;
const MenuItem = videojs.getComponent("MenuItem");
class MyMenuItem extends MenuItem {
  constructor(_0x13f12a, _0x593be7) {
    super(_0x13f12a, _0x593be7);
    this.controlText("Uploads Subs");
    this.addClass("vjs-captions-menu-item");
    this.addClass("vjs-captions-upload");
  }
}
videojs.registerComponent("MyMenuItem", MyMenuItem);
$(function () {
  $.ajax({
    method: "GET",
    url: "https://turbovid.eu/api/cucked/juice_key",
    dataType: "json",
    beforeSend: function () {
      $("#data-info").text("Fetching response...");
    },
    success: function (_0x39f7c0) {
      if (_0x39f7c0.success == true) {
        const _0x22492a = _0x39f7c0.juice;
        const _0x5ab0db = _0x39f7c0.juicePost;
        $.ajax({
          method: "GET",
          url:
            "https://turbovid.eu/api/cucked/the_juice/?" + apkey + "=" + xxid,
          dataType: "json",
          beforeSend: function () {
            $("#data-info").text("Fetching response...");
          },
          success: function (_0x14c1e4) {
            if (_0x14c1e4.success == true) {
              const _0x3be79c = decryptHexWithKey(_0x14c1e4.data, _0x22492a);
              $("#video-container").html(
                _0x14c1e4.juice.replace("{DATA-SRC}", _0x3be79c)
              );
              const _0x3a7164 = decryptHexWithKey(posterPath, _0x5ab0db);
              const _0x27ef16 = xxid;
              var _0x154df6 = loadVideoData(_0x27ef16);
              var _0xca9417 = {
                nativeControlsForTouch: false,
                controlBar: {},
                plugins: {
                  hotkeys: {
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false,
                  },
                },
              };
              const _0x5a16fc = videojs("main-video", _0xca9417);
              xPlayer = _0x5a16fc;
              var _0x53f50f = _0x5a16fc
                .getChild("ControlBar")
                .addChild("button", {
                  controlText: "Subtitles",
                  clickHandler: function (_0x459846) {
                    toggleSubsMenu();
                  },
                });
              _0x53f50f.addClass("vjs-subs-caps-button");
              _0x53f50f.addClass("vjs-menu-button");
              _0x53f50f.addClass("vjs-custom-control-btn");
              $(".vjs-custom-control-btn").css("width", "4em !important");
              $(".vjs-custom-control-btn").css("height", "100% !important");
              const _0x322a90 = $(".vjs-custom-control-btn");
              _0x322a90.prev().before(_0x322a90);
              if (media_type != "tv") {
                _0x5a16fc.poster(_0x3a7164);
              }
              _0x5a16fc.on("loadedmetadata", () => {
                _0x5a16fc.one("play", () => {
                  Array.from(_0x5a16fc.textTracks())
                    .filter(
                      ({ kind: _0xcd8647 }) =>
                        !["chapters", "metadata"].includes(_0xcd8647)
                    )
                    .forEach((_0x2c8342) => (_0x2c8342.mode = "disabled"));
                });
              });
              _0x5a16fc.on("volumechange", function () {
                saveVolume(_0x5a16fc.volume());
              });
              _0x5a16fc.on("play", function () {
                $("#main-video_html5_api").toggleClass("animated-pause", false);
                $(".data-overlay").hide(240);
                skipButtonsAvailable = true;
                hideCursorTimeout = setTimeout(hideCursor, 2000);
                if (!initialSubsLoaded) {
                  setTimeout(function () {
                    showOpsLangs();
                    loadDefaultLang();
                    initialSubsLoaded = true;
                  }, 500);
                }
              });
              _0x5a16fc.on("pause", function () {
                $("#main-video_html5_api").toggleClass("animated-pause", true);
                $(".data-overlay").show(240);
                skipButtonsAvailable = true;
                clearTimeout(hideCursorTimeout);
                showCursor();
              });
              _0x5a16fc.on("mousemove", showCursor);
              _0x5a16fc.on("ended", function () {
                skipButtonsAvailable = false;
                clearTimeout(hideCursorTimeout);
                showCursor();
              });
              const _0x32264a =
                "https://justaproxy.xyz/dataApi.php?" +
                dakey +
                "=" +
                xyid +
                "&type=" +
                media_type +
                "&apiVer=2";
              var _0x157571 = "";
              var _0x555ecd = "";
              var _0x451261 = 0;
              var _0x3393a7 = 0;
              var _0x5a6b2e = 0;
              var _0x3a5ea4 = "";
              var _0x2173a3 = "";
              var _0x4c0008 = "";
              var _0x305ef1 = 0;
              var _0x4c85a9 = "";
              fetch(_0x32264a)
                .then((_0x2dc9cf) => _0x2dc9cf.json())
                .then((_0x3513c3) => {
                  if (media_type == "tv") {
                    _0x157571 = decryptHexWithKey(
                      _0x3513c3.episode_imdb,
                      _0x22492a
                    );
                    _0x555ecd = decryptHexWithKey(
                      _0x3513c3.episode_name,
                      _0x22492a
                    );
                    _0x451261 = _0x3513c3.episode_number;
                    _0x3393a7 = _0x3513c3.season_number;
                    _0x5a6b2e = decryptHexWithKey(
                      _0x3513c3.series_tmdb,
                      _0x22492a
                    );
                    _0x3a5ea4 = decryptHexWithKey(
                      _0x3513c3.series_imdb,
                      _0x22492a
                    );
                    _0x2173a3 = decryptHexWithKey(
                      _0x3513c3.series_title,
                      _0x22492a
                    );
                    skipButtonsData = JSON.parse(
                      decryptHexWithKey(_0x3513c3.skip_data, _0x22492a)
                    );
                    $("body").data("i", _0x3a5ea4);
                    $("body").data("s", _0x3393a7);
                    $("body").data("e", _0x451261);
                    _0x5a16fc.poster(
                      "https://api.turbovid.eu/api/tv/" +
                        _0x5a6b2e +
                        "/backdrop"
                    );
                    $("#player-title-js").html(_0x2173a3 + " - " + _0x555ecd);
                    $("#player-desc-js").html(
                      "Season: " + _0x3393a7 + " Episode: " + _0x451261
                    );
                  } else if (media_type == "movie") {
                    _0x4c0008 = decryptHexWithKey(_0x3513c3.title, _0x22492a);
                    _0x305ef1 = decryptHexWithKey(_0x3513c3.tmdb, _0x22492a);
                    _0x4c85a9 = decryptHexWithKey(_0x3513c3.imdb, _0x22492a);
                    $("body").data("i", _0x4c85a9);
                    $("#player-title-js").html(_0x4c0008);
                    $("#player-desc-js").hide();
                  }
                });
              _0x5a16fc.on("timeupdate", function () {
                saveVideoData(_0x27ef16, _0x5a16fc.currentTime());
                if (media_type == "tv") {
                  handleSkipButtons(skipButtonsData);
                }
              });
              if (_0x154df6) {
                try {
                  var _0x46ed50 = _0x154df6;
                  if (
                    typeof _0x46ed50.playbackTime === "number" &&
                    _0x46ed50.playbackTime > 5
                  ) {
                    $("#continue_btn_scr").html(
                      "Continue from " +
                        formatPlaybackTime(_0x46ed50.playbackTime)
                    );
                    $("#continue_btn_scr").on("click", function () {
                      _0x5a16fc.currentTime(_0x46ed50.playbackTime);
                      _0x5a16fc.play();
                      $(".continue_from").hide();
                    });
                    $("#startnew_btn_scr").on("click", function () {
                      _0x5a16fc.currentTime(0);
                      _0x5a16fc.play();
                      $(".continue_from").hide();
                    });
                    $(".continue_from").show();
                  } else {
                    console.warn(
                      "Invalid playback time found in localStorage."
                    );
                  }
                } catch (_0x32d3f1) {
                  console.error(
                    "Failed to parse video data from localStorage:",
                    _0x32d3f1
                  );
                }
              }
              _0x5a16fc.on("loadeddata", () => {
                addPlaysinlineToVideos();
                moveElToParentEl("subtitles", "main-video");
                moveElToParentEl("subtitles_settings", "main-video");
                moveElToParentEl("data-overlay", "main-video");
                moveElToParentEl("continue_from", "main-video");
                moveElToParentEl("skip1", "main-video");
                moveElToParentEl("skip2", "main-video");
                $(".data-overlay").show();
                if (_0x154df6) {
                  var _0x3ee4bf = loadVolume();
                  _0x5a16fc.volume(_0x3ee4bf);
                }
              });
            } else {
              $("#data-info").text("This video is currently unavailable🥹");
            }
          },
        });
      } else {
        $("#data-info").text("This video is currently unavailable🥹");
      }
    },
  });
});
