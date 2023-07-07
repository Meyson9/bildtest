/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/buzz/dist/buzz.js":
/*!****************************************!*\
  !*** ./node_modules/buzz/dist/buzz.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; // ----------------------------------------------------------------------------
 // Buzz, a Javascript HTML5 Audio library
 // v1.2.1 - Built 2018-05-10 10:14
 // Licensed under the MIT license.
 // http://buzz.jaysalvat.com/
 // ----------------------------------------------------------------------------
 // Copyright (C) 2010-2018 Jay Salvat
 // http://jaysalvat.com/
 // ----------------------------------------------------------------------------

(function(context, factory) {
    "use strict";
    if ( true && module.exports) {
        module.exports = factory();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function() {
    "use strict";
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var buzz = {
        defaults: {
            autoplay: false,
            crossOrigin: null,
            duration: 5e3,
            formats: [],
            loop: false,
            placeholder: "--",
            preload: "metadata",
            volume: 80,
            webAudioApi: false,
            document: window.document
        },
        types: {
            mp3: "audio/mpeg",
            ogg: "audio/ogg",
            wav: "audio/wav",
            aac: "audio/aac",
            m4a: "audio/x-m4a"
        },
        sounds: [],
        el: document.createElement("audio"),
        getAudioContext: function() {
            if (this.audioCtx === undefined) {
                try {
                    this.audioCtx = AudioContext ? new AudioContext() : null;
                } catch (e) {
                    this.audioCtx = null;
                }
            }
            return this.audioCtx;
        },
        sound: function(src, options) {
            options = options || {};
            var doc = options.document || buzz.defaults.document;
            var pid = 0, events = [], eventsOnce = {}, supported = buzz.isSupported();
            this.load = function() {
                if (!supported) {
                    return this;
                }
                this.sound.load();
                return this;
            };
            this.play = function() {
                if (!supported) {
                    return this;
                }
                this.sound.play().catch(function() {});
                return this;
            };
            this.togglePlay = function() {
                if (!supported) {
                    return this;
                }
                if (this.sound.paused) {
                    this.sound.play().catch(function() {});
                } else {
                    this.sound.pause();
                }
                return this;
            };
            this.pause = function() {
                if (!supported) {
                    return this;
                }
                this.sound.pause();
                return this;
            };
            this.isPaused = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.paused;
            };
            this.stop = function() {
                if (!supported) {
                    return this;
                }
                this.sound.pause();
                this.setTime(0);
                return this;
            };
            this.isEnded = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.ended;
            };
            this.loop = function() {
                if (!supported) {
                    return this;
                }
                this.sound.loop = "loop";
                this.bind("ended.buzzloop", function() {
                    this.currentTime = 0;
                    this.play();
                });
                return this;
            };
            this.unloop = function() {
                if (!supported) {
                    return this;
                }
                this.sound.removeAttribute("loop");
                this.unbind("ended.buzzloop");
                return this;
            };
            this.mute = function() {
                if (!supported) {
                    return this;
                }
                this.sound.muted = true;
                return this;
            };
            this.unmute = function() {
                if (!supported) {
                    return this;
                }
                this.sound.muted = false;
                return this;
            };
            this.toggleMute = function() {
                if (!supported) {
                    return this;
                }
                this.sound.muted = !this.sound.muted;
                return this;
            };
            this.isMuted = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.muted;
            };
            this.setVolume = function(volume) {
                if (!supported) {
                    return this;
                }
                if (volume < 0) {
                    volume = 0;
                }
                if (volume > 100) {
                    volume = 100;
                }
                this.volume = volume;
                this.sound.volume = volume / 100;
                return this;
            };
            this.getVolume = function() {
                if (!supported) {
                    return this;
                }
                return this.volume;
            };
            this.increaseVolume = function(value) {
                return this.setVolume(this.volume + (value || 1));
            };
            this.decreaseVolume = function(value) {
                return this.setVolume(this.volume - (value || 1));
            };
            this.setTime = function(time) {
                if (!supported) {
                    return this;
                }
                var set = true;
                this.whenReady(function() {
                    if (set === true) {
                        set = false;
                        this.sound.currentTime = time;
                    }
                });
                return this;
            };
            this.getTime = function() {
                if (!supported) {
                    return null;
                }
                var time = Math.round(this.sound.currentTime * 100) / 100;
                return isNaN(time) ? buzz.defaults.placeholder : time;
            };
            this.setPercent = function(percent) {
                if (!supported) {
                    return this;
                }
                return this.setTime(buzz.fromPercent(percent, this.sound.duration));
            };
            this.getPercent = function() {
                if (!supported) {
                    return null;
                }
                var percent = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
                return isNaN(percent) ? buzz.defaults.placeholder : percent;
            };
            this.setSpeed = function(duration) {
                if (!supported) {
                    return this;
                }
                this.sound.playbackRate = duration;
                return this;
            };
            this.getSpeed = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.playbackRate;
            };
            this.getDuration = function() {
                if (!supported) {
                    return null;
                }
                var duration = Math.round(this.sound.duration * 100) / 100;
                return isNaN(duration) ? buzz.defaults.placeholder : duration;
            };
            this.getPlayed = function() {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.played);
            };
            this.getBuffered = function() {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.buffered);
            };
            this.getSeekable = function() {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.seekable);
            };
            this.getErrorCode = function() {
                if (supported && this.sound.error) {
                    return this.sound.error.code;
                }
                return 0;
            };
            this.getErrorMessage = function() {
                if (!supported) {
                    return null;
                }
                switch (this.getErrorCode()) {
                  case 1:
                    return "MEDIA_ERR_ABORTED";

                  case 2:
                    return "MEDIA_ERR_NETWORK";

                  case 3:
                    return "MEDIA_ERR_DECODE";

                  case 4:
                    return "MEDIA_ERR_SRC_NOT_SUPPORTED";

                  default:
                    return null;
                }
            };
            this.getStateCode = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.readyState;
            };
            this.getStateMessage = function() {
                if (!supported) {
                    return null;
                }
                switch (this.getStateCode()) {
                  case 0:
                    return "HAVE_NOTHING";

                  case 1:
                    return "HAVE_METADATA";

                  case 2:
                    return "HAVE_CURRENT_DATA";

                  case 3:
                    return "HAVE_FUTURE_DATA";

                  case 4:
                    return "HAVE_ENOUGH_DATA";

                  default:
                    return null;
                }
            };
            this.getNetworkStateCode = function() {
                if (!supported) {
                    return null;
                }
                return this.sound.networkState;
            };
            this.getNetworkStateMessage = function() {
                if (!supported) {
                    return null;
                }
                switch (this.getNetworkStateCode()) {
                  case 0:
                    return "NETWORK_EMPTY";

                  case 1:
                    return "NETWORK_IDLE";

                  case 2:
                    return "NETWORK_LOADING";

                  case 3:
                    return "NETWORK_NO_SOURCE";

                  default:
                    return null;
                }
            };
            this.set = function(key, value) {
                if (!supported) {
                    return this;
                }
                this.sound[key] = value;
                return this;
            };
            this.get = function(key) {
                if (!supported) {
                    return null;
                }
                return key ? this.sound[key] : this.sound;
            };
            this.bind = function(types, func) {
                if (!supported) {
                    return this;
                }
                types = types.split(" ");
                var self = this, efunc = function(e) {
                    func.call(self, e);
                };
                for (var t = 0; t < types.length; t++) {
                    var type = types[t], idx = type;
                    type = idx.split(".")[0];
                    events.push({
                        idx: idx,
                        func: efunc
                    });
                    this.sound.addEventListener(type, efunc, true);
                }
                return this;
            };
            this.unbind = function(types) {
                if (!supported) {
                    return this;
                }
                types = types.split(" ");
                for (var t = 0; t < types.length; t++) {
                    var idx = types[t], type = idx.split(".")[0];
                    for (var i = 0; i < events.length; i++) {
                        var namespace = events[i].idx.split(".");
                        if (events[i].idx === idx || namespace[1] && namespace[1] === idx.replace(".", "")) {
                            this.sound.removeEventListener(type, events[i].func, true);
                            events.splice(i, 1);
                        }
                    }
                }
                return this;
            };
            this.bindOnce = function(type, func) {
                if (!supported) {
                    return this;
                }
                var self = this;
                eventsOnce[pid++] = false;
                this.bind(type + "." + pid, function() {
                    if (!eventsOnce[pid]) {
                        eventsOnce[pid] = true;
                        func.call(self);
                    }
                    self.unbind(type + "." + pid);
                });
                return this;
            };
            this.trigger = function(types, detail) {
                if (!supported) {
                    return this;
                }
                types = types.split(" ");
                for (var t = 0; t < types.length; t++) {
                    var idx = types[t];
                    for (var i = 0; i < events.length; i++) {
                        var eventType = events[i].idx.split(".");
                        if (events[i].idx === idx || eventType[0] && eventType[0] === idx.replace(".", "")) {
                            var evt = doc.createEvent("HTMLEvents");
                            evt.initEvent(eventType[0], false, true);
                            evt.originalEvent = detail;
                            this.sound.dispatchEvent(evt);
                        }
                    }
                }
                return this;
            };
            this.fadeTo = function(to, duration, callback) {
                if (!supported) {
                    return this;
                }
                if (duration instanceof Function) {
                    callback = duration;
                    duration = buzz.defaults.duration;
                } else {
                    duration = duration || buzz.defaults.duration;
                }
                var from = this.volume, delay = duration / Math.abs(from - to), self = this, fadeToTimeout;
                this.play();
                function doFade() {
                    clearTimeout(fadeToTimeout);
                    fadeToTimeout = setTimeout(function() {
                        if (from < to && self.volume < to) {
                            self.setVolume(self.volume += 1);
                            doFade();
                        } else if (from > to && self.volume > to) {
                            self.setVolume(self.volume -= 1);
                            doFade();
                        } else if (callback instanceof Function) {
                            callback.apply(self);
                        }
                    }, delay);
                }
                this.whenReady(function() {
                    doFade();
                });
                return this;
            };
            this.fadeIn = function(duration, callback) {
                if (!supported) {
                    return this;
                }
                return this.setVolume(0).fadeTo(100, duration, callback);
            };
            this.fadeOut = function(duration, callback) {
                if (!supported) {
                    return this;
                }
                return this.fadeTo(0, duration, callback);
            };
            this.fadeWith = function(sound, duration) {
                if (!supported) {
                    return this;
                }
                this.fadeOut(duration, function() {
                    this.stop();
                });
                sound.play().fadeIn(duration);
                return this;
            };
            this.whenReady = function(func) {
                if (!supported) {
                    return null;
                }
                var self = this;
                if (this.sound.readyState === 0) {
                    this.bind("canplay.buzzwhenready", function() {
                        func.call(self);
                    });
                } else {
                    func.call(self);
                }
            };
            this.addSource = function(src) {
                var self = this, source = doc.createElement("source");
                source.src = src;
                if (buzz.types[getExt(src)]) {
                    source.type = buzz.types[getExt(src)];
                }
                this.sound.appendChild(source);
                source.addEventListener("error", function(e) {
                    self.trigger("sourceerror", e);
                });
                return source;
            };
            function timerangeToArray(timeRange) {
                var array = [], length = timeRange.length - 1;
                for (var i = 0; i <= length; i++) {
                    array.push({
                        start: timeRange.start(i),
                        end: timeRange.end(i)
                    });
                }
                return array;
            }
            function getExt(filename) {
                return filename.split(".").pop();
            }
            if (supported && src) {
                for (var i in buzz.defaults) {
                    if (buzz.defaults.hasOwnProperty(i)) {
                        if (options[i] === undefined) {
                            options[i] = buzz.defaults[i];
                        }
                    }
                }
                this.sound = doc.createElement("audio");
                if (options.crossOrigin !== null) {
                    this.sound.crossOrigin = options.crossOrigin;
                }
                if (options.webAudioApi) {
                    var audioCtx = buzz.getAudioContext();
                    if (audioCtx) {
                        this.source = audioCtx.createMediaElementSource(this.sound);
                        this.source.connect(audioCtx.destination);
                    }
                }
                if (src instanceof Array) {
                    for (var j in src) {
                        if (src.hasOwnProperty(j)) {
                            this.addSource(src[j]);
                        }
                    }
                } else if (options.formats.length) {
                    for (var k in options.formats) {
                        if (options.formats.hasOwnProperty(k)) {
                            this.addSource(src + "." + options.formats[k]);
                        }
                    }
                } else {
                    this.addSource(src);
                }
                if (options.loop) {
                    this.loop();
                }
                if (options.autoplay) {
                    this.sound.autoplay = "autoplay";
                }
                if (options.preload === true) {
                    this.sound.preload = "auto";
                } else if (options.preload === false) {
                    this.sound.preload = "none";
                } else {
                    this.sound.preload = options.preload;
                }
                this.setVolume(options.volume);
                buzz.sounds.push(this);
            }
        },
        group: function(sounds) {
            sounds = argsToArray(sounds, arguments);
            this.getSounds = function() {
                return sounds;
            };
            this.add = function(soundArray) {
                soundArray = argsToArray(soundArray, arguments);
                for (var a = 0; a < soundArray.length; a++) {
                    sounds.push(soundArray[a]);
                }
            };
            this.remove = function(soundArray) {
                soundArray = argsToArray(soundArray, arguments);
                for (var a = 0; a < soundArray.length; a++) {
                    for (var i = 0; i < sounds.length; i++) {
                        if (sounds[i] === soundArray[a]) {
                            sounds.splice(i, 1);
                            break;
                        }
                    }
                }
            };
            this.load = function() {
                fn("load");
                return this;
            };
            this.play = function() {
                fn("play");
                return this;
            };
            this.togglePlay = function() {
                fn("togglePlay");
                return this;
            };
            this.pause = function(time) {
                fn("pause", time);
                return this;
            };
            this.stop = function() {
                fn("stop");
                return this;
            };
            this.mute = function() {
                fn("mute");
                return this;
            };
            this.unmute = function() {
                fn("unmute");
                return this;
            };
            this.toggleMute = function() {
                fn("toggleMute");
                return this;
            };
            this.setVolume = function(volume) {
                fn("setVolume", volume);
                return this;
            };
            this.increaseVolume = function(value) {
                fn("increaseVolume", value);
                return this;
            };
            this.decreaseVolume = function(value) {
                fn("decreaseVolume", value);
                return this;
            };
            this.loop = function() {
                fn("loop");
                return this;
            };
            this.unloop = function() {
                fn("unloop");
                return this;
            };
            this.setSpeed = function(speed) {
                fn("setSpeed", speed);
                return this;
            };
            this.setTime = function(time) {
                fn("setTime", time);
                return this;
            };
            this.set = function(key, value) {
                fn("set", key, value);
                return this;
            };
            this.bind = function(type, func) {
                fn("bind", type, func);
                return this;
            };
            this.unbind = function(type) {
                fn("unbind", type);
                return this;
            };
            this.bindOnce = function(type, func) {
                fn("bindOnce", type, func);
                return this;
            };
            this.trigger = function(type) {
                fn("trigger", type);
                return this;
            };
            this.fade = function(from, to, duration, callback) {
                fn("fade", from, to, duration, callback);
                return this;
            };
            this.fadeIn = function(duration, callback) {
                fn("fadeIn", duration, callback);
                return this;
            };
            this.fadeOut = function(duration, callback) {
                fn("fadeOut", duration, callback);
                return this;
            };
            function fn() {
                var args = argsToArray(null, arguments), func = args.shift();
                for (var i = 0; i < sounds.length; i++) {
                    sounds[i][func].apply(sounds[i], args);
                }
            }
            function argsToArray(array, args) {
                return array instanceof Array ? array : Array.prototype.slice.call(args);
            }
        },
        all: function() {
            return new buzz.group(buzz.sounds);
        },
        isSupported: function() {
            return !!buzz.el.canPlayType;
        },
        isOGGSupported: function() {
            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"');
        },
        isWAVSupported: function() {
            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"');
        },
        isMP3Supported: function() {
            return !!buzz.el.canPlayType && buzz.el.canPlayType("audio/mpeg;");
        },
        isAACSupported: function() {
            return !!buzz.el.canPlayType && (buzz.el.canPlayType("audio/x-m4a;") || buzz.el.canPlayType("audio/aac;"));
        },
        toTimer: function(time, withHours) {
            var h, m, s;
            h = Math.floor(time / 3600);
            h = isNaN(h) ? "--" : h >= 10 ? h : "0" + h;
            m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
            m = isNaN(m) ? "--" : m >= 10 ? m : "0" + m;
            s = Math.floor(time % 60);
            s = isNaN(s) ? "--" : s >= 10 ? s : "0" + s;
            return withHours ? h + ":" + m + ":" + s : m + ":" + s;
        },
        fromTimer: function(time) {
            var splits = time.toString().split(":");
            if (splits && splits.length === 3) {
                time = parseInt(splits[0], 10) * 3600 + parseInt(splits[1], 10) * 60 + parseInt(splits[2], 10);
            }
            if (splits && splits.length === 2) {
                time = parseInt(splits[0], 10) * 60 + parseInt(splits[1], 10);
            }
            return time;
        },
        toPercent: function(value, total, decimal) {
            var r = Math.pow(10, decimal || 0);
            return Math.round(value * 100 / total * r) / r;
        },
        fromPercent: function(percent, total, decimal) {
            var r = Math.pow(10, decimal || 0);
            return Math.round(total / 100 * percent * r) / r;
        }
    };
    return buzz;
});

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator, next;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

var functionToString = Function.toString;

module.exports = shared('inspectSource', function (it) {
  return functionToString.call(it);
});


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-url.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/native-url.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/punycode-to-ascii.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/punycode-to-ascii.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.4.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol() == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.url-search-params.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "./node_modules/core-js/internals/native-url.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var hasOwn = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "./node_modules/core-js/modules/web.url.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/web.url.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/native-url */ "./node_modules/core-js/internals/native-url.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");
var arrayFrom = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").codeAt;
var toASCII = __webpack_require__(/*! ../internals/punycode-to-ascii */ "./node_modules/core-js/internals/punycode-to-ascii.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var URLSearchParamsModule = __webpack_require__(/*! ../modules/web.url-search-params */ "./node_modules/core-js/modules/web.url-search-params.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/db/dbArr.json":
/*!******************************!*\
  !*** ./src/js/db/dbArr.json ***!
  \******************************/
/*! exports provided: styles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"styles\":[[[\"Что такое тестирование?\",\" проверка соответствия между реальным и ожидаемым поведением.\",\"assets/voise/0qUs1.mp3\"],[\"В чем заключается цель тестирования?\",\"Повысить вероятность того, что приложение, предназначенное для тестирования, будет работать правильно при любых обстоятельствах. _Повысить вероятность того, что приложение, будет соответствовать всем описанным требованиям. _Предоставление актуальной информации о состоянии продукта на данный момент.\",\"assets/voise/0qUs2.mp3\"],[\"Гарантирует ли тестирование отсутствие багов в продукте?\",\"Тестирование может показать наличие дефектов в программе, но не доказать их отсутствие. _Тем не менее, важно составлять тест-кейсы, которые будут находить как можно больше багов. Таким образом, при должном тестовом покрытии, тестирование позволяет снизить вероятность наличия дефектов в программном обеспечении.\",\"assets/voise/0qUs3.mp3\",\"https://vc.ru/life/124461-principy-testirovaniya-primenenie-iskazheniya-i-illyuzii\"],[\"Расскажите что такое Тест план? И по какой струкутре вы его выстриваете?\",\"это документ, описывающий весь объем работ по тестированию _Отвечает на вопросы: _ •  Что мы тестируем? _• Когда? _ •  Критерии начала / окончания тестирования. _• Окружение(environment) dev/staging/production? _ • Подходы/техники/инструменты/виды тестирования? _• Браузеры/версии/OS/разрешения экрана? _• Кто? Обязанности? Ресурсы? Обучение? _• Сроки? _• График? _• Стратегия тестирования. _•  Ссылки на документацию. \",\"assets/voise/0qUs4.mp3\"],[\"В чем разница между багом и фичей?\",\"Фичей  называют дополнительную, специально придуманную (и, возможно, неочевидную) опцию программы. «багом» можно назвать любой сбой в работе ПО\",\"assets/voise/0qUs5.mp3\"],[\"Как протестировать без ТЗ и спецификации?\",\"Информация разниться в разных источниках!  _Возможно ли тестировать без требований? где-то указывают что нет! Потому что именно они определяют, что должен представлять собой тот или иной продукт, и без них он фактически не может быть создан! _    но а как же Ad-hoc testing который не подразумевает никакой подготовки или планирования, здесь нет тестовых сценариев, как и какого-либо ожидания от результата. _ _Нет нужды разрабатывать и придерживаться какого-либо плана, или вести документацию, нет никаких тест-кейсов (правда, от этого могут возникнуть трудности с тем, чтобы воспроизвести ошибку – никаких планов и документов то нет)_   _Преимущества ad-hoc testing _      • Все работает максимально быстро, нет надобности выполнять подготовку. _      • Основные и самые критичные баги находятся сразу же. _      • Новый тестер с таким подходом сможет легко и быстро освоить основные моменты, гораздо быстрее, чем в случае тест-кейсов.   _ _  Недостатки _ _   • Нет системного подхода, а значит вероятность обнаружения багов ниже, чем при спланированном подходе. _      • Очень сложно воспроизвести условия возникновения бага. _      • Обязательно нужны общие знания о продукте, без них такое тестирование невозможно. _ • Сложно планировать ресурсы для тестирования, ведь непонятно, сколько времени и людей нужно, чтобы провести тесты. _ _Однако в любом случае необходимо понимать, кто будет пользоваться продуктом, как он должен выглядеть, из чего состоять и какими обладать функциями. Несмотря на то что эта информация не содержится в спецификациях, в ней как раз и заключены требования к ПО._ _Их источником служат не составленные по всей форме документы, а знания вашей команды, имеющиеся у заказчика представления, короткие разговоры за обедом, общепринятая практика, нормативно-правовые акты, то есть всё то, что порождает так называемые неявные требования \",\"assets/voise/0qUs6.mp3\"],[\"Вы нашли баг, но разработчик говорит, что это фича. Что будете делать?\",\"Изначально перед отправкой баг-репорта стоит его обогатить скриншотами, логами или видео для избежания ситуации ответов от разраба <у меня все работает!> _В дальнейшем при дискуссии стоит проанализировать данные, на которые опирается разработчик, уточнить об актуальности данной информации и дальше выстроить диалог, основываясь от полученной информации.\",\"assets/voise/0qUs7.mp3\"],[\"Что такое неявные требования?\",\"Информацию о необходимом поведении, внешнем виде и свойствах системы, не внесенную в ТЗ и спецификации, а также не включенную в постановку задач, относят к неявным требованиям. Они могут проистекать из незадокументированных запросов от заказчика, законодательных актов и стандартов, устных договоренностей между членами команды разработчиков и даже их личного профессионального опыта. _ _      В число инструментов, призванных дополнить и структурировать существующую информацию о программном продукте, входит реестр неявных требований. Он представляет собой список всех связанных с системой фактов и ограничений, которые по какой-то причине не собраны в спецификацию.  __    Этот инструмент пригодится не только в тех случаях, когда техническая документация полностью отсутствует, но и в качестве дополнительного источника информации при наличии спецификаций. _     Такой документ создается в три этапа, подразумевающих формирование следующих перечней: _    • Реестр потенциальных источников неявных требований. _    • Реестр источников неявных требований к проекту. _    • Реестр неявных требований.\",\"assets/voise/0qUs8.mp3\",\"https://software-testing.ru/library/around-testing/requirements/3567-requirements\"],[\"Из чего состоит процесс тестирования?\",\" 1) Анализ продукта _ 2) Работа с требованиями _ 3) Разработка тест-плана _ 4) Создание тестовой документации _5) Тестирование прототипа _ 6) Основное тестирование _7) Стабилизация _ 8) Эксплуатация\",\"assets/voise/0qUs9.mp3\"],[\"Что такое Качество ПО\",\"Это совокупность характеристик программного обеспечения, относящихся к его способности удовлетворять установленные и предполагаемые потребности.\",\"assets/voise/0qUs10.mp3\"],[\"На каких этапах разработки ПО может проходить тестирование?\",\"В жизненном цикле ПО процесс тестирования в основном стоит за этапом разработки, перед эксплуатацией продукта пользователями. _ _Но все зависит от модели разработки и подходов к тестрованию, есть подход left shift test (Тестирование со сдвигом влево) — это подход при котором тестирование выполняется на более ранних этапах жизненного цикла.\",\"assets/voise/0qUs11.mp3\"],[\"Что такое тестовое покрытие?\",\"Тестовое покрытие — это плотность покрытия тестами выполняемого ПО или требований к нему. _Чем больше проверок будет создано, тем высшего уровня достигнет тестовое покрытие на любом проекте, стоит еще учитываь о качестве данных проверок. _ _Но, стоит понимать, что до полного покрытия дойти не выйдет, поскольку протестировать все 100% никогда не получится! _Оценка тестового покрытия содержит сразу несколько методологических подходов, а именно: _     • Покрытие требований; _    • Покрытие программного кода; \",\"assets/voise/0qUs12.mp3\",\"https://testmatick.com/ru/ponyatie-testovogo-pokrytiya/\"],[\"Как вы узнаете, было ли создано достаточно тестов для тестирования продукта?\",\"во многих источниках указанно что нужно опираться на несколько показателей _ _ • Все 100% требований учтены. _  • Ожидаемое число дефектов обнаружено. _  •  Все дефекты, относящиеся к классу Show Stopper или Blocker, устранены, ни у одного из критических дефектов нет статуса «открытый». _   • Все дефекты с высоким приоритетом идентифицированы и исправлены. _   • Defect Rate (скорость дефектообразования) ниже установленного допустимого уровня. _  • Очень небольшое число дефектов среднего уровня критичности «открыты», их разбор проведен. _  • Число «открытых» дефектов среднего уровня, которые не влияют на пользование системой, очень небольшое. _   • Все дефекты с высоким уровнем приоритета закрыты и соответствующие регрессивные сценарии успешно проведены. _ _ Самый лучшиий вариант это построить матрицу соответствия требований, можно в виде таблицы или чек листа в котором можно отследить стадию завершения тесирования! __Самые частые критерии это _   _ • Время — В ходе тестирования могут находиться баги с разным приоритетом серьезности, попадаются баги блокеры, которые блокируют дальнейшее прохождение по тест кейсам, время на исправление и перепроверку багов может затянуться. _  _ • Бюджет — очень популярно на биржах фриланса, когда оплачиваются найденные баги в зависимости от количества и серьезности или оплачивается по количеству пройденных тест кейсов, также выделяется бюджет на написание самих тесткейсов. _  _  • Все тест кейсы пройдены, найденные баги исправлены и перепроверены — Для того чтобы протестировать приложение, тестировщик для начала должен ознакомиться с требованиями, функциональными спецификациями к приложению, если они конечно есть, или узнать со слов заказчика какое поведение должно быть при разных сценариях использования приложения или фитчи.\",\"assets/voise/0qUs13.mp3\"],[\"Если нашли незначительную ошибку и рядом сидит разработчик и может ее быстро исправить, будете документировать или напрямую скажете разработчику исправь ее?\",\"Ошибку лучше зафиксировать в баг-трекинговой системе для дальнейшего отслеживания! _ При необхадимости информацию о данной ошибке при исправлении которой может сломаться другой функционал найдут и выстроят правиьную цепочку собыитий\",\"assets/voise/0qUs14.mp3\"],[\"Что такое спецификация ПО?\",\"Спецификация (specifications) — это технический документ, который описывает функции и поведение приложения._ _Помогает получить четкое представление о продукте для его разработки и минимизировать сбои программного обеспечения _Спецификация — это документ с проанализированными требованиями\",\"assets/voise/0qUs15.mp3\",\"https://raznisa.ru/raznica-mezhdu-trebovaniyami-i-specifikaciej-v-razrabotke-programmnogo-obespecheniya/\"],[\"Чем отличается Валидация от Верификации\",\"Верификация (verification)— оценка соответствия продукта требованиям (спецификации). _Отвечает на вопрос: “Система работает в соответствии с требованиями?”__Валидация (validation)— оценка соответствия продукта ожиданиям и требованиям пользователей. _Отвечает на вопрос: “Требования удовлетворяют ожидания пользователя?”\",\"assets/voise/0qUs16.mp3\"],[\"Какие основные Уровни Тестирования вы знаете?\",\"1. Модульное тестирование (Unit Testing) Тестирование объектов, классов, функций и т.д., обычно выполняемое программистами. _ _2. Интеграционное тестирование (Integration Testing)- Тестирование взаимодействия между классами, функциями, модулями. Например интеграция система оплаты проезда в метро с помощью банковской карты._ _3. Системное тестирование (System Testing) - Проверка как функциональных, так и не функциональных требований в системе._ _4. Приемочное тестирование (Acceptance Testing)Проверка соответствия системы требованиям и проводится с целью определения: _ удовлетворяет ли система приемочным критериям; _в итоге приниматеся решения заказчиком или менеджером принимать приложение или нет.\",\"assets/voise/0qUs17.mp3\"],[\"что такое Операционное тестирование\",\"Даже если система удовлетворяет всем требованиям, важно убедиться в том, что она удовлетворяет нуждам пользователя и выполняет свою роль в среде своей эксплуатации, как это было определено в бизнес моделе системы. __Операционное тестирование — это процесс проверки работоспособности системы или приложения в реальных условиях использования. В рамках операционного тестирования осуществляется проверка стабильности, производительности и функциональности программного продукта при условии реального использования его конечными пользователями. Оно выполняется на всех этапах жизненного цикла программного обеспечения и позволяет выявлять ошибки и недочеты, уточнять требования к системе, а также определять ее готовность для выпуска на рынок.\",\"assets/voise/0qUs18.mp3\"],[\"Чем отличается sanity от smoke тестирования?\",\"В отличии от дымового (Smoke testing), санитарное тестирование (Sanity testing) направлено вглубь проверяемой функции, в то время как дымовое направлено вширь, для покрытия тестами как можно большего функционала в кратчайшие сроки.\",\"assets/voise/0qUs19.mp3\"],[\"Как тестировщик может понять, что баг исправлен?\",\"пройти тест кейс повторно, сделать retest\",\"assets/voise/0qUs20.mp3\"],[\"Чем отличается тестирование черного ящика от тестирования белого ящика?\",\"В тестировании черного ящика мы находимся в тех же условиях что и пользователи, не имея документации или любой другой информации как часть команд разработки, в тестировании белого ящика у нас есть доступ ко всем возможным аспектам и ветвя разработки ПО\",\"assets/voise/0qUs21.mp3\"],[\"Что такое тест-дизайн и для чего он нужен?\",\"Это этап процесса тестирования ПО, на котором проектируются и создаются тестовые случаи (тест кейсы), в соответствии с определёнными ранее критериями качества и целями тестирования. __ Роли, ответственные за тест дизайн: __• Тест аналитик — определяет «ЧТО тестировать?»__ • Тест дизайнер — определяет «КАК тестировать?»\",\"assets/voise/0qUs22.mp3\"],[\"Что такое обеспечение качества (QA) и Что такое контроль качества (QC)?!\",\"Обеспечение качества (Quality Assurance, QA) и контроль качества (Quality Control, QC) - это два разных процесса, направленных на обеспечение качества продукта или услуги. __Основное отличие между QA и QC заключается в том, что QA - это процесс предотвращения возможных проблем, ошибок и несоответствий в процессе создания продукта или услуги, а QC - это процесс обнаружения проблем, ошибок и несоответствий в уже готовом продукте или услуге. __QA включает в себя все действия, направленные на обеспечение того, что продукт или услуга соответствует заданным требованиям и ожиданиям клиента. Это может включать планирование, проектирование, тестирование, анализ и управление качеством. Основной целью QA является предотвращение возникновения проблем и ошибок еще до того, как продукт достигнет клиента. __QC, с другой стороны, направлен на обнаружение проблем и ошибок в уже готовом продукте или услуге. Это может быть выполнено путем тестирования продукта или услуги и проверки ее на соответствие спецификациям и стандартам качества. Основной целью QC является обнаружение ошибок и несоответствий в уже готовом продукте или услуге. __ Цель  __  Если в случае Quality Assurance главная цель - это улучшение процессов тестирования во избежание появления дефектов, то с Quality Control все куда проще - именно этот процесс ставит перед собой задачу выявления и устранения недостатков продукта на стадии пост-разработки.  __Основное отличие между QA и QC заключается в том, что QA - это процесс предотвращения возможных проблем, ошибок и несоответствий в процессе создания продукта или услуги, а QC - это процесс обнаружения проблем, ошибок и несоответствий в уже готовом продукте или услуге. \",\"assets/voise/0qUs23.mp3\",\"https://dtf.ru/u/353857-vladyslav-havrylevskyj/709848-qa-i-qc-kak-ih-razlichat#:~:text=%D0%9F%D0%BE%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%BC%20%D0%B8%D1%82%D0%BE%D0%B3%D0%B8&text=Quality%20Assurance%20%2D%20%D1%8D%D1%82%D0%BE%20%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%80%D1%8B,%D0%B8%20%D1%83%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B1%D0%B0%D0%B3%D0%BE%D0%B2%20%D0%B8%20%D0%BD%D0%B5%D0%BF%D0%BE%D0%BB%D0%B0%D0%B4%D0%BE%D0%BA.\"],[\"Что такое модель зрелости тестирования?\",\"TMM основан на модели зрелости возможностей (CMM — Capability Maturity Model). Это подробная модель для улучшения процесса тестирования. Она может быть дополнена любой моделью улучшения процесса или может использоваться как одиночная модель. Модель ТММ имеет два основных компонента: _ _Набор из 5 уровней, которые определяют возможности тестирования (testing capability) Модель оценки (An Assessment Model) Пять уровней TMM помогают организации определить зрелость своего процесса и определить следующие шаги по улучшению, которые необходимы для достижения более высокого уровня зрелости тестирования. _ _Уровень 1. Начальный. ПО должно успешно работать На этом уровне области процессов не определены Цель тестирования — убедиться, что ПО работает нормальноНа этом уровне не хватает ресурсов, инструментов и обученного персонала.Нет проверки качества перед поставкой ПО _ _Уровень 2. Определенный. Разработка целей и политик тестирования и отладки.Этот уровень отличает тестирование от отладки, и они считаются различными действиями Этап тестирования наступает после кодирования Основная цель тестирования — показать, что ПО соответствует спецификации.Основные методы и методики тестирования _ _Уровень 3: Комплексный. Интеграция тестирования в жизненный цикл ПО. Тестирование интегрируется в весь жизненный цикл. На основании требований определяются цели испытаний Структура тестирования существует Тестирование на уровне профессиональной деятельности _ _Уровень 4: Управление и измерение. Создание программы тестовых измерений. Тестирование — это измеренный и количественный процесс Проверка на всех этапах разработки признается как тестирование Для повторного использования и регрессионного тестирования есть Test case и они записаны в базу тестов. Дефекты регистрируются и получают уровни серьезности _ _Уровень 5: Оптимизированный. Оптимизация процесса тестирования.Тестирование управляется и определено Эффективность и стоимость тестирования можно отслеживать Тестирование может постоянно настраиваться и улучшаться Практика контроля качества и предотвращения дефектов Практикуется процесс повторного использования (Reuse) Метрики, связанные с тестированием, также имеют средства поддержки Инструменты обеспечивают поддержку разработки тестовых наборов и сбора дефектов\",\"assets/voise/0qUs24.mp3\",\"https://habr.com/ru/companies/avito/articles/578342/\"],[\"Какие Принципы тестирования вы знаете ?\",\"1. Тестирование демонстрирует наличие дефектов: _ _Тестирование может показать, что дефекты присутствуют, но не может доказать, что их нет _ _2. Исчерпывающее тестирование недостижимо: _Полное тестирование с использованием всех комбинаций вводов и предусловий физически невыполнимо, за исключением тривиальных случаев._ _3. Раннее тестирование: _Чтобы найти дефекты как можно раньше, активности по тестированию должны быть начаты как можно раньше в жизненном цикле разработки. _ _4. Скопление дефектов: _Как правило, большая часть дефектов, обнаруженных при тестировании, содержится в небольшом количестве модулей. _ _5. Парадокс пестицида: _Если одни и те же тесты будут прогоняться много раз, в конечном счете этот набор тестовых сценариев больше не будет находить новых дефектов. _ _6. Тестирование зависит от контекста: _Тестирование выполняется по-разному в зависимости от контекста. _ _7. Заблуждение об отсутствии ошибок: _Обнаружение и исправление дефектов не помогут, если созданная система не подходит пользователю и не удовлетворяет его ожиданиям и потребностям.\",\"assets/voise/0qUs25.mp3\"],[\"Чем отличается тест-кейс от баг-репорта?\",\"Основное различие между тест-кейсом и баг-репортом состоит в том, что тест-кейс представляет собой инструкцию для выполнения задачи, тогда как баг-репорт - это результат выполнения задачи при обнаружении ошибки!__ Основное различие между тест-кейсом и баг репортом заключается в том, что тест-кейс является задачей, а баг репорт - это итог её выполнения, при обнаружении ошибки!\",\"assets/voise/0qUs26.mp3\"],[\"расскажите про градацию Severity (Серьезность)?\",\" • Блокирующая (Blocker) - Блокирующая ошибка, приводящая приложение в нерабочее состояние, в результате которого дальнейшая работа с тестируемой системой или ее ключевыми функциями становится невозможна. Решение проблемы необходимо для дальнейшего функционирования системы. _ _• Критическая (Critical) -Критическая ошибка, неправильно работающая ключевая бизнес логика, дыра в системе безопасности, проблема, приведшая к временному падению сервера или приводящая в нерабочее состояние некоторую часть системы, без возможности решения проблемы, используя другие входные точки. __ • Значительная (Major) -Значительная ошибка, часть основной бизнес логики работает некорректно. Ошибка не критична или есть возможность для работы с тестируемой функцией, используя другие входные точки. __ • Незначительная (Minor) - Незначительная ошибка, не нарушающая бизнес логику тестируемой части приложения, очевидная проблема пользовательского интерфейса. _ _• Тривиальная (Trivial) - Тривиальная ошибка, не касающаяся бизнес логики приложения, плохо воспроизводимая проблема, малозаметная посредствам пользовательского интерфейса, проблема сторонних библиотек или сервисов, проблема, не оказывающая никакого влияния на общее качество продукта.\",\"assets/voise/0qUs27.mp3\"],[\"что такое Фокус-тест\",\"Тестирование, проводимое с целью получения первичной реакции игроков. Необходимо для оценки удобства использования и того, как продукт принимается целевой аудиторией или сторонними людьми.\",\"assets/voise/0qUs28.mp3\"],[\"Чем отличается тест-кейс от чек-листа?\",\"Если коротко, то Чек- лист — это просто список того, что нужно проверить. __Не коротко Тест-кейс — подборный план того, как именно мы будем это проверять, чек-лист это документ, описывающий что должно быть протестировано. _При этом чек-лист может быть абсолютно разного уровня детализации. __На сколько детальным будет чек-лист зависит от требований к отчетности, уровня знания продукта сотрудниками и сложности продукта. Чек-лист менее формализован чем тест-кейс. .\",\"assets/voise/0qUs29.mp3\"],[\"дайте определения тест-кейса! Какие основные поля содержит тест-кейс? Без чего текст-кейсы уже не будет тест-кейсом? речь об основных полях .\",\"Test Case — это документ, описывающий совокупность шагов, конкретных условий и параметров, необходимых для проверки тестируемой функции. _ _Тест кейс состоит из: _ID (идентификатор) _Title (название) _Type (тип) _Priority (приоритет) _Preconditions (предусловия) _Steps (шаги) _Expected Result (ожидаемый результат) _Post conditions (пост условия) - например очистка данных или возвращение системы в первоначальное состояние. _ Тест кейс без шагов и заголовка уже не тест-кейс\",\"assets/voise/0qUs30.mp3\"],[\"Всегда ли нужны тест-кейсы? Обращу внимание, что тут нужно перечислить случае, в которых они не нужны.\",\"Обычно при работе с простыми системами — сайтами, мобильными приложениями и т. д. — нет необходимости в тест-кейсах. _ Часто в команде бывает только один-два тестировщика, которые хорошо знают свой продукт. В таком случае время, потраченное на создание и поддержку тест-кейсов, никогда не окупится. Лучше создать чеклист со списком функций, которые нужно проверить — это будет более рационально.\",\"assets/voise/0qUs31.mp3\"],[\"что такое Требования и по каким принципам нужно проверять Требования ?\",\"  Требования - это спецификация (описание) того, что должно быть реализовано. _Требования описывают то, что необходимо реализовать, без детализации технической стороны решения. Что, а не как. _ _Требования к требованиям: _1) Корректность _2) Недвусмысленность _3) Полнота _4) Непротиворечивость _5) Упорядоченность по важности и стабильности _6) Проверяемость (тестопригодность) _7) Модифицируемость _8)  Трассируемость _9) Понимаемость\",\"assets/voise/0qUs32.mp3\"],[\"Классы эквивалентности используются только вместе с граничными значениями или можно применить их отдельно?\",\"Бывают ситуаци когда с классом эквивалентности нельзя применить граничные значение _ _Пример: есть опции у машин:  _<зимнего пакета>_   Подогрев сидений. _   Подогрев руля. _    Подогрев лобового и заднего стекла. _    Подогрев форсунок стеклоомывателя _    Подогрев боковых зеркал. _ _<электронные помощники> _Парктроник _Передние и задние датчики системы ParkPilot _контроль слепых зон _ и т.д. _Это две классы эквивалентности но о каких граничных значениях может итди речь ? Пример придумал я по этому :3\",\"assets/voise/0qUs33.mp3\"],[\"Тебе пришла задача в тестирование. Как будешь оценивать время на проверку?\",\"Слишком размытая формулировака есть только перечень действий для такой ситауции отталкиваться от количества тестовых сценариев.Я предпочитаю рассчитывать именно так.__1) Оцениваем объемы задачи. _ _2) Прикидываем примерное количество-кейсов (проверок) на данную задачу. _ _3) Умножаем кол-во на примерное среднее время прохождение кейсов (для веба это в районе 4х минут, дальше зависит от специфики отрасли). _ _4) Закладываем риски в 0.66 от оценки\",\"assets/voise/0qUs34.mp3\"],[\"раскажите про Жизненный цикл бага\",\"1) Баг создан_2) Назначен на разработчика _3) Приоритизирован _4) Взят в работу _5) Исправлен _6) Тестируется (retest) - если не исправлен то в обратно в пункт 2 _7) Закрыт\",\"assets/voise/0qUs35.mp3\"],[\"Как вы будете тестировать карандаш/чайник/чашку/лифт…?\",\"С таким вопросами только на ...\",\"assets/voise/0qUs36.mp3\"],[\"Что такое тест кейс?\",\"это артефакт, описывающий совокупность шагов, конкретных условий и параметров, необходимых для проверки реализации тестируемой функции или её части.\",\"assets/voise/0qUs37.mp3\"],[\"Что такое тестирование API?\",\"Тестирование API — это тип тестирования программного обеспечения, при котором анализируется интерфейс прикладной программы (API), чтобы убедиться, что он соответствует ожидаемой функциональности, безопасности, производительности и надежности. Тесты выполняются непосредственно в API и в рамках интеграционного тестирования. _ _При тестировании API фокусируются на анализе бизнес-логики, а также безопасности откликов приложений и данных. _ _Тест API обычно выполняется путем отправки запросов к одной или нескольким конечным точкам API и сравнения ответа с ожидаемыми результатами. _ _Тестирование API считается критически важным для автоматизации тестирования, потому что API — основной интерфейс логики приложения, и поскольку тесты GUI трудно поддерживать с короткими циклами выпуска и частыми изменениями при гибкой разработке программного обеспечения и использовании подходов DevOp\",\"assets/voise/0qUs38.mp3\"],[\"Приведите примеры интеграции через API.\",\"системы бронирования билетов, например, Aviasales. Пользователи ожидают, что самые дешевые варианты перелетов на определенные даты будут доступны и показаны им по запросу. Это требует, чтобы приложение связывалось со всеми авиакомпаниями, чтобы найти наилучшие варианты перелета — это делается через API. _   _ В данном случае необходимо выполнить тесты API, чтобы убедиться, что система бронирования билетов успешно взаимодействует с другими компаниями и предоставляет пользователям правильные результаты в соответствующие сроки. Кроме того, если пользователь бронирует рейс и оплачивает его с помощью стороннего платежного сервиса, то должны быть выполнены тесты API, чтобы гарантировать, что платежный сервис и системы бронирования путешествий могут эффективно взаимодействовать, обрабатывать платеж и сохранять конфиденциальные данные пользователя в безопасности.\",\"assets/voise/0qUs39.mp3\",\"https://logrocon.ru/news/api_testing\"],[\"В чем разница между SOAP и REST?\",\"REST и SOAP на самом деле не сопоставимы. REST — это архитектурный стиль. SOAP — это формат обмена сообщениями. _Есть сылка чтобы изучить подробннее\",\"assets/voise/0qUs40.mp3\",\"https://habr.com/ru/post/483204/\"],[\"Перечислите ключевые элементы HTTP-запроса! У метода Get есть тело запроса ? \",\"url, _методы,_загаловки запроса, _тело запроса ! _ _GET-запросы могут иметь тело!. Большинство реализаций проигнорируют его или отклонят запрос. Но даже если сервер, предоставляющий ваш API, разрешает тело, вы не можете его использовать браузеры его отклонят\",\"assets/voise/0qUs41.mp3\"],[\"Может ли у ПО быть сразу несколько баз данных?\",\"Если вопрос в возможности то да может, но возникнут проблемы с оптимизацией\",\"assets/voise/0qUs42.mp3\"],[\"Что такое реляционная база данных?\",\"Реляционные базы данных представляют собой базы данных, которые используются для хранения и предоставления доступа к взаимосвязанным элементам информации. _Реляционные базы данных основаны на реляционной модели — интуитивно понятном, наглядном табличном способе представления данных. _Каждая строка, содержащая в таблице такой базы данных, представляет собой запись с уникальным идентификатором, который называют ключом. Столбцы таблицы имеют атрибуты данных, а каждая запись обычно содержит значение для каждого атрибута, что дает возможность легко устанавливать взаимосвязь между элементами данных.\",\"assets/voise/0qUs43.mp3\"],[\"Приведите несколько примеров, которые объясняют критерии входа для тестирования ПО.\",\"• все дефекты, которые относятся к ранним стадиям проектирования закрыты и проверены;_   • Код проверенный с помощью осуществления «Unit» тестов;_   • Основные функциональные возможности ПО готовы для тестирования;_  • Имеется документация, которая определяет требования;_   • Все тестировщики ознакомлены с архитектурой ПО;_    • Все тестировщики ознакомлены с целями проекта; _   • Готова среда тестирования;_доступные для использования билды;_   • Утверждены план тестирования и/или тестовые случаи.\",\"assets/voise/0qUs44.mp3\"],[\"Всегда ли нужна автоматизация?\",\"Автотесты не являются подходящей альтернативой: _    • если сценарии тестов новые и не тестировались вручную _   • если тесты требуют постоянных изменений и в случае _    • если запустить сценарий тестирования нужно только один раз.\",\"assets/voise/0qUs45.mp3\"],[\"Приведите несколько причин, которые приводят к багам в ПО.\",\"человеческие ошибки (процесс проектирования и процесс реализации); _изменение требований в то время как ПО под испытанием; _непонимание требований и спецификаций;_отсутствие времени;_плохая приоритизация тестирования;_плохая ориентация в версиях ПО;_сложность самого ПО.\",\"assets/voise/0qUs46.mp3\"],[\"чем отличаются между собой дефект,эрор, Баг и сбой \",\" _ • Дефект (он же баг)— это несоответствие фактического результата ожидаемому результату, описанному в требованиях. _ _• Error— ошибка пользователя, то есть он пытается использовать программу иным способом. _Пример — вводит буквы в поля, где требуется вводить цифры (возраст, количество товара и т.п.). _ _• Bug (defect) — ошибка программиста (или другого члена команды), то есть когда в программе, что-то идёт не так как планировалось и программа выходит из-под контроля. _      Например, когда никак не контролируется ввод пользователя, в результате неверные данные вызывают краши или иные проблемы в работе программы. Либо внутри программа построена так, что изначально не соответствует тому, что от неё ожидается. _ _• Failure — сбой (причём необязательно аппаратный) в работе компонента, всей программы или системы. _То есть, существуют такие дефекты, которые приводят к сбоям. И существуют такие, которые не приводят. UI-дефекты например. Но аппаратный сбой, никак не связанный с software, тоже является failure.  \",\"assets/voise/0qUs47.mp3\"],[\"Тестирование локализации\",\"тестирование, направленное на проверку корректности и качества адаптации продукта к использованию на том или ином языке с учётом национальных и культурных особенностей.\",\"assets/voise/0qUs48.mp3\"],[\"Почему вы решили стать тестировщиком?\",\"Если бы ты жил в Китае и задвал бы такие же вопросы,тебя бы звали Кон-Чен-Ый\",\"assets/voise/0qUs49.mp3\"],[\"Почему хотите работать именно у нас?\",\"Я заинтересован в работе у вашей компании из-за ее высокой репутации в отрасли и успехов, которые она достигла в технологической инновации. Меня также привлекают ваши ценности, такие как сотрудничество, качество и уважение к сотрудникам. Я также хочу работать с командой высококвалифицированных и талантливых профессионалов, которые могут помочь мне расти в профессиональном и личном плане.  Кроме того, я увидел, что ваша компания предоставляет множество возможностей для развития карьеры и обучения. Я хотел бы стать частью вашей команды, чтобы совместно работать на достижение общих целей, создавать высококачественные продукты и расти вместе с компанией.\",\"assets/voise/0qUs50.mp3\"],[\"Кем вы видите себя через 5 лет?\",\"коротко: профессионалом своего дела среди единомышленников! __ Я вижу себя через 5 лет как высококвалифицированного эксперта в области тестирования программного обеспечения. Я ожидаю, что буду продолжать развиваться и углублять свои знания, чтобы стать лучшим специалистом в своей области. Я также надеюсь расширить свои навыки в управлении проектами и командами, чтобы продвинуться в карьере и получить более высокую позицию в компании.\",\"assets/voise/0qUs51.mp3\"],[\"Что такое тестирование серого ящика?\",\"Тестирование серого ящика предусматривает частичную осведомленность о внутренних процессах. __ Данный метод - это комбинация тестирования белого и черного ящиков. Специалист стремится найти все проблемы функционирования и ошибки в коде. На этой стадии тестировщик может реализовать сквозной тест.\",\"assets/voise/0qUs52.mp3\"],[\"что такое Позитивное тестирование?\",\"Позитивное тестирование – это проверка функциональности системы на предмет ее правильной работы в соответствии с заданными требованиями. При этом используются входные данные, которые позволяют проверить работу системы при условии, что все работает правильно. Таким образом, позитивное тестирование позволяет проверить работоспособность системы при оптимальных условиях ее функционирования. __Позитивное тестирование помогает убедиться в том, что приложение функционирует должным образом и позволяет проверить, работает ли система в нормальных условиях так, как задумывалось\",\"assets/voise/0qUs53.mp3\"],[\"Что такое Негативное тестирование?\",\" это тип тестирования ПО, направленный на проверку того, что система или приложение ведут себя должным образом в негативных ситуациях, то есть, когда они получают недопустимые или неожиданные входные данные.\",\"assets/voise/0qUs54.mp3\"],[\"Зачем проводят Повторное тестирование ?\",\"Чтобы проверить, что тестовые сценарии, не прошедшие во время последнего прогона тестов, работают после исправления дефектов\",\"assets/voise/0qUs55.mp3\"],[\"что такое сравнительное тестирование?\",\"тестирование, направленное на сравнительный анализ преимуществ и недостатков разрабатываемого продукта по отношению к его основным конкурентам.\",\"assets/voise/0qUs56.mp3\"],[\"что такое UX и UI ? в чем их разница\",\"(  User eXperience — опыт пользователя — ощущение, испытываемое пользователем во время использования цифрового продукта. _ User Interface — пользовательский интерфейс — это инструмент, позволяющий осуществлять взаимодействие «пользователь — приложение».\",\"assets/voise/0qUs57.mp3\"],[\"что такое Дымовое тестирование?\",\"короткий цикл тестов для подтверждения, что после сборки кода (нового или исправленного) приложение стартует и выполняет основные функции.\",\"assets/voise/0qUs58.mp3\"],[\"Чем отличается Exploratory vs Ad-hoc testing ?\",\"Исследовательское тестирование (exploratory testing) - это одновременное изучение системы, проектирование тестов (тест дизайн) и тестирование. _ Данная техника базируется на опыте тестировщика (experience based). _Ad-hoc тестирование - это особый вид тестирования, не предполагающий никакой подготовки или планирования, здесь нет тестовых сценариев, как и какого-либо ожидания от результата. \",\"assets/voise/0qUs59.mp3\",\"https://www.careerist.com/ru-insights/intuitivnoe-testirovanie-ad-hoc-testing#:~:text=%D0%A7%D1%82%D0%BE%20%D1%8D%D1%82%D0%BE%20%D1%82%D0%B0%D0%BA%D0%BE%D0%B5%2C%20%D0%BA%D0%B0%D0%BA%D0%B8%D0%B5%20%D0%B5%D1%81%D1%82%D1%8C,%D0%BA%D0%B0%D0%BA%D0%BE%D0%B3%D0%BE%2D%D0%BB%D0%B8%D0%B1%D0%BE%20%D0%BE%D0%B6%D0%B8%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BE%D1%82%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0.\"]],[[\"Что такое тестирование?\",\"Тестирование - проверка соответ между реальным и ожиадемым поведение продукта, осуществляемый с целью обнаружения дефектов. __Оно включает в себя _ по планированию работ, _проектирование тестовых сценариев, _выполнение тестов _анализу полученных результатов _отчетность. __Кроме того, тестирование также может включать оценку качества продукта, его надежности, производительности и безопасности. _Все это позволяет подтвердить соответствие продукта требованиям и повысить его качество перед выпуском на рынок.\",\"assets/voise/0qUs1.mp3\"],[\"Зачем тестировать ПО?\",\"Цели тестирования ПО заключается во-первых, повысит вероятность того, что приложение: _ • будет соответствовать всем описанным требованиям. __ • И будет работать правильно при любых обстоятельствах. _Во-вторых, предоставить актуальную информации о состоянии продукта на данный момент. __Тестирование является необходимой процедурой для того, чтобы убедиться в том, что разрабатываемое ПО соответствует требованиям заказчика и удовлетворяет потребности конечного пользователя. __Кроме того, тестирование помогает увеличить производительность и эффективность ПО, а также снизить риски потенциальных ошибок и проблем в будущем. В результате тестирования создается более стабильный, надежный и безопасный продукт, который может использоваться без проблем и с меньшим риском потери данных или негативного влияния на бизнес-процессы.\",\"assets/voise/1qUs2.mp3\"],[\"Какие существуют этапы тестирования?\",\"Существует несколько этапов тестирования, которые обычно включают: __ 1. Планирование работ: определение целей, области тестирования, составления плана тестирования и выбора методов и инструментов тестирования. __ 2. Анализ требований: изучения документации и доступную информацию по архитектуре ПО __3 Проектирование тестов: разработка тестовых сценариев и тест-кейсов на основе функциональных и нефункциональных требований проекта. __ 4. Подготовка тестовых данных: создание необходимых данных и условий для тестирования.  __5. Выполнение тестов: запуск тестов, регистрация результатов и выявление дефектов. __ 6. Анализ результатов: оценка результатов тестирования, классификация и отслеживание найденных дефектов. __ 7. Отчетность: подготовка отчетов о статусе тестирования, выявление проблем и предложение решений. __ 8. Тестирование в рамках цикла разработки: тестирование обновлений и итераций в процессе разработки.__  9. Тестирование в производственной среде: тестирование после выпуска продукта, обнаружение и исправление ошибок, обеспечение качества продукта в производственной среде.\",\"assets/voise/1qUs3.mp3\"],[\"Что такое статическое и динамическое тестирование?\",\"Статическое тестирование - это процесс анализа и проверки кода программы, документации и других артефактов без фактического выполнения кода. В ходе статического тестирования, мы проверяем программу на соответствие стандартам кодирования, наличие ошибок и на соответствие требованиям. __Динамическое тестирование - это тестирование, которое выполняется во время выполнения программы, когда запущенный код проверяется на соответствие заданным требованиям. В ходе динамического тестирования мы проверяем программу на определенные сценарии использования, ситуации ошибок и на соответствие требованиям пользователя. Для проведения динамического тестирования необходимо выполнить программу и проанализировать результаты.\",\"assets/voise/1qUs4.mp3\"],[\"Какие уровни тестирования знаете?\",\"1. Модульное тестирование (Unit Testing) __2. Интеграционное тестирование (Integration Testing) __3. Системное тестирование (System Testing) __4. Системное тестирование __5. Приемочное тестирование (Acceptance Testing)\",\"assets/voise/1qUs5.mp3\"],[\"Какие техники тест-дизайна знаете?\",\"1. Эквивалентное разделение (Equivalence Partitioning — EP) _2. Анализ граничных значений (Boundary Value Analysis - BVA) _3. Причина / Следствие (Cause / Effect - CE) _4. Предугадывание ошибки (Error Guessing - EG) _5. Исчерпывающее тестирование (Exhaustive Testing - ET) _6. Диаграмма (граф) состояний-переходов (State Transition diagram) _7. Пользовательский сценарий (Use case) _8. Попарное тестирование (Pairwise Testing)\",\"assets/voise/1qUs6.mp3\"],[\"Что такое техника анализа классов эквивалентности?\",\"это разделение диапазона возможных вводимых значений на группы эквивалентных по своему влиянию на систему. Это групп входных данных, которые обладают одинаковыми свойствами и ожидаемыми результатами выполнения. __ Эта техника помогает не только сокращать количество тестов, но и сохранять приемлемое тестовое покрытие.\",\"assets/voise/1qUs7.mp3\"],[\"Что такое техника анализа граничных значений? В чем ценность этой техники?\",\"это методика, которая позволяет определить, находится ли значение параметра в пределах определенных границ или находится вне допустимых значениях. Она используется для оценки и контроля производственных процессов, чтобы обеспечить их работу в рамках заданного диапазона.  __ Ценность этой техники заключается в том, что она позволяет предотвращать проблемы, связанные с превышением пределов установленных значений, что может привести к небезопасным условиям работы, низкому качеству продукции и потерям в производительности. _Анализ граничных значений также позволяет идентифицировать причины отклонений от установленных параметров и принимать меры для их устранения.\",\"assets/voise/1qUs8.mp3\"],[\"Что такое Регрессионное и Confirmation (Подтверждающее ) тестирование, какая между ними разница?\",\"Регрессионное тестирование - это процесс проверки того, что изменения в программном обеспечении не повлияли на уже существующий функционал и не вызвали регрессию - возникновение новых ошибок.  Подтверждающее тестирование - это процесс проверки того, что программное обеспечение соответствует заданным требованиям и выполняет то, что должно делать.  Основная разница между регрессионным и подтверждающим тестированием заключается в том, что регрессионное тестирование проверяет уже существующий функционал после внесения изменений, а подтверждающее тестирование проверяет соответствие требованиям и корректность работы программы в целом.  В целом, оба типа тестирования должны выполняться в ходе жизненного цикла разработки программного обеспечения для обеспечения высокого качества продукта.\",\"assets/voise/1qUs9.mp3\"],[\"Что такое Верификация? и Что такое Валидация?\",\"Верификация и валидация – это два основных процесса, используемые в инженерии программного обеспечения для проверки правильности работы программного продукта. __ Верификация - это процесс проверки того, правильно ли была реализована функциональность системы. Она заключается в проверке того, выполняет ли система то, что требуется от нее на основе ее спецификаций и дизайна. Этот процесс не проверяет, насколько полезна будет система для своих пользователей. __ Валидация - это процесс проверки того, правильно ли были определены требования к системе и соответствует ли её функциональность этим требованиям. Она заключается в проверке того, решает ли система реальную проблему, и будет ли она полезна для своих пользователей. __ Таким образом, верификация и валидация являются взаимодополняющими процессами и необходимы для обеспечения качества программного продукта.\",\"assets/voise/1qUs10.mp3\"],[\"Расскажите про жизненный цикл разработки ПО\",\"1) Идея  _2) Сбор и анализ требований  _3) Документирование требований  _4) Дизайн  _5)Разработка _6) Тестирование _7) Внедрение/развертывание _8) Поддержка (Maintenance) \",\"assets/voise/1qUs11.mp3\"],[\"Что такое Конфигурационное тестирование (Configuration Testing)?\",\"Конфигурационное тестирование (Configuration Testing) – специальный вид тестирования, направленный на проверку работы программного обеспечения при различных конфигурациях системы (заявленных платформах, поддерживаемых драйверах, при различных конфигурациях компьютеров и т. __Цель Тестирования: определить оптимальную конфигурацию оборудования, обеспечивающую требуемые характеристики производительности и времени реакции тестируемой системы. \",\"assets/voise/1qUs12.mp3\",\"http://www.protesting.ru/testing/types/configuration.html\"],[\"Что такое Исследовательское тестирование (Exploratory Testing)?\",\"Исследовательское тестирование (Exploratory Testing) – это разработка и выполнения тестов в одно и то же время. В процессе исследовательского тестирования тестер может использовать свои знания и опыт для выполнения задач и тестирования функций, которых нет в задачнике. В целом этот метод является более гибким, чем другие методы тестирования и позволяет упустить меньше ошибок\",\"assets/voise/1qUs13.mp3\",\"https://qaschool.ru/blog/issledovatelskoe-testirovanie-osnovnye-harakteristiki-tipy-i-otlichiya-ot-skriptovogo/#:~:text=%D0%A7%D1%82%D0%BE%20%D0%B6%D0%B5%20%D1%82%D0%B0%D0%BA%D0%BE%D0%B5%20%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5,%D1%82%D0%B5%D1%81%D1%82%2C%20%D0%BE%D0%BF%D0%B8%D1%80%D0%B0%D1%8F%D1%81%D1%8C%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0.\"],[\"Какие существуют UI-стандарты?\",\"Я предпологаю что речь идет о гайдлайнах _Гайдлайн — это свод правил использования фирменного стиля бренда. _Этот документ необходим, чтобы сохранить единый образ,_ _ Гайдлайн — это руководство по использованию фирменного стиля или по другому то это свод правил использования фирменного стиля бренда. Многие часто путают этот документ с брендбуком. Их основное отличие в том, что в брендбуке, помимо рекомендаций по визуальным атрибутам, содержится ещё и платформа бренда —  философия, ценности, характер и позиционирование ТМ. Другими словами, гайдлайн является частью брендбука. Это внутрикорпоративный документ, полезный дизайнерам, маркетологам, директорам и практически каждому, кто влияет на реализацию визуальной стратегии бренда. _Гайдлайн: _Помогает исключить разрыв бренда. _Упрощает сотрудничество со сторонними агентствами и специалистами._Повышает узнаваемость и сохраняет идентичность ТМ. _Сохраняет визуальный образ при расширении бизнеса по франчайзинговой модели. _Помогает с ребрендингом при сохранении преемственности фирменному стилю. _Гайдлайн — это не просто правила использования фирменного стиля, это целая дизайн-система. Визуальный язык бренда и его техническое отражение в виде макетов, шаблонов, готовых решений в одном документе._Google Material Design для Android - https://m2.material.io/design/guidelines-overview _ Human Interface Guidlines для ios -https://developer.apple.com/design/human-interface-guidelines/guidelines/overview/   __ или тут речь про совсем другое https://habr.com/ru/post/12778/ \",\"assets/voise/1qUs14.mp3\"],[\"Что такое Black/Grey/White Box Testing?\",\"Это методы тестирования которые дают понять насколько глубоко можно погрузить в технические аспекты продукта, доступ к Базе данных, к коду продукта, документации: _черный ящик определяет отсутствие доступа к любой внутренний информации! _Белый ящик предполагает что мы имеем доступ к любой информации продукта, это внутренняя информация которая побудит тестировщика сделать дополнительные проверки зная архитектуру и другие нюансы ПО! _серый ящик трактуется в каждой компании по своему, но в целом это когда есть доступ к данным доступ к которым нет у обычных пользователей, на пример есть доступ к базе данных, это не белый ящик где имеем полный доступ ко всему, но и не черный! \",\"assets/voise/1qUs15.mp3\"],[\"Что такое Performance Testing?\",\"Тестирование производительности - это набор типов тестирования, направленных на воссоздание пользовательских запросов в системе и сравнение ожидаемых результатов с полученными показателями, а также определение скорости процедур, стабильности, надежности и масштабируемости системы в целом. Полученные результаты позволяют обнаруживать уязвимости с пропускной способностью приложения, временем загрузки, обработкой больших объемов данных и предотвращением их использования в приложении. _Эффективность тестирования_Когда вы игнорируете тестирование производительности перед запуском продукта, предприятия теряют большое количество пользователей и вынуждены тратить значительные средства на дальнейшее исправление ошибок. Чтобы избежать рисков приложения, необходимо проверить следующие факторы: _ Время отклика системы _Неожиданные условия нагрузки _Системная масштабируемость _Пользовательские нагрузки Spike _Стабильность системы _Уровень пропускной способности _Оптимизируйте производительность\",\"assets/voise/1qUs16.mp3\",\"https://www.start-it.ua/post/%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8-performance-testing-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D0%B8\"],[\"Какие бывают требования?\",\"__Требования могут быть разного вида и зависят от контекста. Например: Явные и не явные  __1. Технические требования – это условия и ограничения, определяющие функциональность, стандарты, спецификации и протоколы, необходимые для разработки и тестирования программного обеспечения, оборудования или системы. __ 2. Бизнес-требования – это описание необходимости решения какой-либо бизнес-проблемы или удовлетворения бизнес-потребностей через создание новой продукции или услуги.__  3. Функциональные требования – это описание того, что система должна делать, т.е. ее функциональности и возможности. __ 4. Нефункциональные требования (или качественные требования) – это требования, связанные с аспектами, не связанными с функциональностью, такими как производительность, безопасность, удобство использования и т. д. __ 5. Требования к проекту – это требования, связанные с проектной документацией, процессами управления и планирования проекта.\",\"assets/voise/1qUs17.mp3\"],[\"Что такое Traceability Matrix (Матрица соответствия требований)?\",\"Это двумерная таблица, содержащая соответсвие функциональных требований (functional requirements) продукта и подготовленных тестовых сценариев (test cases). В заголовках колонок таблицы расположены требования, а в заголовках строк — тестовые сценарии. На пересечении — отметка, означающая, что требование текущей колонки покрыто тестовым сценарием текущей строки. Матрица соответсвия требований используется QA-инженерами для валидации покрытия продукта тестами. МСТ является неотъемлемой частью тест-плана.\",\"assets/voise/1qUs18.mp3\"],[\"Какие виды тестирования связаны с изменениями?\",\"1. Дымовое тестирование (Smoke Testing) _2. Регрессионное тестирование (Regression Testing) _3. Повторное тестирование (Re-testing) _4. Тестирование сборки (Build Verification Testing) _5. Санитарное тестирование (Sanity Testing)\",\"assets/voise/1qUs19.mp3\"],[\"Что такое End-to-End тест?\",\"Сквозное тестирование (End-to-end, E2E, Chain testing) — это тип тестирования программного обеспечения, который проверяет программную систему вместе с ее интеграцией с внешними интерфейсами. Целью сквозного тестирования является создание полного производственного сценария. __   Наряду с системой программного обеспечения, она также проверяет пакетную обработку / обработку данных из других восходящих / нисходящих систем. Отсюда и название «Сквозной конец» . Сквозное тестирование обычно выполняется после функционального и системного тестирования . Он использует реальные данные, такие как данные и тестовая среда, для имитации настроек в реальном времени. Сквозное тестирование также называется цепным тестированием . __Зачем проводить Сквозное тестирование? __Подсистема может отличаться от текущей системы или может принадлежать другой организации.  Если какая-либо из подсистем выйдет из строя, вся система программного обеспечения может рухнуть . Это серьезный риск, и его можно избежать путем сквозного тестирования. _ Сквозное тестирование проверяет весь системный процесс. Это увеличивает тестовое покрытие различных подсистем. Это помогает обнаруживать проблемы с подсистемами и повышает доверие к общему программному продукту. __Сквозное тестирование против системного тестирования __ <table class='table table-striped' border='1'> <tbody><tr><th width='50%'><div class='mosimage' align='center'><strong><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Сквозное тестирование</font></font></strong></div></th><th><div class='mosimage' align='center'><strong><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Тестирование системы</font></font></strong></div></th></tr><tr><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Проверяет программную систему, а также взаимосвязанные подсистемы</font></font></td><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Проверяет только программную систему в соответствии со спецификациями требований.</font></font></td></tr><tr><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Он проверяет весь процесс сквозного процесса.</font></font></td><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Он проверяет функциональные возможности и функции системы.</font></font></td></tr><tr><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Все интерфейсы, бэкэнд-системы будут рассмотрены для тестирования</font></font></td><td style='width: 302px;'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Функциональное и нефункциональное тестирование будет рассматриваться для тестирования</font></font></td></tr><tr><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Он выполняется после завершения тестирования системы.</font></font></td><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Выполняется после </font></font><a target='_blank' href='https://coderlessons.com/tutorials/kachestvo-programmnogo-obespecheniia/ruchnoe-testirovanie/integratsionnoe-testirovanie-2'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>тестирования интеграции</font></font></a><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'> .</font></font></td></tr><tr><td><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Сквозное тестирование включает проверку внешних интерфейсов, которые могут быть сложными для автоматизации. </font><font style='vertical-align: inherit;'>Следовательно, </font></font><a target='_blank' href='https://coderlessons.com/tutorials/bolshie-dannye-i-analitika/professiia-biznes-analitik/ruchnoe-testirovanie-3'><font style='vertical-align: inherit;''><font style='vertical-align: inherit;'>ручное тестирование</font></font></a><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'> является предпочтительным.</font></font></td><td><font style='vertical-align: inherit;><font style='vertical-align: inherit;'>Как ручное, так и автоматическое могут быть выполнены для тестирования системы</font></font></td></tr></tbody></table>\",\"assets/voise/1qUs20.mp3\",\"https://coderlessons.com/tutorials/kachestvo-programmnogo-obespecheniia/ruchnoe-testirovanie/skvoznoe-testirovanie-2#:~:text=%D0%A1%D0%BA%D0%B2%D0%BE%D0%B7%D0%BD%D0%BE%D0%B5%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F&text=%D0%9E%D0%BD%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8F%D0%B5%D1%82%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B8%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B.&text=%D0%9E%D0%BD%20%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F,%D0%BC%D0%BE%D0%B3%D1%83%D1%82%20%D0%B1%D1%8B%D1%82%D1%8C%20%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8.\"],[\"Что такое тестирование безопасности?\",\"это стратегия тестирования, используемая для проверки безопасности системы, а также для анализа рисков, связанных с обеспечением целостного подхода к защите приложения, атак хакеров, вирусов, несанкционированного доступа к конфиденциальным данным. _ Принципы безопасности программного обеспечения _Общая стратегия безопасности основывается на трех основных принципах: _ _1. Конфиденциальность - это сокрытие определенных ресурсов или информации. _Под конфиденциальностью можно понимать ограничение доступа к ресурсу некоторой категории пользователей, или другими словами, при каких условиях пользователь может получить доступ к данному ресурсу. _ _ 2.  Целостность - Существует два основных критерия при определении понятия целостности:_  • Доверие. Ожидается, что ресурс будет изменен только соответствующим способом определенной группой пользователей. _ • Повреждение и восстановление. В случае когда данные повреждаются или неправильно меняются авторизованным или не авторизованным пользователем, вы должны определить на сколько важной является процедура восстановления данных. _  _3.доступность -Доступность представляет собой требования о том, что ресурсы должны быть доступны авторизованному пользователю, внутреннему объекту или устройству. Как правило, чем более критичен ресурс тем выше уровень доступности должен быть. _Виды уязвимостей _ _В настоящее время наиболее распространенными видами уязвимости в безопасности программного обеспечения являются: _ • XSS (Cross-Site Scripting) - это вид уязвимости программного обеспечения (Web приложений), при которой, на генерированной сервером странице, выполняются вредоносные скрипты, с целью атаки клиента. _ • XSRF / CSRF (Request Forgery) - это вид уязвимости, позволяющий использовать недостатки HTTP протокола, при этом злоумышленники работают по следующей схеме: ссылка на вредоносный сайт устанавливается на странице, пользующейся доверием у пользователя, при переходе по вредоносной ссылке выполняется скрипт, сохраняющий личные данные пользователя (пароли, платежные данные и т.д.), либо отправляющий СПАМ сообщения от лица пользователя, либо изменяет доступ к учетной записи пользователя, для получения полного контроля над ней. _ • Code injections (SQL, PHP, ASP и т.д.) - это вид уязвимости, при котором становится возможно осуществить запуск исполняемого кода с целью получения доступа к системным ресурсам, несанкционированного доступа к данным либо выведения системы из строя. _ • Server-Side Includes (SSI) Injection - это вид уязвимости, использующий вставку серверных команд в HTML код или запуск их напрямую с сервера. _ • Authorization Bypass - это вид уязвимости, при котором возможно получить несанкционированный доступ к учетной записи или документам другого пользователя\",\"assets/voise/1qUs21.mp3\",\"http://www.protesting.ru/testing/types/security.html\"],[\"Что такое испытание на основе рисков?\",\"Тестирование на основе рисков (risk-based testing) — это метод тестирования программного обеспечения, который базируется на вероятности рисков. _Цель тестирования на основе рисков — сфокусироваться на ключевых функциях и уделить им больше времени. _ _Риск — это непредвиденное событие, которое может отрицательно повлиять на измеряемые критерии успеха проекта. _Так, непредвиденные события могут повлиять на стоимость всего проекта, коммерческие, технические и качественные цели. _  _ • Риски продукта — факторы, которые в конечном итоге приводят к несоответствию конечной функциональности потребностям пользователей и/или ожиданиям клиентов. _ • Риски проекта — проблемы, вызванные внешними зависимостями. Это могут быть проблемы с контрактами, задержки со стороны подрядчика, личные проблемы или ограничения, не связанные с работой._ • Риски процесса — проблемы, связанные с планированием и управлением проектом, в том числе неточные эстимейты, задержки, жесткие дедлайны, недооценка сложности проекта или других важных аспектов. не плохая статья для чьтения https://habr.com/ru/company/simbirsoft/blog/443672/\",\"assets/voise/1qUs22.mp3\"],[\"Что такое динамическое тестирование?\",\" это методика, направленная на проверку функционала программы, во время выполнения кода.\",\"assets/voise/1qUs23.mp3\",\"https://testengineer.ru/chto-takoe-risk-testirovanie/\"],[\"Что такое «парадокс пестицида»?\",\"Если повторять одни и те же тесты снова и снова, в какой-то момент они перестанут выявлять новые ошибки.\",\"assets/voise/1qUs24.mp3\"],[\"Опишите основные фазы STLC (жизненного цикла тестирования)? Дайте определение критери начала (Entry) и завершения (Exit) Criteria.\",\"STLC, или жизненный цикл тестирования — это последовательность действий, проводимых в процессе тестирования, с помощью которых гарантируется качество программного обеспечения и его соответствие требованиям. STLC включает действия по верификации и валидации. Тестирование состоит из серии действий, выполняемых по методике, с целью гарантирования качества продукта. _Entry Criteria (Критерий начала): описывает условия, которые должны быть соблюдены перед тем как начнется тестирование. _ Exit Criteria (Критерий завершения): описывает условия, которые должны быть соблюдены перед тем как тестирование завершится.\",\"assets/voise/1qUs25.mp3\"],[\"Представте ситуацию, вам дали 2 одинаковых проекта, т.е с одинаковым приоритетом, одинаковые по сложности и т.п., с какого проекта вы начнёте?\",\"Это ловушка некоторых hr, если ответить 1 или 2 то  ответ не правленый! _Ответ: Не буду угадывать, спрошу у тест-менеджера!. Своебразный вопрос но имеет место быть\",\"assets/voise/1qUs26.mp3\"],[\"Какие есть атрибуты баг-репорта? Какие основные поля для заполнения?\",\"баг-репорт -это документ, описывающий последовательность действий, которые привели к некорректной работе системы, с указанием причин и ожидаемого результата. _ _поля в баг репорте _ • ID (идентификатор) _ • Название (Title) _ • Короткое описание (Summary) _ • Проект (Project)_ • Номер версии (Version)_ • Приоритет (Priority)_ • Статус (Status)_ • Автор (Author)_ • Назначен на (Assignee)_ • Окружение (Environment)_ • App/build version (версия билда/приложения)_ • Шаги воспроизведения (Steps to Reproduce) _ • Фактический Результат (Actual Result) _ • Ожидаемый результат (Expected Result) _ • скриншоты _ • видео _ • Логи (браузера, мобилки, сервера)\",\"assets/voise/1qUs27.mp3\"],[\"Какова разница между приоритетом и серьезностью?\",\"Серьезность (Severity) — это атрибут, характеризующий влияние дефекта на работоспособность приложения. _Приоритет (Priority) — это атрибут, указывающий на очередность выполнения задачи или устранения дефекта. _Можно сказать, что это инструмент менеджера по планированию работ. Чем выше приоритет, тем быстрее нужно исправить дефект. Severity выставляется тестировщиком Priority — менеджером, тимлидом или заказчиком\",\"assets/voise/1qUs28.mp3\"],[\"Приведите примеры серьезного, но не приоритетного бага.\",\"функция в приложении с багом, блокирующим работу всего ПО, которым никто никогда не пользуется,другой вопрос а зачем функция которм никто не пользуется\",\"assets/voise/1qUs29.mp3\"],[\"В чем разница между валидацией и верификацией?\",\"Верификация (verification) — оценка соответствия продукта требованиям (спецификации)._Отвечает на вопрос: “Система работает в соответствии с требованиями?”_ _Валидация (validation) — оценка соответствия продукта ожиданиям и требованиям пользователей. _Отвечает на вопрос: “Требования удовлетворяют ожидания пользователя?”\",\"assets/voise/1qUs30.mp3\"],[\"Зачем нужна тестовая документация? Какие её виды вы занете?\",\"Тестовая документация — это набор документов, создаваемых перед началом процесса тестирования и непосредственно в процессе. _Эти документы описывают покрытие тестами и процесс выполнения тестов, в них указываются необходимые для тестирования вещи, приводится основная терминология и т. д. _ _Тестовая документация определяет, что для нас важно и почему, какие действия мы должны выполнить и сколько времени у нас есть. Наконец, в документации обозначено, чего должна достичь команда и что сигнализирует об окончании процесса. _Непонимание того, как и почему должна вести себя та или иная функция, приводит к большему количеству ошибок. Неправильная расстановка приоритетов может привести к пропуску багов и предоставлению неполных отчетов. Примеры можно продолжать и продолжать. Перечень тестовой документации это _ _ План тестирования - План тестирования описывает все действия по тестированию в рамках одного проекта. Здесь вы можете найти информацию обо всем, что нужно сделать тестировщику или команде QA в ходе проекта. _ _ Чеклист - то документ, содержащий краткое описание функций, которые должен проверить тестировщик. _ _ Тест-кейс - это артефакт/документ, описывающий совокупность шагов, конкретных условий и параметров, необходимых для проверки тестируемой функции._ _ Сценарий использования (use case) - это более простой и менее официальный документ. Он описывает сценарий взаимодействия с пользовталея с программой . _ Каждый юзкейс основан на предположении о том, что пользователь программы будет делать и где он будет кликать. Это позволяет тестировщикам протестировать предполагаемые пути пользователя._ _ Баг-репорт - это документ, описывающий последовательность действий, которые привели к некорректной работе системы, с указанием причин и ожидаемого результата. _ _Требования - это спецификация (описание) того, что должно быть реализовано.(Требования описывают то, что необходимо реализовать, без детализации технической стороны решения. Что, а не как) \",\"assets/voise/1qUs31.mp3\"],[\"Что такое тест-план?\",\"Это документ описывающий весь объём работы по тестированию\",\"assets/voise/1qUs32.mp3\"],[\"Какую обязательную информацию должен содержать тест-план? Как правильно его использовать, поддерживать и нужен ли он вообще для большинства проектов?\",\"Тест план содержит обязательно ответ на ниже указанные вопросы: _ Что тестируем? _когда? _Критерии начала/окончания тестирования. _Окружение (environment) dev/staging/production? _Подходы/техники/инструменты/виды тестирования? _Браузеры/версии/OS/разрешения экрана? _Кто? Обязанности? Ресурсы? Обучение? _Сроки? _график? _Стратегия тестирования _Ссылки на документацию. _ _Если тестирование не документируется, это мешает увидеть полную картину проекта. _Без четких целей, пошагового плана по их достижению и указания всех важных условий ожидаемый результат будет неясен. В таких условиях у всех может быть разное понимание общей цели и конечного продукта.  \",\"assets/voise/1qUs33.mp3\"],[\"Что такое Сборка?\",\"Тестирование направленное на определение соответствия, выпущенной версии, критериям качества для начала тестирования. По своим целям является аналогом Дымового Тестирования, направленного на приемку новой версии в дальнейшее тестирование или эксплуатацию. Вглубь оно может проникать дальше, в зависимости от требований к качеству выпущенной версии. _Чаще всего это исполняемый файл (содержащий исполняемый код программы). _Предположим, что номер версии сборки выглядит так: 1.35.6.2_ _ 1 Первый идентификатор — основной номер версии. _ 2 Второй идентификатор — дополнительный номер версии. _ 3 Третий идентификатор — номер сборки. _ 4 Четвёртый идентификатор — номер редакции.\",\"assets/voise/1qUs34.mp3\"],[\"Что такое тестовый драйвер и тестовая обвязка?\",\"Драйвер (driver) — это компонент ПО или средство тестирования, которое заменяет компонент, обеспечивающий управление и/или вызов компонента или системы. _Обвязка (harness) — это тестовое окружение, включающее в себя заглушки и драйверы, необходимые для проведения теста._ Не уверен в корректности данных определений!\",\"assets/voise/1qUs35.mp3\"],[\"Что такое приемочное тестирование? И когда проводится ?\",\"Приемочное тестирование или Приемо-сдаточное испытание. _Формальный процесс тестирования, который проверяет соответствие системы требованиям и проводится с целью: _• определения удовлетворяет ли система приемочным критериям; _• вынесения решения заказчиком или другим уполномоченным лицом принимается приложение или нет. _Приемочное тестирование выполняется на основании набора типичных тестовых случаев и сценариев, разработанных на основании требований к данному приложению. _Решение о проведении приемочного тестирования принимается, когда: _• продукт достиг необходимого уровня качества; _• заказчик ознакомлен с Планом Приемочных Работ (Product Acceptance Plan) или иным документом, где описан набор действий, связанных с проведением приемочного тестирования, дата проведения, ответственные _• Фаза приемочного тестирования длится до тех пор, пока заказчик не выносит решение об отправлении приложения на доработку или выдаче приложения.\",\"assets/voise/1qUs36.mp3\"],[\"Что такое <Системное тестирование> ?\",\"это тестирование программного обеспечения выполняемое на полной, интегрированной системе, с целью проверки соответствия системы исходным требованиям, как функциональным, так и не функциональным. Объект тестирования выделен красным цветом. _При этом выявляются дефекты, такие как неверное использование ресурсов системы. _   • непредусмотренные комбинации данных пользовательского уровня _    • непредусмотренные сценарии использования _    • отсутствующая или неверная функциональность, неудобство использования и т.д _во время тестирования рекомендуется использовать окружение максимально приближенное к тому, на которое будет установлен продукт после выдачи\",\"assets/voise/1qUs37.mp3\",\"https://qalight.ua/ru/baza-znaniy/sistemnoe-testirovanie/#:~:text=%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%B5%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%E2%80%93%20%D1%8D%D1%82%D0%BE%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE,%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B2%D1%8B%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%20%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%BC%20%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%BC.\"],[\"Какие Виды Тестирования вы знаете \",\"Все виды тестирования программного обеспечения, в зависимости от преследуемых целей, можно условно разделить на следующие группы: _    • Функциональные _    • Нефункциональные _    • Связанные с изменениями _ _Функциональные тесты базируются на функциях и особенностях, а также взаимодействии с другими системами, и могут быть представлены на всех уровнях тестирования: компонентном или модульном, интеграционном , системном и приемочном . Функциональные виды тестирования рассматривают внешнее поведение системы. Далее перечислены одни из самых распространенных видов функциональных тестов: _    • Функциональное тестирование  _    • Тестирование безопасности  _    • Тестирование взаимодействия (Interoperability Testing GUI ) _ _Нефункциональное тестирование описывает тесты, необходимые для определения характеристик программного обеспечения, которые могут быть измерены различными величинами. В целом, это тестирование того, Как система работает. Далее перечислены основные виды нефункциональных тестов: _Все виды тестирования производительности: _     • нагрузочное тестирование (Performance and Load Testing) _  • стрессовое тестирование (Stress Testing) _     • тестирование стабильности или надежности (Stability / Reliability Testing)      _      • объемное тестирование (Volume Testing)  Тестирование установки (Installation testing) _ • Тестирование удобства пользования (Usability Testing)  _ • Тестирование на отказ и восстановление (Failover and Recovery Testing)  _ • Конфигурационное тестирование (Configuration Testing)  _ • Тестирование безопасности (Security and Access Control Testing)    _ _Связанные с изменениями виды тестирования _После проведения необходимых изменений, таких как исправление бага/дефекта, программное обеспечение должно быть пере тестировано для подтверждения того факта, что проблема была действительно решена. Ниже перечислены виды тестирования, которые необходимо проводить после установки программного обеспечения, для подтверждения работоспособности приложения или правильности осуществленного исправления дефекта: _ • Дымовое тестирование (Smoke Testing) _ • Регрессионное тестирование (Regression Testing) _ • Тестирование сборки (Build Verification Test) _ • Санитарное тестирование или проверка согласованности/исправности (Sanity Testing)\",\"assets/voise/1qUs38.mp3\"],[\"Что такое ООП? Назовите его принципы с примерами?\",\"Объе́ктно-ориенти́рованное программи́рование (ООП) — методология программирования, основанная на представлении программы в виде совокупности объектов, каждый из которых является экземпляром определенного класса, а классы образуют иерархию наследования._Принципы ООП: _Принцип 1. Наследование - механизм, который позволяет описать новый класс на основе существующего (родительского). При этом свойства и функциональность родительского класса заимствуются новым классом. _Для чего нужно наследование и какие преимущества оно дает? _Прежде всего — повторное использование кода. Поля и методы, описанные в родительских классах, можно использовать в классах-потомках. _Если у всех типов автомобилей есть 10 общих полей и 5 одинаковых методов, тебе достаточно вынести их в родительский класс Auto. Ты сможешь использовать их в классах-потомках безо всяких проблем. _ Принцип 2. Абстракция - Это очень простой принцип. Абстракция означает выделение главных, наиболее значимых характеристик предмета и наоборот — отбрасывание второстепенных, незначительных.  _ Скажем, мы создаем картотеку работников компании. Для создания объектов «работник» мы написали класс Employee. Какие характеристики важны для их описания в картотеке компании? ФИО, дата рождения, номер социального страхования, ИНН. Но вряд ли в карточке такого типа нам нужны его рост, цвет глаз и волос. Компании эта информация о сотруднике ни к чему. _Поэтому для класса Employee мы зададим переменные String name, int age, int socialInsuranceNumber и int taxNumber, а от лишней для нас информации вроде цвета глаз откажемся, абстрагируемся. _Инкапсуляция - в Java означает ограничение доступа к данным и возможностям их изменения. _У тебя есть имя и фамилия. Их знают все твои знакомые. Но у них нет доступа к изменению твоего имени и фамилии. Этот процесс, можно сказать, «инкапсулирован» в паспортном столе: поменять имя фамилию можно только там, и сделать это можешь только ты. Остальные «пользователи» имеют доступ к твоему имени и фамилии «только на чтение» :) _Принцип 4. Полиморфизм  — это возможность работать с несколькими типами так, будто это один и тот же тип. При этом поведение объектов будет разным в зависимости от типа, к которому они принадлежат.есть хороший пример на сайте \",\"assets/voise/1qUs39.mp3\",\"https://javarush.com/groups/posts/1966-principih-obhhektno-orientirovannogo-programmirovanija\"],[\"Что такое интерфейс? Что такое абстрактный класс? Чем они отличаются?\",\" ответ может дать автотестер коорый пишет на Java : Абстрактный класс — это класс, у которого не реализован один или больше методов (некоторые языки требуют такие методы помечать специальными ключевыми словами). _Интерфейс — это абстрактный класс, у которого ни один метод не реализован, все они публичные и нет переменных класса. _Интерфейс нужен обычно когда описывается только интерфейс (тавтология). Например, один класс хочет дать другому возможность доступа к некоторым своим методам, но не хочет себя «раскрывать». Поэтому он просто реализует интерфейс. _Абстрактный класс нужен, когда нужно семейство классов, у которых есть много общего. Конечно, можно применить и интерфейс, но тогда нужно будет писать много идентичного кода\",\"assets/voise/1qUs40.mp3\"],[\"Что такое SOLID? Приведите примеры.\",\"это набор принципов, следуя которым, программный код будет более чистым и гибким. Т. е. это не библиотека или технология, это просто правила, которым должен следовать разработчик в кманде если компания разделяет данный подход .расшифровка _ S: Single Responsibility Principle (Принцип единственной ответственности). _ O: Open-Closed Principle (Принцип открытости-закрытости)._ L: Liskov Substitution Principle (Принцип подстановки Барбары Лисков). _ I: Interface Segregation Principle (Принцип разделения интерфейса). _ D: Dependency Inversion Principle (Принцип инверсии зависимостей). \",\"assets/voise/1qUs41.mp3\",\"https://habr.com/ru/company/ruvds/blog/426413/\"],[\"Что такое DRY, KISS, YAGNI?\",\"Это все ринципы для разработки: _1. YAGNI (You Aren’t Gonna Need It / Вам это не понадобится)- Этот принцип прост и очевиден, но ему далеко не все следуют. Если пишете код, то будьте уверены, что он вам понадобится. Не пишите код, если думаете, что он пригодится позже. _ 2. DRY (Don’t Repeat Yourself / Не повторяйтесь) - В проектировании и теории информационных систем единый источник истины (SSOT) – это практика структурирования информационных моделей и схемы данных, которая подразумевает, что все фрагменты данных обрабатываются (или редактируются) только в одном месте… SSOT предоставляют достоверные, актуальные и пригодные к использованию данные. _простыми словами Дублирование кода – пустая трата времени и ресурсов. Вам придется поддерживать одну и ту же логику и тестировать код сразу в двух местах, причем если вы измените код в одном месте, его нужно будет изменить и в другом _3. KISS (Keep It Simple, Stupid / Будь проще) -  Этот принцип гласит, что простые системы будут работать лучше и надежнее. _Не придумывайте к задаче более сложного решения, чем ей требуется! Иногда самое разумное решение оказывается и самым простым. Написание производительного, эффективного и простого кода – это прекрасно. \",\"assets/voise/1qUs42.mp3\",\"https://habr.com/ru/company/itelma/blog/546372/\"],[\"Что такое паттерны? Какие паттерны GOF вам известны? Приведите примеры их использования.\",\"Паттерны проектирования описывают общую структуру взаимодействия элементов программной системы, которые реализуют исходную проблему проектирования в конкретном контексте. Наиболее известными паттернами этой категории являются паттерны GoF (Gang of Four). Паттерны GoF включают в себя 23 паттерна. Эти паттерны не зависят от языка реализации, но их реализация зависит от области приложения._Шаблоны проектирования — это готовые шаблоны, позволяющие решать частые проблемы разработки. Существуют проблемы, требующие совершенно новых решений, но большинство уже встречалось разработчикам, поэтому их можно решить, применяя проверенные подходы, или шаблоны. _В число популярных шаблонов проектирования входят Адаптер (Adapter), Мост (Bridge), Декоратор (Decorator), Фасад (Façade), Фабричный метод, Наблюдатель (Observer), Одиночка (Singleton), Стратегия (Strategy) и Шаблонный метод (Template Method). _Шаблоны снижают сложность, предоставляя готовые абстракции Если вы скажете: «В этом фрагменте для создания экземпляров производных классов применяется шаблон 'Фабричный метод'», — другие программисты поймут, что ваш код включает богатый набор взаимодействий и протоколов программирования, специфических для названного шаблона. _Шаблон «Фабричный метод» позволяет создавать экземпляры любого класса, производного от указанного базового класса, причем отдельные производные классы отслеживаются только самим «Фабричным методом». Если вы будете использовать шаблоны, другие программисты легко поймут выбранный вами подход к проектированию без подробного обсуждения кода.\",\"assets/voise/1qUs43.mp3\",\"https://studfile.net/preview/9431262/page:9/\"],[\"Что такое Page Object и Page Factory?\",\"Объектная модель страницы (Page Object Model (POM)) — это шаблон проектирования, широко используемый в автоматизации тестирования, который создает репозиторий объектов для элементов веб-интерфейса. Преимущество модели в том, что она уменьшает дублирование кода и улучшает сопровождение тестов. _Фабрика страниц в Selenium (Page Factory) — это встроенная концепция фреймворка Page Object Model для Selenium WebDriver, но она очень оптимизирована. Он используется для инициализации объектов Page или для создания экземпляра самого объекта Page. Он также используется для инициализации элементов класса Page без использования «FindElement/s».\",\"assets/voise/1qUs44.mp3\",\"https://www.guru99.com/page-object-model-pom-page-factory-in-selenium-ultimate-guide.html\"],[\"Какая иерархия Collections?\",\"На вершине иерархии в Java Collection Framework располагаются 2 интерфейса: Collection и Map . Эти интерфейсы разделяют все коллекции, входящие во фреймворк на две части по типу хранения данных: простые последовательные наборы элементов и наборы пар «ключ — значение» (словари). просто определение из гугла, дальше не знаю \",\"assets/voise/1qUs45.mp3\"],[\"Какая разница между Thread class и Runnable interface?\",\"В Java многопоточность программы организуется с помощью интерфейса Runnable и класса Thread, который наследуется от Runnable. Первый способ более гибкий, второй – проще. Та часть кода, которая должна выполняться в отдельном потоке, выносится в свой класс, имеющий переопределенный метод run().\",\"assets/voise/1qUs46.mp3\"],[\"Какая разница между String, Stringbuffer и Stringbuilder?\",\"String – неизменяемая строка. StringBuffer — потокобезопасная изменяемая строка. StringBuilder – изменяемая строка с высокой производительностью, но без синхронизации.\",\"assets/voise/1qUs47.mp3\"],[\"Разница между final, finally и finalize?\",\"В чем разница между final, finally и finalize? Основное различие между final, finally и finalize заключается в том, что final — это модификатор доступа, finally — блок в обработке исключений, а finalize — метод класса объекта. \",\"assets/voise/1qUs48.mp3\"],[\" Какие принципы тестирования вы знаете ?\",\"• Тестирование демонстрирует наличие дефектов, а не их отсутствие _•Исчерпывающее тестирование недостижимо _•Раннее тестирование сохраняет время и деньги _•Кластеризация дефектов _•Парадокс пестицида _•Тестирование зависит от контекста _•Заблуждение об отсутствии ошибок\",\"assets/voise/1qUs49.mp3\"],[\"что такое Интеграционное тестирование ? какие уровни вы знаете и подходы?\",\"Интеграционное тестирование предназначено для проверки связи между компонентами, а также взаимодействия с различными частями системы (операционной системой, оборудованием либо связи между различными системами). _   Уровни интеграционного тестирования: _    • Компонентный интеграционный уровень (Component Integration testing) _        Проверяется взаимодействие между компонентами системы после проведения компонентного тестирования. _    • Системный интеграционный уровень (System Integration Testing) _        Проверяется взаимодействие между разными системами после проведения системного тестирования. _ • Подходы к интеграционному тестированию:_ _ Снизу вверх (Bottom Up Integration) - Все низкоуровневые модули, процедуры или функции собираются воедино и затем тестируются. После чего собирается следующий уровень модулей для проведения интеграционного тестирования. Данный подход считается полезным, если все или практически все модули, разрабатываемого уровня, готовы. Также данный подход помогает определить по результатам тестирования уровень готовности приложения _ • Сверху вниз (Top Down Integration) - Вначале тестируются все высокоуровневые модули, и постепенно один за другим добавляются низкоуровневые. Все модули более низкого уровня симулируются заглушками с аналогичной функциональностью, затем по мере готовности они заменяются реальными активными компонентами. Таким образом мы проводим тестирование сверху вниз. _ • Большой взрыв  - Все или практически все разработанные модули собираются вместе в виде законченной системы или ее основной части, и затем проводится интеграционное тестирование. Такой подход очень хорош для сохранения времени. Однако если тест кейсы и их результаты записаны не верно, то сам процесс интеграции сильно осложнится, что станет преградой для команды тестирования при достижении основной цели интеграционного тестирования\",\"assets/voise/1qUs67.mp3\"],[\"Есть 8 бильярдных шаров. Один из них немного тяжелее других. За какое минимальное количество взвешиваний на рычажных весах без гирь можно найти этот шар?\",\"ф2 шага. Нужно разделить все шары на три части: по 3 шара в двух частях, и 2 шара в третьей части. Сначала взвешиваете первые две части по 3 шара. Если одна из частей оказалась тяжелее, то взвешиваем между собой любые 2 шара из нее. Или один из них будет искомым шаром, или не взвешенный, если они оказались равны. В случае равного веса частей при первом взвешивании, более тяжелый шар окажется в третьей части из двух шаров.\",\"assets/voise/1qUs68.mp3\"],[\"Почему канализационные люки имеют круглую форму? \",\"за счет равного диаметра круга люк не проваливается в канализацию, второй – круглые люки легче переносить\",\"assets/voise/1qUs69.mp3\"],[\"Чем валидация отличается от верификации?\",\"Верификация — это проверка системы на соответствие условиям, которые были определены в начале разработки. __Валидация — это оценка соответствия работы программы ожиданиям пользователя.  __  Например: в настройках электросамоката прописано автоматическое снижение скорости в пешеходных зонах. Но из-за погрешности геолокации самокат теряет скорость на велодорожке вблизи парка. Получается, с точки зрения верификации программа работает правильно, а с точки зрения валидации есть проблемы.\",\"assets/voise/1qUs70.mp3\"],[\"Перед вами два мотка веревки. Если взять их концы и поджечь, то каждый моток сгорает за один час. Вопрос: как правильно отмерить 45 минут, применяя 2 таких мотка веревки, при условии, что веревку нет возможности делить?\",\"стоит одновременно поджечь один моток с двух концов, а второй – с одной стороны. Ровно через 30 минут первый моток полностью выгорит, а второму останется гореть 30 минут. Дабы получить желаемые 15 минут, его придется подпалить с обеих сторон. Все просто!\",\"assets/voise/1qUs71.mp3\"],[\"Перед вами 50 мопедов с полным баком бензина на 100 километров. Как далеко можно уехать, при условии, что все они стартуют из одной точки?\",\"1) Заводим мопеды одновременно и едем 100 километров. _2)Двигаем мопеды на 50 км, переливаем бензин из половины мопедов в другую половину. Так у нас получается 25 мопедов с полностью заполненным баком топлива. Едем дальше и повторяем данное действие каждые 50 км. Подобным образом можно продвинуться на 350 километров.\",\"assets/voise/1qUs72.mp3\",\"https://tproger.ru/articles/10-logicheskih-zadach-s-sobesedovanij-kotorye-zastavjat-zastrelitsja/\"],[\"Какие виды тест планов вы знаете ?\",\"Чаще всего на практике приходится сталкиваться со следующими видами тест планов: _ • Мастер Тест План (Master Plan or Master Test Plan) _ • Тест План (Test Plan), назовем его детальный тест план) _ • План Приемочных Испытаний (Product Acceptance Plan) - документ, описывающий набор действий, связанных с приемочным тестированием (стратегия, дата проведения, ответственные работники и т.д.) \",\"assets/voise/1qUs73.mp3\",\"http://www.protesting.ru/testing/plan.html\"],[\"Расскажите о своем последнем проекте.\",\"Разработал, протестирвоал и автоматизировал тетсирвоание для приложения QA-quest единолично! Спасибо телеграм боту @dumebot он связан с ChatGPT, попробуйте ограничений нет! \",\"assets/voise/1qUs74.mp3\"],[\"Для чего используют системы контроля версий?\",\" Системы контроля версий — это программные инструменты, помогающие командам разработчиков управлять изменениями в исходном коде с течением времени. В свете усложнения сред разработки они помогают командам разработчиков работать быстрее и эффективнее.\",\"assets/voise/1qUs75.mp3\"],[\"Что такое Git? Каков принцип его работы?\",\"Git — это набор консольных утилит, которые отслеживают и фиксируют изменения в файлах (чаще всего речь идет об исходном коде программ, но вы можете использовать его для любых файлов на ваш вкус). \",\"assets/voise/1qUs76.mp3\"],[\"Что такое commits, branches в Git?\",\"Можно сказать, что коммит это основной объект в любой системе управления версиями. В нем содержится описание тех изменений, которые вносит пользователь в код приложения. В Git коммит состоит из нескольких так называемых объектов. _Команда git branch позволяет создавать, просматривать, переименовывать и удалять ветки. Она не дает возможности переключаться между ветками или выполнять слияние разветвленной истории. Именно поэтому команда git branch тесно связана с командами git checkout и git merge .\",\"assets/voise/1qUs77.mp3\"],[\"Для чего нужны GitHub, GitLab и другие, базирующиеся на Git, вебхостинги проектов?\",\"GitHub - это репазиторий в которой храниться наши файлы продукта как в откртом досупе так и в закрытом и системой контрлся весриий .  GitLab является конкурентом GitHub, в котором среди многих других проектов размещается разработка ядра Linux Линуса Торвальдса. Поскольку GitLab разрабатывается на той же основе управления версиями (Git), принцип их работы схож. GitLab поддерживает как публичные, так и неограниченное количество частных ветвей разработки. \",\"assets/voise/1qUs78.mp3\"],[\"Дайте определения Баг Репорта? опишите структуру баг репорта!\",\"Баг репорт - это документ, описывающий ситуацию или последовательность действий приведшую к некорректной работе объекта тестирования, с указанием причин и ожидаемого результата. ID (идентификатор) _Название (Title) _Короткое описание (Summary)_Проект (Project)_Компонент приложения (Component)_Номер версии (Version)_Серьезность (Severity)_Приоритет (Priority)_Статус (Status)_Автор (Author)_Назначен на (Assignee)_Окружение (Environment)_App/build version _версия билда/приложения) _Шаги воспроизведения (Steps to Reproduce) _Фактический Результат (Actual Result) _Ожидаемый результат (Expected Result) _Screenshots (скриншоты) \",\"assets/voise/1qUs79.mp3\"],[\"что такое Операционное тестирование\",\"Операционное тестирование — это процесс проверки работоспособности системы или приложения в реальных условиях использования. В рамках операционного тестирования осуществляется проверка стабильности, производительности и функциональности программного продукта при условии реального использования его конечными пользователями. Оно выполняется на всех этапах жизненного цикла программного обеспечения и позволяет выявлять ошибки и недочеты, уточнять требования к системе, а также определять ее готовность для выпуска на рынок.\",\"assets/voise/1qUs80.mp3\"],[\" Что такое CI?\",\"CI — это сборка, деплой и тестирование приложения без участия человека. __CI (Continuous Integration) - это методология разработки программного обеспечения, которая предусматривает частое и автоматизированное объединение всех изменений в коде от различных разработчиков в единую версию приложения. Она направлена на сокращение времени, затрачиваемого на слияние кода, обнаружение и устранение ошибок на ранних этапах разработки. CI также может включать автоматизированные тесты и контроль качества кода. \",\"assets/voise/1qUs81.mp3\"],[\" Как автоматическое тестирование интегрируется в CI?\",\"Автоматическое тестирование интегрируется в CI с помощью платформы непрерывной интеграции. Когда разработчик отправляет код в репозиторий, сервер CI автоматически получает обновление, компилирует код, запускает автоматические тесты и дает обратную связь о том, прошли ли тесты или нет. Если все тесты прошли успешно, CI сервер выполняет сборку проекта и развертывание на тестовом окружении. Это позволяет разработчикам мгновенно получать обратную связь о качестве и производительности кода, а также своевременно обнаруживать проблемы, которые могут возникнуть при интеграции новых функций в проект.\",\"assets/voise/1qUs82.mp3\"],[\" Как настроить Job или Pipeline на знакомом вам CI-инструменте?\",\"1. Создать файл конфигурации для Job или Pipeline (например, в формате YAML или JSON). __2. Определить шаги, необходимые для выполнения в процессе сборки и тестирования приложения (например, скачивание зависимостей, запуск тестов, сборка приложения и т.д.). __3. Указать условия запуска Job или Pipeline (например, при каждом коммите в ветку master, при тегировании релиза и т.д.). __4. Настроить уведомления о результатах сборки и тестирования (например, отправка сообщений в Slack, почту или другие уведомления). __5. Сохранить и загрузить конфигурацию в CI-инструмент.  Конечно, процесс настройки Job или Pipeline может быть различным для каждого CI-инструмента, и настроенная конфигурация может зависеть от конкретных потребностей проекта. __В любом случае, следуйте документации инструмента и примерам других проектов для получения более конкретной информации.\",\"assets/voise/1qUs83.mp3\"],[\" Какие инструменты для генерации репорта после выполнения автоматических тестов вы знаете?\",\"Я знаю несколько инструментов для генерации репорта после выполнения автоматических тестов, например: __ 1. TestNG - это фреймворк и библиотека для тестирования, который может генерировать отчеты о тестировании в формате HTML/XML. __ 2. JUnit - это еще один фреймворк для тестирования, который поддерживает генерацию отчетов в форматах HTML/XML и CSV. __ 3. Allure - это инструмент для генерации красивых и понятных отчетов о тестировании в формате HTML. Он также поддерживает интеграцию с различными фреймворками для тестирования. __ 4. ReportPortal - это энтерпрайз-уровневая платформа для тестирования, которая может генерировать отчеты в реальном времени и интегрироваться с различными инструментами для тестирования. __ 5. ExtentReports - это еще один инструмент для генерации красивых и информативных отчетов о тестировании в формате HTML. Он также поддерживает интеграцию с различными фреймворками для тестирования и языками программирования.\",\"assets/voise/1qUs84.mp3\"],[\"Какую информацию должен содержать отчет о выполнении автоматических тестов?\",\"Отчет о выполнении автоматических тестов должен содержать следующую информацию: __ 1. Имя и описание тестового сценария __ 2. Дату и время выполнения теста __ 3. Имя и версию программного обеспечения, на котором тестирование проводилось __ 4. Базовые данные, на которых был выполнен тест __ 5. Список всех прошедших тестов и тех, которые не прошли __ 6. Количество выполненных тестов и процент прохождения тестов __ 7. Продолжительность тестового запуска __ 8. Информацию о производительности системы, такую как загрузку процессора и оперативной памяти. __ 9. Лог ошибок и предупреждений из тестового запуска __ 10. Скриншоты ошибок, если они были зарегистрированы __ 11. Список шагов, которые необходимо предпринять для исправления ошибок.\",\"assets/voise/1qUs85.mp3\"],[\"Что такое клиент-серверная архитектура?\",\"Клиент-серверная архитектура - это модель взаимодействия компьютерных систем, основанная на разделении функций и обязанностей между клиентами и серверами. В этой архитектуре клиент отправляет запрос на сервер, который обрабатывает запрос и возвращает результат клиенту. __ Клиенты и серверы могут быть физически расположены на разных устройствах и могут использовать разные операционные системы и языки программирования. Эта архитектура позволяет распределить вычислительную нагрузку и обезопасить данные благодаря централизованной обработке данных на сервере. Примерами клиент-серверных приложений являются веб-сайты, электронная почта и базы данных.\",\"assets/voise/1qUs86.mp3\"],[\"Что может выступать в роли клиента?\",\"Клиентом в клиент-серверной архитектуре может быть любое устройство или приложение, которое обращается к серверу для получения какого-либо сервиса или информации. _Например: __ - Веб-браузер, используемый для доступа к веб-сайту. __ - Мобильное приложение, которое подключается к серверу для получения данных или обновлений. - Почтовый клиент, который обращается к почтовому серверу для отправки и получения сообщений. __ - Клиентская программа, которая используется для доступа к базе данных или другому приложению на сервере. __ - Игровой клиент, который подключается к игровому серверу для игры в онлайн-игры.\",\"assets/voise/1qUs87.mp3\"],[\"Что такое REST API, SOAP? В чем разница?\",\"REST (Representational State Transfer) API и SOAP (Simple Object Access Protocol) - это два подхода к созданию веб-сервисов.  REST является архитектурным стилем, который основан на использовании HTTP протокола. __ REST API работает через URL-адрес, каждый из которых определяет ресурс, с которым клиент хочет взаимодействовать. _REST использует HTTP методы, такие как GET, POST, PUT и DELETE, чтобы выполнить операции с ресурсами. REST API обычно возвращает данные в формате JSON или XML. __ SOAP, по сравнению с REST, является более сложным и тяжеловесным. _В SOAP всё упаковано в формат XML, и каждый запрос и ответ на него имеет свою собственную структуру. В отличие от REST, SOAP использует XML для описания содержимого, а не только для передачи данных. SOAP API обычно работает через формирование XML-структур запросов, отправляемых на веб-сервис, а ответ на запрос также имеет форму XML-структуры.  Разница между ними заключается в том, что REST API является легким, гибким и быстрым, а SOAP – более мощным и надежным, но тяжеловесным и неудобным в разработке. REST API широко используется для лёгких веб-приложений, в то время как SOAP используется в крупных проектах, требующих высокой надёжности и безопасности.\",\"assets/voise/1qUs88.mp3\"],[\"Какие протоколы передачи данных знаете?\",\"1. HTTP (Hypertext Transfer Protocol) - используется для передачи гипертекстовых документов, таких как веб-страницы, из сервера в веб-браузер. __ 2. FTP (File Transfer Protocol) - используется для передачи файлов между компьютерами в сети. __ 3. TCP (Transmission Control Protocol) - протокол управления передачей данных. Используется для установления надежного соединения между компьютерами и контролирует, чтобы данные были переданы без ошибок. __ 4. UDP (User Datagram Protocol) - протокол передачи данных без установления соединения. Используется для передачи потоковых медиа-данных, таких как звук и видео. __ 5. SMTP (Simple Mail Transfer Protocol) - протокол передачи электронной почты. __ 6. IMAP (Internet Message Access Protocol) - Интернет Протокол доступа к сообщениям. Используется для получения электронных писем с сервера электронной почты. __ 7. POP3 (Post Office Protocol Version 3) - протокол доступа к электронной почте. Используется для получения почты с сервера. __ 8. SSH (Secure Shell) - протокол защищенной удаленной командной строки. Используется для обеспечения безопасной удаленной работы с другими компьютерами. __ 9. DNS (Domain Name System) - протокол разрешения имен доменов в IP-адреса. __ 10. SNMP (Simple Network Management Protocol) - протокол управления сетью. Используется для мониторинга и управления различными элементами сети.\",\"assets/voise/1qUs89.mp3\"],[\"Какие способы взаимодействия с API существуют? В чем разница между ними?\",\"Существует несколько способов взаимодействия с API:  __ 1. HTTP-запросы: это наиболее распространенный и простой способ, который используется для запроса информации у API-сервера. Этот способ позволяет получить данные в формате JSON или XML, а также отправить данные на сервер. __ 2. Библиотеки: некоторые разработчики создают библиотеки, которые позволяют отправлять запросы к API и получать ответы без изучения синтаксиса HTTP-запросов. __ 3. SDK и абстракции: это специальные инструменты, которые предоставляют разработчикам готовый код для взаимодействия с API, а также упрощают процесс разработки.  __Разница между этими способами заключается в уровне сложности и гибкости. HTTP-запросы являются самым гибким способом работы с API, так как они позволяют отправлять любые запросы и получать любые ответы. Однако, этот способ требует большого количества знаний и опыта работы с HTTP-запросами. Использование библиотек и SDK позволяет упростить процесс работы, но они могут иметь ограничения в функциональности и возможностях настройки.\",\"assets/voise/1qUs90.mp3\"],[\"Как можно протестировать API, что там нужно проверять?\",\"Существует несколько шагов, которые помогут протестировать API: __ 1. Проверить соответствие документации: Сперва следует проверить, соответствует ли API документации. Дополнительно можно использовать инструменты автоматизации тестирования API, чтобы сравнить реальный результат API с ожидаемым результатом. __ 2. Проверить качество ответов: Проверка качества ответа может дать представление о том, насколько хорошо API работает. Она может также помочь в определении возможных проблем, которые могут влиять на работу API. __ 3. Проверить защиту API: Необходимо убедиться, что API защищено от возможных угроз безопасности. Это может включать в себя проверку наличия SSL-сертификата, аутентификации пользователей и т.д. __ 4. Проверить производительность API: Необходимо выполнить нагрузочное тестирование, чтобы определить, насколько API устойчив к большому количеству запросов.  __ 5. Проверить доступность и надежность: Убедиться, что API доступен и надежен для пользования. __ 6. Проверить работу методов и параметров: Следует проверить все методы и параметры, чтобы убедиться, что они работают должным образом. __ 7. Проверить ошибки и исключения: Необходимо проверить, что API обработывает ошибки и исключения должным образом.  Это лишь некоторые шаги, которые следует выполнить при проверке API. __ Кроме того, можно использовать инструменты автоматизации тестирования API, которые помогут ускорить процесс тестирования и уменьшить количество ошибок.    \",\"assets/voise/1qUs91.mp3\"],[\"Как расшифровывается CRUD?\",\"CRUD – аббревиатура, которая описывает основные операции, которые могут выполняться в базах данных и приложениях:  __- Create (создание) _- __ Read (чтение) _- __ Update (обновление) _- __ Delete (удаление) __ Также эти операции могут называться как 'Создать', 'Прочитать', 'Обновить', 'Удалить'.\",\"assets/voise/1qUs92.mp3\"],[\"Чем отличается GET от POST?\",\"GET и POST - два основных метода HTTP-запросов, используемых клиентами для взаимодействия с веб-сервером.  GET - это метод HTTP-запроса, который используется для получения данных с сервера. Параметры запроса передаются в URL-адресе. В запросах метода GET параметры передаются самим URL-адресом. Они отображаются в адресной строке браузера и могут быть закешированы браузером. GET-запросы могут использоваться для извлечения информации, но не для изменения или удаления ее.  POST - это метод HTTP-запроса, который используется для отправки данных на сервер. Параметры запроса передаются в теле запроса, а не в URL-адресе. POST-запросы не закешируются браузером. Они могут использоваться для создания, изменения или удаления информации на сервере.  В общем, GET-запросы используются для извлечения информации, а POST-запросы - для создания, изменения или удаления информации. GET-запросы быстрее и проще POST-запросов, но не безопасны, тогда как POST-запросы могут обеспечить более высокий уровень безопасности данных. Однако для построения более сложных приложений часто используются оба метода.  \",\"assets/voise/1qUs93.mp3\"],[\"Какие отличия между XML и JSON?\",\"XML (Extensible Markup Language) и JSON (JavaScript Object Notation) - это два разных формата представления данных без типизации. Они широко используются в современном программном обеспечении для передачи и хранения данных.  Некоторые отличия между XML и JSON:  1. Синтаксис: XML представляет данные в виде древовидной структуры с помощью разметки тегов, а JSON использует скобки для обозначения объектов и массивов.  2. Читабельность: JSON более читаемый, чем XML, потому что он использует простую синтаксическую структуру.  3. Размер: JSON файлы меньше, чем XML файлы, потому что JSON использует более компактную структуру данных.  4. Обработка: JSON обрабатывается быстрее, чем XML, потому что его структура более простая.  5. Типизация: XML позволяет задавать схемы документов, что облегчает проверку правильности передаваемых данных.  6. Кроссплатформенность: JSON лучше подходит для обмена данными между программными системами и для работы в веб-приложениях, потому что он является более кроссплатформенным. XML может быть более удобен для обработки и просмотра в определенных условиях.\",\"assets/voise/1qUs94.mp3\"],[\"Какие знаете форматы передачи данных?\",\"Я могу перечислить несколько форматов передачи данных:  1. Текстовый формат: обычно используется для передачи простых сообщений, написанных в текстовой форме. Примерами таких форматов могут быть TXT, CSV, XML, JSON.  2. Бинарный формат: используется для передачи более сложных данных, таких как изображения, звук, видео, а также для сжатия данных. Примерами таких форматов могут быть JPG, MP3, AVI, ZIP.  3. Базы данных: используются для хранения и передачи большого объема структурированных данных. Примерами таких форматов могут быть MySQL, Oracle, PostgreSQL.  4. Протоколы обмена данными: используются для передачи данных через сеть или Интернет. Примерами таких протоколов могут быть HTTP, FTP, SSH.  5. Графический формат: используется для передачи изображений. Примерами таких форматов могут быть BMP, GIF, PNG.  6. Видеоформат: используется для передачи видео. Примерами таких форматов могут быть MP4, AVI, MOV.    \",\"assets/voise/1qUs95.mp3\"],[\"Как происходит шифрование?\",\"Шифрование - это процесс преобразования информации в непонятный для посторонних символьный ключ, чтобы защитить данные от доступа неавторизованных пользователей. Существует множество методов шифрования, но основной принцип заключается в замене каждой буквы или символа на другой символ или последовательность символов. Расшифровка шифрованной информации возможна только при наличии ключа, который используется для преобразования зашифрованного текста обратно в исходный вид.   Примером может служить шифрование методом Цезаря, где каждая буква заменяется на следующую по алфавиту на определенное количество позиций, заданное ключом. Таким образом, слово 'hello' может быть зашифровано как 'khoor', если ключом является число 3. Для расшифровки этого слова нужно перевести каждую букву на три позиции в обратную сторону.   Современные методы шифрования используют более сложные алгоритмы, такие как AES (Advanced Encryption Standard), RSA (Rivest–Shamir–Adleman), и другие, которые обеспечивают более высокую степень защиты данных при передаче по сети или хранении на устройствах.\",\"assets/voise/1qUs96.mp3\"],[\"Какие бывают виды баз данных?\",\"Существует множество различных типов баз данных, включая: __ 1. Реляционные базы данных (Relational Database Management System или RDBMS) - это наиболее распространенный тип баз данных, в которых данные хранятся в виде таблиц, состоящих из строк и столбцов. __ 2. Документоориентированные базы данных (Document-Oriented Database) - это базы данных, в которых данные хранятся в виде документов, как правило в формате JSON или XML. __ 3. Нереляционные базы данных (NoSQL) - это базы данных, которые не используют традиционные таблицы для хранения данных, а вместо этого используют иные методы хранения, такие как графы, столбцы и ключ-значение. __ 4. Объектно-ориентированные базы данных (Object-Oriented Databases) - это базы данных, в которых данные хранятся в форме объектов, таких как классы и экземпляры. __ 5. Графовые базы данных (Graph Database) - это базы данных, которые предназначены для работы с графами, где узлы представляют объекты, а ребра представляют отношения между объектами. __ 6. In-memory базы данных (In-Memory Database) - это базы данных, в которых данные хранятся в оперативной памяти компьютера для быстрого доступа к ним.  Кроме того, могут существовать и другие типы специализированных баз данных, таких как пространственные базы данных, временные базы данных и т.д. Большинство современных баз данных являются мультипользовательскими, что позволяет нескольким пользователям работать с одним и тем же набором данных одновременно.\",\"assets/voise/1qUs97.mp3\"],[\"Охарактеризуйте каждый класс status code (1хх; 2xx; 3xx; 4xx; 5xx).\",\"1xx - информационные коды ответа сервера, показывающие, что сервер получил запрос и продолжает обработку; __ 2xx - успешные коды ответа, означают, что сервер успешно обработал запрос и вернул запрошенные данные; __ 3xx - коды ответа, требующие перенаправления, они сообщают клиенту, что запрашиваемый ресурс был перемещен по другому адресу; __ 4xx - ошибки, произошедшие в процессе выполнения запроса со стороны клиента, например, неправильный URL, отсутствие авторизации, доступ запрещен, и др.; __ 5xx - ошибки, возникшие со стороны сервера, которые препятствуют выполнению запроса клиента, например, проблемы с файловой системой, сетевые ошибки, недоступность базы данных и т.д.\",\"assets/voise/1qUs98.mp3\"],[\"Какие есть HTTP-методы?\",\"HTTP-методы (или HTTP-глаголы) используются для указания типа действий, которые требуется выполнить на сервере с определенным ресурсом. Вот некоторые из наиболее распространенных HTTP-методов:  1. GET: Получить данные или содержимое определенного ресурса. Метод GET используется для простых запросов, в которых не требуется отправлять какие-либо данные.  2. POST: Отправить данные на сервер для создания или обновления определенного ресурса. Метод POST используется для отправки данных в теле запроса.  3. PUT: Обновить данные определенного ресурса. Метод PUT используется для полной замены или обновления содержимого ресурса.  4. DELETE: Удалить определенный ресурс. Метод DELETE используется для удаления определенного ресурса.  5. HEAD: Получить только метаданные определенного ресурса. Метод HEAD получает только заголовки HTTP-ответа, без тела ответа.  6. OPTIONS: Получить информацию о доступных методах, поддерживаемых сервером, для ресурса.  7. PATCH: Обновить только определенные части данных определенного ресурса.  Каждый вариант имеет свой собственный синтаксис, который должен быть включен в каждый HTTP-запрос.\",\"assets/voise/1qUs99.mp3\"],[\"Какие знаете Web elements?\",\"1) Текстовые поля 2) Кнопки 3) Выпадающие списки 4) Формы 5) Чек-боксы 6) Радио-буттоны 7) Ссылки 8) Изображения 9) Видео-плееры 10) Аудио-плееры и т.д\",\"assets/voise/1qUs100.mp3\"],[\"Какие браузеры знаете? В чем их отличие?\",\" 1. Google Chrome - быстрый и удобный браузер с большим числом дополнительных сервисов, таких как автозаполнение форм, чтение QR-кодов, встроенный перевод страниц.  2. Mozilla Firefox - браузер с открытым исходным кодом, в котором уделяется большое внимание безопасности и увеличению скорости работы.  3. Apple Safari - браузер, созданный для операционных систем Mac и iOS, который хорошо интегрирован с другими продуктами Apple и обеспечивает высокое качество отображения страниц.  4. Microsoft Edge - браузер, разработанный компанией Microsoft, который занимает меньше ресурсов компьютера и имеет высокую скорость работы.  5. Opera - браузер со встроенным VPN и множеством возможностей для настройки и персонализации интерфейса.  Отличия этих браузеров могут быть связаны с разными установками по умолчанию, наличием различных инструментов и опции настройки, степенью интеграции с другими приложениями и сервисами, скоростью работы и безопасностью.\",\"assets/voise/1qUs101.mp3\"],[\"Для чего необходимы инструменты разработчика в браузере (Chrome DevTools) и как они помогают в тестировании.\",\"Помогают деюажить найденый баг для лаколизации и выяснения точки возникновения!\",\"assets/voise/1qUs102.mp3\"],[\"Что такое кэш бразуера?\",\"Кэш браузера – это временные файлы, которые браузер загружает и хранит на компьютере пользователя для быстрого доступа к ранее посещенным страницам и ресурсам. __ Кэш содержит копии изображений, скриптов, HTML-кода и другой контент, который браузер загружает с интернет-сайтов. Благодаря кэшу браузера, интернет-страницы загружаются быстрее, так как большую часть необходимой информации браузер уже имеет на компьютере пользователя. __Однако, в некоторых случаях, кэш браузера может стать причиной проблем с отображением веб-страниц, и его очистка может помочь исправить эти проблемы.\",\"assets/voise/1qUs103.mp3\"],[\"Что такое сессия бразуера?\",\"Сессия в браузере – это период времени с момента открытия браузера до его закрытия, во время которого пользователь взаимодействует с веб-сайтами._ В течение сессии браузер запоминает информацию о посещенных сайтах, заполненных формах, авторизации на сайтах и других действиях пользователя. Сессия может быть закрыта как пользователем, так и автоматически браузером при перезапуске или при достижении определенного времени простоя.\",\"assets/voise/1qUs104.mp3\"],[\"Зачем нужны cookies бразуера ?\",\"Cookies браузера используются для хранения информации о пользователе и его действиях на сайте. Они помогают упростить пользовательский опыт, например, сохраняя логин и пароль на сайте, а также предоставляя персонализированную информацию в соответствии с предыдущими действиями пользователя. Кроме того, cookies могут использоваться для отслеживания поведения пользователей на сайте, что помогает улучшить качество сервиса и анализировать эффективность рекламных кампаний.\",\"assets/voise/1qUs105.mp3\"],[\"Что такое фрейм?\",\"Фрейм (англ. frame) может иметь несколько значений: __ 1. Веб-фрейм (англ. web frame) – это программный фреймворк, который обеспечивает возможности для разработки веб-приложений. Он представляет собой совокупность стандартных архитектурных решений, методик и библиотек программ для написания простых и сложных веб-сайтов, а также веб-приложений. __ 2. Фрейм (англ. frame) – это элемент структуры данных, используемый в компьютерных науках для хранения информации. Фрейм обычно используется для описания объектов реального мира или абстрактных концепций, и состоит из набора полей, каждое из которых хранит свойства объекта. __ 3. Фрейм (англ. frame) – это состояние выполнения функции, которое содержит значения всех локальных переменных, параметров функции и указатель возврата. Это понятие является важным для понимания работы компьютерных языков программирования. \",\"assets/voise/1qUs106.mp3\"],[\"Что такое HTML/CSS/JavaScript?\",\"HTML (от англ. Hyper Text Markup Language) - язык разметки, который используется для создания структуры веб-страниц и определения содержимого на странице. __ CSS (от англ. Cascading Style Sheets) - это язык стилей, который используется для оформления веб-страниц с помощью указания цвета, шрифта, расстояний и других параметров. __ JavaScript - это скриптовый язык, который используется для добавления интерактивности и динамики на веб-страницы. JavaScript может быть использован для создания игр, анимации, форм и других элементов веб-страницы.  Все три компонента необходимы для создания современных веб-страниц и приложений. HTML определяет структуру и содержание страницы, CSS задает ее визуальное оформление, а JavaScript позволяет создавать интерактивность и динамические элементы на странице.\",\"assets/voise/1qUs107.mp3\"],[\"Какую структуру имеет веб-страница?\",\"древовидная структура\",\"assets/voise/1qUs108.mp3\"],[\"Зачем чистить кэш?\",\"Используя жестку перезагрузку страницы!\",\"assets/voise/1qUs109.mp3\"],[\"Какие виды тестирования можно применить только к Web?\",\"Как и для любого другого типа программного обеспечения, для веб-приложений также могут использоваться различные виды тестирования. Ниже приведены некоторые типы тестирования, которые особенно полезны при тестировании веб-приложений:  1. Тестирование совместимости браузеров - проверка того, как ваше приложение работает в различных браузерах и на разных устройствах.  2. Тестирование нагрузки и производительности - измерение производительности вашего приложения при различных нагрузках и поиск узких мест.  3. Тестирование безопасности - исследование уязвимостей и обеспечение защищенности вашего приложения от атак.  4. Полное функциональное тестирование - проверка всех функций вашего приложения на соответствие заданным требованиям.  5. Тестирование удобства использования (usability testing) - проверка того, насколько ваше приложение удобно для пользователя, а также проверка пользовательского интерфейса и удобства работы с приложением.  6. Тестирование совместимости с операционными системами - проверка того, как ваше приложение работает на различных версиях операционных систем.  Однако некоторые виды тестирования могут быть применены и к другим типам программного обеспечения, кроме веб-приложений. Например, тестирование нагрузки и производительности может быть применено не только к веб-приложениям, но и к серверам баз данных, а тестирование безопасности может быть применено к любому типу приложений, которые взаимодействуют с интернетом.\",\"assets/voise/1qUs110.mp3\"],[\"Для чего в веб-страницах используют JavaScript?\",\"для добавления интерактивности и динамики на веб-страницы.\",\"assets/voise/1qUs111.mp3\"],[\"Что такое REST?\",\"REST — это архитектурный стиль для создания веб-сервисов и API. Он предоставляет простой и гибкий подход к передаче и обмену данными между клиентами и серверами.  REST использует HTTP-протокол для передачи данных между клиентом и сервером и определенную набор операций, таких как GET, POST, PUT и DELETE, для обработки запросов и ответов.  Основными принципами REST являются четкое разделение между клиентом и сервером, использование стандартных методов запросов и ответов, а также возможность кэширования данных для повышения производительности.  REST API позволяют приложениям взаимодействовать друг с другом, используя общие принципы и стандартные протоколы, что делает их легко масштабируемыми и совместимыми.\",\"assets/voise/1qUs112.mp3\"],[\"Что такое AJAX?\",\"AJAX (Asynchronous JavaScript and XML) - это технология, которая позволяет обращаться к серверу и получать или отправлять данные без перезагрузки страницы. AJAX использует асинхронные запросы, которые могут выполняться параллельно друг к другу, и динамически обновляет содержимое страницы без необходимости ее полной перезагрузки. AJAX широко используется в веб-разработке для создания динамических и интерактивных веб-приложений, таких как Gmail, Google Maps и Facebook.\",\"assets/voise/1qUs113.mp3\"],[\"Какие мобильные платформы существуют?\",\"Существует несколько популярных мобильных платформ: __ 1. Android - операционная система, разработанная компанией Google. __ 2. iOS - операционная система, разработанная компанией Apple для iPhone, iPad и iPod touch. __ 3. Windows Phone - операционная система, разработанная компанией Microsoft для смартфонов и планшетов. __ 4. BlackBerry OS - операционная система, разработанная компанией BlackBerry для своих устройств.  __ 5. Tizen - операционная система, разработанная компаниями Samsung и Intel. __ 6. KaiOS - операционная система, разработанная на базе Firefox OS для недорогих телефонов. __ 7. HarmonyOS - операционная система, разработанная компанией Huawei для своих устройств.\",\"assets/voise/1qUs114.mp3\"],[\"Какие версии Android и iOS используются на рынке (минимальные и максимальные)?\",\"Ниже приведены минимальные и максимальные версии операционных систем Android и iOS, используемых на рынке на март 2021 года:  Android: - Минимальная версия: Android 2.3 (Gingerbread) - Максимальная версия: Android 11  iOS: - Минимальная версия: iOS 9 - Максимальная версия: iOS 14.4  __ Обратите внимание, что эти данные не являются точными или исчерпывающими, и реальные версии, используемые на рынке, могут немного отличаться в зависимости от региона, устройства и других факторов.\",\"assets/voise/1qUs115.mp3\"],[\"Какие версии Android нужно тестировать, если заказчик сказал поддерживать с версии 5.0?\",\"Если заказчик сказал поддерживать Android с версии 5.0, то нужно тестировать как минимум следующие версии Android: __ - Android 5.0 Lollipop __- Android 5.1 Lollipop __ - Android 6.0 Marshmallow __- Android 7.0 Nougat __- Android 8.0 Oreo __- Android 9.0 Pie __- Android 10.0 Q __- Android 11.0 R  __Это позволит убедиться, что приложение работает корректно на наиболее популярных версиях операционной системы. Однако, если у заказчика есть более конкретные требования к версиям Android, то их нужно учитывать при тестировании.\",\"assets/voise/1qUs116.mp3\"],[\"Назовите типы мобильных приложений.\",\"1. Игровые приложения __ 2. Социальные сети и мессенджеры __ 3. Приложения для путешественников __ 4. Финансовые приложения __ 5. Приложения для питания и фитнеса __ 6. Новостные приложения __ 7. Приложения для создания и редактирования фото и видео __ 8. Мобильные книги и журналы __ 9. Приложения для покупок и доставки товаров и услуг __ 10. Медицинские приложения и здоровье.\",\"assets/voise/1qUs117.mp3\"],[\"Каков формат файлов сборок приложений для Android и iOS?\",\"Формат файлов сборок приложений для Android - APK (Android application package), а для iOS - IPA (iOS application archive).\",\"assets/voise/1qUs118.mp3\"],[\"Что такое ADB?\",\"ADB (Android Debug Bridge) - это инструмент, который позволяет разработчикам и продвинутым пользователям взаимодействовать с устройствами Android через командную строку на компьютере. С помощью ADB можно подключаться к Android-устройству через USB-кабель или по Wi-Fi, управлять им, устанавливать и удалять приложения, выполнять отладку, перезагружать устройство и многое другое. ADB является важным инструментом для разработки приложений для Android и решения проблем в работе операционной системы Android.\",\"assets/voise/1qUs119.mp3\"],[\"Как снять логи с AOS/IOS?\",\"Для снятия логов с операционных систем AOS/IOS необходимо выполнить следующие шаги: __ 1. Подключите устройство к компьютеру с помощью кабеля USB. __ 2. Откройте программу Terminal (командную строку) на компьютере. __ 3. Введите команду: 'adb logcat' для AOS или 'ios_log' для IOS и нажмите 'Enter'. __ 4. Откройте приложение на устройстве, для которого нужно снять логи. __ 5. Дождитесь ошибки или состояния, которые нужно записать в лог. __ 6. Нажмите Ctrl+C, чтобы остановить запись логов. __ 7. Логи сохраняются в текстовом формате, вы можете их прочитать в программе блокнот или любом другом редакторе текста. __ 8. Для удобства сохраните логи в отдельный файл для последующего анализа. __  Важно, что для работы с командами ADB на устройстве с ОС Android необходимо, чтобы на устройстве был включен режим разработчика, а также разрешено подключение по USB-отладке. __ На устройствах IOS подключение и снятие логов может быть немного сложнее, так как это может потребовать помощи профессиональных инструментов для разработки IOS приложений.\",\"assets/voise/1qUs120.mp3\"],[\"Что нужно проверять при использовании сканера отпечатка и Face ID?\",\"Существует несколько способов снять логи с Android-устройства. Рассмотрим наиболее распространенный из них:  1. С помощью Android Studio  - Подключите ваше устройство к компьютеру - Запустите Android Studio - Откройте вкладку Logcat - Выберите свое устройство в списке устройств и приложений - Запустите приложение на устройстве или откройте уже запущенное - Все логи будут отображаться в Logcat __ 2. С помощью командной строки ADB  - Подключите ваше устройство к компьютеру - Откройте командную строку на компьютере - Введите следующую команду: 'adb logcat > file.txt' (без кавычек) - Запустите приложение на устройстве или откройте уже запущенное - Логи будут записываться в файл 'file.txt' __ 3. С помощью приложения Logcat Reader  - Скачайте приложение Logcat Reader из Play Market - Запустите приложение на устройстве - Запустите приложение, логи которого нужно снять - Откройте приложение Logcat Reader - Все логи будут отображаться в приложении  Независимо от выбранного метода, логи можно использовать для поиска и исправления ошибок в приложении.\",\"assets/voise/1qUs121.mp3\"],[\"Как я могу запускать тесты Android без Appium?\",\"несколько популярных фреймворков для тестирования Android-приложений, которые вы можете использовать: __ 1. Espresso - это фреймворк тестирования для Android, который предлагает простой API для написания автоматизированных тестов. __ 2. Robolectric - это библиотека, которая предоставляет полную среду выполнения Android на компьютере разработчика, что позволяет более быстрое и простое тестирование. __ 3. UI Automator - это фреймворк тестирования, который используется для тестирования UI-компонентов Android и позволяет написать тесты, которые могут воспроизводить взаимодействие пользователя с приложением. __ 4. JUnit - это платформа для юнит-тестирования Java-приложений. Он может использоваться для написания и запуска автономных тестов, которые проверяют, что код выполняется ожидаемым образом. __ Некоторые из этих фреймворков могут работать в симуляторах Android-устройств, а некоторые могут быть настроены для запуска на реальных устройствах. _Поэтому рекомендуется ознакомиться с документацией каждого из фреймворков для выбора подходящего для ваших нужд.\",\"assets/voise/1qUs122.mp3\"],[\"Объясните концепцию дизайна Appium.\",\"Appium - это инструмент автоматизации тестирования мобильных приложений, который использует протоколы WebDriver для связи с приложениями на мобильных устройствах и эмуляторах.   Концепция дизайна Appium основана на идеи переносимости. Более конкретно, это означает, что тесты, написанные в Appium, должны исполняться на любом устройстве и операционной системе без изменений в исходном коде. _ Appium построен на принципе 'Zero-Config', что означает, что он не требует, чтобы пользователь осуществлял какие-либо дополнительные настройки или предоставлял какие-либо файлы установки для запуска тестов.   Это позволяет разработчикам тестировать приложения на разных устройствах с разными операционными системами, не переходя на другие инструменты. Кроме того, вы можете использовать любой язык программирования, поддерживаемый WebDriver, для написания своих тестов в Appium.  __ Основная идея дизайна Appium заключается в том, чтобы дать разработчикам мощный инструмент автоматизации для тестирования мобильных приложений, который легко настраивается и интегрируется в существующие рабочие процессы.\",\"assets/voise/1qUs123.mp3\"],[\"Программа производит чтение с трёх целых чисел, которые интерпретируются как длины сторон треугольника. Далее программа выдает сообщение о том, является ли треугольник неравносторонним, равнобедренным или равносторонним. напишите чек лист для проверки данной программы\",\"1. Входные данные: 3, 3, 3 (равносторонний треугольник)   _  Ожидаемый результат: Данный треугольник - равносторонний. __ 2. Входные данные: 5, 5, 6 (равнобедренный треугольник)  _   Ожидаемый результат: Данный треугольник - равнобедренный. __ 3. Входные данные: 4, 5, 6 (обычный треугольник)  _   Ожидаемый результат: Данный треугольник не является ни равносторонним, ни равнобедренным. __ 4. Входные данные: 0, 1, 2 (не является треугольником)    _ Ожидаемый результат: Ошибка! Данные не являются сторонами треугольника. __ 5. Входные данные: -1, 2, 3 (не является треугольником)   _  Ожидаемый результат: Ошибка! Данные не являются сторонами треугольника.\",\"assets/voise/samCh.mp3\"],[\"Напишите сценарии автоматического тестирования для сортировки по цене и добавлению товара в корзину на сайте https://www.saucedemo.com/ . К вашим тестам добавьте документацию с настройками и разместите ваше решение на GitHub.\",\"звучит как бесплатная работа на компанию\",\"assets/voise/samCh.mp3\"],[\"Написать чеклист для функционала корзины в интернет-магазине.\",\"1. Добавление товара в корзину: _- При клике на кнопку «добавить в корзину» товар должен добавляться в корзину. - Количество выбранных товаров должно отображаться рядом с иконкой корзины. _- После добавления товара пользователь должен видеть сообщение, подтверждающее успешное добавление. __ 2. Просмотр корзины: _- После добавления товара пользователь должен переходить на страницу корзины. _- В корзине должно отображаться название, изображение, цена, количество товаров и стоимость каждого товара._ - Общая стоимость товаров должна отображаться внизу страницы. __ 3. Изменение количества товаров:_ - Пользователь должен иметь возможность увеличивать или уменьшать количество товаров, выбранных им в корзине. _- Общая стоимость товаров должна автоматически обновляться при изменении количества товаров. __ 4. Удаление товаров:_ - Пользователь должен иметь возможность удалить товар из корзины._ - После удаления товара, общая стоимость товаров должна автоматически обновиться. __ 5. Оформление заказа:_ - Пользователь должен иметь возможность перейти на страницу оформления заказа, где он сможет указать свои контактные данные и адрес доставки._ - При оформлении заказа должна быть предусмотрена возможность выбора способа оплаты и доставки. _- После успешного оформления заказа пользователь должен получить подтверждение о том, что заказ принят в обработку. __ 6. Сохранение корзины: - Если пользователь закрыл страницу корзины, состояние корзины должно сохраняться. _- Пользователь должен иметь возможность продолжить покупки в интернет-магазине позже. _- Состояние корзины должно сохраняться до того момента, пока пользователь не завершит покупку или не очистит корзину.\",\"assets/voise/samCh.mp3\"],[\"Написать тестовые наборы данных для поля ввода даты, которое отсеивает пользователей в возрасте до 18 лет.\",\"1. Дата рождения пользователя - 01.01.2005 (пользователь моложе 18 лет) __ 2. Дата рождения пользователя - 01.01.1999 (пользователь старше 18 лет) __ 3. Дата рождения пользователя - 15.03.2010 (пользователь моложе 18 лет) __ 4. Дата рождения пользователя - 05.05.1988 (пользователь старше 18 лет) __ 5. Дата рождения пользователя - 20.12.2003 (пользователь моложе 18 лет) __ 6. Дата рождения пользователя - 10.10.2002 (пользователь моложе 18 лет) __ 7. Дата рождения пользователя - 01.01.2000 (пользователь старше 18 лет) __ 8. Дата рождения пользователя - 30.06.2001 (пользователь моложе 18 лет) __ 9. Дата рождения пользователя - 05.03.1996 (пользователь старше 18 лет) __ 10. Дата рождения пользователя - 25.09.2007 (пользователь моложе 18 лет)\",\"assets/voise/samCh.mp3\"],[\"Написать чеклист для тестирования формы ввода данных платежной карты.\",\"1. Проверьте наличие всех полей для ввода, включая номер карты, срок действия, CVV-код и имя владельца карты.  __ 2. Проверьте, что поля для ввода данных карты находятся в правильном порядке. __ 3. Проверьте, что поля для ввода ограничены только символами, соответствующими типу поля (например, только числовые значения для номера карты). __ 4. Проверьте, что поля для ввода корректно маскированы, чтобы скрыть введенные данные. __ 5. Проверьте, что форма ввода правильно проверяет наличие ошибок, таких как неправильный номер карты или неправильный код CVV. __ 6. Проверьте, что форма отображает сообщения об ошибках, если пользователь вводит недопустимые данные. __ 7. Проверьте, что форма правильно обрабатывает данные и выполняет платеж, когда все данные введены правильно. __ 8. Проверьте, что форма работает как ожидается на всех устройствах и браузерах.  __ 9. Проверьте, что форма обеспечивает безопасность данных, например, путем шифрования передачи данных. __ 10. Проверьте, что форма ввода данных карты соответствует стандартам PCI-DSS (Payment Card Industry Data Security Standard), предназначенным для обеспечения безопасности платежных данных.\",\"assets/voise/1qUs129.mp3\"],[\"Протестовать «карандаш» относительно различных видов тестирования. \",\"Вы сговорились что-ли?! __1. Функциональное тестирование:  _- Проверка способности к письму на бумаге  _- Отметка времени, сколько времени прошло после использования  _- Проверка заточки  _- Проверка удерживания свойства  _- Проверка фиксации крышки на конце карандаша  __ 2. Тестирование производительности:  _- Количество угла карандаша, которое можно использовать.  _- Количество использований перед заточкой  __ 3. Тестирование нагрузки: _ - Проверка прочности корпуса _ - Проверка прочности хвостовика  _- Проверка свойств одновременного использования нескольких карандашей   __   4. Тестирование совместимости: _ - Совместимость с механическими точилками _ - Совместимость с цветными карандашами других производителей __ 5. Тестирование безопасности: _ - Проверка на запах  _- Проверка на наличие вредных веществ  _- Проверка на нахождение вредных веществ в школьном окружении   Все тесты также должны быть произведены на различных средах использования, таких как детские рисунки, чертежи,  и т.д. , чтобы обычная работа с карандашом была эмулирована.\",\"assets/voise/1qUs130.mp3\"],[\" Есть Input поле, принимающее целые значения от 18 до 99 включительно. Надо протестировать с помощью техники тест-дизайна Boundary Values ​​Analysis и Equivalence Partitioning.\",\" - Вводим значение 17 - ожидаем сообщение об ошибке, так как значение меньше 18 __- Вводим значение 18 - ожидаем успешную обработку __- Вводим значение 50 - ожидаем успешную обработку __- Вводим значение 99 - ожидаем успешную обработку __- Вводим значение 100 - ожидаем сообщение об ошибке, так как значение больше 99 \",\"assets/voise/samCh.mp3\"],[\"Есть веб-страница с полями: e-mail, password и кнопкой submit. Необходимо привести примеры отрицательных тест-кейсов, которыми можно проверить эту страницу.\",\"удалить из дом дерева и вставить новый инпут тем  самое тем самым убрав проверки повешанные на этом инпуте\",\"assets/voise/samCh.mp3\"],[\" Привести примеры тест-кейсов для функционала, находящегося на нескольких страницах проекта (например, поле поиска).\",\"1. Отправка пустых полей формы _2. Отправка невалидного e-mail _3. Отправка короткого или слишком простого пароля _4. Ввод большого количества символов в поле e-mail или пароля _5. Использование специальных символов в поле e-mail или пароля _6. Отправка формы с неправильным именем пользователя _7. Ошибка при отправке формы из-за проблем в серверной части _8. Попытка отправки формы после истечения времени сессии.\",\"assets/voise/samCh.mp3\"],[\"Как протестировать процесс оплаты в интернет-магазине?\",\"1. Несколько раз протестировать оплату в режиме реального времени: попробуйте оплатить какой-нибудь товар, используя различные способы оплаты: кредитную карту, PayPal и т. д. Проверьте, проходит ли платеж без ошибок.  2. Проверьте, что информация о заказе правильно передается в систему платежей. Убедитесь, что все данные о заказе правильно переданы, включая сумму заказа, количество товаров, доставку и налоги.  3. Проверьте, что оплата обрабатывается в режиме реального времени. Проверьте, что платеж обрабатывается моментально и что касса продавца получает уведомление о проводке.  4. Проверьте, что оплата отображается в системе учета. Убедитесь, что информация о платеже отображается в системе учета, включая данные о покупателе, способе оплаты, сумме и времени проведения операции.  5. Проверьте, что информация о платеже защищена. Убедитесь, что информация о платеже защищена на всех этапах обработки, включая передачу, хранение и обработку данных.  6. Проверьте, что система платежей соответствует требованиям международных стандартов безопасности. Убедитесь, что система платежей соответствует действующим стандартам безопасности PCI DSS, чтобы избежать утечек данных и мошенничества.  7. Проверьте, что платежная система может обрабатывать платежи на высоком уровне нагрузки. Убедитесь, что система платежей может обрабатывать большое количество транзакций без сбоев.\",\"assets/voise/1qUs134.mp3\"],[\"Как протестировать сломанный тостер?\",\"\",\"assets/voise/1qUs135.mp3\"],[\"Объясните для 7-летнего ребенка, что такое база данных.\",\"База данных - это как большой ящик, в котором все важные вещи хранятся и упорядочиваются. Также это помогает людям хранить и находить информацию, например имена друзей, адреса, телефоны и т.д. __Базы данных используются, чтобы хранить информацию обо всем, от книг в библиотеке до всех вещей, которые мы покупаем в магазинах.\",\"assets/voise/1qUs136.mp3\"],[\"Определите необходимое количество функциональных тест-кейсов, чтобы проверить Log in форму.\",\"Количество функциональных тест-кейсов для проверки Log in формы зависит от различных факторов, таких как:  - требования к форме входа  - функциональные возможности приложения  - уровень сложности формы входа  - базовые варианты использования  - возможные для использования наборы тестовых данных  - типы пользовательских данных, используемых в форме входа и т.д.  Однако, в целом для проверки формы входа, можно использовать следующие тест-кейсы: 1. Проверка входа при использовании корректного логина и пароля 2. Проверка отображения сообщений об ошибке для некорректных данных (неверный логин, неверный пароль, пустые поля и т.д.) 3. Проверка возможности входа при использовании различных типов пользователя (администратор, пользователь, гость и т.д.) 4. Проверка возможности входа при использовании различных типов браузеров и устройств (настольный ПК, мобильные устройства) 5. Проверка возможности восстановления пароля и работоспособности ссылки для восстановления 6. Проверка возможности выхода из учетной записи  Эти тест-кейсы позволят достаточно полно и надежно проверить функциональность Log in формы. Однако, конкретное количество тест-кейсов может быть увеличено в зависимости от потребностей организации и требований к форме входа.\",\"assets/voise/1qUs137.mp3\"],[\"Есть форма регистрации в веб-приложении с полями (first name, last name, username, password, repeat password) и кнопкой Register. Какие проверки нужно провести?\",\"1. Проверка первого имени на валидность:    - Длина должна быть не меньше 2 символов    - Должно содержать только буквы  2. Проверка фамилии на валидность:    - Длина должна быть не меньше 2 символов    - Должно содержать только буквы  3. Проверка имени пользователя на валидность:    - Длина должна быть не меньше 4 символов    - Должно содержать только буквы и/или цифры  4. Проверка пароля на валидность:    - Длина должна быть не меньше 8 символов    - Должен содержать хотя бы одну букву в верхнем регистре, одну в нижнем регистре и одну цифру  5. Проверка повторения пароля на совпадение с паролем  6. Отображение сообщения об ошибке и блокировка отправки формы при несоответствии какого-либо из параметров указанным требованиям.\",\"assets/voise/samCh.mp3\"],[\"Поле username должно быть обязательным, но оно не является обязательным. Приведите пример баг-репорта, созданного для этой ошибки.\",\"Описание ошибки:  __ Поле username не является обязательным, хотя должно быть обязательным. __ Шаги воспроизведения:   _1. открыть веб сайт и перейти на страницу регистрации. _ 2. Оставить поле username пустым и заполнить остальные поля. _ 3. Нажмите на кнопку 'Зарегистрироваться'. __  Ожидаемый результат:   Система должна отобразить сообщение об ошибке и не допустить регистрацию без имени пользователя. __ Фактический результат:   Система разрешает регистрацию без имени пользователя и не отображает сообщение об ошибке.  _ Скриншоты:   Во вложении предоставлено изображение экрана, где видно, что поле username не помечено как обязательное, хотя должно быть обязательным.  _ Результат:   Ошибка подтверждена. Пожалуйста, исправьте поле username, чтобы оно стало обязательным для заполнения.\",\"assets/voise/samCh.mp3\"],[\"Как бы вы провели smoke-testing для приложения типа Telegram?\",\" __ 1. Проверка входа: пройдите через процесс регистрации и входа, чтобы убедиться, что пользователь может создать свой аккаунт и войти в него. Убедитесь, что это происходит легко и быстро, так как вход - это ключевой этап использования приложения. __ 2. Проверка отправки и получения сообщений: отправьте несколько сообщений с одного устройства и убедитесь, что они были успешно доставлены на другое устройство, зарегистрированное на этом же аккаунте. _Это позволит убедиться в работоспособности сервисной инфраструктуры. __ 3. Проверка бота: создайте несколько ботов и убедитесь, что они успешно отправляют сообщения на различные каналы и чаты, как требуется. _Это позволит убедиться в том, что функциональность бота работает должным образом, а также что он может использоваться в соответствии с ожидаемым процессом. __ 4. Проверка многопользовательской работы: провести си-муляцию с несколькими пользователями, используя различные устройства, чтобы убедиться, что приложение функционирует в коллаборативной среде так, как это предполагается. __ 5. Проверка функций безопасности: проверьте функции безопасности приложения, такие как авторизация через Touch ID или Face ID, защита конфиденциальности информации и степень защиты данных пользователя, а также защита от взлома клиент-серверной связи.  __ Эти проверки являются лишь некоторыми примерами smoke-testing для Telegram, и могут быть дополнены в зависимости от конкретных функциональных требований к приложению.\",\"assets/voise/1qUs138.mp3\"],[\"Есть таблица books с полями: name, price, page_count. Следует выбрать все имена книг, в которых price более 10 единиц и количество страниц от 20 до 100.\",\"SELECT name  _FROM books  _ WHERE price > 10 AND page_count BETWEEN 20 AND 100;\",\"assets/voise/samCh.mp3\"],[\" У вас есть функционал калькулятора, который доступен через веб-браузер по ссылке. Он имеет только функцию делить, так сказать, MVP-версию. Диапазоны для вписывания в числитель и делитель от 0,1 до 99,9. Вывод значения происходит автоматически, потому что front-end реализован на React JS. Как вы будете тестировать этот функционал? Какие виды тестирования примените? Какие техники тест-дизайна используете?\",\"Для тестирования данного функционала можно использовать следующие виды тестирования:  1. Функциональное тестирование – проверка соответствия функционала заданным требованиям. Например, проверка того, что результат деления двух чисел соответствует ожидаемому.  2. Граничное тестирование – проверка поведения при работе с граничными значениями. Например, ввод числа 0 в качестве делителя и проверка реакции программы на это.  3. Тестирование ввода данных – проверка корректности обработки данных, вводимых пользователем. Например, проверка того, что программа не допускает ввод символов или букв вместо чисел.  4. Тестирование вывода данных – проверка корректности вывода результата. Например, проверка того, что результат выводится в правильном формате и с необходимым числом знаков после запятой.  Техники тест-дизайна, которые могут быть использованы:  1. Эквивалентные классы – разбиение диапазона входных значений на эквивалентные классы и проведение тестирования на представителях каждого класса.  2. Граничное тестирование – тестирование на границах диапазона входных значений (например, на 0 и на максимально допустимом значении).  3. Тестирование на проникновение – проверка устойчивости системы к попыткам ввода некорректных данных.  4. Функциональное тестирование – проверка соответствия функционала системы заданным требованиям.  5. Тестирование обновлений – проверка корректной работы функционала после обновления программы или браузера.  6. Тестирование совместимости – проверка работоспособности функционала на разных браузерах и операционных системах.\",\"assets/voise/samCh.mp3\"],[\" Ваша компания разрабатывает программное обеспечение для медицинских систем, и вы тестируете компонент, управляющий дефибриллятором сердца. Вы заметили, что одно решение в тестовом модуле состоит из 34 независимых атомарных условий. Какой метод тестирования белого ящика следует выбрать для этого и почему?\",\"Для тестирования компонента, управляющего дефибриллятором сердца, с 34 независимыми атомарными условиями следует выбрать метод тестирования покрытия ветвей.  Этот метод тестирования белого ящика позволяет охватить все возможные пути выполнения кода и проверить каждую ветвь принятия решений отдельно. То есть все атомарные условия будут рассмотрены, и тесты будут созданы для каждой возможной комбинации.  Этот метод является достаточно комплексным, но он гарантирует полное покрытие всех возможных ветвей выполнения кода и помогает обнаружить потенциальные ошибки и дефекты в системе. __  Не знал о таком так что подробнее Метод тестирования покрытия ветвей (branch coverage testing) – это один из методов тестирования программного обеспечения, который используется для определения эффективности тестирования инструкций в программе.  Этот метод тестирования основывается на измерении процента ветвей кода, покрытых тестовыми случаями. В основе этого метода лежит идея о том, что для каждой ветви в коде будет создано тестовый случай, который проверяет, что эта ветвь выполняется правильно в различных сценариях выполнения программы.  Для тестирования покрытия ветвей необходимо провести следующие шаги:  1. Определить все ветви в программе. 2. Создать тестовые случаи для каждой ветви. 3. Запустить тесты и подсчитать количество покрытых ветвей. 4. Определить процент покрытия ветвей в программе.  Если процент покрытия ветвей высокий, например, 95% или более, это означает, что большая часть кода была протестирована и вероятность обнаружения ошибок в программе минимальна.  Метод тестирования покрытия ветвей очень эффективен в обнаружении ошибок в программе, но также требует большого количества времени и ресурсов при проведении тестирования. Поэтому этот метод тестирования обычно используется только для критически важных компонентов программы и не является универсальным методом тестирования для всех видов программного обеспечения.\",\"assets/voise/samCh.mp3\"]],[[\"Назовите обязанности QA?\",\" Некоторые из основных обязанностей QA включают: _ _1. Тестирование программного обеспечения, чтобы обнаружить ошибки, дефекты и проблемы производительности.  __2. Создание тестовых случаев и планов тестирования на основе требований. __ 3. Анализ требований и спецификаций для установления необходимых тестов. __ 4. Отслеживание прогресса тестирования, регистрация и отслеживание ошибок и дефектов. __ 5. Проверка соответствия результатов тестирования стандартам и критериям качества. __ 6. Улучшение процесса тестирования и разработки, в том числе продуктов. __ 7. Оценка производительности системы и определение потенциала для улучшения эффективности. __ 8. Работа в команде с другими участниками проекта, чтобы исправить ошибки и улучшить функциональность. __ 9. Создание документации, отчетов и других материалов, связанных с тестированием и качеством. __ 10. Соблюдение всех стандартов и руководств, связанных с тестированием и технологическим развитием.\",\"assets/voise/2qUs1.mp3\",\"https://netology.ru/blog/09-2022-who-is-qa#:~:text=QA%2D%D0%B8%D0%BD%D0%B6%D0%B5%D0%BD%D0%B5%D1%80%20%E2%80%94%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%81%D1%82%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B9,%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8%20%D1%8D%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%82%D1%8C%20%D0%BD%D0%B0%20%D0%B8%D1%85%20%D0%B8%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B8.\"],[\" Что знаете о тестировании нагрузки? В каком случае следует проводить такое тестирование? На каком этапе готовности продукта?\",\"Тестирование нагрузки - это процесс проверки системы на ее способность обрабатывать больший объем данных и транзакций, чем предполагалось. __Оно позволяет оценить производительность системы в условиях экстремальной нагрузки, определить максимальное количество пользователей, которые могут использовать систему одновременно, выявить узкие места и более раннее исправление проблем, которые могут возникнуть. __ Такое тестирование следует проводить в тех случаях, когда система должна обслуживать большое количество пользователей, проходить множество транзакций и операций. Это важно для веб-приложений, онлайн-магазинов, систем электронной коммерции, приложений для обработки финансовых операций и т. д.  __Тестирование нагрузки следует проводить в финальной стадии готовности продукта, перед его релизом. Однако, для более детального тестирования и более полного понимания производительности системы, такое тестирование может проводиться на ранних этапах разработки.\",\"assets/voise/2qUs2.mp3\"],[\"Что такое Таблица принятия решений (decision table) и как её можно использовать?\",\"Таблица принятия решений - это инструмент, который используется для оценки, сравнения и принятия решений между альтернативными вариантами. __Она представляет собой матрицу, в которой строки отображают различные критерии, а столбцы - варианты, которые необходимо сравнить.  __Пример использования таблицы принятия решений:  _Предположим, что вы планируете купить новый автомобиль и рассматриваете несколько моделей. Ваше решение будет зависеть от различных факторов, таких как стоимость, потребление топлива, безопасность, размеры, мощность двигателя и т.д.  _Для принятия решения можно использовать таблицу принятия решений. Например, вы можете создать таблицу со строками для каждого критерия (стоимость, потребление топлива, безопасность и т.д.) и столбцами для каждой модели автомобиля.  Затем вы можете оценить каждую модель автомобиля для каждого критерия, используя числа от 1 до 5 или даже от 1 до 10, где более высокое число означает лучший результат в каждом критерии. _Затем вы можете умножить оценки на веса каждого критерия, чтобы получить общую оценку для каждой модели.  Таким образом, таблица принятия решений позволяет вам более объективно оценить каждую альтернативу и принять более обоснованное решение на основе ваших предпочтений и потребностей.\",\"assets/voise/2qUs3.mp3\"],[\"Что может быть критериями запуска и завершения тестирования?\",\" Критерии запуска тестирования могут включать в себя: _- Завершение разработки ПО и готовность для тестирования _- Определение целей и ожиданий от тестирования _- Разработка тест-плана и тест-кейсов _- Готовность тестового окружения _- Наличие необходимого тестового оборудования и программного обеспечения _- Наличие достаточного количества времени и ресурсов для проведения тестирования  Критерии завершения тестирования могут включать в себя: _- Достижение целей и ожиданий от тестирования _- Полное прохождение тест-кейсов и выполнение всех требований к ПО _- Отсутствие критических и высокоприоритетных дефектов _- Согласие команды разработки на выпуск продукта _- Утверждение тест-отчета и документации _- Готовность к релизу и выпуску продукта в промышленную эксплуатацию.\",\"assets/voise/2qUs4.mp3\"],[\"Расскажите о вариантах интегрирования тестовой документации в проект, инструментах для работы с ней.\",\"Существует несколько вариантов интеграции тестовой документации в проект: _ _1. Интеграция в код: тестовые сценарии могут быть написаны в виде кода и встроены в проект. Например, в случае автоматизации тестирования, тестовые сценарии могут быть написаны на языках программирования и интегрированы в средства автоматического тестирования. _ 2. Интеграция в систему управления версиями: тестовая документация может быть добавлена в систему управления версиями (например, Git) и храниться вместе с кодом проекта. Это позволяет облегчить работу с разными версиями тестовой документации и сохранять ее историю изменений. _ 3. Интеграция в среду разработки: тестовые сценарии могут быть интегрированы в среду разработки (например, Visual Studio) и запускаться напрямую из нее. Это способствует повышению эффективности процесса тестирования, так как тестирование может проходить параллельно с разработкой. _ 4. Интеграция в систему управления проектами: тестовые документы могут быть добавлены в систему управления проектами (например, Asana, Jira) в виде разных задач, требующих решения. Это удобно для ведения учета прогресса тестирования и взаимодействия с другими членами команды.  Для работы с тестовой документацией существует множество инструментов. __ Некоторые из них:  __1. TestRail – это популярная система управления тестированием, которая позволяет создавать и управлять тестовыми сценариями, создавать отчеты и многое другое.  _ 2. Katalon Studio – это мощный инструмент автоматизации тестирования, который позволяет создавать тестовые сценарии, генерировать код и управлять тестовыми средами. _ 3. Microsoft Test Manager – это интегрированная среда для управления тестированием в Visual Studio. Она позволяет создавать, запускать и отслеживать процесс выполнения тестовых сценариев.  _4. Cucumber – это библиотека для языка Ruby, которая позволяет создавать тестовые сценарии в природном языке и автоматически генерировать код. _ 5. JUnit – это фреймворк для автоматического тестирования на языке Java, который позволяет создавать и запускать тесты напрямую из среды разработки.\",\"assets/voise/2qUs5.mp3\"],[\"Как организовать сквозное тестирование (e2e)?\",\"Для организации сквозного тестирования (end-to-end testing, E2E) необходимо выполнить следующие действия: __  1. Определить цели и задачи тестирования. _Это могут быть требования к функциональности, надежности, производительности, безопасности и другим параметрам приложения. __ 2. Выбрать инструменты для тестирования._ Существует множество инструментов для E2E-тестирования, таких как Selenium, Protractor, Nightwatch.js, TestCafe и другие. _Важно выбрать инструмент, который наиболее подходит для вашего проекта и обеспечивает удобство и эффективность тестирования. __ 3. Написать тесты. _Необходимо создать тестовые сценарии, которые проверяют все функции и взаимодействия между компонентами приложения. Тесты должны быть масштабируемыми, чтобы можно было легко добавлять новые тесты и сценарии. __ 4. Настроить процесс исследования тестов. _Создать план тестирования, который включает в себя задачи, тесты, сроки и отчеты. _Также необходимо определить процедуру устранения ошибок и отчетность о проделанной работе. __ 5. Запустить тесты. _Процесс запуска тестов может быть автоматическим или ручным. Важно проверить, что все тесты работают корректно и выявить проблемы, если они возникают. __ 6. Анализировать результаты тестирования._ Важно проанализировать результаты тестирования и выявить причины ошибок. _Часто бывает полезно использовать инструменты для анализа данных, такие как SonarQube или JaCoCo. __ 7. Устранить ошибки. _Ошибки необходимо исправлять как можно скорее после обнаружения. Также важно внести изменения в тесты, чтобы избежать повторного появления ошибок в будущем. __ 8. Повторить тестирование._ После исправления ошибок необходимо повторить тестирование чтобы убедиться, что проблемы не возникают повторно. __ 9. Документировать процесс. _ Важно документировать все шаги процесса тестирования, включая настройку тестов, результаты и действия по исправлению ошибок. Это позволит упростить работу в будущем и избежать повторения ошибок.  Все вышеперечисленные шаги помогают организовать эффективное сквозное тестирование и проверить приложение на соответствие требованиям.\",\"assets/voise/2qUs6.mp3\",\"https://habr.com/ru/company/mvideo/blog/559542/\"],[\"Напишите чек лист для тестирования реляционной базы данных ?\",\"1. Проверить соответствие схемы базы данных заданным требованиям и спецификациям. __2. Проверить правильность создания таблиц, полей и связей между ними. __3. Проверить правильность ограничений на базу данных (первичные ключи, уникальные индексы, внешние ключи, чек-констреинты, правила автоинкремента, и т.д.). __4. Проверить функциональность SQL-запросов на выбор данных, вставку новых записей, изменение и удаление данных. __5. Провести тестирование производительности базы данных, проверить скорость выполнения запросов, обработки данных и доступа по сети. __6. Проверить процедуры и триггеры на правильность выполнения, корректность создания и удаления. __7. Обеспечить защиту данных от несанкционированного доступа, хакерских атак и взлома. __8. Проверить возможность восстановления базы данных после сбоя, аварии или ошибки. __9. Проверить работоспособность резервных копий базы данных и возможность их восстановления. __10. Проверить заказы на техническую поддержку и гарантийное обслуживание базы данных, работу с обновлениями и исправлением ошибок.\",\"assets/voise/2qUs7.mp3\",\"http://losieva.blogspot.com/2016/07/david-tzemach.html\"],[\"Приведите примеры подходов для тестирования локализации.\",\"1. Тестирование региональных настроек: эта методика тестирования включает в себя проверку настроек региональных параметров, таких как формат даты, времени, валюты и др. в локализованной версии приложения. Тестирование таких настроек важно, чтобы убедиться, что они корректно поддерживают отображение и форматирование данных в соответствии со стандартами региональных настроек.  __2. Тестирование локализованного контента: этот подход тестирования включает в себя оценку перевода контента, такого как текстовые строки, метки, кнопки и т.д. на другие языки. Тестирование такого контента поможет убедиться, что перевод выполнен корректно и ясно передает смысл оригинального контента.  __3. Тестирование функционала в зависимости от региона: этот подход тестирования включает в себя проверку функционала приложения, который зависит от региона, такого как доступность определенных функций или возможность использования определенной информации, доступность в определенных странах, а также соответствие правилам конкретных регионов.  __4. Тестирование локализованного GUI: это подход тестирования включает в себя оценку интерфейса пользователя и проверку корректности перевода пользовательского интерфейса. Тестирование локализованного GUI поможет убедиться, что перевод выполнен правильно и пользователю легко понимать и использовать функционал приложения.  __5. Тестирование связанных с языком параметров: этот подход тестирования включает в себя проверку связанных с языком параметров, таких как правильное использование символов, правильное написание слов и т.д. Тестирование таких параметров поможет убедиться, что они используются правильно в соответствии с языком, на котором написано приложение.\",\"assets/voise/2qUs8.mp3\"],[\"Что такое A/B тестирование?\",\"A/B тестирование - это методика маркетинговых исследований, которая позволяет определить наиболее эффективный вариант маркетинговой или дизайнерской стратегии, путем сравнения двух (или более) версий одного и того же элемента. Обычно этот метод применяется для оптимизации веб-сайтов или приложений._ В процессе A/B тестирования, две группы пользователей показываются немного разные версии продукта (например, две разные версии заголовков или две разные цветовые схемы), и затем сравниваются метрики эффективности каждой версии для определения наилучшего варианта.\",\"assets/voise/2qUs9.mp3\"],[\"Что такое mock/stub? Какие знаете инструменты для работы с ними?\",\"Mock и stub - это инструменты для создания и имитации объектов или функций в процессе тестирования программного обеспечения. __  Mock это специальный объект который имитирует реальный объект, используется для упрощения тестирования. __ Stub - это объект-заглушка, который представляет собой замену реальному объекту и предоставляет жестко заданные значения.  __ Инструменты для работы с mock и stub в разных языках программирования: _- Python: unittest.mock, pytest-mock, Mockito _- Java: Mockito, EasyMock, JMock _- Ruby: RSpec, Mocha _❤ JavaScript: Sinon, Jasmine, Proxyquire _- PHP: PHPUnit, Prophecy _- .NET: Moq, FakeItEasy, Rhino Mocks.\",\"assets/voise/2qUs10.mp3\"],[\"Когда нужно использовать технику Pairwise?\",\"Техника Pairwise (попарное сравнение) используется в различных областях, когда требуется провести сравнение всех возможных пар элементов из некоторого множества._ В контексте тестирования программного обеспечения Pairwise используется для оптимизации набора тестовых данных, чтобы покрыть максимальное число возможных сценариев тестирования в минимальном количестве тестов.  _ Техника Pairwise может использоваться в следующих случаях:_ - Тестирование системы, которая имеет множество параметров или аргументов, каждый из которых имеет несколько возможных значений;_ - Тестирование системы с большим количеством возможных комбинаций значений параметров или аргументов;_ - Тестирование системы, где каждый параметр или аргумент может влиять на другие параметры или аргументы._ _ Путем применения техники Pairwise, можно значительно сократить объем тестовых наборов и уменьшить количество времени и усилий, необходимых для тестирования системы.\",\"assets/voise/2qUs11.mp3\"],[\"Что такое fuzz-тестирование и где его используют?\",\"Fuzz-тестирование — это метод тестирования программного обеспечения, когда наборы данных вводятся в приложение в случайном порядке, в попытке найти ошибки и неожиданные поведения. В основном этот метод применяется для тестирования безопасности программного обеспечения, которое часто используется в сетевых приложениях. __  Fuzz-тестирование также может использоваться для тестирования других программных систем, таких как операционные системы, драйверы устройств и другие программные приложения. _  В качестве примера, представим себе веб-приложение, которое принимает ввод пользователя через форму на сайте. Используя фаззинг, можно отправить случайные данные для поля ввода, включая нестандартные символы, длинные строки и другие нетипичные вводные данные._ Это может помочь найти возможные уязвимости в веб-приложении, например, некорректную обработку данных или открытие доступа к системе для злоумышленника. _  Следует отметить, что этот метод не гарантирует полную безопасность системы, и могут быть не обнаружены все уязвимости. _Тем не менее, fuzz-тестирование является важным инструментом для обнаружения потенциальных проблем в программном обеспечении.\",\"assets/voise/2qUs12.mp3\"],[\"Что такое REgexp?\",\"RegExp (Regular Expression) - это шаблон поиска, который используется для поиска текста с определенным форматом или для замены текста с определенным шаблоном._ Он используется в программировании, например, в языке JavaScript для обработки строковых данных. _С помощью RegExp можно проверять входные данные на наличие определенного формата, искать совпадения в тексте, заменять текст по шаблону и многое другое.\",\"assets/voise/2qUs13.mp3\"],[\"Как меняется стоимость дефекта при тестировании программного обеспечения?\",\"Стоимость дефекта при тестировании программного обеспечения может изменяться в зависимости от нескольких факторов: __ 1. Этап на котором ошибка была найдена. _Чем раньше обнаружена ошибка, тем дешевле ее исправление. __ 2. Уровень серьезности ошибки. _Если ошибка влияет на основную функцию продукта или нарушает безопасность, стоимость ее исправления может быть значительно выше, чем за незначительную ошибку. __ 3. Трудоемкость исправления ошибки. _ Если исправление ошибки требует много времени и ресурсов, ее стоимость будет выше.__ 4. Этап жизненного цикла продукта, на котором была найдена ошибка. _Если ошибка была обнаружена после выпуска продукта, стоимость ее исправления может быть выше, потому что это может потребовать выпуска обновления или патча для всех пользователей.  __ Более того, неисправленные ошибки могут стать причиной неудачного запуска продукта или более серьезных проблем в будущем, таких как утечка данных или поломка продукта. Поэтому, стоимость дефекта может быть значительно выше, если его не обнаружить и исправить вовремя.\",\"assets/voise/2qUs14.mp3\"],[\"Каковы пути анализа бизнеса клиента? Как определить целесообразность того или иного функционала?\",\"Существует несколько путей анализа бизнеса клиента: __ 1. Изучение текущих бизнес-процессов клиента и выявление узких мест и проблем. __ 2. Исследование рынка и конкурентов клиента._ 3. Анализ потребностей и запросов клиентов. __ 4. Изучение финансовых параметров бизнеса клиента: доходности, рентабельности, затрат и прочего.  __Для определения целесообразности того или иного функционала необходимо проанализировать текущие потребности и проблемы бизнеса клиента и выяснить, может ли данный функционал решить или смягчить эти проблемы. Кроме того, необходимо проанализировать предполагаемую стоимость внедрения функционала и его окупаемость в долгосрочной перспективе. __ Также следует учитывать мнение и пожелания клиента относительно функционала, а также конкурентное окружение и тенденции на рынке. Все эти факторы позволят определить, насколько целесообразно внедрение того или иного функционала в бизнес клиента.\",\"assets/voise/2qUs15.mp3\"],[\"Назовите последовательность выполнения CI/CD процесса на проекте.\",\"1. Интеграция кода и тестирование - в ходе данной части процесса реализуется сборка приложения поточно и запуск автоматических тестов.  __ 2. Автоматизация сборки - следующим шагом является создание автоматизированных сценариев сборки, которые позволят меньше тратить времени и усилия на организацию процесса. __  3. Оценка кода и выявление ошибок - происходит проверка качества кода на предмет ошибок и недочетов, в т.ч. путем внедрения тестов и анализа производительности.  __  4. Исправление ошибок - на основе выявленных ошибок корректируется код, представляющий определенную часть проекта. __  5. Развертывание приложения - на этом шаге происходит переход из разработки в эксплуатацию, т.е. происходит развертывание приложения на тестовом окружении или на продакшен-сервере. __  6. Тестирование на производительность - приложение тестируется на максимальную нагрузку, чтобы проверить его производительность на различных нагрузках. __  7. Мониторинг - в процессе мониторинга происходит оценка работоспособности приложения в эксплуатации и выявление возникающих ошибок.  __ 8. Внесение новых изменений - при необходимости можно проводить изменения в коде, чтобы обеспечить лучшую работоспособность приложения. __  9. Автоматическое исправление ошибок - используется автоматизированная система поиска и исправления ошибок, позволяющая минимизировать возможные ошибки в коде. __  10. Релиз приложения - после успешного прохождения предыдущих шагов можно осуществлять релиз приложения на реальное окружение.\",\"assets/voise/2qUs16.mp3\"],[\"Какое должно быть процентное соотношение между положительным и отрицательным тестированием на проекте?\",\"К сожалению, точного процентного соотношения между положительным и отрицательным тестированием на проекте нет. __ Это зависит от многих факторов, таких как качество тестирования, сложность проекта, объем исходного кода, тип приложения и т.д. __Некоторые проекты могут иметь более высокий процент положительных тестов, а другие - более высокий процент отрицательных тестов. _Главное - чтобы процент положительных тестов был достаточно высоким, чтобы гарантировать, что проект работает в соответствии с требованиями пользователя, а процент отрицательных тестов был достаточно низким, чтобы обеспечить стабильность проекта.\",\"assets/voise/2qUs17.mp3\"],[\"Какой вид тестирования целесообразнее проводить до релиза?\",\"Для обеспечения качества продукта перед его релизом рекомендуется проводить комплексное тестирование, которое включает в себя:  __1. Функциональное тестирование - проверка соответствия функциональных требований продукта, его основных возможностей и правильной работы всех элементов пользовательского интерфейса. __ 2. Интеграционное тестирование - проверка работы продукта в составе комплексных систем взаимодействия (веб-сервер, база данных и т. д.). __ 3. Нагрузочное тестирование - проверка устойчивости и производительности продукта в условиях высокой нагрузки и максимального количества пользователей. __ 4. Безопасность - проверка уязвимостей системы и ее защиты от кибератак и других угроз. __ 5. Тестирование внешнего вида и удобства использования - проверка с точки зрения конечного пользователя.  __ Каждый из этих видов тестирования является важной частью общей стратегии тестирования перед релизом продукта.\",\"assets/voise/2qUs18.mp3\"],[\"Есть ли разница между bug leakage («утечка багов») и bug release («выпуск багов»)?\",\"Да, есть разница между bug leakage и bug release. _ Bug leakage («утечка багов») — это ситуация, когда баги, которые были обнаружены во время тестирования, не были исправлены перед релизом продукта, и появились в финальной версии. Таким образом, дефекты выходят за пределы тестового окружения и начинают влиять на пользователей.  Bug release («выпуск багов») — это процесс выпуска кода или продукта на более широкий пользовательский рынок, который может содержать как исправленные, так и нерешенные баги.  Таким образом, отличие между bug leakage и bug release заключается в том, что первый означает появление багов в конечной версии продукта, в то время как второй описывает процесс запуска продукта на рынке, независимо от наличия багов.\",\"assets/voise/2qUs19.mp3\"],[\"Может ли быть ситуация, когда критерии завершения (exit criteria) не выполнены? Что должно происходить в этом случае?\",\"Следует выделить 3 основных критерия для остановки: _ • Время — В ходе тестирования могут находиться баги с разным приоритетом серьезности, попадаются баги блокеры, которые блокируют дальнейшее прохождение по тест кейсам, время на исправление и перепроверку багов может затянуться. Так как продукт или новую фитчу обещали к определенной дате то проджект менеджер вместе с тим лидом или тестировщиком принимает решение какие баги все таки стоить исправить, а какие можно отложить до следующего релиза в порядке приоритета и серьезности багов. Таким образом тестирование завершается по истечении времени. _ • Бюджет — очень популярно на биржах фриланса, когда оплачиваются найденные баги в зависимости от количества и серьезности или оплачивается по количеству пройденных тест кейсов, также выделяется бюджет на написание самих тесткейсов. И когда бюджет опустошен, то все работы по тестированию прекращаються. Как и на фриланс бирже заказчик иногда просто оплачивает время работы аутсорсного тестировщика и иногда не вписываясь в бюджет, просматривает написанные тест кейсы и какие-то выкидывает в силу не влезания в бюджет. _ • Все тест кейсы пройдены, найденные баги исправлены и перепроверены — Для того чтобы протестировать приложение, тестировщик для начала должен ознакомиться с требованиями, функциональными спецификациями к приложению, если они конечно есть, или узнать со слов заказчика какое поведение должно быть при разных сценариях использования приложения или фитчи. Затем заняться составлением тестовой документации — написанием тест кейсов, написать тест план если нужно, покрывая весь функционал и требования к приложению. Также обсудить и решить в команде или самостоятельно не требуется ли проводить нефункциональное тестирование, такое как нагрузочное тестирование (Performance and Load Testing), тестирование удобства пользовавия (Usability Testing) и т.д. Так как у каждого приложения есть «узкие места», на которые следует обратить внимание при тестировании. Далее начать выполнять, проходить тест кейсы и в момент, когда все тест кейсы пройдены и найденные баги исправлены и перепроверены, можно завершать тестирование.\",\"assets/voise/2qUs20.mp3\",\"https://software-testing.org/testing/kriterii-vyhoda-zaversheniya-testirovaniya-exit-criteria-kogda-ostanovitsya-testirovat.html#:~:text=%D0%A1%D0%BB%D0%B5%D0%B4%D1%83%D0%B5%D1%82%20%D0%B2%D1%8B%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D1%8C%203%20%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D1%85%20%D0%BA%D1%80%D0%B8%D1%82%D0%B5%D1%80%D0%B8%D1%8F,%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B1%D0%B0%D0%B3%D0%B8%20%D0%B8%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D1%8B%20%D0%B8%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D1%8B\"],[\"Что мы действительно должны покрывать тест-кейсами, а что считается избыточным расходом времени и денег? Когда нецелесообразно писать тест-кейсы?\",\"Мы должны покрывать тест-кейсами функциональность, которая критически важна для бизнеса, использование которой может привести к существенным последствиям для пользователей или компании. __Также рекомендуется покрывать тест-кейсами те функциональные требования, которые часто используются.   Однако, если функциональность является очень редким случаем использования или имеет низкий приоритет, то может нецелесообразно тратить время и деньги на написание тест-кейсов. __ Также не стоит писать тест-кейсы для того, что уже было покрыто автоматическими тестами или если есть другие способы проверки (например, ручное тестирование или exploratory testing).  __ Кроме того, не следует покрывать тест-кейсами функциональность, которая не требует проверки, например, дизайн или текстовые опечатки.   Итак, следует сосредоточиться на критически важных функциональных требованиях, часто используемых сценариях и тех случаях, когда есть риск для бизнеса или пользователей.\",\"assets/voise/2qUs21.mp3\"],[\"Для какого функционала труднее всего написать тест-кейсы?\",\"В целом можно сказать, что трудно написать тест-кейсы для функционала, который имеет сложные и разнообразные ветвления, зависимости от других модулей, большое количество переменных и условий. __ Также может быть трудно написать тест-кейсы для функционала, который требует взаимодействия с внешними системами, так как нужно учесть различные сценарии ошибок и неполадок в этом взаимодействии.\",\"assets/voise/2qUs22.mp3\"],[\"Как посчитать Cyclomatic complexity?\",\"Обычно по статистике 20% кода вызывают 80% проблем, что образует эффект скопления багов в одном или нескольких связанных модулях приложения (defect clustering). Чтобы заранее обнаружить возможные баги, которые могут возникнуть при дальнейшем динамическом тестировании, мы можем статически тестировать код с помощью данной метрики. _Это очень полезная техника которая нам позволит определить число необходимых позитивных тестов, которые будут равны цикломатической сложности программы. __Вычисление цикломатической сложности (cyclomatic complexity metric) с помощью построения графа \",\"assets/voise/2qUs23.mp3\",\"https://software-testing.org/testing/staticheskoe-testirovanie-koda-static-code-analysis-ispolzuya-metriku-ciklomaticheskoy-slozhnosti-cyclomatic-complexity-metric.html\"],[\"В чем основная разница между defect detection percentage(Процент выявления дефектов) и defect removal efficiency(Эффективность устранения дефектов)?\",\"Процент выявления дефектов отражает, какую долю всех дефектов удалось выявить в процессе тестирования или других видов контроля качества продукта. __Это показатель того, насколько хорошо организован процесс контроля и как хорошо подобраны методы тестирования.  Эффективность устранения дефектов, с другой стороны, отражает, сколько дефектов было успешно исправлено после того, как они были выявлены. Это показатель того, насколько хорошо организован процесс устранения дефектов, как хорошо подобраны методы исправления ошибок и как быстро и эффективно они применяются. __ Таким образом, эти два показателя различаются и позволяют оценить разные аспекты качества продукта. Оба показателя могут быть использованы вместе для достижения оптимального качества продукта.\",\"assets/voise/2qUs24.mp3\"],[\"Какие модели risk-based testing вы знаете?\",\"Модель 'Risk-based Testing' (тестирование на основе рисков) - данная модель предполагает, что тестирование проводится в соответствии с оценкой рисков, связанных с программным обеспечением. Цель такого тестирования - максимально сократить количество рисков, связанных с продуктом или услугой.\",\"assets/voise/2qUs25.mp3\",\"https://habr.com/ru/company/simbirsoft/blog/443672/\"],[\"Что такое тестирование API? Какими инструментами пользуются для его выполнения?\",\"Тестирование API (Application Programming Interface) - это процесс проверки функциональности, надежности и безопасности API, которое используется для обмена информацией между программными приложениями. _Оно включает в себя набор тестовых случаев, которые проверяют, как API обрабатывает запросы и как он возвращает ответы. Это могут быть такие тесты, как тесты позитивного и негативного сценариев, тесты производительности, тесты безопасности и тесты соответствия стандартам. _Цель тестирования API – убедиться, что оно работает правильно, соответствует требованиям и не оказывает негативного воздействия на другие компоненты системы. __ Для выполнения тестирования API используются различные инструменты, такие как:  __1. Postman - популярный инструмент для тестирования API. Он позволяет отправлять запросы, получать ответы и анализировать их.  __2. Swagger - инструмент для документирования и тестирования API. Он позволяет создавать описания API в форматах OpenAPI или Swagger.  __3. SoapUI - инструмент для тестирования APIs, основанных на протоколах SOAP и REST.  __4. JMeter - инструмент, используемый для тестирования производительности API. Он может отправлять множество запросов и оценить время ответа. __ 5. Assertible - инструмент для тестирования API, который предоставляет автоматические тесты путем записи (record/playback) и проверки ответов API. __ 6. Newman - инструмент командной строки для запуска Postman-коллекций.\",\"assets/voise/2qUs26.mp3\"],[\"Что такое performance testing? Какими инструментами пользуются для его выполнения?\",\"Performance testing - это процесс тестирования производительности, который используется для оценки скорости, масштабуемости, стабильности и других характеристик системы в реальных условиях.  _ Для выполнения performance testing используются различные инструменты. Некоторые из них: __ 1. Apache JMeter - инструмент для тестирования с высокой производительностью, который может использоваться для измерения производительности web-приложений и других типов приложений. __ 2. LoadRunner - программа для тестирования производительности, которая может использоваться для создания и воспроизведения нагрузки на различные приложения, включая веб-приложения, приложения для поддержки бизнес-процессов и другие. __ 3. Gatling - инструмент тестирования производительности, который основан на Scala и используется для тестирования веб-приложений и различных других типов приложений. __ 4. BlazeMeter - облачный инструмент тестирования производительности для веб-приложений, который может использоваться для создания и воспроизведения нагрузки на приложения. __ 5. NeoLoad - программное обеспечение для тестирования производительности, которое может использоваться для измерения производительности веб-приложений, мобильных приложений и других типов приложений. __ Эти инструменты позволяют производить различные виды тестирования производительности, включая нагрузочное тестирование, тестирование на максимальную загрузку, тестирование на масштабируемость и др.\",\"assets/voise/2qUs27.mp3\"],[\"Что такое load(Нагрузочное) и stress(стресс) testing? Какими инструментами пользуются для их выполнения?\",\"Load testing и stress testing относятся к категории тестирования производительности системы. __Load testing осуществляется для проверки системы при ожидаемых рабочих нагрузках, а stress testing проводится для симуляции экстремальных нагрузок и проверки максимального предела нагрузки, который система может выдержать.  _ Для проведения load testing используются инструменты, такие как Apache JMeter, LoadRunner, Gatling, Artillery, K6, и другие. __ Они могут создавать виртуальную нагрузку, имитируя пользователя, который использует систему в реальном времени, для проверки ее производительности и способности выдерживать определенный объем трафика. __ Для stress testing используются инструменты, такие как Stress-ng, LoadUI, HammerDB, и другие. Они могут создавать экстремальную нагрузку на систему, тестировать ее на предельных условиях, проверять ее устойчивость и готовность к реагированию на нестандартные ситуации.  __ Таким образом, load testing и stress testing являются важными тестами для проверки производительности системы, и эффективные инструменты для их проведения позволяют выявлять и устранять проблемы производительности, улучшать пользовательский опыт и повышать надежность системы.___ Тест нагрузки, по определению, измеряет производительность системы при ожидаемой нагрузке. Напротив, стресс-тест перегружает систему, чтобы найти точку разрыва\",\"assets/voise/2qUs28.mp3\"],[\"Что такое contract testing?\",\"Контрактное тестирование или Consumer Driven Contract (CDC) является связующим звеном между модульным и интеграционным тестированием. Тут важно отметить скорость выполнения тестов, а именно, чем выше по пирамиде находятся тесты, тем ниже скорость и выше сложность тестируемого взаимодействия или тем больше можно проверить интеграцию с другими ПО. Таким образом, при контрактном тестировании выше необходимость в поиске проблемных мест за один прогон теста. \",\"assets/voise/2qUs29.mp3\",\"https://habr.com/ru/company/testit-tms/blog/570544/\"],[\"Какая разница между Scrum и Kanban?\",\"Scrum и Kanban - это два различных метода управления проектами.  __ Scrum - это итерационный метод, в котором проект разбивается на циклы (спринты) фиксированной продолжительности, обычно от двух недель до месяца. _Каждый спринт начинается с планирования, включает выполнение задач и заканчивается обзором и ретроспективой. _Scrum использует специальные роли (Product Owner, Scrum Master, Development Team) и соответствующие мероприятия (Product Backlog, Sprint Backlog, Daily Scrum), чтобы эффективно управлять проектом. __  Kanban - это метод, ориентированный на поток работы. Он использует доску Kanban, которая отображает все задачи, которые нужно выполнить, и их текущее состояние (в процессе, готово к проверке, завершено). Основная цель метода - максимизировать поток работы и избегать перегрузки команды задачами. _ В отличие от Scrum, Kanban не использует фиксированные итерации и не имеет строгих ролей. __  Таким образом, Scrum более формальный метод, который требует определенной инфраструктуры и структурированных мероприятий для управления проектом. Kanban более гибкий метод, который меньше ограничивает команду в выборе своего подхода к управлению проектом.\",\"assets/voise/2qUs30.mp3\"],[\"Расскажите о ритуалах, ценностях и ролях в Scrum.\",\"Ритуалы в Scrum:  _1. Sprint Planning - планирование спринта _ 2. Daily Scrum - ежедневное совещание _ 3. Sprint Review - ревью спринта _4. Sprint Retrospective - ретроспектива спринта __ Ценности в Scrum:  _1. Ответственность _2. Последовательность _3. Руководство _4. Уважение _5. Открытость  __ Роли в Scrum:  _1. Scrum Master - занимается координацией и организацией процесса. _2. Product Owner - отвечает за жизненный цикл продукта. _3. Development team - команда, которая занимается разработкой.\",\"assets/voise/2qUs31.mp3\"],[\"Как выбор методологии может повлиять на качество разработки?\",\"Выбор методологии является критическим решением, которое аффектует качество разработки. Некоторые методологии могут принести значительную пользу и помочь достичь высокого качества, тогда как другие - наоборот. __Ниже приведены несколько примеров того, как выбор методологии может повлиять на качество разработки: __ 1. Agile - это методология разработки программного обеспечения, которая ставит в центр внимания коллективную работу, общение и быструю адаптацию к изменениям. _Если эта методология используется правильно, она может помочь команде достичь высокого качества, уменьшить количество ошибок и повысить скорость доставки готового продукта на рынок.  __2. Waterfall - это более традиционная методология разработки программного обеспечения, которая сосредотачивается на последовательности шагов от начала до конца проекта. _Если эта методология используется неправильно, она может привести к медленной разработке, трате большого количества времени и ресурсов, и качеству продукта, которое не отвечает требованиям клиентов. __ 3. DevOps - это методология, которая объединяет процессы разработки и операций в единую команду. Если эта методология используется правильно, она может помочь ускорить процесс доставки продукта, улучшить качество и реагировать на изменения в быстром темпе.  _Выбор методологии, как правило, связан с типом проекта, его характеристиками, командой разработчиков и другими факторами. Важно выбрать подходящую методологию для каждого проекта, чтобы достичь наилучшего качества продукта и улучшить эффективность проекта в целом.\",\"assets/voise/2qUs32.mp3\",\"https://habr.com/ru/company/itglobalcom/blog/447742/\"],[\" Нулевой спринт в Scrum. Для тестирования есть задание под названием Настройка среды. Что здесь нужно выполнять?\",\"В рамках нулевого спринта в Scrum настройка среды обычно означает настройку рабочей среды для команды разработки со всеми необходимыми инструментами и программами. Для тестирования это может включать в себя следующие задачи: __ 1. Установка и настройка необходимого программного обеспечения для тестирования, такого как инструменты для автоматического тестирования, системы управления ошибками и т.д. __ 2. Настройка окружения для тестирования, включая настройку виртуальных машин, серверов, баз данных и т.д. __ 3. Создание тестовых данных и настройка тестовых сценариев для тестирования функциональности продукта и проверки его работоспособности. __ 4. Подготовка документации по использованию и настройке тестовых средств. __ 5. Настройка автоматической сборки и интеграции продукта, чтобы обеспечить непрерывную интеграцию и упрощение процесса тестирования. __ 6. Обеспечение работы коммуникационных каналов и инструментов для эффективного сотрудничества с другими членами команды и заинтересованными сторонами. __ Кроме того, настройка среды также может включать в себя установку и настройку инструментов для мониторинга и отслеживания процессов разработки и тестирования, а также создание планов тестирования и оценок рисков.\",\"assets/voise/2qUs33.mp3\"],[\"Расскажите, как вы будете строить и внедрять стратегию по автоматизации тестирования используя Selenium.\",\"Шаг 1: Анализ продукта и определение тестовых случаев  Первым шагом является анализ продукта и определение тестовых случаев для автоматизации. Необходимо изучить текущую функциональность продукта, его потенциальные уязвимости и конкурентные приложения, чтобы определить объемы тестирования и риски. Затем нужно выбрать тестовые случаи, которые лучше автоматизировать. __ Шаг 2: Выбор инструмента  Выбор инструмента для автоматизации тестирования может быть зависим от вашей текущей технической экосистеме, уровня опыта команды разработки и планируемых объемов тестирования __ Шаг 3: Создание тестовых скриптов  Чтобы начать автоматизацию тестирования с Selenium, нужно создать тестовые скрипты. Нужно определить все действия, которые необходимо автоматизировать и запрограммировать их в тестовые скрипты, используя язык программирования, такой как Java, Python, Ruby, C # и т. д. __ Шаг 4: Интеграция  После создания тестовых скриптов вам нужно интегрировать их в ваше тестовое окружение. Многие альтернативные инструменты поддерживают командную строку, которая позволяет интегрироваться в системы управления сборками, такие как Jenkins и TeamCity.__  Шаг 5: Настройка среды  Чтобы запустить ваши тесты с Selenium, вы должны определить свою тестовую среду, включая браузеры, операционные системы и платформу. Вам понадобится установить все программные компоненты для взаимодействия с Selenium. __ Шаг 6: Выполнение тестов  После настройки вашей среды тестирования, вы можете запустить свои тесты и создать отчеты. Здесь также можно использовать инструменты для поиска багов.__ Шаг 7: Поддержание и обновление  Наконец, вам нужно поддерживать вашу автоматическую стратегию тестирования, обновляя тесты и среду тестирования, согласно эволюции продукта. Следует уделять внимание модульному тестированию для уменьшения сложности и повышения скорости тестирования.\",\"assets/voise/2qUs34.mp3\"],[\"Как взаимодействуют клиентская библиотека Selenium, драйвер браузера и сам браузер?\",\"Когда клиентская библиотека Selenium взаимодействует с драйвером браузера, она отправляет запросы на выполнение определенных действий (например, открытие URL, ввод текста, нажатие кнопки и т. д.) в браузер. __  Драйвер браузера переводит эти запросы в команды, понятные конкретному браузеру, и передает их ему. Браузер использует свой внутренний механизм для выполнения запрошенных действий и отправляет обратно информацию о своем состоянии, которую драйвер браузера передает обратно в клиентскую библиотеку Selenium.  __ Таким образом, клиентская библиотека Selenium является прослойкой между пользовательским скриптом и браузером, обеспечивающей интеграцию этих двух элементов. Это позволяет автоматизировать тестирование веб-приложений, используя скрипты, которые могут взаимодействовать с браузером таким же образом, как и обычный пользователь.\",\"assets/voise/2qUs35.mp3\"],[\"Для чего используют browser capabilities, arguments и options?\",\"Browser capabilities, arguments и options используются для настройки и управления поведением браузера при выполнении автоматизированных тестов или веб-скриптов. _ Browser capabilities определяют, какие функции и возможности есть у браузера и как он может взаимодействовать с веб-страницей. __Например, это может быть поддержка JavaScript, поддержка HTML5, доступ к камере и микрофону, и т.д. _Эти возможности могут использоваться в тестах, чтобы проверить, что приложение работает правильно на разных браузерах. __ Browser arguments и options используются для настройки определенных аспектов браузера, таких как размер окна, адрес URL, пользовательские агенты, пользовательские профили, прокси-серверы и т.д. _ Эти параметры позволяют настроить браузер, чтобы он работал оптимально при выполнении тестов или веб-скриптов. __ Кратко говоря, browser capabilities, arguments и options используются для настройки браузера, чтобы он мог поддерживать необходимые функции и при этом работал оптимально в рамках тестового или скриптового окружения.\",\"assets/voise/2qUs36.mp3\"],[\"Что такое iframe и как с ним работать в Selenium?\",\"Iframe (Inline Frame) – это HTML-элемент, который позволяет вставлять веб-страницы и документы внутрь других веб-страниц. Он представляет собой окно внутри окна браузера и может содержать отдельную веб-страницу или документ. Отображение контента в iframe не зависит от основной страницы и может быть настроено и управляться независимо от нее.  В Selenium для работы с iframe используется метод switchTo (). Он позволяет переключать контекст веб-страницы между основной страницей и iframe.  Например, чтобы переключиться на iframe, необходимо выполнить следующую команду:  driver.switchTo().frame(frameObject);  Здесь в переменную frameObject должен быть передан элемент iframe.  Чтобы переключиться обратно на основную страницу, нужно выполнить следующую команду:  driver.switchTo().defaultContent();  После переключения на iframe можно выполнять все необходимые действия на этой странице, используя обычные команды Selenium. После завершения работы с iframe необходимо переключиться обратно на основную страницу.\",\"assets/voise/2qUs37.mp3\"],[\"Как обрабатывать браузерные сообщения (alerts)?\",\"Для обработки браузерных сообщений (alerts) в Selenium следует использовать методы `switch_to.alert` и `accept()` или `dismiss()`.  Примеры использования:  ``` # переключение на алерт alert = driver.switch_to.alert  # получение текста алерта text = alert.text  # нажатие на кнопку ОК/Да alert.accept()  # нажатие на кнопку Отмена/Нет alert.dismiss() ```  Также для работы с алертами можно использовать конструкцию `try except`, чтобы обрабатывать различные виды алертов, например:  ``` python try:     alert = driver.switch_to.alert     alert.accept() except:     pass ```   В данном примере алерт будет закрыт по команде `alert.accept()` если он появится, в противном случае будет выполнена команда `pass`, чтобы программа продолжила работу.\",\"assets/voise/2qUs38.mp3\"],[\"Что такое Appium?\",\"Appium - это open source инструмент для автоматизации тестирования мобильных приложений на разных платформах (iOS, Android, Windows), который использует тестирование на уровне пользовательского интерфейса. Он позволяет тестировать приложения на реальных устройствах и эмуляторах, используя один и тот же код для разных платформ. Appium поддерживает множество языков программирования, таких как Java, C#, Ruby, Python и другие, что делает его очень гибким и удобным для разработчиков разных компетенций.\",\"assets/voise/2qUs39.mp3\"],[\"Что такое Electron-based applications? Как использовать Selenium и Appium для их тестирования?\",\"Electron-based applications - это приложения, созданные с использованием фреймворка Electron. Этот фреймворк позволяет разработчикам использовать технологии веб-разработки для создания настольных приложений для различных операционных систем и платформ. Такие приложения могут быть многофункциональными и иметь широкий спектр функций.  Для тестирования Electron-based applications можно использовать инструменты, такие как Selenium и Appium. Селениум позволяет автоматизировать тестирование пользовательского интерфейса и взаимодействие с веб-страницами. Appium, с другой стороны, используется для автоматизации тестирования мобильных приложений. Оба эти инструмента можно настроить для тестирования Electron-based applications, используя соответствующие драйверы и настройки. Это позволяет автоматизировать процесс тестирования приложений, ускоряет процесс разработки и помогает обнаруживать проблемы и баги на ранних этапах разработки.\",\"assets/voise/2qUs40.mp3\"],[\"Как взаимодействовать с запросами, отправляемыми из браузера?\",\" можно использовать инструменты разработки и отладки браузера, такие как Chrome DevTools, Firefox Developer Edition, Safari Web Inspector и т.д., чтобы отслеживать и анализировать запросы, отправляемые из браузера. __ Еще можно использовать различные онлайн-сервисы, такие как Postman, HTTPie и т.д., чтобы отправлять, тестировать и отладить ваши запросы API, без необходимости написания программного кода.\",\"assets/voise/2qUs41.mp3\"],[\"Как взаимодействовать с cookies, LocalStorage и SessionStorage?\",\"Взаимодействие с cookies:  __ 1. Установка cookie:_ document.cookie = 'cookieName=cookieValue; expires=expiryDate; path=pathName;'; _  где: _- cookieName - название cookie _- cookieValue - значение cookie _- expiryDate - дата истечения срока действия cookie (в формате гггг-мм-дд) _- pathName - путь, для которого установлен cookie (не обязательный параметр) __2. Получение cookie: _ const cookies = document.cookie; __3. Удаление cookie:  _ document.cookie = 'cookieName=; expires=expiryDate; path=pathName;';    __где: _- cookieName - название cookie _- expiryDate - дата истечения срока действия cookie (должна быть в прошлом) _- pathName - путь, для которого был установлен cookie (не обязательный параметр) ___Взаимодействие с LocalStorage:  1. Установка значения в LocalStorage:  __ localStorage.setItem('key', 'value'); __  2. Получение значения из LocalStorage:   const value = localStorage.getItem('key'); __  3. Удаление значения из LocalStorage:   localStorage.removeItem('key'); __ 4. Очистка LocalStorage:  localStorage.clear(); ___Взаимодействие с SessionStorage:  1. Установка значения в SessionStorage:   sessionStorage.setItem('key', 'value'); __  2. Получение значения из SessionStorage:   const value = sessionStorage.getItem('key');  __ 3. Удаление значения из SessionStorage:   sessionStorage.removeItem('key'); __  4. Очистка SessionStorage:   sessionStorage.clear();   \",\"assets/voise/2qUs42.mp3\"],[\"Что такое и чем отличаются виртуальная машина, симулятор и эмулятор?\",\"Виртуальная машина (Virtual Machine) - это программный компонент, который эмулирует машину с определенной аппаратной конфигурацией, такой как процессор, память, жесткий диск и т. д. _Это позволяет запускать несколько виртуальных операционных систем на одном физическом компьютере, что обеспечивает увеличенную изоляцию и безопасность приложений.  __ Симулятор (Simulator) - это программное обеспечение, которое позволяет имитировать работу реального объекта или системы, не создавая их на самом деле. __ Симулятор может использоваться для обучения, тестирования или проектирования новых систем.  __ Эмулятор (Emulator) - это программное обеспечение, которое позволяет запускать программы, созданные для одной платформы, на другой платформе, которая может имитировать аппаратную конфигурацию целевой платформы.__ Например, эмуляторы позволяют запускать приложения для PlayStation на компьютере или использовать программы для Mac на компьютере с операционной системой Windows.__  Основное различие между этими терминами заключается в том, на каком уровне они работают. Виртуальная машина работает на уровне операционной системы, симулятор на уровне приложения или системы, а эмулятор на уровне аппаратного обеспечения.\",\"assets/voise/2qUs43.mp3\"],[\"Что такое контейнер и чем он отличается от виртуальной машины?\",\"Контейнер - это изолированная среда, где приложение может быть запущено с набором зависимостей, не влияющих на соседние контейнеры. Каждый контейнер использует общий ядро операционной системы, но приложение и его зависимости отделены от остальных контейнеров. __ Виртуальная машина - это полностью изолированная виртуальная операционная система на хост-машине. Она содержит отдельный набор зависимостей, приложений, ядра операционной системы и других компонентов, отделенных от других виртуальных машин на хост-машине. __  Отличия между контейнерами и виртуальными машинами: __ - Контейнеры используют общую операционную систему, в то время как виртуальные машины работают на отдельных экземплярах операционных систем. __ - Контейнеры потребляют меньше ресурсов, чем виртуальные машины, что делает их более эффективными и экономичными. __ - Контейнеры быстрее запускаются и позволяют ускорить процесс разворачивания приложений. __ - Виртуальные машины могут быть использованы для запуска различных операционных систем в рамках одной физической машины, в то время как контейнеры позволяют запускать только те приложения, которые могут работать на той же операционной системе, что и хост-машина.    \",\"assets/voise/2qUs44.mp3\"],[\"Как используют виртуальные машины и контейнеры в автоматизации?\",\"Виртуальные машины и контейнеры могут использоваться в автоматизации для создания и управления тестовыми окружениями, разработки и тестирования приложений, обеспечения безопасности и управления ресурсами. __  Например, виртуальные машины могут быть использованы для создания копий рабочей среды для разработки и тестирования приложений, а также для создания стендов для тестирования различных конфигураций и версий операционных систем. __  Контейнеры, в свою очередь, позволяют упаковывать приложения и их зависимости в независимые контейнеры, которые могут быть перенесены между различными окружениями. Это позволяет ускорить развертывание приложения и уменьшить вероятность ошибок в связи с различиями в конфигурациях. __  Кроме того, виртуальные машины и контейнеры могут быть использованы для обеспечения безопасности тестовых окружений и приложений и для управления ресурсами на удаленных серверах.\",\"assets/voise/2qUs45.mp3\"],[\"​​Что такое IaaS и PaaS? Приведите примеры.\",\"IaaS (Infrastructure as a Service) и PaaS (Platform as a Service) - это типы облачных вычислений, которые предоставляют инфраструктуру и платформу для создания, развертывания и управления приложениями в облаке. __  IaaS - это технический уровень облачных вычислений, который предоставляет вычислительные ресурсы, включая виртуальные серверы, хранилища данных, средства сетевой связи и другие технологии. __Примеры IaaS-провайдеров включают Amazon Web Services, Microsoft Azure и Google Cloud Platform. __ PaaS - это уровень выше, поэтому позволяет пользователям разрабатывать, тестировать и развертывать приложения в облаке, используя предварительно настроенные платформы и сервисы. __ PaaS обычно включает среду выполнения приложений, базы данных, средства управления версиями и т.д. __Примеры PaaS-провайдеров включают Heroku, Google App Engine и Microsoft Azure App Service.  __ В обоих случаях пользователи получают преимущества облачных вычислений, такие как гибкость, масштабируемость и низкую стоимость, без необходимости владеть физическими инфраструктурами.\",\"assets/voise/2qUs46.mp3\"],[\"Что такое Configuration Management?\",\"Управление конфигурациями (Configuration Management) – это систематический подход к управлению изменением и контролю версий конфигурационных элементов IT-системы. __Цель управления конфигурациями – обеспечить предсказуемость и стабильность системы при изменении, минимизировать риски и снизить время восстановления системы в случае сбоя.__ Для реализации этих целей применяются методы и инструменты контроля версий, конфигурационного управления, процессы утверждения изменений и т.д. _Управление конфигурациями является одним из ключевых элементов IT Service Management.    \",\"assets/voise/2qUs47.mp3\"],[\"Что такое Provisioning?\",\"Provisioning - это процесс предоставления доступа к ресурсам, которые необходимы для работы системы или приложения. Этот термин используется в IT-индустрии в отношении различных Решений, например, виртуализации, облачных вычислений и управления устройствами. __ Provisioning может также охватывать установку и настройку программного и аппаратного обеспечения, настройку сетевых служб, создание пользователей и присвоение им прав доступа к ресурсам.\",\"assets/voise/2qUs48.mp3\"],[\"Какие команды Linux Shell вам известны? Как с помощью команд Linux Shell найти лог-файл и строчку с ошибкой в ​​файле?\",\"1. ls - список файлов и папок в директории 2. __ cd - сменить текущую директорию __ 3. pwd - вывести текущую директорию __4. cat - вывести содержимое файла __5. grep - поиск строки в файле __6. tail - вывести конец файла  Чтобы найти лог-файл и строчку с ошибкой в файле, можно использовать команду grep с опцией -r для поиска во всех файлах в директории:  _ _ grep -r 'ошибка' /var/log/ - Эта команда найдет все файлы в папке __ /var/log/, которые содержат строку 'ошибка'. __Если вы знаете имя файла, в котором может быть лог с ошибкой, вы можете использовать команду grep без опции -r:  grep 'ошибка' /var/log/myfile.log - Эта команда найдет строку 'ошибка' только в файле myfile.log в папке /var/log/.__ Если у файла достаточно стандартное расширение (например, .log), то можно использовать маску для выбора всех файлов с таким расширением в директории:  grep 'ошибка' /var/log/*.log - Эта команда найдет строки 'ошибка' во всех файлах с расширением .log в папке /var/log/.\",\"assets/voise/2qUs49.mp3\"],[\"Какие команды Windows CMD вам известны? Как с помощью команд Windows CMD найти IP-адрес машины?\",\"Некоторые из наиболее распространенных команд Windows CMD:  1. dir - отображает содержимое текущего каталога 2. cd - переключает текущий каталог 3. tree - отображает древовидную структуру каталогов на диске 4. ipconfig - отображает конфигурацию IP-адресов компьютера 5. ping - отправляет пакеты данных на указанный IP-адрес и возвращает результаты  Чтобы найти IP-адрес машины с помощью команд Windows CMD, следует выполнить следующие шаги:  1. Откройте командную строку Windows CMD 2. Введите команду ipconfig и нажмите enter 3. В показанных результатах найдите строку IPv4-адрес для IP-адреса вашей машины.    \",\"assets/voise/2qUs50.mp3\"],[\"Что такое SSH и как им пользоваться?\",\"Некоторые из наиболее распространенных команд Windows CMD: __ 1. dir - отображает содержимое текущего каталога __ 2. cd - переключает текущий каталог __ 3. tree - отображает древовидную структуру каталогов на диске __ 4. ipconfig - отображает конфигурацию IP-адресов компьютера __ 5. ping - отправляет пакеты данных на указанный IP-адрес и возвращает результаты ___ Чтобы найти IP-адрес машины с помощью команд Windows CMD, следует выполнить следующие шаги: _ 1. Откройте командную строку Windows CMD_ 2. Введите команду ipconfig и нажмите enter _3. В показанных результатах найдите строку IPv4-адрес для IP-адреса вашей машины\",\"assets/voise/2qUs51.mp3\"],[\"Что такое bash и batch скрипты? Зачем их используют?\",\"SSH (Secure Shell) - это протокол сетевой безопасности, который позволяет устанавливать шифрованное соединение между двумя узлами сети. Это позволяет пользователям обмениваться данными, используя защищенный канал передачи данных. __ SSH является основным инструментом для удаленного управления серверами и устройствами с использованием командной строки. _Он может использоваться для подключения к серверу Linux и Windows, а также к другим сетевым устройствам. __ Для использования SSH нужно выполнить следующие шаги: _ 1. Установить SSH-клиент на свой компьютер. Для Linux и MacOS это может быть OpenSSH, а для Windows - PuTTY. _2. Запустить SSH-клиент и подключиться к удаленному серверу, используя его IP-адрес и имя пользователя и пароль. __ Пример команды в консоли для подключения к удаленному серверу по SSH:  ssh username@server_ip_address __  После ввода этой команды вы будете запросены на ввод пароля для подключения к удаленному серверу. После успешной авторизации вы можете работать с удаленным сервером так же, как если бы вы находились на нем локально.  __SSH также используется для передачи файлов между удаленными узлами сети. Для этого используется приложение scp (secure copy). С помощью команды scp файлы могут быть переданы между серверами по зашифрованному каналу.  __ Пример команды в консоли для копирования файла по SSH:   scp /path/to/local/file username@server:/path/to/remote/directory/ -  Эта команда скопирует файл с локального компьютера на удаленный сервер по защищенному каналу SSH.\",\"assets/voise/2qUs52.mp3\"],[\"Какая разница между авторизацией и аутентификацией?\",\"Аутентификация и авторизация - это два разных процесса, связанных с проверкой личности пользователя, но они имеют разную цель:  1. Аутентификация - это процесс проверки идентификационных данных пользователя (логин и пароль, отпечаток пальца, биометрические данные и т.д.), с целью подтверждения личности пользователя. В процессе аутентификации системе нужно быть уверенной, что пользователь - тот, кем он утверждает, что он есть.  2. Авторизация - это процесс проверки доступа пользователя к определенным ресурсам или функциям системы после успешной аутентификации. То есть, это процесс определения, что пользователь имеет право использовать определенные ресурсы или различные уровни доступа в системе.  Таким образом, аутентификация - это проверка личности, а авторизация - это проверка прав доступа пользователя. Они тесно связаны друг с другом, но имеют различную цель и функциональность.\",\"assets/voise/2qUs53.mp3\"],[\"Как происходит авторизация на сервере?\",\"Авторизация на сервере происходит по определенной процедуре, которая включает в себя следующие шаги:  1. Пользователь отправляет запрос на авторизацию, указывая свой логин и пароль.  2. Сервер проверяет правильность введенных данных. Если они соответствуют требуемому формату и соответствуют данным, которые хранятся на сервере, то пользователь получает доступ к системе.  3. При успешной авторизации на сервере пользователь получает уникальный идентификатор сессии, который помещается в cookie, сохраняемый на его компьютере. Этот идентификатор используется сервером для идентификации пользователя при каждом последующем запросе.  4. Если пользователь пытается получить доступ к ресурсу, который требует авторизации, сервер проверяет наличие у него сессии по идентификатору, сохраненному в cookie. Если сессия существует, то пользователь получает доступ к ресурсу. Если сессия не найдена, то пользователь повторно должен авторизоваться.  В зависимости от настроек сервера и способа реализации авторизации, процедура может быть более сложной. Например, может быть использована двухфакторная аутентификация, требующая ввода кода из SMS-сообщения или использования специального приложения для генерации одноразовых паролей.\",\"assets/voise/2qUs54.mp3\"],[\"Какие статус-коды ошибок бывают? Может ли сервер отправить код 400, если проблема на его стороне?\",\"Статус-коды ошибок HTTP бывают различными, но наиболее распространенными являются такие коды:  __- 400 Bad Request (неправильный запрос) – возникает, если запрос клиента не может быть обработан из-за синтаксических ошибок или неверных данных __- 401 Unauthorized (неавторизован) – возникает, если клиент не предоставил достаточно правильных учетных данных (логин и пароль) для доступа к ресурсу __- 403 Forbidden (запрещено) – возникает, если сервер отказывается обслуживать запрос клиента из-за различных причин, например, если у клиента нет необходимых прав доступа к ресурсу __- 404 Not Found (не найдено) – возникает, если запрашиваемый ресурс не найден на сервере  Кроме этих кодов, существуют и другие, например: __ - 500 Internal Server Error (внутренняя ошибка сервера) – возникает, если сервер не может обработать запрос из-за ошибки на своей стороне, например, из-за проблем с базой данных или недоступности какой-то функциональности сервера __- 503 Service Unavailable (сервис недоступен) – возникает, если сервер временно не доступен по каким-то причинам, например, из-за технических работ или перегрузки. __ Таким образом, сервер может отправлять код 400 Bad Request в случаях, когда ошибка произошла на стороне клиента, но не должен отправлять его в случаях, когда проблема на его собственной стороне. _Если сервер обнаруживает ошибку на своей стороне, он должен отправлять соответствующий код ошибки, например, 500 Internal Server Error.\",\"assets/voise/2qUs55.mp3\"],[\"Как выполнить Debug страницы в браузере?\",\"с помошью DevTools\",\"assets/voise/2qUs56.mp3\"],[\"Как протестировать адаптивную верстку?\",\"1. Использовать инструменты разработчика браузера для изменения размеров экрана. Открыть страницу в браузере, нажать правой кнопкой мыши на странице и выбрать 'Инспектировать элемент'. Затем выбрать 'Тип устройства' и выбрать размер экрана, который нужно тестировать. __ 2. Использовать инструменты для проверки соответствия верстки стандартам и совместимости в различных браузерах. __ 3. Проверить отображение на реальных устройствах разных размеров экрана. __ 4. Использовать сервисы для анализа производительности и скорости загрузки страницы на разных устройствах.__  5. Протестировать браузерную совместимость на разных устройствах и операционных системах.  __6. Проверить корректность отображения при изменении ориентации экрана. __ 7. Тестировать отображение на больших мониторах и разрешениях. __ 8. Протестировать отображение на разных устройствах и браузерах в режиме онлайн и офлайн. __ 9. Проверять интерфейс на различных методах управления: mouse, touch. __ 10. Использовать инструменты для отслеживания ошибок и отображения логов, чтобы исправлять проблемы верстки в реальном времени.\",\"assets/voise/2qUs57.mp3\"],[\"Что такое WebSocket и как проверить обрыв соединения?\",\"WebSocket - это протокол, позволяющий в режиме реального времени обмениваться сообщениями между браузером и сервером через сеть. _Это особенно полезно, если необходимо передавать большие объемы данных или сообщения с высоким приоритетом. __ Чтобы проверить обрыв соединения, необходимо использовать событие onclose. Это событие срабатывает тогда, когда соединение с сервером было закрыто._ Вот пример кода, который позволяет проверить обрыв соединения:  const connection = new WebSocket('wss://example.com'); __  connection.onopen = function () {   __console.log('WebSocket connection established');__ };  __connection.onclose = function (event) { __  console.log('WebSocket connection closed: ', event.code, event.reason); __};   __В данном примере создается объект WebSocket, устанавливается обработчик события onopen для уведомления о том, что соединение было успешно установлено, и обработчик события onclose для уведомления о закрытии соединения и передачи кода и причины закрытия. Эти параметры могут использоваться для определения причины обрыва соединения и принятия мер по его восстановлению.    \",\"assets/voise/2qUs58.mp3\"],[\"Каковы есть основные виды уязвимости веб-приложений?\",\"1. SQL инъекции: это тип атаки, при котором злоумышленник использует специально сконструированный запрос SQL, который может разрушить базу данных сайта. __2. XSS уязвимость: это уязвимость, при которой злоумышленник манипулирует кодом JavaScript на веб-странице, чтобы получить доступ к конфиденциальной информации или вывести на экран злоумышленное содержимое.   __3. Уязвимость подделки запросов между сайтами (CSRF): это уязвимость, при которой злоумышленник заставляет жертву выполнить несанкционированные действия на веб-сайте, где она уже авторизована.   __4. Уязвимость аутентификации и авторизации: это состояние, при котором злоумышленник может получить доступ к данным, системе или функциональности, известной только авторизованным пользователям.   __5. Уязвимость переполнения буфера: это уязвимость, при которой злоумышленник передает в приложение данные, которые больше, чем может обработать переменная, что может привести к выполнению вредоносного кода. __ 6. Уязвимость недостаточной обработки данных: это уязвимость, при которой приложение не соответствующим образом обрабатывает входные данные, что может привести к исполнению вредоносного кода.   __7. XML-уязвимость: это уязвимость, при которой злоумышленник использует специально сконструированный документ XML, чтобы выполнить опасные действия в веб-приложении. __8. Уязвимость неверного хранения файлов: это уязвимость, при которой файлы с конфиденциальной информацией сохраняются несущественными для защищенности способом. __ 9. Уязвимость неконтролируемой пересылки: этот тип уязвимости позволяет злоумышленнику производить рассылку на зараженную базу, что может повлечь за собой фишинг, мошенничество или расчетные взломы.\",\"assets/voise/2qUs59.mp3\"],[\"Какие инструменты для тестирования Web performance client-side знаете?\",\"1. Chrome DevTools - встроенный инструмент для разработчиков в браузере Google Chrome.  __ 2. WebPageTest - веб-приложение для тестирования производительности веб-страниц. __ 3. GTmetrix - онлайн-инструмент для анализа скорости загрузки веб-страниц. __ 4. YSlow - браузерное дополнение, которое анализирует производительность веб-страниц и дает рекомендации по улучшению. __ 5. PageSpeed Insights - онлайн-инструмент Google, который оценивает скорость загрузки веб-страниц на компьютерах и мобильных устройствах. __ 6. Pingdom Tools - онлайн-инструмент для мониторинга производительности веб-сайтов. __ 7. Load Impact - инструмент для тестирования нагрузки на веб-сайты. __ 8. Apache JMeter - инструмент тестирования производительности, который может использоваться для тестирования клиентской и серверной частей веб-приложения.  В зависимости от задачи и потребностей разработчика или тестировщика, инструменты могут различаться.\",\"assets/voise/2qUs60.mp3\"],[\"Какова разница между методами GET и POST?\",\"GET и POST являются HTTP методами, которые используются для отправки данных между клиентом и сервером. __ 1. Передача данных: GET передает данные в URL-адресе (как параметры запроса), в то время как POST передает данные в теле запроса. __ 2. Кэширование: GET-запросы могут быть кэшированы, что означает, что результаты запроса могут быть сохранены в кэше браузера. POST-запросы не могут быть кэшированы. __ 3. Ограничения на объем передачи данных: GET ограничивает количество передаваемых данных до 2048 символов, в то время как POST не имеет никаких ограничений. __ 4. Безопасность: Отправляемые данные в GET-запросах открыты для всех. POST-запросы являются более безопасными, поскольку данные, отправляемые с его помощью, могут быть зашифрованы. __ 5. Кеширование данных: в отношении GET-запросов сервер может кешировать запросы клиента, поскольку они не изменяют состояние сервера. В отношении POST-запросов сервер не может кешировать запросы из-за того, что они изменяют состояние сервера.  __ 6. Назначение: Основное предназначение GET-запросов - получение ресурсов с сервера, а POST-запросов - добавление данных на сервер.    \",\"assets/voise/2qUs61.mp3\"],[\"Какая разница между методами PUT и PATCH?\",\"PUT и PATCH - два HTTP-метода, используемых для обновления ресурсов на сервере. Они отличаются тем, что PUT полностью заменяет существующий ресурс новым, содержащим все поля, в то время как PATCH обновляет только некоторые поля или свойства ресурса, не затрагивая остальные. __  PUT:  - Создает новый ресурс или полностью заменяет существующий - Если ресурс уже существует, то при использовании PUT запроса его данные будут заменены полностью на новые данные, указанные в запросе - Нельзя обновить отдельные поля внутри ресурса, так как они не могут быть целостными без других полей - Запрос на изменение уже несуществующего ресурса вернет ошибку 404  PATCH:  - Обновляет только определенные поля ресурса - Если ресурс не существует, то он будет создан - Оставшиеся данные остаются неизменными __- Запрос на изменение уже несуществующего ресурса не вернет ошибку 404, а создаст новый ресурс с указанными данными  Поэтому, если требуется обновить одно или несколько полей ресурса, рекомендуется использовать PATCH, а если нужно полностью заменить ресурс новым, то PUT.\",\"assets/voise/2qUs62.mp3\"],[\"Какие знаете сниферы?\",\"1. Wireshark _2. Tcpdump _3. Cain and Abel _4. Ettercap _5. Nmap _6. Fiddler _7. Burp Suite _8. Snort _9. Ngrep _10. Microsoft Network Monitor\",\"assets/voise/2qUs63.mp3\"],[\"Какова разница между DROP и TRUNCATE?\",\"Операторы DROP и TRUNCATE используются для удаления таблиц в SQL, но существуют некоторые различия между ними: __ 1. DROP удаляет как саму таблицу, так и все связанные с ней объекты, такие как индексы, ограничения, триггеры и т. д. TRUNCATE же удаляет только данные в таблице, сохраняя структуру и связанные объекты. __ 2. DROP выполняется быстрее, чем TRUNCATE, так как он не сохраняет никаких данных и не предотвращает возможность восстановления данных после операции удаления. TRUNCATE требует затрат времени и ресурсов на сохранение данных перед их удалением. __ 3. DROP требует наличия прав для создания и удаления таблиц, в то время как TRUNCATE требует прав для изменения таблицы. __ 4. DROP является необратимым, в то время как TRUNCATE можно отменить до того момента, пока не будет выполнена команда COMMIT. __ В целом, если необходимо удалить таблицу со всеми ее связанными объектами, использование оператора DROP является более предпочтительным. Если же нужно быстро удалить только данные из таблицы, не заботясь о сохранении структуры и связанных объектов, можно использовать оператор TRUNCATE. Оба эти оператора следует использовать с осторожностью, чтобы избежать потери ценных данных.    \",\"assets/voise/2qUs64.mp3\"],[\"Что такое case function?\",\"Функция CASE в SQL используется для выполнения логических операций и возврата результатов в зависимости от условия. Она принимает в качестве параметров значение, список условий и список выражений. Если условие истинно, функция возвращает соответствующее выражение. Если ни одно из условий не является истинным, функция возвращает значение по умолчанию или NULL. Функция CASE может использоваться, например, для выбора соответствующего значения для каждой категории или для фильтрации данных в запросах.\",\"assets/voise/2qUs65.mp3\"],[\"Что такое collation?\",\"Collation - это процесс упорядочивания и сравнения символов и строк в соответствии с определенным порядком, который определяет правила сравнения символов в разных языках и регионах. Этот процесс используется в базах данных для сравнения и сортировки текстовых данных.__ Каждый язык имеет свой набор правил collation, определяющий порядок символов, их графические и звуковые свойства, а также правила сравнения.\",\"assets/voise/2qUs66.mp3\"],[\"Что такое схема GraphQL?\",\"Схема GraphQL описывает типы данных, запросы и мутации в GraphQL API. Это определяет, какие данные могут быть запрошены и как они могут быть изменены. Она состоит из типов данных, которые могут быть запрошены, а также определяет операции возврата этих данных. __ Схема GraphQL также может содержать директивы, которые определяют, как данные должны быть запрошены и обработаны на сервере. Схема GraphQL является основой для создания сервера GraphQL и клиентских приложений, которые используют GraphQL API.\",\"assets/voise/2qUs67.mp3\"],[\"Объясните разницу между OLTP и OLAP.\",\"OLTP (Online Transaction Processing) и OLAP (Online Analytical Processing) - это две основные технологии обработки данных, которые используются в современной информационной технологии._  OLTP относится к процессу обработки транзакций в режиме реального времени, что позволяет быстро регистрировать и обрабатывать все операции, связанные с транзакциями (например, покупки, продажи товаров, выдача кредитов, переводы денег и т.д.). __ OLTP-системы ориентированы на низкую задержку и быструю обработку большого количества коротких транзакций.  OLAP, с другой стороны, относится к процессу анализа данных и построению отчетов на основе собранных транзакционных данных. __ OLAP-системы ориентированы на высокую задержку и предоставляют глубокий анализ данных, основанный на агрегированных, иерархических данных.  Основными отличиями между OLTP и OLAP являются:  __- Цель: OLTP обрабатывает операции транзакций в режиме реального времени, в то время как OLAP выполняет анализ данных для принятия стратегических решений. __ - Структура данных: OLTP использует структурированные данные, которые представляют отдельные транзакции, в то время как OLAP использует денормализованные данные в форме кубов, организованных в категории, измерения и иерархии. __ - Задержка: OLTP имеет низкую задержку и быструю скорость обработки, тогда как OLAP имеет высокую задержку и медленную скорость обработки данных. __ - Операции: OLTP отвечает за запись и обновление данных, в то время как OLAP отвечает за чтение и анализ данных.\",\"assets/voise/2qUs68.mp3\"],[\"Вспомните разные типы репликации в SQL Server?\",\"1. Транзакционная репликация (Transactional replication) - в этом типе репликации изменения данных в исходной базе данных (издателе) передаются в подписчики в виде транзакций. Данные передаются в режиме реального времени. Этот тип репликации используется для высоконагруженных систем, где время задержки при передаче данных должно быть минимальным.  2. Слияние репликации (Merge replication) - в этом типе репликации изменения данных в исходной базе данных передаются в подписчики раз в определенный период времени, например, раз в несколько минут или часов. Изменения данных могут быть применены по разному, что позволяет издателю и подписчикам работать автономно без непрерывного подключения друг к другу. Этот тип репликации часто используется для высокодоступных систем, когда доступность данных критична, но время задержки при передаче данных не так важны.  3. Снимок репликации (Snapshot replication) - этот тип репликации создает копию всей базы данных издателя и отправляет на подписчика. Это происходит только один раз при инициализации репликации. Далее репликация работает аналогично слиянию репликации. Этот тип репликации наиболее прост в настройке, но имеет недостатки в конфликтах и больших объемах данных.   4. Peer-to-peer репликация - позволяет нескольким серверам баз данных обмениваться данными. Каждый сервер имеет возможность участвовать в репликации как издатель и подписчик. Данные передаются от сервера к серверу и могут изменяться на каждом узле. Этот тип репликации наиболее сложен и редко используется.\",\"assets/voise/2qUs69.mp3\"],[\"Что вы понимаете под Self Join? Приведите примеры.\",\"Self Join (самосоединение) - это операция соединения таблицы саму с собой. Она используется для объединения строк в одной таблице, когда эти строки имеют определенные отношения между собой.   Например, предположим, что у нас есть таблица пользователей, которая содержит идентификатор пользователя, имя, фамилию и идентификатор менеджера. Менеджер также является записью в таблице пользователей. Мы можем использовать Self Join для создания новой таблицы, где каждая строка будет содержать информацию о пользователе и его менеджере.  Пример запроса на самосоединение таблицы пользователей:  ``` SELECT u1.name AS employee_name, u2.name AS manager_name FROM users u1 JOIN users u2 ON u1.manager_id = u2.id; ```  В этом запросе мы объединяем таблицу пользователей с самой собой, используя внутреннее соединение по идентификатору менеджера (manager_id). Далее мы выбираем имя сотрудника (u1.name) и имя его менеджера (u2.name) в новой таблице.    \",\"assets/voise/2qUs70.mp3\"],[\"Что такое cursor в SQL Server и как им пользоваться?\",\"Cursor (курсор) в SQL Server - это объект, который позволяет выполнять итерацию по результатам запроса и обрабатывать каждую строку по отдельности.   Основное назначение курсора заключается в том, чтобы получать записи из таблицы по одной и обращаться к ним по отдельности.   Курсоры используются, когда необходимо обработать каждую строку таблицы (или выборки) отдельно с использованием сложной логики или при использовании транзакций. Как правило, курсоры используются тогда, когда другие методы (например, операторы WHERE и HAVING) не могут обеспечить необходимую логику обработки.  Для работы с курсором в SQL Server используются следующие операторы:   - DECLARE CURSOR - для объявления курсора - FETCH - для получения следующего значения курсора - CLOSE - для закрытия курсора - DEALLOCATE - для удаления курсора  Пример использования курсора: ``` DECLARE myCursor CURSOR FOR SELECT * FROM myTable  OPEN myCursor FETCH NEXT FROM myCursor  WHILE @@FETCH_STATUS = 0 BEGIN    --обработка записи    FETCH NEXT FROM myCursor END CLOSE myCursor DEALLOCATE myCursor ```   При использовании курсоров необходимо учитывать, что они могут иметь негативное влияние на производительность запроса, поэтому их следует использовать только в тех случаях, когда другие методы не могут решить задачу.    \",\"assets/voise/2qUs71.mp3\"],[\"Что основное нужно проверить при тестировании мобильного приложения?\",\"1. Функциональность: убедиться, что все функции и элементы приложения работают правильно и выполняют требования.  2. Совместимость: проверить, что приложение работает на разных устройствах и версиях операционных систем.  3. Надежность: провести тестирование на устойчивость к неожиданному поведению пользователя или системы.  4. Производительность: проверить полное время загрузки приложения, время отклика и время обработки данных.  5. Интерфейс: оценить качество дизайна и функциональности интерфейса.  6. Безопасность: проверить приложение на наличие уязвимостей или потенциальных проблем безопасности.  7. Пользовательский опыт: провести тестирование на удобство и простоту использования приложения.  8. Локализация: проверить работоспособность приложения на разных языках и культурах.  9. Взаимодействие: провести тестирование на взаимодействие с другими приложениями и сервисами.  10. Обновления: проверить, что обновления приложения работают правильно и не нарушают функциональность.\",\"assets/voise/2qUs72.mp3\"],[\"Что такое Manifest.xml в .apk файле и какие данные там указывают?\",\"Manifest.xml - это файл, который содержит информацию о приложении в формате XML. Он является обязательным файлом для любого Android-приложения, и содержит в себе мета-информацию о приложении, такую как:  - имя пакета приложения; - список разрешений, которые необходимы приложению для работы (например, доступ к камере или к хранилищу); - список компонентов приложения (активности, службы, перехватчики намерений, провайдеры контента); - описание приложения, включая имя, версию, автора и иконку; - список аппаратных и программных требований; - настройки ориентации экрана и других параметров отображения.  В целом, Manifest.xml - это файл, который определяет основные характеристики приложения, которые необходимы для запуска и корректной работы на устройстве с операционной системой Android.\",\"assets/voise/2qUs73.mp3\"],[\"Что такое режим разработчика Do not keep activities?\",\"Режим разработчика Do not keep activities в Android - это функция, которая позволяет установить приложениям команду 'не сохранять активности' после того, как пользователь покидает их. Это означает, что приложения не будут сохранять состояния активности, когда пользователь переключается между различными приложениями, экранами или возвращается к домашнему экрану. Это можно использовать для тестирования приложений и обнаружения проблем с памятью, связанных с сохранением состояний активности при переходе между приложениями.\",\"assets/voise/2qUs74.mp3\"],[\"Как происходит перехват трафика http/https для мобильных устройств?\",\"Перехват трафика HTTP/HTTPS на мобильных устройствах может быть выполнен различными способами.   Один из наиболее распространенных способов - это использование перехватчиков прокси-серверов. Пользователь изменяет настройки своего устройства таким образом, чтобы весь трафик проходил через прокси-сервер, который может выполнять перехват и анализировать все входящие и исходящие HTTP/HTTPS запросы и ответы. Такие перехватчики могут быть установлены на устройствах пользователя или на сервере, к которому подключается пользователь.  Еще один способ перехвата трафика HTTP/HTTPS - это использование вредоносных приложений и программ, которые могут установиться на устройстве без ведома пользователя и перехватывать трафик. Эти программы могут работать как прокси-серверы, анализировать трафик и отправлять его злоумышленнику.  Также возможны перехват трафика при использовании открытых или ненадежных Wi-Fi сетей. Злоумышленник может создать поддельную точку доступа к Wi-Fi и перехватывать трафик, который проходит через нее.  Для защиты от перехвата трафика HTTP/HTTPS рекомендуется использовать надежные прокси-сервера, подключаться только к надежным Wi-Fi сетям, использовать шифрование трафика и не устанавливать приложения из ненадежных источников.    \",\"assets/voise/2qUs75.mp3\"],[\"В каком виде хранятся данные в мобильных приложениях локально?\",\"Данные в мобильных приложениях могут хранится в разных форматах в зависимости от типа приложения и технологий, которые используются. Некоторые из наиболее распространенных форматов для хранения данных в приложениях включают: __ 1. Базы данных SQLite: базы данных SQLite используются для хранения структурированных данных, таких как контакты, настройки, история и т.д. __ 2. Файлы SharedPreferences: файлы SharedPreferences используются для хранения простых данных, таких как строки, числа, булевы значения и т.д. __ 3. Файлы JSON и XML: JSON и XML являются форматами для передачи и хранения данных, и они могут быть использованы в приложениях для локального хранения и чтения данных. __ 4. Файлы в формате текста: файлы в формате текста, такие как .txt, могут также использоваться для хранения данных, например, текстовых документов, заметок и т.д. __ 5. Файлы изображений и видео: файлы изображений и видео также могут храниться локально на устройстве пользователя.  __ В каком формате будут храниться данные в приложении зависит от выбранного программистом или разработчиком способа хранения информации.\",\"assets/voise/2qUs76.mp3\"],[\"Как тестировать миграцию локальных данных?\",\"Миграция локальных данных относится к процессу переноса данных из одного хранилища данных в другое, обычно для улучшения производительности, снижения затрат или обновления системы. Это может включать в себя перенос данных между базами данных, серверами, приложениями или операционными системами на локальном компьютере или в облаке.  Для того чтобы успешно протестировать миграцию локальных данных, следует применять следующие подходы:  1. Создайте тестовую среду со стабильным и точным зеркалом продукции. Это может включать в себя создание тестовых баз данных и воспроизведение в них реальной среды.  2. Применяйте групповое тестирование, чтобы требовать много проверок и общего использования данных.  3. Тесно взаимодействуйте с командами, отвечающими за разные части миграции и следите за ограничениями времени выполнения задач.  4. Проверяйте качество данных после миграции, чтобы убедиться, что все проблемы устранены и данные корректно перенесены.  5. Используйте автоматические тесты и мониторинг, чтобы проверять процесс миграции в реальном времени и реагировать на любые ошибки незамедлительно.  6. Изучайте и анализируйте отчеты о миграции, чтобы определить причины возникновения проблем и улучшить процесс миграции в будущем.\",\"assets/voise/2qUs77.mp3\"],[\"Каковы основные компоненты Android-приложений (активити / фрагмент / сервис / интент-фильтр)?\",\"1. Активити (Activity) - это компонент, который представляет собой экран приложения.   2. Фрагмент (Fragment) - это компонент, который представляет собой многократно используемую часть пользовательского интерфейса внутри активности.  3. Сервис (Service) - это компонент, который выполняется в фоновом режиме без необходимости взаимодействия с пользователем и работает в фоновом режиме даже тогда, когда пользователь не взаимодействует с приложением.  4. Интент-фильтр (Intent-filter) - это компонент, который определяет, какие типы интентов может обрабатывать приложение. Это позволяет другим приложениям обмениваться данными или вызывать функциональность внутри приложения\",\"assets/voise/2qUs78.mp3\"],[\"Опишите жизненный цикл разработки ПО.\",\"Жизненный цикл разработки ПО — это процесс, который применяется для создания программного обеспечения (ПО) от начала до конца. Обычно этот цикл включает в себя определенное количество этапов, которые мы описываем ниже:  1. Планирование На этом этапе происходит сбор требований, идей и желаний клиента. Определяется сроки, бюджет и разрабатывается план проекта.  2. Анализ На этом этапе происходит анализ технических требований и возможностей. Оценивается техническая реализуемость проекта, определяется дизайн и структура системы.  3. Проектирование На этом этапе определяется архитектура, выбираются технологии и инструменты, выбираются методы кодирования и тестирования. Создаются планы для различных этапов разработки.  4. Разработка На этом этапе выполняется реализация проекта. В это время создаются и тестируются коды программного обеспечения.  5. Тестирование На этом этапе проверяется качество и корректность работы ПО. Ошибки и недостатки выявляются и исправляются.  6. Развёртывание На этом этапе созданный продукт готовится к применению на целевой платформе. Это может быть развертывание на сервере, интеграция с другими приложениями.  7. Поддержка На этом этапе продукт отлаживается и обслуживается в течении всего его жизненного цикла, добавляются новые функции и устраняются ошибки.  Каждый из этих этапов очень важен для успешного завершения проекта по разработке программного обеспечения. Разработчики ПО должны придерживаться правильной последовательности и соблюдать каждый этап, чтобы получить качественный продукт, который соответствует требованиям заказчика.\",\"assets/voise/2qUs79.mp3\"],[\"Что такое утечки памяти? Как найти?\",\"Утечки памяти – это проблема, связанная с тем, что приложение по-прежнему использует память, даже когда оно больше не нуждается в ней, и не освобождает ее для других процессов. Это может привести к исчерпанию памяти системы и, как следствие, к низкой производительности и падению приложения.  Как найти утечки памяти:  1. Используйте специальные инструменты для профилирования памяти, такие как Valgrind, VisualVM, Xcode Instruments или Intel VTune. Эти инструменты могут помочь найти места в коде, где утечки могут происходить.  2. Отслеживайте свои логи приложений и обратите внимание на любые сообщения об ошибках памяти, такие как 'не удалось выделить память' или 'недостаточно памяти'.  3. Проверьте свой код на утечки памяти вручную, анализируя каждую функцию и метод, чтобы убедиться, что они правильно используют выделенную память.  4. Используйте инструменты для отслеживания памяти, такие как malloc_debug, чтобы убедиться в том, что ваше приложение правильно управляет памятью.  5. Если вы используете языки программирования с автоматическим управлением памятью, такие как Java или Python, попробуйте запустить сборщик мусора и посмотреть, сможет ли он освободить ненужную память.  В целом, поиск и устранение утечек памяти является важной задачей для любого разработчика, который хочет создавать высокопроизводительные и стабильные приложения.    \",\"assets/voise/2qUs80.mp3\"],[\"Как протестировать билд на Android?\",\"1. Загрузить APK-файл на устройство  Вы можете загрузить APK-файл на устройство через USB-кабель, Bluetooth или интернет-сервер. Если вы используете USB-кабель, то необходимо установить соответствующие драйверы на компьютер и активировать режим отладки на устройстве.  2. Запустить приложение  После загрузки APK-файла на устройство, вы можете открыть приложение, чтобы протестировать его. Если на экране появляется сообщение о возможных ошибках или предупреждениях, необходимо внимательно прочитать их.  3. Протестировать функциональность  Протестируйте все функциональные возможности приложения с помощью разных вводных данных. Проверьте, что приложение работает корректно и соответствует требованиям.  4. Запись логов  Чтобы получить информацию об ошибках, доступных на устройстве, вы можете записывать логи. Вы можете использовать Android Debug Bridge (ADB) или установить сторонние приложения для записи логов.  5. Отписаться об ошибках  Если вы обнаружили ошибки, сообщите об этом команде разработчиков, чтобы они могли исправить их в следующих сборках. Они могут попросить вас предоставить логи или подробное описание ошибки.\",\"assets/voise/2qUs81.mp3\"],[\"Что такое Testflight? Как тестировать с его помощью?\",\"Testflight - это инструмент для тестирования мобильных приложений, разработанный компанией Apple. С его помощью вы можете давать доступ к вашим приложениям (iOS, iPadOS, watchOS, tvOS) тестерам и получать от них обратную связь.  Чтобы начать использовать Testflight, вам необходимо создать Apple Developer Account и добавить свои приложения в Testflight. Затем вы можете добавлять тестеров, указывать им права доступа и отправлять приглашения и инструкции по установке.  Как только тестер получит доступ к приложению, он может тестировать его и отправлять отчеты об ошибке и обратную связь прямо из приложения.  Testflight также предоставляет различные инструменты для сбора обратной связи и отслеживания прогресса тестирования, такие как: общая оценка тестов, количество тестеров, временные метки окончания тестов и т.д.  В целом, Testflight является мощным инструментом для эффективного тестирования мобильных приложений и повышения качества вашего продукта.\",\"assets/voise/2qUs82.mp3\"],[\"Как работает Android? Какая у него архитектура?\",\"Android - это операционная система для мобильных устройств, которая была разработана компанией Google. Его архитектура основана на ядре Linux и использует различные компоненты, такие как приложения, фреймворки и службы, для обеспечения функциональности устройства.   Android использует принципы модульного программирования и разветвленной архитектуры, которые позволяют разработчикам создавать функциональные компоненты, которые могут быть повторно использованы в различных приложениях. Один из ключевых компонентов архитектуры Android - это фреймворк приложений, который обеспечивает среду выполнения для всех приложений, работающих на устройстве.  Android также использует децентрализованный подход к управлению контентом и приложениями, который позволяет пользователям загружать приложения из различных источников и управлять ими независимо. Это делает Android очень гибкой и настраиваемой операционной системой, которая может быть легко настроена для удовлетворения индивидуальных потребностей каждого пользователя.\",\"assets/voise/2qUs83.mp3\"],[\"Как происходит деплой программ IOS/AOS?\",\"Деплой (от англ. deploy - разместить, развернуть) - это процесс размещения и запуска приложения или программы на целевой платформе или устройстве, чтобы оно могло успешно выполнять свои функции.  Деплой программ IOS/AOS происходит следующим образом: - Для IOS: после того, как разработчик создал приложение, он должен загрузить его на Apple Store, где оно будет проверено на соответствие требованиям компании Apple и установлено в магазине. После этого пользователи iPhone и iPad смогут загрузить приложение из магазина на свои устройства.  - Для AOS: после разработки приложения разработчик должен загрузить его в Google Play Store, где оно также будет проверено на соответствие требованиям компании Google и установлено в магазине. Пользователи Android могут загружать приложение из магазина на свои устройства. Кроме этого, приложения для AOS могут также устанавливаться и запускаться без помощи магазина, если файл приложения был скачан и установлен на устройстве автономно.\",\"assets/voise/2qUs84.mp3\"],[\" Что делать, если разработчик не соглашается, что указанный баг действительно является багом? А если в требованиях использована неоднозначная формулировка? Если бизнес-аналитик, PM и представитель клиента сейчас недоступны, чтобы подсказать? Как можно предотвратить такую ​​ситуацию?\",\"1. Провести дополнительные исследования: если разработчик не считает, что указанный баг является багом, скорее всего, у него есть свои причины. Попробуйте понять, почему он считает иначе. Возможно, это результат различных взглядов на проект, используемых методологий или определения ошибки.  2. Проконсультироваться с тестировщиком, который обнаружил баг. Возможно, ему есть дополнительные данные, которые могут помочь определить, является ли проблема багом.  3. Анализировать дополнительные данные. Обратитесь к логам, документации или истории проекта, чтобы попытаться понять, какие причины возникновения проблемы.  4. Воспользоваться помощью другого разработчика. Попросите другого разработчика проекта или более опытного специалиста из команды посмотреть на проблему. Их мнение может помочь определить, является ли она багом или нет.  5. Попросите совета у менеджера проекта. Обсудите проблему и вдруг возникшее несогласие со своим менеджером проекта. Рассматривайте все возможные варианты решения проблемы.  6. Заранее убедиться, что требования к проекту соответствуют бизнес- и стейкхолдерским целям. Однозначные и понятные требования могут помочь исправлять проблемы, прежде чем они станут багами.  7. Убедитесь, что коммуникация в команде ведется исчерпывающим образом. Постарайтесь наладить систему прозрачного передачи информации и кооперативного обмена мнениями. Так вы избегнете недопониманий и сможете быстро реагировать на возникшую проблему.    \",\"assets/voise/samCh.mp3\"],[\"Сложилась ситуация, когда команда тестирования не успевает закончить свою работу в дедлайн. Как правильно действовать в этом случае? А если релиз передвинуть нельзя? А если никакие фичи из релиза забрать нельзя?\",\"В этом случае следует следующее:  1. Оценка ситуации: команда должна объективно оценить, почему не успевает закончить свою работу в дедлайн. Если это связано с недостатком ресурсов (например, недостаток тестировщиков), необходимо рассмотреть возможность временной или постоянной увеличения команды.  2. Планирование: если релиз не может быть передвинут, необходимо создать план, который поможет определить, какие тесты будут проведены, а какие – пропущены. Важно сосредоточиться на тестах, которые помогут найти наиболее критические ошибки.  3. Обратная связь: важно уведомить проектного менеджера об изменениях в расписании тестирования. Обратная связь также должна быть дана разработчикам, чтобы они знали, какие тесты будут пропущены, и могли подготовиться к релизу.  4. Риски: важно также оценить риски, связанные с пропущенными тестами. Возможно, вам придется отложить релиз на некоторое время, чтобы провести нужные тесты. Если это невозможно, необходимо недостатки тестирования включить в план отчетности, чтобы разработчики знали, где могут быть ошибки.  5. Проанализировать: после окончания релиза следует провести пост-релизный анализ, чтобы понять, какие моменты вызвали проблемы, и узнать, как тестирование можно улучшить для будущих релизов.\",\"assets/voise/samCh.mp3\"],[\"Что делать, если проект уже начался, а QA-инженер там начал работать только когда начали разрабатываться бизнес-фичи? Какие этапы тестирования теперь нужно наверстать и нужно ли это? Как это сделать максимально грамотно без ущерба для загрузки по тестированию новых фич? Какие риски имеет позднее вовлечение QA-инженера в разработку?\",\"Если QA-инженер начал работать только после того, как проект уже начался, то необходимо наверстать пропущенные этапы тестирования и убедиться в качестве уже созданных функций. Это может включать в себя:  1. Анализ и понимание требований проекта, чтобы понимать, какие функции уже реализованы и нуждаются в тестировании. 2. Создание тест-плана, который определяет, какие функции нужно протестировать. 3. Создание тест-кейсов для каждой из функций, чтобы убедиться, что каждая функция работает должным образом. 4. Выполнение тестирования, чтобы проверить работоспособность уже созданных функций. 5. Отчет по найденным ошибкам и выстраивание процесса решения найденных проблем.  Эти шаги необходимы, чтобы убедиться в качестве созданных функций и избежать возможных проблем в будущем.  Позднее вовлечение QA-инженера в разработку может привести к риску упущения важных функций или проблем в работе уже разработанных частей проекта. Однако, если QA-инженер будет работать в тесном сотрудничестве с командой разработки и их понимании требований проекта, риски могут быть уменьшены.   Максимально грамотно сделать это можно, если QA-инженер начнет с изучения требований проекта и работает в тесном сотрудничестве с разработчиками. Они могут определять, какие функции должны быть протестированы, какие тест-кейсы нужны, и работать над тестированием в ближайшие сроки, не замедляя разработку новых функций.\",\"assets/voise/samCh.mp3\"],[\"Веб-страница с полями e-mail, password и кнопкой submit. Назовите отрицательные тест-кейсы, по которым можно проверить эту страницу.\",\"1. Ввод некорректных символов в поле e-mail, например, специальных символов, без символа @ или без доменной части. 2. Ввод некорректного формата пароля, например, менее 6 символов или без использования цифр или букв в различных регистрах. 3. Отправка формы без заполнения одного или нескольких обязательных полей (могут быть классифицированы как поле e-mail или password). 4. Попытка входа с неверными учетными данными (несуществующий e-mail или пароль). 5. Попытка входа с правильным e-mail, но паролем, который был изменен или введен неправильно. 6. Отправка формы при использовании несовместимого браузера или устройства, которые могут быть недоступны для этой страницы.    \",\"assets/voise/samCh.mp3\"],[\" Предположим, что после нажатия кнопки submit страница перезагружается и ранее введенные данные исчезают. Как проверить, что информация отправлена ​​в базу данных?\",\"С помошью DevTools или в бД посомтреть\",\"assets/voise/samCh.mp3\"],[\"Как проверить, что данные отправились на сервер, если у нас нет доступа к бэкенду?\",\"С помошью DevTools\",\"assets/voise/samCh.mp3\"],[\"Приведите примеры улучшений для приведенной веб-страницы (любая на выбор).\",\"надо поменять на другой вопрос\",\"assets/voise/samCh.mp3\"],[\"Составить Smoke Test Suite для этой страницы \",\"интересно что ты напишешь\",\"assets/voise/samCh.mp3\"],[\"Протестовать функционал банкомата с помощью техники State Transition Diagram.\",\"Диаграмма переходов состояний — это графическое представление системы, которое помогает идентифицировать различные состояния, события и переходы системы. В этом случае мы можем использовать диаграмму перехода состояний для проверки функциональности банкомата. Ниже приведены состояния, события и переходы банкомата: Состояния: 1. Бездействие: банкомат ожидает, пока пользователь введет свою карту. 2. Считыватель карт: банкомат считывает информацию о карте. 3. Ввод PIN-кода: пользователь вводит свой PIN-код. 4. Выбор транзакции: пользователь выбирает тип транзакции. 5. Выбор суммы: пользователь вводит сумму. 6. Выдача: Банкомат выдает деньги. 7. Выход: Пользователь удаляет свою карту и выходит. События: 1. Вставка карты: Пользователь вставляет свою карту. 2. Удаление карты: Пользователь удаляет свою карту. 3. Ввод PIN-кода: пользователь вводит свой PIN-код. 4. Выбор транзакции: пользователь выбирает тип транзакции. 5. Ввод суммы: пользователь вводит сумму. 6. Выдача: Банкомат выдает деньги. Переходы: 1. Бездействие -> Устройство чтения карт: Когда пользователь вставляет свою карту. 2. Считыватель карт -> ввод PIN-кода: при успешном считывании информации с карты. 3. Ввод PIN-кода -> Выбор транзакции: при вводе правильного PIN-кода. 4. Выбор транзакции -> Выбор суммы: когда пользователь выбирает тип транзакции. 5. Выбор суммы -> Выдача: когда пользователь вводит сумму. 6. Выдача -> Выход: после успешной выдачи денег. 7. Ввод PIN-кода -> Выход: когда пользователь вводит неверный PIN-код три раза. Используя диаграмму перехода состояний, мы можем протестировать различные сценарии работы банкомата. Например, если пользователь вставит недействительную карту, машина останется в состоянии «ожидание», и пользователь не сможет перейти к следующему состоянию. Точно так же, если пользователь вводит неправильный PIN-код три раза, машина вернется в состояние «Выход», и пользователю придется удалить свою карту и выйти. Тестируя все возможные сценарии, мы можем гарантировать, что банкомат работает должным образом и соответствует требованиям пользователя.\",\"assets/voise/samCh.mp3\"],[\"Написать предельные значения для ввода в форму оплаты товара на сайте.\",\"Конкретные предельные значения для оплаты товаров на сайте зависят от многих факторов, таких как страна, валюта, способы оплаты и т.д. Однако, для общей ориентации можно предложить следующие предельные значения:  - Максимальная сумма заказа: от $10 000 до $1 000 000 в зависимости от типа товаров и страны; - Минимальная сумма заказа: от $1 до $5 в зависимости от типа товаров и страны; - Максимальная сумма единовременного платежа: от $10 000 до $50 000 в зависимости от типа товаров и страны; - Минимальная сумма единовременного платежа: от $1 до $5 в зависимости от типа товаров и страны; - Максимальный лимит платежей в день/месяц: от $50 000 до $500 000 в зависимости от типа товаров и страны; - Минимальный лимит платежей в день/месяц: от $1 000 до $5 000 в зависимости от типа товаров и страны.  Однако, перед установкой конкретных предельных значений необходимо провести анализ запросов на платежи и принять во внимание множество факторов, таких как уровень безопасности, технические возможности и другие.\",\"assets/voise/samCh.mp3\"],[\"Есть метод POST, который регистрирует нового пользователя на сайте, есть тело запроса, содержащее данные о почте, телефоне, имени пользователя и адресе проживания. Какие кейсы для проверки можете привести?\",\". Проверка, что при отправке корректных данных новый пользователь успешно регистрируется на сайте. 2. Проверка, что необходимые поля (email, телефон, имя пользователя, адрес проживания) обязательно заполнены и в случае их отсутствия пользователь не будет зарегистрирован. 3. Проверка, что формат почты и телефона соответствуют требованиям сайта (например, email должен содержать символ @ и домен, телефон - только цифры). 4. Проверка, что при попытке зарегистрировать пользователя с уже зарегистрированным email или телефоном система выдает соответствующее сообщение об ошибке. 5. Проверка, что при использовании некорректных символов в полях (например, специальных символов, цифр только в имени пользователя и т.д.) система выдает соответствующее сообщение об ошибке. 6. Проверка, что при вводе слишком длинных значений в поля, система либо обрезает их до необходимой длины, либо выдает сообщение об ошибке.\",\"assets/voise/samCh.mp3\"],[\"На что следует акцентировать внимание при автоматизации методов API? Что следует проверять?\",\"При автоматизации методов API следует обратить внимание на следующие аспекты:  1. Корректность запросов и ответов: необходимо проверить, что запросы передаются в правильном формате и соответствуют спецификации API, а ответы возвращаются с правильными кодами статуса, телом ответа и заголовками.  2. Масштабируемость: необходимо убедиться, что тесты объемного уровня работают корректно, и система способна обрабатывать большие объемы трафика.  3. Безопасность: необходимо проверить, что данные передаются в безопасном режиме, и API защищено от возможных атак, таких как подделка или перехват данных.  4. Надежность: необходимо убедиться, что система работает стабильно и выдает правильные результаты в любых условиях.  5. Совместимость: необходимо проверить, что система совместима со всеми используемыми внешними системами и программными интерфейсами.  6. Скорость: необходимо убедиться, что API работает достаточно быстро, чтобы обеспечить эффективное взаимодействие между пользователями и системой.  7. Документирование: необходимо убедиться, что API полностью документировано, и тестовые сценарии поддерживаются на документации, чтобы облегчить тестирование и поддержку системы в целом.\",\"assets/voise/samCh.mp3\"],[\"Вы тестируете логин-форму, вводите логин и пароль, нажимаете кнопку логин и ничего не происходит. Ваши действия?\",\"1. Проверил бы, не остались ли поля логина или пароля пустыми, или если данные в поле введены неправильно. 2. Проверил бы, работает ли кнопка логин, перезагрузив страницу и попробовав снова нажать кнопку. 3. Изменил бы браузер или устройство, чтобы проверить, не связаны ли проблемы с определенной средой. 4. Проверил бы журнал ошибок, чтобы выяснить, есть ли какие-либо сведения об ошибках, которые могут помочь мне определить причину проблемы.\",\"assets/voise/samCh.mp3\"],[\"Что такое Тестовое Покрытие (Test Coverage)\",\"это одна из метрик оценки качества тестирования, представляющая из себя плотность покрытия тестами требований либо исполняемого кода. __Тестовое покрытие - это процесс, при котором разработчики используют автоматические тесты, чтобы проверять работоспособность, точность и качество программного кода. Оно позволяет получить информацию о том, насколько хорошо тестируемый код покрывается тестами и насколько хорошо каждый участок кода проверяется тестами. Чем выше уровень тестового покрытия, тем более надежным и стабильным становится программное обеспечение.\",\"assets/voise/samCh.mp3\",\"http://www.protesting.ru/testing/testcoverage.html\"],[\"Вам нужно сделать Regression Testing за два дня. Как вы это сделаете, если Regression Run охватывает 1000 тест-кейсов?\",\"1. Оценить важность тест-кейсов и их приоритет. Это поможет определить, какие тесты следует запустить первыми и какие можно отложить на более поздний период.  2. Запустить автоматизированные тесты. Если они доступны, то это может быть один из самых быстрых способов протестировать изменения и убедиться, что новый функционал не повредил старый.  3. Работать с командой и коллегами, чтобы подготовить все ресурсы (функциональные требования, скрипты и т.д.) заранее и начать тестирование, как только это возможно.  4. Применить техники оптимизации тестирования, например, использование параллельного тестирования (если это возможно) и тестирование только необходимых частей приложения.  5. После окончания Regression Testing, проанализировать результаты и сделать выводы об успехе или неудачах.  Конечно, этот список не исчерпывает всех возможных подходов, техник и инструментов, которые могут пригодиться в задаче Regression Testing. В каждой конкретной ситуации следует выбрать тот метод, который наилучшим образом справляется с поставленной задачей.    \",\"assets/voise/samCh.mp3\"],[\"Вы тестируете интернет-магазин, который продаёт карандаши. В заказе нужно указать количество карандашей (максимум для заказа – 1000 штук). В зависимости от заказанного количества карандашей отличается цена: _1–100 – 10 руб за шт. _101-200 – 9 руб за шт. _201-300 – 8 руб за шт. _С каждой новой сотней цена уменьшается на 1 гривну. Задание: используя тест-дизайн, опишите все необходимые тест-кейсы, которые будут максимально покрывать описанную функциональность.\",\"1. Проверка возможности заказа 1 карандаша. __Ожидаемый результат: успешное оформление заказа по цене 10 руб. __2. Проверка возможности заказа 1000 карандашей (максимальное количество). _Ожидаемый результат: успешное оформление заказа по цене 4 руб за шт. __3. Проверка ввода некорректного количества карандашей (например, букв). _Ожидаемый результат: система должна сообщить об ошибке и не позволить оформить заказ. __4. Проверка ввода количества карандашей 0. _Ожидаемый результат: система должна сообщить об ошибке и не позволить оформить заказ. __5. Проверка ввода количества карандашей больше 1000. _Ожидаемый результат: система должна сообщить об ошибке и не позволить оформить заказ. __6. Проверка того, что при заказе 50 карандашей цена будет 10 руб за шт. _Ожидаемый результат: успешное оформление заказа по цене 10 руб за шт. __7. Проверка того, что при заказе 150 карандашей цена будет 9 руб. _Ожидаемый результат: успешное оформление заказа по цене 9 руб за шт. __8. Проверка того, что при заказе 250 карандашей цена будет 8 руб. _Ожидаемый результат: успешное оформление заказа по цене 8 руб за шт.___ 9. Проверка того, что при заказе 301 карандашей цена будет 7 руб. _Ожидаемый результат: успешное оформление заказа по цене 7 руб за шт. __10. Проверка того, что при заказе 900 карандашей цена будет 4 руб за шт. Ожидаемый результат: успешное оформление заказа по цене 4 руб за шт.\",\"assets/voise/samCh.mp3\"],[\"Есть приложение типа мессенджера, пользователь заходит в чат и отсылает файл (видит сообщение Failed to send...) Когда это может быть баг, а когда нет?\",\"Если интернет соединение отсутствует то это не баг, если соединение есть но не отпарвляется и мы не заблокированы другим пользователем это баг!\",\"assets/voise/samCh.mp3\"],[\"Есть веб-приложение интернет-магазина (регистрация, логин, поиск товаров, корзина и покупки). Программу поддерживают следующие браузеры: Chrome, Safari, Edge. У нас есть ограниченное время на тестирование. Расскажите, как вы будете проверять приложение?\",\"1. Проверка функциональности: начните с тестирования каждой функции приложения, включая регистрацию, логин, поиск товаров, корзину и покупки. Убедитесь, что все функции работают правильно и соответствуют требованиям.  2. Тестирование совместимости с браузерами: проверить веб-приложение на всех поддерживаемых браузерах (Chrome, Safari, Edge), чтобы убедиться, что приложение работает корректно и без ошибок на каждом из них.  3. Проверка безопасности: веб-приложение должно быть безопасным для пользователей. Изучите, как приложение обрабатывает данные пользователей, такие как логины, пароли и контактную информацию. Веб-приложение должно быть защищено от возможных атак и должно иметь механизмы защиты, такие как шифрование и авторизацию.  4. Тестирование производительности: приложение должно быть быстрым и отзывчивым, даже при большом количестве посетителей. Выполните тесты производительности для оценки скорости и надежности приложения.  5. Тестирование на ошибки и отладка: при тестировании на любых функциях, браузерах или платформах, необходимо искать ошибки и отладку кода. Убедитесь, что все замечания зарегистрированы и исправлены.  6. Тестирование мобильной версии: проверка, как веб-приложение работает на мобильных устройствах, таких как смартфоны и планшеты. Убедитесь, что веб-приложение полностью доступно и функционально на всех поддерживаемых мобильных платформах.  В завершении, я хотел бы отметить, что тестирование веб-приложения – это совокупность многих аспектов. Необходимо выполнить все процессы, связанные с тестированием, чтобы быть уверенным в том, что приложение готово для запуска и будет работать без сбоев и ошибок.\",\"assets/voise/samCh.mp3\"],[\"Напишите автоматические тестовые сценарии для проверки API операций создания и просмотра GitHub Gists. Интегрируйте ваш проект с известной вам CI-системой.\",\"1. Проверка функциональности: начните с тестирования каждой функции приложения, включая регистрацию, логин, поиск товаров, корзину и покупки. Убедитесь, что все функции работают правильно и соответствуют требованиям.  2. Тестирование совместимости с браузерами: проверить веб-приложение на всех поддерживаемых браузерах (Chrome, Safari, Edge), чтобы убедиться, что приложение работает корректно и без ошибок на каждом из них.  3. Проверка безопасности: веб-приложение должно быть безопасным для пользователей. Изучите, как приложение обрабатывает данные пользователей, такие как логины, пароли и контактную информацию. Веб-приложение должно быть защищено от возможных атак и должно иметь механизмы защиты, такие как шифрование и авторизацию.  4. Тестирование производительности: приложение должно быть быстрым и отзывчивым, даже при большом количестве посетителей. Выполните тесты производительности для оценки скорости и надежности приложения.  5. Тестирование на ошибки и отладка: при тестировании на любых функциях, браузерах или платформах, необходимо искать ошибки и отладку кода. Убедитесь, что все замечания зарегистрированы и исправлены.  6. Тестирование мобильной версии: проверка, как веб-приложение работает на мобильных устройствах, таких как смартфоны и планшеты. Убедитесь, что веб-приложение полностью доступно и функционально на всех поддерживаемых мобильных платформах.  В завершении, я хотел бы отметить, что тестирование веб-приложения – это совокупность многих аспектов. Необходимо выполнить все процессы, связанные с тестированием, чтобы быть уверенным в том, что приложение готово для запуска и будет работать без сбоев и ошибок.\",\"assets/voise/samCh.mp3\"]],[[\"Как вы преодолеете трудности из-за отсутствия надлежащей документации для тестирования?\",\"1. Определите, какие документы уже существуют и изучите их внимательно. Возможно, есть какие-то материалы, которые вам необходимы, но вам неизвестно, где их найти.  2. Свяжитесь с разработчиками и задайте все интересующие вас вопросы. Зачастую они могут предоставить вам дополнительную информацию, которая поможет вам заполнить пробелы в документации.  3. Проведите собственное исследование. Вам может потребоваться изучить документацию со смежных проектов или обратиться к используемым стандартам, чтобы понять, какие документы должны быть доступны.  4. Настройка открытой коммуникационной линии с представителями команды разработки. Широкая открытость обеспечивает процесс сбора, обработки и распространения информации.  5. Создайте собственную документацию. Важно отметить при этом, что ваша документация не является заменой официальной документации, но ее можно использовать как вспомогательный материал.  6. Обращайте внимание на реакцию пользователей на проекты. Отзывы пользователей могут помочь вам лучше понять, какие документы необходимы для тестирования и какие функции стоит проверить в первую очередь.\",\"assets/voise/3qUs1.mp3\"],[\"Какой подход является наилучшим для старта QA в проекте?\",\"1. Изучение требований и документации проекта.  2. Создание тест-плана на основе требований и документации.  3. Разработка тест-кейсов для покрытия всех возможных сценариев использования приложения.  4. Проведение функционального тестирования по разработанным тест-кейсам.  5. Оценка результатов тестирования и составление отчета об ошибках и недочетах.  6. Регулярное повторение тестирования после внесения изменений и исправлений.  7. Применение автоматизации тестирования для повышения эффективности и скорости процесса.  Кроме того, очень важно иметь хорошее понимание бизнес-целей проекта и умение работать в команде для эффективного взаимодействия с другими членами проекта (разработчиками, менеджерами проекта и т.д.).\",\"assets/voise/3qUs2.mp3\"],[\"Какие препятствия могут возникнуть в обеспечении качества для Agile Tester?\",\"1. Недостаток времени - Agile тестирование является быстрым и непрерывным процессом, и тестеру приходится работать в очень короткие сроки. Недостаток времени может привести к ненадежным результатам тестирования и ухудшению качества.  2. Отсутствие программистских навыков - Agile тестирование обычно включает автоматическое тестирование, поэтому тестеры также должны обладать навыками программирования. Если тестер не имеет достаточных программистских навыков, это может привести к неполноценному тестированию и возможным ошибкам в тестовых сценариях.  3. Несогласованность с разработчиками - Agile процесс включает взаимодействие между командой тестирования и разработчиками. Несогласованность между этими командами может привести к неполноценному тестированию, ошибках в коде и возможным проблемам со сроками.  4. Изменение требований - Agile процесс обычно включает постоянное обновление требований и изменение требований, которые были заданы ранее. Если тестер не учитывает эти изменения, это может привести к неполноценному тестированию и ошибкам в конечном продукте.  5. Ограниченные ресурсы - Agile процесс часто включает быстрое высвобождение продукта на рынок, что может привести к ограниченным ресурсам для тестирования. Ограниченные ресурсы могут привести к неполноценному тестированию, ошибкам в продукте и ухудшению качества.\",\"assets/voise/3qUs3.mp3\"],[\"Что такое Definition of Done?\",\"Критерии готовности (Definition of done) — это согласованный набор критериев, которые должны быть выполнены прежде, чем элемент бэклога (пользовательская история) будет считаться завершенным. Каждый элемент бэклога для конкретного продукта должен соответствовать определению критериев готовности (Definition of done), чтобы считаться потенциально готовым\",\"assets/voise/3qUs4.mp3\",\"https://habr.com/ru/post/684272/\"],[\"Когда можно считать, что тестирование окончено?\",\"Тестирование может быть окончено, когда все запланированные тесты были проведены, результаты были анализированы, оставшиеся ошибки были исправлены и убедительность продукта была подтверждена. Однако, в некоторых случаях, тестирование может быть продолжено до тех пор, пока не будут достигнуты определенные критерии качества или установлены все требования, ожидания и проблемы пользователей. В конечном итоге, окончание тестирования зависит от конкретных целей, установленных для каждого проекта.\",\"assets/voise/3qUs5.mp3\"],[\"Что такое RCA в тестировании? Нужно ли его проводить?\",\"RCA (Root Cause Analysis) - это метод исследования причин возникновения проблем в процессе тестирования и поиска их корневых причин. RCA может помочь установить, почему возникла проблема, какие факторы привели к ее возникновению и как ее можно предотвратить в будущем.  RCA в тестировании не является обязательным, но может быть полезным инструментом для повышения качества тестирования и улучшения процессов. Он может быть проведен индивидуально или в команде, и результаты анализа могут использоваться для разработки планов действий, которые помогут предотвратить появление подобных проблем в будущем.\",\"assets/voise/3qUs6.mp3\"],[\"Какой подход вы используете для Test Cases Review?\",\"Как и с любым другим процессом ревью, нет единого наилучшего подхода для проверки тест-кейсов. Многие факторы могут повлиять на то, какой подход будет лучше всего использовать, включая тип и сложность тестируемого продукта, количество тест-кейсов, как именно они рассчитываются, интересы заинтересованных сторон и много других.  К некоторым из наиболее распространенных подходов для обзора тест-кейсов относятся следующие:  1. Ручной обзор - в этом подходе задействуются эксперты в соответствующей области, которые просматривают тест-кейсы вручную и ищут потенциальные проблемы и улучшения.  2. Репрезентативное обнаружение дефектов - в этом подходе тестировщики намеренно внедряют ошибки в тест-кейсы, чтобы проверить, обнаружат ли обзорщики эти проблемы. Это помогает выявить проблемы с тест-кейсами и повысить качество их разработки.  3. Использование инструментов для автоматической проверки - дополнение тестирования вручную может помочь обнаружить ошибки или проблемы с тест-кейсами быстрее и более точно. Этот подход может использоваться в сочетании с ручным обзором или репрезентативным обнаружением дефектов.  Независимо от того, какой подход был выбран, важно осуществлять обзор тест-кейсов с целью улучшения процесса тестирования и устранения потенциальных проблем продукта до его публикации.\",\"assets/voise/3qUs7.mp3\"],[\"Какие виды рисков существуют? Что такое Mitigation Plan?\",\"Существует много видов рисков, но в общих чертах они могут быть разделены на несколько категорий: __ 1. Финансовые риски – связанные с потерей денежных средств. __ 2. Риски производственной деятельности – связанные с возможностью остановки производства из-за неисправности оборудования, отсутствия сырья и т.д. __ 3. Риски персонала – связанные с некомпетентностью или недобросовестностью сотрудников, а также возможными профессиональными травмами. __ 4. Риски юридической природы – связанные с возможностью конфликтов с контрагентами, правоприменительными органами и т.д. __ Mitigation Plan – это план по снижению рисков. Он предусматривает меры, которые помогают уменьшить вероятность наступления рисковых ситуаций, а также смягчить последствия, если они все же произошли. В частности, Mitigation Plan может включать в себя следующие меры: _ - Анализ и оценку рисков.  _- Разработку и внедрение стратегий по снижению рисков. _ - Разработку и применение мер по контролю и мониторингу рисков.  _- Подготовку резервных планов действий в случае наступления рисковых ситуаций. _  - Обучение сотрудников работе с рисками и мерам по их управлению.\",\"assets/voise/3qUs8.mp3\"],[\"На основе чего нужно составлять стратегию для проведения тестирования нагрузки?\",\"1. Анализ требований к производительности. Необходимо определить, какое количество пользователей и нагрузки система должна выдерживать. __ 2. Инструменты тестирования. Необходимо выбрать и настроить инструменты для проведения тестирования нагрузки. __ 3. Стресс-тестирование. Проверка системы на ее способность выдерживать экстремальные условия нагрузки. __ 4. Оценка производительности. Необходимо проверить, как система выполняет задачи при различных значениях нагрузок. __ 5. Результаты тестирования. Необходимо проанализировать результаты тестирования и выявить проблемы, которые были обнаружены.\",\"assets/voise/3qUs9.mp3\"],[\"Как часто следует ревьюировать тестовую документацию?\",\"Ответ на этот вопрос зависит от конкретных условий вашей работы и продукта. В общем случае, тестовую документацию следует регулярно обновлять и проверять, чтобы убедиться в ее актуальности и полноте. Оптимальная частота ревьюирования может быть разной для разных проектов и команд. Хорошей практикой является проверять тестовую документацию после каждого обновления продукта, перед выпуском новой версии и при необходимости в процессе работы с продуктом. Критически важно убедиться в том, что тестовая документация полностью описывает все требования к продукту, а тесты покрывают все возможные случаи использования продукта.\",\"assets/voise/3qUs10.mp3\"],[\"Как можно быстро сделать выборку необходимых проверок для смоук-тестирования?\",\"Для быстрого составления выборки необходимых проверок для смоук-тестирования можно использовать следующие рекомендации: __ 1. Определить основные функциональные области или модули продукта, которые должны быть покрыты смоук-тестированием. __ 2. Сформировать список ключевых функциональных требований, которые должны быть проверены в каждом модуле. __ 3. Использовать матрицу рисков для определения приоритетов проверок. Эта матрица оценивает потенциальные риски сбоев для каждой проверки и помогает определить, какие проверки должны быть выполнены в первую очередь. __ 4. Использовать методы комбинаторного тестирования для определения наборов функций, которые могут вызывать ошибки при определенных комбинациях с другими функциями. Это позволяет определить проверки, необходимые для проверки взаимодействия между различными функциями. __ 5. Использовать функциональное тестирование для проверки целостности функций, а также для проверки работы различных компонентов системы.__  6. Определить необходимость проведения нагрузочного тестирования для проверки производительности системы и ее способности обрабатывать большой объем данных.  7. Использовать автоматизированное тестирование для ускорения процесса проверки и повышения его эффективности. __ 8. Проводить регрессионное тестирование для проверки, не повлияла ли последняя версия продукта на работу проведенных ранее проверок.  Эти методы могут помочь быстро сформировать выборку необходимых проверок для смоук-тестирования и оптимизировать процесс тестирования продукта.\",\"assets/voise/3qUs11.mp3\"],[\"Как запланировать загруженность команды тестировщиков?\",\"1. Определить объем работы: Определите объем работы, который должны выполнить тестировщики на основе требований проекта. В этом пункте вы можете воспользоваться планированием проекта и выделить необходимые ресурсы. __ 2. Распределить работу: Распределите работы между тестировщиками. Учитывайте при этом опыт и специализацию каждого тестировщика. Это поможет снизить время, затраченное на тестирование, и повысить качество точности обнаружения ошибок. __ 3. Определить приоритет тестирования: Важные функциональные блоки и элементы приложения должны быть протестированы раньше, что позволит определить наиболее важные проблемы в начале и возможность их решения. Распределите хронологический график тестирования, чтобы определить, какие блоки или функции должны быть проверены в данное время. __ 4. Оценить трудоемкость: Оцените время и трудоемкость, необходимые каждому тестировщику для выполнения конкретного блока работы. Уточните, насколько самостоятельно каждый из ваших сотрудников справляется с задачами. Определите, время выполнения тестирования и получите общую статистику, чтобы понимать, сколько ресурсов вам понадобится на определенную задачу. __ 5. Мониторинг загруженности: NНеобходимо регулярно отслеживать процесс выполнения тестов с помощью системы отчетности и каждый раз принимать решение, что делать, если вдруг план не соблюдается. Мониторинг загруженности позволяет отслеживать прогресс и оценивать трудоемкость, давая возможность вовремя адаптироваться и изменить план, если это необходимо. __ 6. Привлекать дополнительные ресурсы. Если вы заметили, что команда тестировщиков не справляется с заявленными задачами в срок, не стесняйтесь привлекать дополнительные ресурсы - например, курсы, тренинги, аутсорсинг, и потратить ресурсы на дополнительную подготовку ваших тестировщиков.\",\"assets/voise/3qUs12.mp3\"],[\"Какую ценность несет анализ результатов тестирования команде и проекту в целом?\",\"Анализ результатов тестирования имеет несколько ценностей для команды и проекта в целом:  __1. Помогает выявить проблемы: Анализ результатов тестирования может помочь команде выявить проблемы, которые нужно решить. Например, если результаты тестирования показывают высокий уровень ошибок в определенной области, команда может принять меры для улучшения качества и исправления ошибок. __ 2. Определяет критические области: Анализ результатов тестирования помогает определить наиболее критические области проекта, которые нуждаются в особенном внимании. Например, если тестирование выявило множество ошибок в определенном модуле, команда может сосредоточить свои усилия на его исправлении. __ 3. Улучшает процессы: Анализ результатов тестирования может помочь команде улучшить свои процессы тестирования. Например, если тестирование выявило недостатки в используемых методах или инструментах, команда может принять меры для их улучшения. __ 4. Улучшает качество продукта: Анализ результатов тестирования помогает команде улучшить качество продукта. Например, если тестирование выявило множество ошибок в проекте, команда может принять меры для их исправления и улучшения качества продукта в целом. __ 5. Сокращает время и затраты: Анализ результатов тестирования может помочь команде сократить время и затраты на тестирование. Например, если анализ выявил, что некоторые тесты являются избыточными или не нужны, они могут быть удалены, что поможет сократить время и затраты на тестирование.    \",\"assets/voise/3qUs13.mp3\"],[\"Как можно подкорректировать флоу разработки, чтобы получать более чистые результаты на выходе и уменьшить количество багов на проде?\",\"Как сеньор тестирования, я могу предложить несколько рекомендаций для улучшения флоу разработки: __ 1. Проведение обязательной ревизии кода - разработчики должны предоставлять код для ревизии до его интеграции в основную ветку. Это позволит выявить ошибки и проблемы на ранних этапах разработки. Также следует использовать code review tools, такие как Crucible, GitHub, BitBucket, Gerrit и т. д. __ 2. Регулярное тестирование на ранних этапах разработки - тестирование должно начинаться сразу после того, как предоставлены основные функциональные возможности. Тестирование должно проводиться на каждом этапе разработки. __ 3. Использование автоматизированных тестов - автоматизация тестирования - это критически важный этап, который упрощает тестирование и позволяет быстро выполнять тесты. Использование автоматизированных тестов для всех функций, которые были уже протестированы, помогает выявить возможные проблемы и ошибки. __ 4. Улучшить коммуникацию и координацию между командами - часто баги возникают из-за недостаточной взаимодействия и координации между командами. Важно установить четкий план и систему коммуникации, чтобы снизить количество ошибок на проде.  Эти практики помогают снизить количество багов на проде и улучшить качество кода и продукта.\",\"assets/voise/3qUs14.mp3\"],[\"Расскажите о метриках качества, которые вы применяли. Зачем они нужны?\",\"Одна из основных метрик, которую я использовал, была процент успешно пройденных тестов. Эта метрика позволяет оценить качество продукта и эффективность процесса тестирования. Если процент успешно пройденных тестов низкий, то это может указывать на проблемы в процессе разработки или тестирования.  Также я использовал метрику количества найденных дефектов на единицу времени. Это помогало оценить производительность команды тестирования и эффективность поиска дефектов. Если количество найденных дефектов низкое, то это может означать, что команда тестирования не работает достаточно интенсивно.  Другой метрикой, которую я использовал, была метрика среднего времени решения проблемы. Это позволяло оценить качество работы команды разработки и эффективность принятия мер по устранению проблем. Если среднее время решения проблемы высокое, то это может указывать на проблемы в процессе разработки или сложности в поиске и устранении проблем.  В целом, метрики качества необходимы для оценки эффективности работы команды тестирования и процесса тестирования в целом, а также для выявления проблем и улучшения качества продукта.\",\"assets/voise/3qUs15.mp3\"],[\"Как провести эстимейт задачи? Каковы техники оценки объема тестирования существуют?\",\"Одна из основных метрик, которую я использовал, была процент успешно пройденных тестов. Эта метрика позволяет оценить качество продукта и эффективность процесса тестирования. Если процент успешно пройденных тестов низкий, то это может указывать на проблемы в процессе разработки или тестирования.  Также я использовал метрику количества найденных дефектов на единицу времени. Это помогало оценить производительность команды тестирования и эффективность поиска дефектов. Если количество найденных дефектов низкое, то это может означать, что команда тестирования не работает достаточно интенсивно.  Другой метрикой, которую я использовал, была метрика среднего времени решения проблемы. Это позволяло оценить качество работы команды разработки и эффективность принятия мер по устранению проблем. Если среднее время решения проблемы высокое, то это может указывать на проблемы в процессе разработки или сложности в поиске и устранении проблем.  В целом, метрики качества необходимы для оценки эффективности работы команды тестирования и процесса тестирования в целом, а также для выявления проблем и улучшения качества продукта.\",\"assets/voise/3qUs16.mp3\"],[\"Как можно посчитать покрытие тестами функционала?\",\"Существует несколько методов оценки покрытия тестами функционала: __ 1. По количеству выполненных тест-кейсов: проверяем соответствие количества созданных и выполненных тест-кейсов к количеству возможных сценариев. __ 2. По покрытию: используем техники покрытия тестами, такие как покрытие кода, покрытие состояний, покрытие путей, покрытие принятых решений и другие.  __3. По функциональности: оцениваем все функции и возможности продукта на наличие тест-покрытия. __ 4. По спецификациям: проверяем, насколько хорошо тесты покрывают требования и функциональные спецификации.  __Лучший подход - это комбинация всех перечисленных методов, которые позволяют более точно оценить покрытие тестами функционала, что в свою очередь обеспечивает высокий уровень качества конечного продукта.\",\"assets/voise/3qUs17.mp3\"],[\"Какое оптимальное количество шагов в тестовом сценарии?\",\"Оптимальное количество шагов в тестовом сценарии зависит от многих факторов, включая сложность приложения, количество функций, которые необходимо протестировать, доступные ресурсы, время, которое может быть выделено на тестирование, и т.д.  Обычно рекомендуется ограничивать количество шагов в тестовом сценарии от 5 до 15, чтобы сделать его более читаемым и управляемым. Если тестовый сценарий содержит более 15 шагов, то этот сценарий может быть разбит на более маленькие подсценарии.  Независимо от того, сколько шагов будет в тестовом сценарии, он должен быть документирован и легко понятен для всех членов команды, которые занимаются тестированием. Это поможет убедиться, что каждый шаг будет выполнен правильно и что тестирование будет проведено максимально эффективно.\",\"assets/voise/3qUs18.mp3\"],[\"Как избежать появления регрессивных дефектов?\",\"1. Документация. Одним из самых эффективных способов предотвращения регрессивных дефектов является хорошая документация. В документации должны быть четкие и подробные инструкции по тестированию всех функций системы. __ 2. Автоматизированные тесты. Автоматизированные тесты могут помочь обнаружить регрессивные дефекты, которые не были выявлены вручную. Тесты должны быть написаны так, чтобы они выполнялись автоматически при каждом изменении кода.  __3. Code Review. Код должен проходить обязательный Code Review перед вливанием в основную ветку. Это поможет обнаружить потенциальные проблемы в коде и предотвратить их появление.  __4. Интеграционное тестирование. При интеграции новых изменений нужно проводить дополнительное тестирование на взаимодействие между разными частями системы. __ 5. Постоянная тестирование. Систему нужно постоянно тестировать на наличие регрессивных дефектов, и вносить исправления при их обнаружении. __ 6. Использование стандартов кодирования. Стандарты кодирования помогают обеспечивать консистентность и читаемость кода. Это может помочь предотвратить ошибки, которые могут привести к регрессивным дефектам.__  7. Четкое понимание функциональных требований. Команда разработчиков должна иметь четкое понимание функциональных требований, чтобы они могли разрабатывать код, который соответствует этим требованиям и не вызывает регрессивных дефектов.    \",\"assets/voise/3qUs19.mp3\"],[\"Что такое тестирование со смещением влево (Shift left testing)?\",\"Тестирование со смещением влево (left-shift testing) - Это такой подход в тестировании, в котором QA погружается в работу на самых ранних стадиях разработки. Другими словами, QA начинает тестировать продукт уже на уровне идеи.\",\"assets/voise/3qUs20.mp3\"],[\"Как будете тестировать программу, если для продукта нет документации?\",\"1. Изучение программы: первым шагом будет тщательное изучение программы. Это позволит определить, как является программа структурированной, каким образом она работает и какие функции выполняет. __ 2. Тест-планирование: осуществление подробного планирования тестирования, которое будет включать в себя разработку тестовых сценариев, выбор оборудования для тестирования, определение тест-случаев и тест-данных. __ 3. Тестирование функциональности: проверка функциональности, которую программа должна выполнять. Проверка правильности работы и общей совместимости программы с другими приложениями. __ 4. Тестирование пользовательского интерфейса: поскольку необходимо выяснить, как работают функции при этом тестировании требуется определить UI/UX направленность программы, которая обеспечивает удобство пользователя. __ 5. Тестирование на возможные ошибки: тестирование, направленное на выявление ошибок и конфликтов программы, а также на недостатки в ее работе. Например: тестирование программы при возможных случаях ошибок, программных недостатках и технических сбоях.  6. Валидация тестов: проверка тестов на их эффективность и практичность в процессе тестирования программы. __ 7. Протоколирование ошибок: любые ошибки, найденные в процессе тестирования, должны быть записаны в отдельный журнал ошибок, где описывается тип ошибки, путь к ее возникновению, действия, которые приводят к ошибке, и описание результата. __ 8. Regression testing: процесс проверки программного кода на ошибки, которые появляются после устранения предыдущих. __  9. Автоматизированное тестирование: если программа имеет большую сложность, требует тщательных проверок или содержит функциональность, которую необходимо тестировать на постоянной основе, то автоматизирование тестирования может значительно облегчить задачу поиска ошибок.  В целом процесс тестирования программы, не имеющей документации, может оказаться незавершенным и сложным. Однако, если использовать методы, описанные выше, можно увеличить вероятность обнаружения проблем и недостатков в работе приложения.\",\"assets/voise/3qUs21.mp3\"],[\"В чем смысл юнит-тестов?\",\"Смысл юнит-тестов заключается в том, чтобы проверить отдельные компоненты (или «юниты») программного обеспечения на их корректность и работоспособность. Это позволяет выявить и исправить ошибки в коде на ранних этапах разработки. Юнит-тесты также позволяют документировать функциональность отдельных компонентов и обеспечить их стабильность при изменении кода. Благодаря использованию юнит-тестов разработчики могут ускорить процесс разработки и снизить вероятность ошибок, улучшив качество и надежность конечного продукта.\",\"assets/voise/3qUs22.mp3\"],[\"Какие минусы полной автоматизации тестирования?\",\"1. Невозможность воспроизвести некоторые типы ошибок. Ручное тестирование может выявить неявные ошибки, которые могут быть пропущены автоматизированными тестами.  __ 2. Возможность ложных срабатываний. Автоматизированное тестирование может выдавать ложные результаты, если тесты настроены неправильно.  __ 3. Высокие затраты на подготовку тестовых сценариев. Сложность и время, необходимые для создания и поддержки автоматизированных тестов, может быть выше, чем при ручном тестировании.  __ 4. Сложности в тестировании пользовательского интерфейса. Автоматизация тестирования пользовательского интерфейса может быть трудной, так как интерфейс может меняться и иметь огромное количество возможных вариантов. __  5. Невозможность тестирования новых областей и технологий. Полная автоматизация может быть сложна для новых областей и технологий, которые еще не были протестированы.  __ 6. Необходимость постоянной поддержки и обновления. Автоматизированные тесты должны постоянно обновляться и настраиваться, что может потребовать большого количества времени и ресурсов.  __ 7. Невозможность тестирования определенных типов уязвимостей. Автоматизированные тесты могут не обнаруживать некоторые типы уязвимостей, которые могут быть обнаружены только при ручном тестировании.\",\"assets/voise/3qUs23.mp3\"],[\"Что такое ROI и как его считать?\",\"ROI (англ. Return on Investment, рентабельность инвестиций) — это показатель, который используется для измерения эффективности инвестиций или проектов. Он показывает, сколько денег вы заработали на каждый затраченный доллар.  Формула для расчета ROI:  ROI = (выручка - затраты) / затраты * 100%  Допустим, ваша компания потратила $10 000 на маркетинг, в результате этого продажи увеличились на $15 000. Тогда ROI будет:  ROI = ($15 000 - $10 000) / $10 000 * 100% = 50%  Получается, что ваша компания получила 50% прибыли на каждый затраченный доллар на маркетинг. Чем выше ROI, тем более эффективно были вложены ваши инвестиции.\",\"assets/voise/3qUs24.mp3\"],[\"Что такое CI/CD? Какие плюсы и минусы этого подхода?\",\"CI/CD - это методология разработки программного обеспечения, которая объединяет в себе непрерывную интеграцию (Continuous Integration, CI) и непрерывное развертывание (Continuous Deployment, CD).  Continuous Integration (непрерывная интеграция) означает, что разработчики объединяют свой код регулярно, чтобы быстро обнаруживать и устранять ошибки и конфликты.  Continuous Deployment (непрерывное развертывание) предполагает автоматизированный процесс доставки продукта в рабочую среду. __ Благодаря автоматическому тестированию и сборке, оптимизации производительности и безопасности, такой процесс становится эффективным и экономичным.  Благодаря использованию CI/CD компании получают возможность ускорить процесс разработки, увеличить качество продукта, повысить скорость реакции на изменения и улучшить коммуникацию внутри команды. __ Плюсы:  1. Сокращение времени доставки продукта до клиента _ 2. Улучшение качества кода и уменьшение количества ошибок _3. Ускорение разработки и улучшение производительности _4. Автоматизация процессов тестирования и сборки __ Минусы:  1. Необходимость наличия высококвалифицированных специалистов _2. Необходимость вложений в инфраструктуру и оборудование _3. Необходимость обучения команды разработчиков и технической поддержки _4. Возможные проблемы с безопасностью и конфиденциальностью данных.\",\"assets/voise/3qUs25.mp3\"],[\"TOP OWASP: какие знаете уязвимости и методы защиты?\",\"1. SQL Injection - атакующий вводит SQL запросы в формы или URL-адреса веб-сайта, что может привести к утечке или изменению базы данных. Для защиты необходимо использовать подготовленные запросы или ORM библиотеки. __ 2. XSS (Cross-Site Scripting) - атакующий вводит вредоносный код в веб-страницу, который радиобавляется на страницу и может привести к краже данных или установке вредоносных программ. Для защиты необходимо проверять вводимые пользователем данные и очищать их от вредоносных символов. __ 3. CSRF (Cross-Site Request Forgery) - атакующий отправляет запросы от имени пользователя без его разрешения, что может привести к выполнению нежелательных действий на сайте. Для защиты необходимо использовать токены запроса и проверять, что запросы отправляются только от авторизованного пользователя. __ 4. Broken Authentication and Session Management - атакующий может атаковать процесс аутентификации и сеансов управления, получая доступ к учетной записи другого пользователя. Для защиты необходимо использовать строгие правила для паролей, использовать двухфакторную аутентификацию и проверять сеансы на подозрительную активность.  __ 5. Незащищенный создатель объекта - атакующий может создать объект с неправильными параметрами или вызовами, что может привести к нарушению безопасности. Для защиты необходимо проверить все параметры перед созданием объектов. __ 6. Утечка информации - ошибка программирования, которая позволяет не авторизованным пользователям получать доступ к конфиденциальной информации. Для защиты необходимо определять уровень доступа пользователей и разрешать им видеть только ту информацию, которая не нарушает права на конфиденциальность. __ 7. Недостаточная проверка ввода - ошибка программирования, которая позволяет злоумышленникам отправлять вредоносные данные на сервер. Для защиты необходимо проверять вводимые пользователем данные и очищать их от вредоносных символов.\",\"assets/voise/3qUs26.mp3\"],[\"Что вы думаете по поводу BDD? Когда следует использовать, а когда будет только хуже? Если все же следует использовать, то для UI или API автоматизированного тестирования?\",\"BDD (Behavior Driven Development) - это методология разработки программного обеспечения, которая основывается на описании поведения системы на естественном языке и создании тестов на основе этих описаний.   Я считаю, что BDD может быть очень полезным инструментом для разработки качественного ПО, особенно если команда разработчиков и тестеров тесно сотрудничает друг с другом. Однако, это не должно стать единственным методом тестирования, и его следует использовать в сочетании с другими методами и подходами.  Определять, когда использовать BDD, зависит от многих факторов, таких как тип проекта, размер команды, опытность команды и так далее. В целом, я бы рекомендовал использовать BDD на проектах с длительным жизненным циклом, которые требуют повышенного внимания к деталям и интерактивности с пользователем.  Что касается автоматизированного тестирования, BDD может быть эффективным как для UI, так и для API тестирования. Решение о том, что использовать, зависит от специфики проекта и решаемых задач, но можно взять во внимание, что UI тестирование может быть более медленным и чувствительным к изменениям дизайна, в то время как API тестирование может быть более стабильным и быстрым.    \",\"assets/voise/samCh.mp3\"],[\"Что такое сокеты и как их тестировать, вручную и автоматизировано? Зачем их используют?\",\"Сокет (Socket) - это программный интерфейс, предназначенный для обмена данными между процессами, работающими на различных узлах сети. С помощью сокетов можно установить сетевое соединение и передавать данные между клиентом и сервером.   Использование сокетов применяется в различных приложениях, таких как веб-серверы, почтовые программы, мессенджеры, игры и т.д.   Для тестирования сокетов можно использовать различные инструменты. Например, для тестирования вручную можно использовать утилиту Telnet, которая позволяет установить соединение с сервером и отправлять ему команды.   Для автоматизированного тестирования сокетов используются специализированные инструменты, такие как tcpdump, Wireshark, JMeter и т.д.   Тестирование сокетов может включать в себя проверку соединения, передачи данных, обработки ошибок. Цель тестирования - убедиться в правильной работе программного интерфейса сокетов и отсутствии ошибок в процессе передачи данных.\",\"assets/voise/3qUs28.mp3\"],[\"Когда следует делать стресс-тестирование на проектах? От чего отталкиваться, когда строите сценарий для такого тестирования? Что учесть при выборе инструмента?\",\"Стресс-тестирование следует проводить на проектах в начале фазы тестирования, после завершения функционального тестирования и до запуска в продакшн.  При построении сценария для стресс-тестирования необходимо отталкиваться от ожидаемой нагрузки на приложение, которую оно сможет выдержать на пиковых нагрузках. Также необходимо учитывать тип и характер работы системы, а также возможные границы её нагрузочных возможностей.  При выборе инструмента для стресс-тестирования необходимо учитывать его возможности и ограничения, а также подходит ли он для конкретного приложения. Некоторые из самых популярных инструментов для стресс-тестирования включают Apache JMeter, Gatling и LoadRunner.\",\"assets/voise/samCh.mp3\"],[\"Как проверить безопасность на веб-странице?\",\"1. Проверить наличие SSL-сертификата: Введите URL-адрес веб-страницы и убедитесь, что он начинается с 'https' вместо 'http'. Это означает, что соединение защищено SSL-сертификатом, который обеспечивает шифрование передаваемых данных между сервером и браузером. __ 2. Используйте инструменты проверки безопасности веб-страниц, такие как Google Safe Browsing или Norton Safe Web. Они могут предупреждать о потенциальных угрозах безопасности, таких как мошенничество и вредоносные программы. __ 3. Убедитесь, что веб-страница не содержит нежелательных элементов, таких как всплывающие окна или рекламу, которая могла бы содержать вредоносные сценарии. __ 4. Проверьте, насколько актуальные настройки безопасности на вашем браузере. Включите блокирование вредоносных загрузок, отключайте автоматические загрузки и проверки безопасности. __ 5. Следите за тем, как веб-сайт собирает и использует информацию о вас и вашей активности в Интернете. Если у вас есть сомнения относительно веб-страницы, лучше не делиться с ней своей личной информацией.\",\"assets/voise/3qUs30.mp3\"],[\"Расскажите об алгоритмах шифрования трафика.\",\"Алгоритмы шифрования трафика являются главным инструментом для защиты передачи данных в интернете. Существует множество различных методов шифрования, но основными алгоритмами являются: __ 1. SSL/TLS. Один из наиболее распространенных алгоритмов шифрования, который используется для защиты передачи данных между сервером и клиентом. SSL/TLS устанавливает защищенный канал связи, который шифрует данные во время передачи и дешифрует их при получении. __ 2. AES. Advanced Encryption Standard - блочный алгоритм шифрования, используемый для обеспечения конфиденциальности данных. Является одним из самых безопасных методов защиты информации и широко используется в различных приложениях. __ 3. RSA. Это криптографический алгоритм, используемый для шифрования сообщений. RSA основывается на сложной математической теории и используется для создания публичных и приватных ключей, которые используются при шифровании и дешифровании данных. __ 4. Blowfish. Блочный алгоритм шифрования, который использует ключ, длиной до 448 битов. Blowfish позволяет шифровать как малые, так и большие объемы данных и стойко защищает информацию. __ 5. Diffie-Hellman. Это алгоритм, который используется для обмена секретными ключами между двумя узлами в сети. Diffie-Hellman обеспечивает безопасность передачи ключей, что важно для защиты данных.  В целом, выбор алгоритма шифрования зависит от конкретных потребностей и задач, но в любом случае, все они направлены на обеспечение безопасности корректной передачи данных. __SSL/TLS работает по следующей схеме: __ 1. Установление соединения: Когда пользователь заходит на защищенный сайт, браузер и веб-сервер обмениваются специальными сообщениями, чтобы установить безопасное соединение.  __2. Шифрование данных: После установления соединения, все данные передаются в зашифрованном виде, используя симметричное шифрование. __ 3. Проверка подлинности: SSL/TLS также обеспечивает проверку подлинности сервера и клиента для защиты от атак типа 'подмены лица'. __ 4. Сертификат SSL/TLS: Сертификат SSL/TLS предоставляется сайтом, который гарантирует, что это доменное имя принадлежит соответствующей организации и что информация, передаваемая между сервером и клиентом, защищена обычными методами.  __SSL/TLS использует различные сообщения при установлении и поддержании безопасного соединения, включая Handshake, Change Cipher и Alert Messages.  SSL/TLS поддерживает различные версии протокола, включая SSL 2.0, SSL 3.0, TLS 1.0, 1.1, 1.2 и 1.3, с каждой последующей версией протокола улучшаются алгоритмы шифрования и защиты от атак.  В целом, SSL/TLS обеспечивает безопасность передачи данных в Интернете, и он является необходимым компонентом для любого сайта, который собирает личную информацию\",\"assets/voise/3qUs31.mp3\"],[\"Что такое NIC?\",\"NIC (Network Interface Controller) - это аппаратное средство, которое позволяет устройству подключаться и обмениваться данными по сети. Оно представляет собой сетевую карту, встроенную в компьютер или подключаемую к нему в виде отдельного устройства. NIC контролирует передачу данных между компьютером и сетью, обрабатывает информацию, формирует и принимает пакеты данных по определенным протоколам. Без наличия NIC устройства невозможно было бы подключиться к локальной сети или Интернету.\",\"assets/voise/3qUs32.mp3\"],[\"Для чего нужен протокол RTP?\",\"Протокол RTP (Real-time Transport Protocol) используется для передачи аудио и видео данных в реальном времени через сеть. Он позволяет обеспечивать качественную передачу потоковых данных, а также обеспечивает доставку и управление временем воспроизведения. Протокол RTP используется в различных приложениях, таких как видеоконференции, IP-телефония, видео- и аудиостриминг и т.д. RTP также может использоваться в сочетании с другими протоколами, такими как RTSP (Real-time Streaming Protocol), для управления потоковым воспроизведением.\",\"assets/voise/3qUs33.mp3\"],[\"Что, по вашему мнению, лучше – SIP или PRI?\",\"SIP (Session Initiation Protocol) и PRI (Primary Rate Interface) - это два разных типа цифровых линий связи для передачи голоса и данных в сети. __ SIP - это открытый протокол, который позволяет установить сеанс связи через интернет-сеть. Он менее дорогостоящий и гибкий, так как может использоваться с любым соединением, не только с традиционными телефонными линиями. _SIP линии могут быть настроены, чтобы работать с различными устройствами и приложениями, такими как VoIP телефоны, сервисы видеоконференций, мессенджеры и т.д. __ PRI - это стандартная спецификация для передачи цифровых сигналов через телефонные линии. Он обеспечивает более высокую качество связи и более надежный канал, который может использоваться для передачи голоса и данных. PRI линии, как правило, настроены на корпоративные системы коммуникаций, где необходимы большая пропускная способность и стабильность соединения. __ Итак, ответ на вопрос о том, что лучше – SIP или PRI, зависит от Ваших потребностей._Если у Вас малый бюджет и/или предприятие находится в удаленных местах, где нет доступа к стандартным телефонным линиям, то SIP может быть наиболее подходящим решением. Если же у Вас большой бюджет и/или требуется высококачественное соединение для корпоративных систем коммуникаций и/или большая пропускная способность, то PRI может быть лучшим выбором.\",\"assets/voise/3qUs34.mp3\"],[\"Что такое NAT?\",\"NAT (Network Address Translation) - это технология, которая позволяет скрыть реальный IP-адрес устройства в локальной сети и заменять его на другой публичный IP-адрес. На практике это означает, что множество устройств в локальной сети, имеющих локальные IP-адреса, могут использовать один общий публичный IP-адрес для связи с Интернетом. NAT является важной технологией для обеспечения безопасности сетей, поскольку он скрывает реальные IP-адреса устройств на локальной сети от внешнего мира, что делает их менее подверженными к кибератакам и другим видам взлома.\",\"assets/voise/3qUs35.mp3\"],[\"Зачем нужно автоматизировать?  назовите плюсы и минусы автоматизации\",\"Главная цель внедрения автоматизации бизнеса в работу компании – оптимизация деятельности, помогает свести к минимуму рутинные задачи. Это особенно важно для процессов, которые непосредственно влияют на достижение результата. Минимизирует человеческий фактор. Иногда ошибки, вызванные человеческим фактором, могут дорого стоить. _  Повторяемость – все написанные тесты всегда будут выполняться однообразно, то есть исключен «человеческий фактор» _  Преимущества автоматизации тестирования:_ _  Быстрое выполнение – автоматизированному скрипту не нужно сверяться с инструкциями и документациями, это сильно экономит время выполнения. _  Меньшие затраты на поддержку – когда автоматические скрипты уже написаны, на их поддержку и анализ результатов требуется, как правило, меньшее время чем на проведение того же объема тестирования вручную. _  Отчеты – автоматически рассылаемые и сохраняемые отчеты о результатах тестирования. _  Выполнение без вмешательства – во время выполнения тестов инженер-тестировщик может заниматься другими полезными делами, или тесты могут выполняться в нерабочее время (этот метод предпочтительнее, так как нагрузка на локальные сети ночью снижена). _   Недостатки автоматизации_ Повторяемость – все написанные тесты всегда будут выполняться однообразно. Это одновременно является и недостатком, так как тестировщик, выполняя тест вручную, может обратить внимание на некоторые детали и, проведя несколько дополнительных операций, найти дефект. Скрипт этого сделать не может. _Затраты на поддержку – несмотря на то, что в случае автоматизированных тестов они меньше, чем затраты на ручное тестирование того же функционала – они все же есть. Чем чаще изменяется приложение, тем они выше. _ Большие затраты на разработку – разработка автоматизированных тестов это сложный процесс, так как фактически идет разработка приложения, которое тестирует другое приложение. _ Стоимость инструмента для автоматизации – в случае если используется лицензионное ПО, его стоимость может быть достаточно высока. _ Пропуск мелких ошибок - автоматический скрипт может пропускать мелкие ошибки на проверку которых он не запрограммирован. Это могут быть неточности в позиционировании окон, ошибки в надписях, которые не проверяются, ошибки контролов и форм с которыми не осуществляется взаимодействие во время выполнения скрипта. \",\"assets/voise/3qUs36.mp3\"],[\"Сформулируйте негативные сценарии для POST-запроса, который создаёт нового пользователя.\",\"1. Несанкционированный доступ: Если злоумышленник получает доступ к API или захватывает почту пользователя, он может отправить POST-запрос с манипулированными данными, создавая новых пользователей, в том числе администраторов, которые могут получить полный доступ к приложению, базе данных и другой конфиденциальной информации. __ 2. Отказ в обслуживании: Если приложение не поддерживает возможность создания новых пользователей, запрос на создание нового пользователя может привести к отказу в обслуживании (HTTP-код 405), ломая удобство пользователя и приводя к неудовлетворенности клиента. __ 3. Переполнение объема данных: Когда новый пользователь создается, сервер сохраняет большой объем данных, например, личную информацию, адрес профиля, фото профиля и гораздо больше. Если сервер не может обрабатывать или хранить эту информацию, это может привести к переполнению объема данных или аварийному завершению работы сервера. __ 4. Проблемы с коннекторами API: Если пользовательские данных неправильно введены, сервер может аварийно завершить работу при попытке обращения к несуществующему пользователю или если информация в запросе не соответствует параметрам приложения. __ 5. Неудачные SQL-инъекции: Запрос на создание нового пользователя также может привести к SQL-инъекциям, когда хакер вводит определенные строки данных в качестве параметров, изменяя или перехватывая запросы на создание нового пользователя. Это может позволить злоумышленнику получать доступ к данным других пользователей, изменять данные пользователей или создавать новых пользователей в системе.\",\"assets/voise/3qUs37.mp3\"],[\"Как вы регулируете конфликтные ситуации между QA и разработчиками?\",\"1. Установите прозрачную и открытую коммуникацию между QA и разработчиками. Это значит, что обе стороны должны четко понимать цели и требования проекта и регулярно общаться, чтобы обмениваться информацией и идеями. __ 2. Убедитесь, что все проектные задачи и требования четко определены и документированы. Это позволит обоим командам иметь одинаковое понимание о том, что требуется от продукта. __ 3. Старайтесь решать проблемы вместе. Если возникли проблемы или ошибки, не стоит винить кого-то из коллег или коллективно обвинять друг друга. Лучше совместными усилиями решить произошедшую проблему.  __4. Стремитесь к постоянному улучшению процесса разработки продукта. Регулярно обсуждайте и анализируйте возникшие проблемы и пытайтесь найти способы избежать их в будущем. __ 5. Помните, что вы работаете в команде и все члены команды должны трудиться совместно для достижения общих целей.\",\"assets/voise/3qUs38.mp3\"],[\"Какое минимальное количество тест-кейсов необходимо, чтобы убедиться в корректной работе этой(на которой ты находишься) веб-страницы?\",\"1. Установите прозрачную и открытую коммуникацию между QA и разработчиками. Это значит, что обе стороны должны четко понимать цели и требования проекта и регулярно общаться, чтобы обмениваться информацией и идеями. __ 2. Убедитесь, что все проектные задачи и требования четко определены и документированы. Это позволит обоим командам иметь одинаковое понимание о том, что требуется от продукта. __ 3. Старайтесь решать проблемы вместе. Если возникли проблемы или ошибки, не стоит винить кого-то из коллег или коллективно обвинять друг друга. Лучше совместными усилиями решить произошедшую проблему. __ 4. Стремитесь к постоянному улучшению процесса разработки продукта. Регулярно обсуждайте и анализируйте возникшие проблемы и пытайтесь найти способы избежать их в будущем. __ 5. Помните, что вы работаете в команде и все члены команды должны трудиться совместно для достижения общих целей.\",\"assets/voise/samCh.mp3\"],[\"Продайте мне тестирование как клиенту, не желающему его покупать. Кратко и структурированно опишите вашу работу на каждом из этапов разработки ПО, используя профессиональные термины (не лить воду).\",\"Ваше желание не покупать тестирование вполне понятно, однако я могу объяснить, что без хорошего тестирования проект может стать неудачей из-за недостатков в его работе. Разрешите мне кратко описать, как тестирование важно на всех этапах разработки ПО. __ 1. Планирование и анализ: на этом этапе тестирование помогает определить требования к продукту и написать правильный план тестирования. Тестировщики работают вместе с командой разработки, чтобы определить, какие функции должен выполнять продукт, и как эти функции должны работать. __ 2. Проектирование и разработка: тестирование помогает инженерам написать модульные и функциональные тесты, а также функциональные блоки кода. Они разрабатываются на основе ранее указанных требований и помогают отловлять ошибки в коде на самом раннем этапе. __ 3. Тестирование и отладка: на этом этапе тестирование выполняется для поиска ошибок в продукте. Тестировщики проверяют функциональность продукта, ищут и отлавливают ошибки в работе программы. Можно провести разные виды тестирования, такие как регрессионное, функциональное, производительности и т.д. __ 4. Внедрение и сопровождение: тестирование на последнем этапе разработки выполняется для обеспечения стабильной работы продукта и для предотвращения возможных ошибок. Иногда требуется тестирование определенных функций после запуска продукта.  Тестирование является неотъемлемой частью полного цикла разработки ПО и позволяет выявить ошибки, снизить риски и существенно ограничить возможные потери. Качественное тестирование позволит увеличить лояльность пользователей, повысить удобство использования, а также гарантировать безопасность и работоспособность программного продукта. Надеюсь, что это описание поможет вам принять правильное решение.\",\"assets/voise/samCh.mp3\"],[\"У вас есть онлайн-калькулятор. Вы вводите 1+1 и получаете 3. Расскажите, как вы будете искать причину проблемы.\",\"1. Проверю введенные данные. Возможно, я ошибся при вводе. __ 2. Проверю работу онлайн-калькулятора, попробую сделать другие математические операции и проверить, правильно ли он выполняет расчеты. __  3. Проверю актуальность версии калькулятора. Может быть, у меня устаревшая версия, которая содержит ошибку. __ 4. Проверю настройки устройства, на котором я использую калькулятор. Может быть, настройки локализации или языка могут повлиять на результаты рассчетов. __  5. Обратиться к разработчикам онлайн-калькулятора и сообщить им о проблеме, чтобы они могли выполнить детальную проверку и исправить ошибку.\",\"assets/voise/samCh.mp3\"],[\"Могут ли быть такие виды архитектур? Клиент -> сервер -> База данных  Чего может быть недостаточно для правильной работы архитектур?\",\"Да, такая архитектура является стандартной и распространенной в разработке программного обеспечения. Однако, недостаточность может возникнуть, если:   __ 1. Не уделяется достаточного внимания безопасности - это может привести к утечкам личных данных, кражам информации или нарушению работы системы.  __ 2. База данных не является масштабируемой - это ограничивает возможность увеличения числа пользователей и обработки большого объема данных.  __ 3. Клиентское приложение не оптимизировано для устройств с низкой производительностью - это может привести к сбоям или задержкам при выполнении операций.   __4. Отсутствие мониторинга и оповещения о возможных проблемах в системе - это может привести к сбоям и потере данных. __ 5. Неудачный выбор технологий - это может привести к проблемам совместимости, неэффективности и неоптимальности работы системы.\",\"assets/voise/samCh.mp3\"],[\"Есть веб-страница с полями e-mail, password и кнопкой submit. Предположим, что после нажатия кнопки submit страница перезагружается и ранее введенные данные исчезают. Как проверить, что данные отправлены в базу данных?\",\"1. Проверьте базу данных: проверьте, что данные, которые вы отправили, соответствуют тому, что появляется в базе данных. 2. Используйте логику: если введенные данные должны изменять что-то на странице после отправки, то вы можете проверить, изменилось ли что-то на странице после отправки данных. 3. Используйте инструменты разработчика: в инструментах разработчика можно отследить, что происходит с данными после их отправки, в том числе сетевые запросы и ответы на запросы.   В целом, если данные отправляются успешно, то вы можете получить сообщение об успешной отправке или перенаправление на другую страницу. Если данные не отправляются, вы можете получить сообщение об ошибке или отсутствие изменения на странице.\",\"assets/voise/samCh.mp3\"],[\"Есть проект, на котором нет тестовой документации, но проекту уже год. Мануальным QA не хватает времени на тестирование, они очень устали, есть желание уволиться. Какое решение по команде можно принять? \",\"Ситуация является довольно сложной и требует немедленного решения. __ Одно из возможных решений - привлечение автоматизированного тестирования. Это может помочь существенно ускорить процесс тестирования и снизить нагрузку на мануальных тестировщиков. Однако, автоматизация тестирования требует значительных усилий и времени на её разработку и настройку, поэтому необходимо оценить её целесообразность, а также затраты на её внедрение и обучение специалистов.__Еще одно решение - найти новых тестировщиков, которые могут присоединиться к команде и взять на себя часть работы. В этом случае необходимо провести поиск квалифицированных специалистов, которые смогут быстро ориентироваться в проекте и начать работу. __ Также, возможно, стоит пересмотреть процесс разработки и внедрить методологии Agile или DevOps, которые позволяют более эффективно работать в условиях постоянных изменений и быстро реагировать на новые требования. __ В целом, решение должно быть принято с учетом конкретных условий и задач проекта. Необходимо провести анализ текущей ситуации и определить оптимальный план действий, который позволит обеспечить необходимый уровень качества продукта и удержать мануальных тестировщиков в команде.\",\"assets/voise/samCh.mp3\"]]]}");

/***/ }),

/***/ "./src/js/db/dowan.json":
/*!******************************!*\
  !*** ./src/js/db/dowan.json ***!
  \******************************/
/*! exports provided: styles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"styles\":[]}");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _modules_startaStage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/startaStage */ "./src/js/modules/startaStage.js");
/* harmony import */ var _modules_upWindowuser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/upWindowuser */ "./src/js/modules/upWindowuser.js");
/* harmony import */ var _modules_dblClicChanje__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/dblClicChanje */ "./src/js/modules/dblClicChanje.js");
/* harmony import */ var _modules_togallVois__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/togallVois */ "./src/js/modules/togallVois.js");
/* harmony import */ var _modules_lostMicrophone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/lostMicrophone */ "./src/js/modules/lostMicrophone.js");
/* harmony import */ var _modules_whereStay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/whereStay */ "./src/js/modules/whereStay.js");
/* harmony import */ var _services_LitlModules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/LitlModules */ "./src/js/services/LitlModules.js");
/* harmony import */ var _modules_toggalBurgerMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/toggalBurgerMenu */ "./src/js/modules/toggalBurgerMenu.js");
/* harmony import */ var _services_recognation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/recognation */ "./src/js/services/recognation.js");
/* harmony import */ var _services_indexedDB__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/indexedDB */ "./src/js/services/indexedDB.js");
/* harmony import */ var _modules_mouseEventClickRithe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/mouseEventClickRithe */ "./src/js/modules/mouseEventClickRithe.js");
/* harmony import */ var _modules_calcuQuestParams__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/calcuQuestParams */ "./src/js/modules/calcuQuestParams.js");












const obj = {
  tick: 0,
  cross: 0,
  heart: 0,
  flower: 0
};

function listener(e) {
  const btn = document.querySelector('#burgerBtn'),
        btnnextElem = btn.nextElementSibling;

  if (e.target != btn) {
    if (!btnnextElem.classList.contains('hide')) {
      btnnextElem.classList.add('hide');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // const i = document.querySelector('less');
  // console.error("Error2");
  // console.log(i);
  // console.log('гавно сделаннное из говна и делал его говноед которгго крестили сука в воде из  унитаза ');
  // обработчик на закрытие элемента настроек
  document.querySelector('.wraperAllToll').addEventListener('click', e => {
    listener(e);
  });
  Object(_services_indexedDB__WEBPACK_IMPORTED_MODULE_9__["default"])();
  Object(_modules_calcuQuestParams__WEBPACK_IMPORTED_MODULE_11__["default"])(obj);
  global.recog = new _services_recognation__WEBPACK_IMPORTED_MODULE_8__["default"]();
  const body = document.body,
        html = document.documentElement;
  let btn = document.querySelector('.staet'),
      width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && width <= 775) {
    Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_6__["createElementMobaile"])(); // if(!btn.classList.contains('hide')){
    // 	btn.classList.add('hide');
    // }
    // window.mobaleMOde = true;

    global.mobaleMOde = true;
    btn.classList.add('hide'); // whereStay(document.querySelector('.wher'));

    Object(_modules_lostMicrophone__WEBPACK_IMPORTED_MODULE_4__["default"])(true);
  } else {
    // window.mobaleMOde = false;
    global.mobaleMOde = false;

    if (btn.classList.contains('hide')) {
      btn.classList.remove('hide');
    }
  }

  /Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent) ? global.appleMode = true : global.appleMode = false;
  Object(_modules_toggalBurgerMenu__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_modules_startaStage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_modules_togallVois__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_dblClicChanje__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_modules_lostMicrophone__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_modules_whereStay__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_upWindowuser__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_modules_mouseEventClickRithe__WEBPACK_IMPORTED_MODULE_10__["default"])();
}, {
  once: true
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/modules/app.js":
/*!*******************************!*\
  !*** ./src/js/modules/app.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _services_multiPlepresButtons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/multiPlepresButtons */ "./src/js/services/multiPlepresButtons.js");
/* harmony import */ var _services_chech__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/chech */ "./src/js/services/chech.js");
/* harmony import */ var _services_voiceQuestion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/voiceQuestion */ "./src/js/services/voiceQuestion.js");
/* harmony import */ var _services_elemScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/elemScroll */ "./src/js/services/elemScroll.js");
/* harmony import */ var _services_LitlModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/LitlModules */ "./src/js/services/LitlModules.js");
/* harmony import */ var _services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/widjetCircolLev */ "./src/js/services/widjetCircolLev.js");

 // import automationSizeInput from "../services/automationSizeInput";

 // import buzz from "buzz";

 // import modeNonStop from "../services/modeNonStop";

 // import { stopVoiseLisenerAll,stopVoiseSpeecAll, openTextUserError } from "../services/LitlModules";

 // let count = 0
// let  app = (selStart, selStop, selRemove, selTextare, selPahtVoid, selLocal, selBtnResp,selVoisIcPuls,openAll,key,viosId,viosPath = 'assets/voise/samCh.mp3',progress__bar) => {
// let mySound;

let app = (key, selStart, selLocal, selLocalRepl, openAll, viosPath = 'assets/voise/samCh.mp3') => {
  const recognizer = global.recog;
  recognizer.stop();
  const params = {
    btnStartVoise: document.querySelector(selStart),
    letstop: document.querySelector('.pause' + key),
    remove: document.querySelector('.btn-remove' + key),
    textare: document.querySelector('.lasss' + key),
    btnResp: document.querySelector('#btnResp' + key),
    material_fb: document.querySelector('.icon-material_fb')
  };
  let audio_button = document.querySelector('#voise_aa' + key),
      curtiem; // if(global.appleMode) {
  //     console.log('lol');
  // } else {
  //       // setListeerBtnPlay();
  //         //   let btnVoiseMute = document.querySelector('#voise_mudte_icon').classList.contains('icon-material_li_mute');
  //         //   if(!btnVoiseMute) {
  //         //     recognizer.stop();
  //         //     playVid(mySound);
  //         //   }
  //         //   elemScroll(selLocal);
  //       // }
  //       voiceQuestion(mySound, key, selLocal,viosPath, openAll,'app');
  //     }

  if (!global.appleMode) {
    Object(_services_voiceQuestion__WEBPACK_IMPORTED_MODULE_2__["default"])(key, selLocal, viosPath, openAll, 'app');
  } // function pauseVid(track) {
  //   track.pause();
  //   audio_button.classList.remove('audio_pause');
  //   audio_button.classList.add('audio_play');
  //   // console.log('вызвался');
  // }


  let resal = true; // let setinte;

  localStorage.removeItem('nevosprozwodi'); // recognizer events

  recognizer.onstart = e => {
    localStorage.setItem('nevosprozwodi', 'zapis'); // console.log("Распознавание голоса запущено" + selStart);
    // multiPlepresButtons(true,selStart) не был включен
  };

  recognizer.onerror = ({
    error
  }) => {
    console.error(error);
    resal = false;
    stop();

    switch (error) {
      case 'no-speech':
        Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_4__["openTextUserError"])('no_speech', 'Не молчи, слово молви добрый человек');
        break;

      case 'not-allowed':
        Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_4__["openTextUserError"])('not_allowed', 'Вы не дали доступ к микрофону!', 'https://knowledge.granatum.solutions/2020/04/02/access-to-the-camera-and-microphone-in-different-browsers/', 20000);
        break;

      case 'network':
        Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_4__["openTextUserError"])('network', 'Отсутствует соединение с интернетом!');
        break;
      // case 'aborted':
      //   openTextUserError('aborted','Что-то вызвало резкий обрыв записи!',null,4000);
      //   break;
    }
  };

  recognizer.onsoundend = event => {
    // console.log(event);
    console.log('Sound has stopped being received');
  };

  recognizer.onspeechend = e => {
    // console.log(e);
    console.log('ты перестал говорить');
  };

  recognizer.onend = () => {
    console.log('Распознавание голоса закончено ' + selStart + new Date().toLocaleTimeString());
    stop();
    Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_4__["removeAttributNadClass"])(); // console.log(localStorage.getItem(selLocal));

    addAnswer(localStorage.getItem(selLocal)); // !global.mobaleMOde && openTextUserError('net','Распознование голоса завершилось!',null,3000);

    Object(_services_multiPlepresButtons__WEBPACK_IMPORTED_MODULE_0__["default"])(false, selStart); //был включен

    if (params.textare.value.length < 3) Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_5__["default"])();
    localStorage.removeItem('nevosprozwodi'); // console.log(!resal);

    if (!resal) return; // recognizer.start();

    startVoise();
  }; // EventListeners


  params.btnResp.addEventListener('click', respBtn); // open respons

  params.remove.addEventListener('click', removebt); // clear this input user

  params.btnStartVoise.addEventListener('click', startVoise); // start listener vois

  params.letstop.addEventListener('click', stop); // stol listen vios

  params.textare.addEventListener('input', textf); // input listeer

  function respBtn(e) {
    e.preventDefault();
    this.classList.toggle('active');
    let panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.cssText = `max-height: ${panel.scrollHeight}px; `;
    }

    panel = null;
  }

  function removebt(e) {
    e.preventDefault();
    params.textare.value = '';
    params.textare.innerHTML = '';
    localSet('');
    removeAnswer(selLocal);
    Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_5__["default"])();
  }

  function startVoise(event) {
    event && event.preventDefault();
    if (params.btnStartVoise.classList.contains('iconActive')) return; // stopVoiseSpeecAll();
    //set localStorage Where Stay user

    localStorage.setItem('WhereStayUser', selLocal);
    params.material_fb.classList.add('icon-material_Pulsev');
    resal = true;
    document.querySelector('#voisIconi' + key).classList.add('iconActive'); // document.querySelector(selVoisIcPuls).classList.add('iconActive');

    recognizer.start();

    recognizer.onresult = function (event) {
      let result = event.results[event.resultIndex];
      saveResultTranscript(result.isFinal ? true : false, result, selLocal);
      result = null;
    };

    Object(_services_multiPlepresButtons__WEBPACK_IMPORTED_MODULE_0__["default"])(true, selStart); // был включен
  }

  function stop(event) {
    event && event.preventDefault();
    params.material_fb.classList.remove('icon-material_Pulsev');
    console.log(params.btnStartVoise);
    params.btnStartVoise.children[0].classList.remove('iconActive');
    params.btnStartVoise.classList.add('start');
    resal = false;
    recognizer.stop();
  }

  function textf(event) {
    event.preventDefault();
    localSet(params.textare.value);
    addAnswer(localStorage.getItem(selLocal));

    if (params.textare.value.length == 0) {
      removeAnswer(selLocal);
    }

    if (params.textare.value.length <= 1) {
      Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_5__["default"])();
    }
  } // let db= window.dbasce;


  function removeAnswer(key) {
    // let ap = selLocal.replace(/(\d)+/,'');
    let db = window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap], 'readwrite'),
        store = transaction.objectStore(ap),
        request = store.delete(key); //

    request.onsuccess = function (e) {
      // console.log('удивленно нахуй');
      db, ap, transaction, store, request = null;
    };
  }

  function getAnswer() {
    if (getAnswer.isRun) {
      return;
    } // let ap = selLocal.replace(/(\d)+/,'')


    let db = window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap], 'readonly'),
        store = transaction.objectStore(ap),
        request = store.get(selLocal); //

    request.onsuccess = function (e) {
      let result = e.target.result; // console.log(result);

      result ? saveResultTranscript(true, false, selLocal, result['value']) : '';
      db, ap, transaction, store, request, result = null;
    };

    getAnswer.isRun = true;
  }

  getAnswer();

  function addAnswer(value) {
    let db = window.dbasce,
        ap = selLocalRepl,
        transaction = db.transaction([ap], 'readwrite'),
        store = transaction.objectStore(ap),
        person = {
      name: selLocal,
      value: value
    },
        request = store.put(person); // let ap = selLocal.replace(/(\d)+/,'')

    request.onerror = function (e) {
      //some type of error handler
      db, ap, transaction, store, person, request = null;
    }; // request.onsuccess = function(e) {
    //   // console.log(e);
    //   // console.log("Транзакция закончилась успешно!");
    // }

  }

  if (localStorage.getItem(selLocal) !== null) {
    saveResultTranscript(true, false, selLocal, localStorage.getItem(selLocal));
  }

  function saveResultTranscript(save = true, result, selLocal, oneSeveer = false) {
    //target result
    Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_5__["default"])(); // automationSizeInput(textare);

    oneSeveer ? localStorage.setItem(selLocal, oneSeveer) : ''; // …то отображаем его содержимое в нашем редакторе

    let local = localStorage.getItem(selLocal),
        cor = (local ? local : '') + ' ' + (result ? result[0].transcript : ''); // params.textare.value = chech(cor);  //был включен

    params.textare.value = cor; //был включен

    if (save) {
      params.textare.value = Object(_services_chech__WEBPACK_IMPORTED_MODULE_1__["default"])(cor).trim(); //был включен

      localSet(cor); // addAnswer(cor);
    }

    local = null;
    cor = null;
  }

  function localSet(params) {
    localStorage.setItem(selLocal, Object(_services_chech__WEBPACK_IMPORTED_MODULE_1__["default"])(params).trim());
  }

  if (!openAll) {
    let t = setTimeout(() => {
      Object(_services_elemScroll__WEBPACK_IMPORTED_MODULE_3__["default"])(selLocal);
      clearTimeout(t);
    }, 1000);
  }
}; //     // modeNonStop(params.btnStartVoise,params.letstop,selPahtVoid,openAll)


/* harmony default export */ __webpack_exports__["default"] = (app);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/modules/calcuQuestParams.js":
/*!********************************************!*\
  !*** ./src/js/modules/calcuQuestParams.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/dbArr.json */ "./src/js/db/dbArr.json");
var _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../db/dbArr.json */ "./src/js/db/dbArr.json", 1);


let calcuQuestParams = obj => {
  for (const key in obj) {
    switch (key) {
      case 'tick':
        // console.log(dbArr['styles'][0].length);
        // obj[key] = dbArr['styles'][0].length;
        obj[key] = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0__['styles'][0].length;
        break;

      case 'cross':
        obj[key] = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0__['styles'][1].length;
        break;

      case 'heart':
        obj[key] = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0__['styles'][2].length;
        break;

      case 'flower':
        obj[key] = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_0__['styles'][3].length;
        break;
    }
  }

  window.objectAllCor = obj;
  calcuQuestParams = null;
};

/* harmony default export */ __webpack_exports__["default"] = (calcuQuestParams);

/***/ }),

/***/ "./src/js/modules/dblClicChanje.js":
/*!*****************************************!*\
  !*** ./src/js/modules/dblClicChanje.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_quetionAdd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/quetionAdd */ "./src/js/services/quetionAdd.js");


const dblClicChanje = () => {
  const button = document.querySelector('.stateBtn');
  const span = document.querySelector('#dotPuls');
  button.addEventListener('click', event => {
    // console.log('ктопка тут!');
    event.preventDefault();
    Object(_services_quetionAdd__WEBPACK_IMPORTED_MODULE_0__["default"])(false, false, false, false);

    if (span.classList.contains('dot')) {
      span.classList.remove('dot');
    }

    let time;
    time = setTimeout(() => {
      span.classList.add('dot'); //уборка

      clearTimeout(time);
      time = null;
    }, 300);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (dblClicChanje);

/***/ }),

/***/ "./src/js/modules/exportQuestion.js":
/*!******************************************!*\
  !*** ./src/js/modules/exportQuestion.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.url */ "./node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _db_dowan_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../db/dowan.json */ "./src/js/db/dowan.json");
var _db_dowan_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../db/dowan.json */ "./src/js/db/dowan.json", 1);


// var Vector = require('vectorjs');

const obj = {
  tickquestion: [],
  crossquestion: [],
  heartquestion: [],
  flowerquestion: []
};
let db;

const exportQuestion = dba => {
  // console.log(dba);
  db = dba; // let db = window.dbasce
  // console.log(db);

  function o() {
    portDB('tickquestion');
    portDB('crossquestion');
    portDB('heartquestion');
    portDB('flowerquestion');

    function portDB(params) {
      // console.log(db);
      let transaction = db.transaction([params], 'readonly');
      let store = transaction.objectStore(params);
      let p = store.getAll(); // console.log(p);

      p.onsuccess = function () {
        // console.log(p['result']); // arra
        // console.log(p.source.name); // namecuestion Name
        compare(p.source.name, p['result']);

        if (p.source.name === 'flowerquestion') {
          // console.log('=1=1=1=1=1==1==');
          save('filename', obj);
        }
      };

      function compare(selector, arrResolt) {
        if (selector == p.source.name) {
          let arr = arrResolt;
          obj[p.source.name] = arr;
        }
      }

      function save(filename, data) {
        // console.log(data);
        const blob = new Blob([JSON.stringify(data)], {
          type: 'application/json'
        });

        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // console.log('-----elooo');
          const elem = window.document.querySelector('#ifads'); // console.log('elooo');

          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;
          elem.click();
          elem.download = false;
          elem.href = '';
        }
      }
    }
  }

  document.querySelector('#ifadsBtn').addEventListener('click', o);
};

/* harmony default export */ __webpack_exports__["default"] = (exportQuestion);

/***/ }),

/***/ "./src/js/modules/lostMicrophone.js":
/*!******************************************!*\
  !*** ./src/js/modules/lostMicrophone.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import elemScroll from "../services/elemScroll";
const lostMicrophone = (sel = false) => {
  const btnLostMicrophone = document.querySelector(sel ? '.fab-buttons__link_segment' : '.fab-buttons__link');
  btnLostMicrophone.addEventListener('click', e => {
    e.preventDefault();
    let activeMicrapone = localStorage.getItem('WhereStayUser'),
        p = document.querySelector('.' + activeMicrapone);
    if (!p) return console.log('тут пусто! Ты аухел ? в квадрате'); // console.log(p);
    // if(!p.children[0].classList.contains('iconActive')) return console.log('тут пусто! Ты аухел ? в кубе!');

    p.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    }); // list = null;

    activeMicrapone = null;
    p = null;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (lostMicrophone);

/***/ }),

/***/ "./src/js/modules/mouseEventClickRithe.js":
/*!************************************************!*\
  !*** ./src/js/modules/mouseEventClickRithe.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/widjetCircolLev */ "./src/js/services/widjetCircolLev.js");
/* harmony import */ var _services_LitlModules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/LitlModules */ "./src/js/services/LitlModules.js");



const mouseEventClickRithe = () => {
  document.querySelector('#standatrQuetion').oncontextmenu = function (event) {
    return menu(1, event);
  };

  document.querySelector('#juniorQuetion').oncontextmenu = function (event) {
    return menu(2, event);
  };

  document.querySelector('#midleQuetion').oncontextmenu = function (event) {
    return menu(3, event);
  };

  document.querySelector('#seniorQuetion').oncontextmenu = function (event) {
    return menu(4, event);
  }; // Функция для определения координат указателя мыши


  function defPosition(event) {
    let x = 0;
    let y = 0;

    if (document.attachEvent != null) {
      // Internet Explorer & Opera
      x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else if (!document.attachEvent && document.addEventListener) {
      // Gecko
      x = event.clientX + window.scrollX;
      y = event.clientY + window.scrollY;
    } else {// Do nothing
    }

    return {
      x: x,
      y: y
    };
  }

  function menu(type, evt) {
    // Блокируем всплывание события contextmenu
    evt = evt || window.event;
    evt.cancelBubble = true; // Показываем собственное контекстное меню

    var menu = document.getElementById('contextMenuId');
    var html = '';
    html = 'Меню для удаления ответов:';
    html += "<br><hr><a id='delOne' class='contextItem' href='#'>Удлаить эту секцию</a>";
    html += "<br><a id='All' class='contextItem' href='#'>Удалить все ответы</a>"; //

    const collection = {
      1: () => {
        delOne('tickquestion');
      },
      2: () => {
        delOne('crossquestion');
      },
      3: () => {
        delOne('heartquestion');
      },
      4: () => {
        delOne('flowerquestion');
      }
    };

    function d(e) {
      e.preventDefault();
      collection[type] && collection[type]();
    }

    function delAll(e) {
      e.preventDefault();

      for (const key in collection) {
        collection[key](); //  widjetCircolLev();

        Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_0__["default"])(undefined, true);
      }
    }

    function delOne(params) {
      let db = window.dbasce;
      const transaction = db.transaction([params], 'readwrite');
      const store = transaction.objectStore(params); // const p =

      store.clear();
      Object(_services_LitlModules__WEBPACK_IMPORTED_MODULE_1__["removeLocalStoregeQuestion"])();

      if (document.querySelector('.lasss')) {
        document.querySelectorAll('.lasss').forEach(item => {
          item.value = '';
        });
      }

      Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_0__["default"])(undefined, true);
    } // Если есть что показать - показываем


    if (html) {
      menu.innerHTML = html;
      menu.style.top = defPosition(evt).y + 'px';
      menu.style.left = defPosition(evt).x + 'px';
      menu.style.display = '';
      document.querySelector('#delOne').addEventListener('click', d);
      document.querySelector('#All').addEventListener('click', delAll);
    } // Блокируем всплывание стандартного браузерного меню


    return false;
  } // Закрываем контекстное при клике левой или правой кнопкой по документу
  // Функция для добавления обработчиков событий


  function addHandler(object, event, handler, useCapture) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    } else console.log('Add handler is not supported');
  }

  addHandler(document, 'contextmenu', function () {
    document.getElementById('contextMenuId').style.display = 'none';
  });
  addHandler(document, 'click', function () {
    document.getElementById('contextMenuId').style.display = 'none';
  });
};

/* harmony default export */ __webpack_exports__["default"] = (mouseEventClickRithe);

/***/ }),

/***/ "./src/js/modules/openAllQuestion.js":
/*!*******************************************!*\
  !*** ./src/js/modules/openAllQuestion.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_LitlModules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/LitlModules */ "./src/js/services/LitlModules.js");
/* harmony import */ var _services_openciCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/openciCycle */ "./src/js/services/openciCycle.js");
 // import standardQuestions from "./standardQuestions";
// import quetionAdd from "../services/quetionAdd";



const openAllQuestion = selector => {
  let iconMaterialOpenAll = document.querySelector('.icon-material_gp'),
      countClick = 0;
  iconMaterialOpenAll.removeEventListener('click', _services_LitlModules__WEBPACK_IMPORTED_MODULE_0__["scrollDown"]);
  iconMaterialOpenAll.addEventListener('click', startOpenCycle);
  iconMaterialOpenAll.parentElement.setAttribute('data-tooltip', 'Показать все');
  iconMaterialOpenAll.classList.remove('icon-material_scrollDown');

  function startOpenCycle(e) {
    e.preventDefault(); // if(document.querySelector('.tinRightIn'))

    Object(_services_openciCycle__WEBPACK_IMPORTED_MODULE_1__["default"])(selector);
    iconMaterialOpenAll.removeEventListener('click', startOpenCycle); // iconMaterialOpenAll = null;

    iconMaterialOpenAll.parentElement.setAttribute('data-tooltip', 'Прокрутить вниз');
    iconMaterialOpenAll.classList.add('icon-material_scrollDown'); // iconMaterialOpenAll.parentElement.dataset =

    iconMaterialOpenAll.addEventListener('click', _services_LitlModules__WEBPACK_IMPORTED_MODULE_0__["scrollDown"]); // console.log('============================');
  } // function scrollDown() {
  //   document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
  // }

};

/* harmony default export */ __webpack_exports__["default"] = (openAllQuestion);

/***/ }),

/***/ "./src/js/modules/openFile.js":
/*!************************************!*\
  !*** ./src/js/modules/openFile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/widjetCircolLev */ "./src/js/services/widjetCircolLev.js");




function openFile(db, openRequest) {
  const opneBtn = document.querySelector('#openFileBtn'),
        input = document.querySelector('#inputFile');
  const obj = {
    tickquestion: 0,
    crossquestion: 0,
    heartquestion: 0,
    flowerquestion: 0
  };

  const open = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return input.click();
    }

    checet('tickquestion');
    checet('crossquestion');
    checet('heartquestion');
    checet('flowerquestion');

    function checet(params) {
      const transaction = db.transaction([params], 'readonly');
      const store = transaction.objectStore(params);
      const p = store.getAll(); // console.log(p);

      p.onsuccess = function () {
        const lorf = p.result[0]; // console.log(lorf);

        if (lorf) {
          // console.log(p.result[0]['value']);
          obj[params] = true;
        } else {
          obj[params] = false;
        }

        if (params !== 'flowerquestion') {
          return;
        }

        if (obj['tickquestion'] || obj['crossquestion'] || obj['heartquestion'] || obj['flowerquestion'] && params === 'flowerquestion') {
          lllll(); // console.log('=1=1=1=1=1==1==');
        } else {
          input.click();
        }
      };
    }
  };

  function lllll() {
    const div = document.createElement('div');
    div.id = 'myModal';
    div.classList.add('modal');
    div.innerHTML = `
    <span class="clouse">×</span>
    <div class="modal_slid_contnt">
    <p style="font-size: 21px; padding: 0px 0px 21px 0px;"
    >Ваши ответы исчезнут! Продолжаем ?</p>
      <div style="
        display: flex;
        justify-content: center;
      ">
        <button id="BtnYes" class="btnFile">Да</button> 
        <button id="BtnNoo" class="btnFile">Нет</button> 
      </div>
    </div>
  `;
    document.querySelector('body').append(div); // console.log( document.querySelector('#BtnYes'));

    const btnYes = document.querySelector('#BtnYes'),
          btnNoo = document.querySelector('#BtnNoo'),
          clouse = document.querySelector('.clouse');

    const yes = () => {
      input.click();
      btnYes.removeEventListener('click', yes);
      btnNoo.removeEventListener('click', noo);
      clouse.removeEventListener('click', noo);
      document.removeEventListener('keydown', keydownFunct);
      document.querySelector('#myModal').remove();
    };

    const noo = () => {
      btnYes.removeEventListener('click', yes);
      btnNoo.removeEventListener('click', noo);
      clouse.removeEventListener('click', noo);
      document.removeEventListener('click', chengerEvent);
      document.removeEventListener('keydown', keydownFunct);
      document.querySelector('#myModal').remove();
    };

    const keydownFunct = e => {
      if (e.code === 'Escape') {
        noo();
      }
    };

    const chengerEvent = e => {
      if (e.target.classList.contains('modal')) {
        noo();
        document.removeEventListener('click', chengerEvent);
      }
    };

    btnYes.addEventListener('click', yes);
    btnNoo.addEventListener('click', noo);
    clouse.addEventListener('click', noo);
    clouse.addEventListener('click', noo);
    document.addEventListener('click', chengerEvent);
    document.addEventListener('keydown', keydownFunct);
  }

  const chaengeHend = event => {
    if (!event.target.files.length) {
      return;
    }

    const files = Array.from(event.target.files);
    files.forEach(file => {
      // console.log(file);
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = ev => {
        const obfect = JSON.parse(ev.target.result);

        for (const key in obfect) {
          const element = obfect[key]; // console.log(key);
          // console.log(element);

          const arr = Object.values(openRequest.result.objectStoreNames); // console.log(arr);

          if (arr.includes(key)) {
            let transaction = db.transaction([key], 'readwrite');
            let store = transaction.objectStore(key);

            for (const iterator of element) {
              store.put(iterator);
            }
          }
        } // console.log('=1==1=1=1==23=1eoigjf.kmds,aDkoejfvn cmf');


        Object(_services_widjetCircolLev__WEBPACK_IMPORTED_MODULE_2__["default"])(undefined, true);

        if (document.querySelector('.tinRightIn')) {
          // const pa = document.querySelector('.wrapper').classList[1].replace(/\d/,'');
          // console.log(pa);
          let db = window.dbasce,
              ap = document.querySelector('.wrapper').classList[1].replace(/\d/, ''),
              transaction = db.transaction([ap], 'readonly'),
              store = transaction.objectStore(ap);
          document.querySelectorAll('.wrapper').forEach((item, i) => {
            let request = store.get(item.classList[1]);
            console.dir(item.children[0].children[0].children[2]); // console.dir(item.classList[1]);

            request.onsuccess = function () {
              // console.log(p.source.name,p['result'][i]);
              // console.log(request.result.value);
              item.children[0].children[0].children[2].value = request.result.value; // compare(p.source.name,p['result']);
              // if( p.source.name === 'flowerquestion'){
              //   // console.log('=1=1=1=1=1==1==');
              //   save('filename', obj);
              // }
            };
          });
        }
      };
    });
  };

  opneBtn.addEventListener('click', open);
  input.addEventListener('change', chaengeHend);
}

/* harmony default export */ __webpack_exports__["default"] = (openFile);

/***/ }),

/***/ "./src/js/modules/standardQuestions.js":
/*!*********************************************!*\
  !*** ./src/js/modules/standardQuestions.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/js/modules/app.js");
/* harmony import */ var _services_chech__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/chech */ "./src/js/services/chech.js");
/* harmony import */ var _services_matchSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/matchSearch */ "./src/js/services/matchSearch.js");
/* harmony import */ var _services_quetionAdd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/quetionAdd */ "./src/js/services/quetionAdd.js");



 // const db = require("../assets/db.json")

const standardQuestions = (element, selectorCit = 'standart', key, openAll = false, arlistLength) => {
  let div = document.createElement('div');
  div.classList.add('tinRightIn'); //${'quetion'+key === 'quetion1'? 'q':'hide' }

  div.innerHTML = `
      <div class="wrapper ${selectorCit}question${key}">
      <div class="wrapper_wrap">
          <div class="row" style="display: flex; flex-direction: column; gap: 13px;">
              <div class="quesion">
                <div class="quesionNum">
                ${key} из ${arlistLength}
                </div>
                <p id="textQuesion">
               ${element[0]}
                </p> 
              </div>
              <div class="wrap-button">
                <div class="controls_one">
                <div class="player-controls__item -xl js-play">
                  <div class="icon_control_voise">
                    <i id="voise_aa${key}" class="audioTag audio_play" >
                    </i>
                  </div>
                </div>
                <div class="progress__bar progress__bar${key}">
                  <div class="progress__current progress__current${key}" style="width: 0%;">
                  </div>
                </div>
              </div>

             <button class="btn-remove btn btn-remove${key}">
             <img class="icon" src="assets/img/cors.png" alt="remove">
             </button>
             <button class="btn-remove btn start-stop start-stop${key}">
             <img class="icon" id="voisIconi${key}" src="assets/img/micro.png" alt="vois">
             
             </button>
             <button class="btn-remove btn pause pause${key}">
             <img class="icon" src="assets/img/mute.png" alt="stop">
             </button>
             ${global.mobaleMOde && !openAll ? ` 
             <div>
             <button class="stateBtn stateBtn${key} crossBut" style="margin: 0px 12px 0px 0px;">
             </button>
              </div>` : ''} 
            
           </div>
             
           <textarea class="lasss lasss${key}"></textarea>
        
          </div>
        
        </div> 
        <div class="respons">
           <button id="btnResp${key}" class="accordion">Ответ</button>
            <div class="panel">
               <p class="textOler">${element[1] ? Object(_services_matchSearch__WEBPACK_IMPORTED_MODULE_2__["default"])(element[1]) : 'ответа пока нет'}</p>
               ${element[3] ? '<a href=${element[3]} target="_blank">Полезная ссылка по вопросу</a>' : ''}
          </div>
          </div>

      </div>
      `; // для оббнуления из startStage.js

  window.openall = false; //  <p  style="text-align: center;" >Ответ</p>
  //  document.querySelector('.quetion1').classList.remove('hide')

  let timer;
  document.querySelector('.wrapperPagestart').append(div); // console.log(document.querySelector('.lasss').value);

  timer = setTimeout(() => {
    Object(_app__WEBPACK_IMPORTED_MODULE_0__["default"])(key, '.start-stop' + key, selectorCit + 'question' + key, selectorCit + 'question', openAll, element[2]); // app('.start-stop' + key,
    //     '.pause'+key,
    //     '.btn-remove'+key,
    //     '.lasss' + key,
    //     '#aud'+key,
    //     selectorCit+'question'+key,
    //     '#btnResp'+ key,
    //     '#voisIconi'+key,
    //     openAll,
    //     '.progress__current'+key,
    //     '#voise_aa'+key,
    //     element[2],
    //     '.progress__bar'+key);

    if (openAll) return;
    let stateBtnkey = document.querySelector('.stateBtn' + key);
    if (!stateBtnkey) return stateBtnkey = null;
    stateBtnkey.addEventListener('click', e => appp(e));

    function appp(event) {
      stateBtnkey.setAttribute('disabled', 'true');
      Object(_services_quetionAdd__WEBPACK_IMPORTED_MODULE_3__["default"])(false, undefined, event, false);

      function RandArray(array) {
        let rand = Math.random() * array.length | 0;
        let rValue = array[rand];
        return rValue;
      } // var myArray = ['one', 'two', 'three', 'four', 'five', 'six'];
      // console.log(rValue)
      // анимаию сюда animation: 1s swashIn ease;


      let arr = ['vanishIn', 'swashInp', 'swashOut', 'spaceOutRight'];
      let rValue = RandArray(arr); // console.log(rValue);

      stateBtnkey.classList.add(rValue); // console.dir(stateBtnkey);

      stateBtnkey.onanimationend = function () {
        console.log('end animate');
        stateBtnkey.parentElement.parentElement.children[4].remove();
      }; // let timer1
      // timer1 =  setTimeout(() => {
      //   stateBtnkey.parentElement.parentElement.children[4].remove();
      //   //уборка
      //   clearTimeout(timer1);
      //   timer1 = null;
      // }, 1100);


      stateBtnkey.removeEventListener('click', appp);
    } //уборка


    clearTimeout(timer);
    timer = null;
  }, 1000);
  div = null; // }
  // }
};

/* harmony default export */ __webpack_exports__["default"] = (standardQuestions);
/*
 <div class="controls_one">
                <div class="player-controls__item -xl js-play">
                <svg class="icon_control_voise">
                <use id="voise_aa${key}" xlink:href="i.svg#icon_play"></use></svg></div>
                <div class="progress__bar">
                  <div class="progress__current" style="width: 0%;">
                  </div>
                </div>
              </div>



   
              <audio controls class="audio aud"   style="width:100%;max-width:284px;" id="aud${key}">
               <source src="${element[2]? element[2]:'assets/voise/samCh.mp3'}" type="audio/mp3">
               <p>Ваш браузер не поддерживает аудио HTML5. Вот 
               <a href="assets/voise/samCh.mp3">ссылка на аудио</a>.</p>
             </audio>
*/
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/modules/startaStage.js":
/*!***************************************!*\
  !*** ./src/js/modules/startaStage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_changeLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/changeLevel */ "./src/js/services/changeLevel.js");


const startaStage = () => {
  const btnsStart = document.querySelectorAll('.button'); // wrapperTutle =  document.querySelector('.wrapperTutle'),
  // buttonHolder =document.querySelector('.buttonHolder'),
  // body = document.body,
  // html = document.documentElement;

  let selectorListQ = [];
  btnsStart.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      selectorListQ = []; // console.log(e);

      Object(_services_changeLevel__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target, selectorListQ, btnsStart);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (startaStage);

/***/ }),

/***/ "./src/js/modules/togallVois.js":
/*!**************************************!*\
  !*** ./src/js/modules/togallVois.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const togallVois = () => {
  // localButtonToggale('muteVoise','.icon-material_li','icon-material_li_mute')
  // localButtonToggale('nonstope','.icon-material_tw','icon-material_tw_NonStop')
  const icon = {
    non_stop: document.querySelector('#non_stop_mode_icon'),
    voise: document.querySelector('#voise_mudte_icon')
  };

  let _fu = function fu() {
    if (localStorage.getItem('nonstope')) {
      icon.non_stop.classList.add('icon-material_tw_NonStop');
    }

    if (localStorage.getItem('muteVoise')) {
      icon.voise.classList.add('icon-material_li_mute');
    }

    _fu = null;
  };

  _fu(); // setTimeout(() => {
  //   console.log(fu);
  // }, 1000);

  /*
     non-stop: mute / on
     voise: mute / on
     voise  === on ? non-stop = job 
     voise  === mute ? non-stop =  manual
     click manual activate mode non-stop === true ? voise  = on 
   */
  // режим нон стоп


  document.querySelector('#non_stop_mode').addEventListener('click', e => {
    e.preventDefault();
    console.log(e); // toggaleButton('.icon-material_tw','icon-material_tw_NonStop','nonstope')

    if (icon.non_stop.classList.contains('icon-material_tw_NonStop')) {
      icon.non_stop.classList.remove('icon-material_tw_NonStop');
      localStorage.removeItem('nonstope');
    } else {
      localStorage.setItem('nonstope', 'nonstope');
      icon.non_stop.classList.add('icon-material_tw_NonStop');
      icon.voise.classList.remove('icon-material_li_mute');
      localStorage.removeItem('muteVoise');
    }
  }); // режим без звука

  document.querySelector('#voise_mudte').addEventListener('click', e => {
    e.preventDefault(); // console.log(e);

    if (icon.voise.classList.contains('icon-material_li_mute')) {
      icon.voise.classList.remove('icon-material_li_mute');
      localStorage.removeItem('muteVoise');
    } else {
      localStorage.setItem('muteVoise', 'muteVoise');
      icon.non_stop.classList.contains('icon-material_tw_NonStop') ? icon.non_stop.classList.remove('icon-material_tw_NonStop') : '';
      icon.voise.classList.add('icon-material_li_mute');
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (togallVois);

/***/ }),

/***/ "./src/js/modules/toggalBurgerMenu.js":
/*!********************************************!*\
  !*** ./src/js/modules/toggalBurgerMenu.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const toggalBurgerMenu = () => {
  const downloadedWraper = document.querySelector('.downloadedBtn'),
        btnMenu = document.querySelector('#burgerBtn');
  btnMenu.addEventListener('click', () => {
    downloadedWraper.classList.toggle('hide'); // if(downloadedWraper.getAttribute('data-togle') === 'clouse'){
    //       downloadedWraper.setAttribute('data-togle', 'open')
    //       downloadedWraper.classList.remove('hide')
    // } else {
    //       downloadedWraper.setAttribute('data-togle', 'clouse')
    //       downloadedWraper.classList.add('hide');
    //   }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (toggalBurgerMenu);

/***/ }),

/***/ "./src/js/modules/upWindowuser.js":
/*!****************************************!*\
  !*** ./src/js/modules/upWindowuser.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const upWindowuser = () => {
  const div = document.createElement('div');
  div.classList.add('upButton');
  div.innerHTML = `<a style="display: block;"  href="#"><img src="assets/img/Up.png" alt="up" ></a>`;
  div.classList.add('hide');
  document.addEventListener('scroll', e => {
    const userwiz = window.pageYOffset;

    if (userwiz > 1200) {
      div.classList.remove('hide');
    } else {
      div.classList.add('hide');
    }
  });
  document.querySelector('.sidbar_rigte_section').append(div);
  div.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.wrapperTutle').scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (upWindowuser);

/***/ }),

/***/ "./src/js/modules/whereStay.js":
/*!*************************************!*\
  !*** ./src/js/modules/whereStay.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_whereSteyFunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/whereSteyFunc */ "./src/js/services/whereSteyFunc.js");
 // import clickIphone from '../services/clickIphone';

let p = 0;
let selectorListQ = [];

const whereStay = (selector = false) => {
  selectorListQ = [];

  try {
    if (selector) {
      return selector.addEventListener('click', e => Object(_services_whereSteyFunc__WEBPACK_IMPORTED_MODULE_0__["default"])(e, selectorListQ, p));
    }

    document.querySelector('#wheryIsty').addEventListener('click', e => Object(_services_whereSteyFunc__WEBPACK_IMPORTED_MODULE_0__["default"])(e, selectorListQ, p));
  } catch (error) {
    console.error(error);
  } //   function whereSt (e) {
  //     // try {
  //    e.preventDefault();
  //    const sel =  localStorage.getItem('WhereStayUser');
  //    console.log(sel);
  //    if (!sel) {
  //      //сделать уведомления с надписью "я не знаю где ты остановился"
  //      return openTextUserError('notInfoWheyStay','я не знаю где ты остановился')
  //    }
  //    // если вопрос уже существует просто долистаем до нее
  //    const selen = document.querySelector('.'+sel);
  //    if(selen){
  //      return selen.scrollIntoView({block: "start", behavior: "smooth"})
  //    }
  //    // if (sel) {
  //    const selectorQuestionLevel =  sel.replace(/(question)(\d)+/,''); // узнаю к какой группе вопрос принадлежит
  //    const numberQuestion =  sel.replace(/(tick|cross|heart|flower)(question)/,'')-1 ,
  //    body = document.body,
  //    html = document.documentElement,
  //    width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth ); // номер вопроса
  //    let selectorQuestionopen;
  //    console.log(selectorQuestionLevel);
  //    // существуют ли вопросы
  //    const selectorQues = document.querySelector(`.wrapper`);
  //    // есть? да значит смотрим что вопросы с какой группы сущесвтуют : вопроов нету
  //    selectorQues? selectorQuestionopen = selectorQues.classList[1].replace(/(question)(\d)+/,''):selectorQuestionopen = null;
  //    // с какого вопроса начать
  //    let index = document.querySelectorAll('.tinRightIn').length||0
  //    // if(selectorQuestionopen === selectorQuestionLevel){
  //    //   console.log('нажимать на изменения урвоня нет смысла!');
  //    // }
  //    // console.log(`${selectorQuestionopen} !== ${selectorQuestionLevel} || !${selectorQuestionopen}`);
  //    if(selectorQuestionopen !== selectorQuestionLevel || !selectorQuestionopen){
  //     // console.log('переклюать нужно для мобилок iphone!');
  //   //    window.quetiAddn = true;
  //             changeLevel(document.querySelector('.'+selectorQuestionLevel),selectorListQ,document.querySelectorAll('.button'));
  //   if (global.mobaleMOde && width <= 775) {
  //         name(numberQuestion,index);
  //         console.log('переклюать надо для mobail!');
  //       } else {
  //         setTimeout(() => {
  //           pcsicle();
  //         },800 );
  //       console.log('переклюать надо для PC!');
  //      }
  //           console.log(changeLevel);;
  //    } else {
  //     console.log('переключать не нужно ');
  //      index = document.querySelectorAll('.tinRightIn').length-1;
  //      global.mobaleMOde && width <= 775?name(numberQuestion,index):pcsicle();
  //    }
  // //  } catch (error) {console.error(error); }
  //     function name(numberQuestion,index) {
  //       let count = 0,
  //       lengthIteration = 20,
  //       element = document.querySelector('.modals_forms'),
  //       selectorList = numberQuestion + 1
  //       index = 0;
  //       document.body.classList.add('overflowhidden')
  //       element.classList.add('showModal');
  //       console.log('вызов Name');
  //       console.log(numberQuestion + ' numberQuestion');
  //       console.log(selectorList+' selectorList');
  //       chicle();
  //       function chicle() {
  //         console.log('вызов chicle');
  //   // console.log(lengthIteration+' '+selectorListQ); если длина меньше 20 вопросов нужноцыкл запстить на мых обороткх
  //         if (lengthIteration >= selectorListQ) {
  //             lengthIteration = selectorListQ;
  //         }
  //         for ( index ; index < lengthIteration; index++) {
  //           // debugger;
  //           // console.log(++p);
  //           p++;
  //           console.log(p);
  //           count++;
  //           console.log(p+' p');
  //           // console.log(count + ' count');
  //           // console.log(index + ' index');
  //           // console.log('llllllllllllllllllllllllll');
  //           p == selectorList?
  //           setTimeout(() => {
  //             quetionAdd(false,false,false,false); //
  //           }, 500)
  //           :
  //           setTimeout(() => {
  //             quetionAdd(false,false,false,true);
  //           }, 500)
  //           // if(p == selectorListQ){
  //           //   return console.log('все ребята!!!');
  //           // }
  //           // if(p == selectorList -1){
  //           if(p == selectorList ){
  //             console.log('шутка чтоли ?!');
  //             // setTimeout(() => {
  //             //   // document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
  //             // }, 2000);
  //               element.classList.remove('showModal');
  //               document.body.classList.remove('overflowhidden');
  //               p = 0;
  //               return;
  //           }
  //         }
  //         console.log(p +' p : selectorListQ '+ selectorList);
  //         if(p >= selectorList) {
  //           console.log('цыкл разрыв');
  //           // console.log(p);
  //           p = 0;
  //           element.classList.remove('showModal');
  //           document.body.classList.remove('overflowhidden');
  //           // console.log(p);
  //           index = 0;
  //             return;
  //             // console.log('все ребята!!!');
  //         } else {
  //           index = 0;
  //           console.log('цыкл не разрыв');
  //           let time3 = setTimeout(() => {
  //             chicle();
  //             clearTimeout(time3);
  //             time3 = null;
  //           }, 2500);
  //       }
  //       }
  //       // lengthIteration += 20;
  //       // index = count;
  //       // if(count  >= selectorListQ ){
  //       //     count = 0,
  //       //     lengthIteration = 20,
  //       //     index = 0;
  //       //     return;
  //       // } else {
  //       //     let time3 = setTimeout(() => {
  //       //     chicle();
  //       //     clearTimeout(time3);
  //       //     time3 = null;
  //       //     }, 2500);
  //       // }
  //       // for (index ; index < numberQuestion; index++) {
  //       //   // quetionAdd();
  //       //   quetionAdd(false,false,false,true);
  //       // }
  //       // document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
  //     }
  //     function pcsicle() {
  //       // console.log(index);
  //       // console.log(numberQuestion);
  //       for (index ; index < numberQuestion; index++) {
  //         // quetionAdd();
  //         // console.log('llllllllllllllllllllllllllllll');
  //         quetionAdd(false,false,false,true);
  //       }
  //       setTimeout(() => {
  //         document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({block: "start", behavior: "smooth"});
  //       }, 5000);
  //     }
  //   }

};

/* harmony default export */ __webpack_exports__["default"] = (whereStay);

/***/ }),

/***/ "./src/js/services/LitlModules.js":
/*!****************************************!*\
  !*** ./src/js/services/LitlModules.js ***!
  \****************************************/
/*! exports provided: stopVoiseLisenerAll, stopVoiseSpeecAll, createElementMobaile, openTextUserError, removeAttributNadClass, removeLocalStoregeQuestion, scrollDown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopVoiseLisenerAll", function() { return stopVoiseLisenerAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopVoiseSpeecAll", function() { return stopVoiseSpeecAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElementMobaile", function() { return createElementMobaile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openTextUserError", function() { return openTextUserError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttributNadClass", function() { return removeAttributNadClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeLocalStoregeQuestion", function() { return removeLocalStoregeQuestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollDown", function() { return scrollDown; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__);


function stopVoiseLisenerAll() {
  document.querySelectorAll('.pause').forEach(item => item.click());
}

function removeAttributNadClass() {
  document.querySelectorAll('.start-stop').forEach(item => {
    item.classList.remove('btnDeactiv');
    item.removeAttribute('disabled');
  });
}

function stopVoiseSpeecAll() {
  let al = document.querySelectorAll('audio');

  for (let i = 0; i < al.length; i++) {
    al[i].currentTime = 0;

    if (!al[i].paused) {
      al[i].pause();
    }

    if (i === al.length) {
      al = null;
    }
  }
}

function createElementMobaile() {
  let div = document.createElement('div');
  div.classList.add('fabSegment', 'alerot');
  div.style.cssText = 'align-items: center;';
  div.innerHTML = `
          <ul class="fab-buttons_Segment alerot">
            <li class="fab-buttons__item_Segment">
              <div href="#" class="fab-buttons__link_segment alerot btnFile fb" style="
                width: 100px;
                height: 30px;
                border-radius: 30px;
            " data-tooltip="Найти актив...">
                  <i class="icon-material icon-material_fb" style="
                  top: -14px;
                  position: relative;
              "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="non_stop_mode"  class="fab-buttons__link_segment alerot btnFile tw" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              " data-tooltip="Нон-стопом">
                    <i id="non_stop_mode_icon" class="icon-material icon-material_tw" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="voise_mudte" class="fab-buttons__link_segment alerot btnFile li" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              "  data-tooltip="Звук">
                    <i id="voise_mudte_icon" class="icon-material icon-material_li" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#"  class="fab-buttons__link_segment alerot btnFile gp_segment" style="
                width: 100px;
                height: 30px;
                border-radius: 30px;
            " data-tooltip="показать все">
                  <i  class="icon-material icon-material_gp" style="
                  top: -14px;
                  position: relative;
              "></i>
                </div>
            </li>
            <li class="fab-buttons__item_Segment">
              <div href="#" id="wheryIsty" class="fab-buttons__link_segment alerot btnFile wher" style="
                  width: 100px;
                  height: 30px;
                  border-radius: 30px;
              " data-tooltip="где я был?">
                    <i class="icon-material icon-material_Wher" style="
                    top: -14px;
                    position: relative;
                "></i>
              </div>
            </li>
          </ul>
          </span>
          `;
  const sp2 = document.querySelector('.btnFile');
  const parentDiv = sp2.parentNode;
  parentDiv.insertBefore(div, sp2);
  div = null;
}

function openTextUserError(idPopap, text = 'Упс, что-то пошло не так!', url = null, timeout = 10000) {
  const array = document.querySelector('#modalAll').children;

  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item.getAttribute('data-PopapId') == idPopap) return;
  }

  document.querySelector('#modalAll').replaceChildren();
  const objLocal = {
    element: document.createElement('div')
  };
  objLocal.element.id = 'oneModallPopap';
  objLocal.element.setAttribute('data-PopapId', idPopap);
  objLocal.element.innerHTML = `
  <div id="myModal" class="modalPopap">
  <span class="clousePopap">×</span>
  <div class="modal_slid_contnt">
  <p style="font-size: 1.4em;"
  >${text}</p>
    <div style="
      display: flex;
      justify-content: center;
    ">
     ${url ? '<a href="' + url + '" target="_blank">Полезная ссылка для исправления данной ошибки </a>' : ''}
    </div>
  </div>
</div>
  `;
  document.querySelector('#modalAll').append(objLocal.element);
  let clouse = document.querySelector('.clousePopap');

  const noo = () => {
    document.querySelector('#modalAll').replaceChildren();
    clouse.removeEventListener('click', noo);
  };

  clouse.addEventListener('click', noo);
  let time = setTimeout(() => {
    noo();
    clearTimeout(time);
    time = null;
    objLocal.element = null;
    clouse = null;
  }, timeout);
} // item.pause()


function removeLocalStoregeQuestion() {
  for (let [key] of Object.entries(localStorage)) {
    let selectorQuestionLevel = key.search(/(tick|cross|heart|flower)(question)/);

    if (selectorQuestionLevel === 0) {
      localStorage.removeItem(key);
    }

    selectorQuestionLevel = null;
  }
}

function scrollDown() {
  return document.querySelector('.wrapperPagestart').lastElementChild.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
}



/***/ }),

/***/ "./src/js/services/burgerMenuFunction.js":
/*!***********************************************!*\
  !*** ./src/js/services/burgerMenuFunction.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function burgerMenu(selector) {
  let menu = document.querySelector(selector);
  let button = document.querySelector('.burger-menu_button');
  let butto1 = document.querySelector('.burger-menu_lines');
  let links = document.querySelector('.burger-menu_link');
  let overlay = document.querySelector('.burger-menu_overlay');
  button.addEventListener('click', e => {
    e.preventDefault();
    toggleMenu();
  });
  butto1.addEventListener('click', e => {
    e.preventDefault();
    toggleMenu();
    menu.classList.contains('losharablt');

    if (menu.classList.contains('burger-menu_active')) {
      menu.classList.remove('burger-menu_active');
    } else {
      menu.classList.add('burger-menu_active');
    }
  });
  overlay.addEventListener('click', () => toggleMenu());

  function toggleMenu() {
    const spaner = document.querySelector('[data-span2]');

    if (menu.classList.contains('burger-menu_active')) {
      menu.classList.remove('burger-menu_active');
      spaner.classList.remove('opal'); // document.querySelector('.burger-menu_lines').style = 'opacity: 1;'

      document.querySelector('body').style = 'overflow: visible;';
    } else {
      document.querySelector('body').style = 'overflow: hidden;'; // document.querySelector('.burger-menu_lines').style = 'opacity: 0;'

      menu.classList.add('burger-menu_active');
      spaner.classList.add('opal');
    } // if (menu.classList.contains('burger-menu_active')) {
    //   document.querySelector('body').style='overlow= hidden';
    // } else {
    //   document.querySelector('body').style='overlow= visible';
    // }

  }
}

/* harmony default export */ __webpack_exports__["default"] = (burgerMenu);

/***/ }),

/***/ "./src/js/services/changeLevel.js":
/*!****************************************!*\
  !*** ./src/js/services/changeLevel.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _modules_openAllQuestion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/openAllQuestion */ "./src/js/modules/openAllQuestion.js");
/* harmony import */ var _LitlModules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LitlModules */ "./src/js/services/LitlModules.js");
/* harmony import */ var _burgerMenuFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./burgerMenuFunction */ "./src/js/services/burgerMenuFunction.js");
/* harmony import */ var _quetionAdd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quetionAdd */ "./src/js/services/quetionAdd.js");
/* harmony import */ var _widjetCircolLev__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widjetCircolLev */ "./src/js/services/widjetCircolLev.js");
/* harmony import */ var _whereStCicle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./whereStCicle */ "./src/js/services/whereStCicle.js");
// import lostMicrophone from "../modules/lostMicrophone";


 // import clickIphone from "./clickIphone";




const wrapperTutle = document.querySelector('.wrapperTutle'),
      buttonHolder = document.querySelector('.buttonHolder'),
      body = document.body,
      html = document.documentElement;

const changeLevel = (targetBtn, selectorListQ, btnsStart) => {
  let time,
      navel = document.querySelector('#navel'),
      burger_men = document.querySelector('#burger_men'),
      btnBurge_men = document.querySelector('#btnBurge_men'),
      spanBurger_man = document.querySelector('#spanBurger_man'),
      overlowBurger = document.querySelector('#overlowBurger'),
      sel = 'tick',
      localSel = targetBtn.classList[2],
      width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
      btn = document.querySelector('.staet'); //  console.log(targetBtn);
  //  console.log(localSel);

  window.modeloderad = false;

  if (document.querySelector('#navel').parentElement == document.querySelector('.time__segment')) {
    document.querySelector('#burger_men').appendChild(document.querySelector('#navel'));
  } //  const todoNumOne = document.querySelector('.tinRightIn');


  if (!document.querySelector('.tinRightIn')) {
    wrapperTutle.classList.add('pps');
  } //  let time;


  time = setTimeout(() => {
    buttonHolder.classList.remove('hide');
    btnsStart.forEach(span => {
      span.nextElementSibling.classList.remove('textActiveLevel');
    });
    targetBtn.nextElementSibling.classList.add('textActiveLevel');
    clearTimeout(time);
    time = null;
  }, 100); // selectorListQ = [];

  switch (targetBtn.classList[2]) {
    case 'tick':
      selectorListQ = window.objectAllCor[localSel];
      sel = 'tick';
      break;

    case 'cross':
      selectorListQ = window.objectAllCor[localSel];
      sel = 'cross';
      break;

    case 'heart':
      selectorListQ = window.objectAllCor[localSel];
      sel = 'heart';
      break;

    case 'flower':
      selectorListQ = window.objectAllCor[localSel];
      sel = 'flower';
      break;
  }

  localSel = null; // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && width <= 775) {

  if (global.mobaleMOde && width <= 775) {
    // //         // код для мобильных устройств
    // if(!btn.classList.contains('hide')){
    //   btn.classList.add('hide');
    // }
    if (navel.classList.contains('burger-menu_nav')) {
      // бесполезная строка по моим предполоениям
      // let menu = document.querySelector('.burger-menu');s
      setTimeout(() => {
        document.querySelector('.burger-menu').classList.remove('burger-menu_active');
        body.style = 'overflow: visible;';
      }, 700);
    } else {
      navel.classList.add('burger-menu_nav');
      burger_men.classList.add('burger-menu');
      btnBurge_men.classList.add('burger-menu_button');
      spanBurger_man.classList.add('burger-menu_lines');
      overlowBurger.classList.add('burger-menu_overlay');
      Object(_burgerMenuFunction__WEBPACK_IMPORTED_MODULE_2__["default"])('.burger-menu');
    }

    if (!document.querySelector('.downloadedBtn').children[0].classList.contains('fabSegment')) {
      Object(_LitlModules__WEBPACK_IMPORTED_MODULE_1__["createElementMobaile"])();
    } // whereStay(document.querySelector('.wher'));
    // togallVois(true);
    //  lostMicrophone(true);


    const iconMaterialOpenAll = document.querySelector('.icon-material_gp');
    const elementList = document.querySelector('.gp_segment'); //  const index = CountElementIsDOM();

    elementList.removeEventListener('click', _LitlModules__WEBPACK_IMPORTED_MODULE_1__["scrollDown"]);
    elementList.removeEventListener('click', () => {
      Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["mobailCle"])(Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["CountElementIsDOM"])(), selectorListQ - Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["CountElementIsDOM"])(), true);
    }, {
      once: true
    });
    elementList.addEventListener('click', () => {
      Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["mobailCle"])(Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["CountElementIsDOM"])(), selectorListQ - Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_5__["CountElementIsDOM"])(), true);
    }, {
      once: true
    }); //  elementList.removeEventListener('click',()=>{clickIphone(selectorListQ)}, {once:true})
    //  elementList.addEventListener('click',()=>{clickIphone(selectorListQ)}, {once:true});

    iconMaterialOpenAll.parentElement.setAttribute('data-tooltip', 'Показать все');
    iconMaterialOpenAll.classList.remove('icon-material_scrollDown');
  } else {
    if (btn.classList.contains('hide')) {
      btn.classList.remove('hide');
    }

    Object(_modules_openAllQuestion__WEBPACK_IMPORTED_MODULE_0__["default"])(sel);
    buttonHolder.classList.add('holeOut');

    if (navel.classList.contains('burger-menu_nav')) {
      navel.classList.remove('burger-menu_nav');
      burger_men.classList.remove('burger-menu');
      btnBurge_men.classList.remove('burger-menu_button');
      spanBurger_man.classList.remove('burger-menu_lines');
      overlowBurger.classList.remove('burger-menu_overlay');
    } // код для обычных устройств


    buttonHolder.classList.remove('holeOut');
    buttonHolder.classList.add('buttonHolderStatic');

    if (!buttonHolder.classList.contains('bord')) {
      buttonHolder.classList.add('hide');
      buttonHolder.classList.add('bord');
    }

    buttonHolder.classList.add('gridAct');
  }

  Object(_LitlModules__WEBPACK_IMPORTED_MODULE_1__["removeLocalStoregeQuestion"])();
  const boolean = global.mobaleMOde && width <= 775;

  if (boolean) {
    let list = document.querySelector('.wrapperPagestart'),
        elem = document.querySelectorAll('.tinRightIn');

    if (elem) {
      elem = null;
      list.replaceChildren(); // document.body.style.height  = height +'px'
    }

    wrapperTutle.classList.add('pps');
  }

  let time4 = setTimeout(() => {
    if (!boolean) {
      let list = document.querySelector('.wrapperPagestart'),
          elem = document.querySelectorAll('.tinRightIn');

      if (elem) {
        elem = null;
        list.replaceChildren(); // document.body.style.height  = height +'px'
      }
    }

    localStorage.setItem('sel', sel); // window.selFoOpenAllquestion = sel;

    Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_3__["default"])(false, sel);

    if (document.querySelector('[data-span2]')) {
      document.querySelector('[data-span2]').classList.remove('opal');
    }

    Object(_widjetCircolLev__WEBPACK_IMPORTED_MODULE_4__["default"])(sel);
    clearTimeout(time4);
    time4 = null;
  }, boolean ? 400 : 800);
};

/* harmony default export */ __webpack_exports__["default"] = (changeLevel);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/services/chech.js":
/*!**********************************!*\
  !*** ./src/js/services/chech.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const chech = text => {
  if (text.at(0) === ',') {
    return text.slice(1);
  } else if (text.at(0) === 'n' && text.at(1) === 'u' && text.at(2) === 'l' && text.at(3) === 'l') {
    return text.slice(5);
  } else {
    return text;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (chech);

/***/ }),

/***/ "./src/js/services/elemScroll.js":
/*!***************************************!*\
  !*** ./src/js/services/elemScroll.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const elemScroll = selector => {
  // console.log(selector);
  let element = document.querySelector(`.${selector}`); // body.style.height = body.offsetHeight +350+"px";

  element.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  }); // console.log('alalalaalalalalla');
  // body = null;

  element = null;
};

/* harmony default export */ __webpack_exports__["default"] = (elemScroll);

/***/ }),

/***/ "./src/js/services/indexedDB.js":
/*!**************************************!*\
  !*** ./src/js/services/indexedDB.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _widjetCircolLev__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widjetCircolLev */ "./src/js/services/widjetCircolLev.js");
/* harmony import */ var _modules_exportQuestion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/exportQuestion */ "./src/js/modules/exportQuestion.js");
/* harmony import */ var _modules_openFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/openFile */ "./src/js/modules/openFile.js");



let db;

const indexedDBLocal = () => {
  function indexedDBOk() {
    return 'indexedDB' in window;
  } //No support? Go in the corner and pout.


  if (!indexedDBOk) return;
  let openRequest = indexedDB.open('idarticle_people3', 1);

  openRequest.onupgradeneeded = function (e) {
    let thisDB = e.target.result;

    if (!thisDB.objectStoreNames.contains('tickquestion')) {
      thisDB.createObjectStore('tickquestion', {
        keyPath: 'name'
      });
    }

    if (!thisDB.objectStoreNames.contains('crossquestion')) {
      thisDB.createObjectStore('crossquestion', {
        keyPath: 'name'
      });
    }

    if (!thisDB.objectStoreNames.contains('heartquestion')) {
      thisDB.createObjectStore('heartquestion', {
        keyPath: 'name'
      });
    }

    if (!thisDB.objectStoreNames.contains('flowerquestion')) {
      thisDB.createObjectStore('flowerquestion', {
        keyPath: 'name'
      });
    }
  };

  openRequest.onerror = function (e) {
    //Do something for the error
    console.log(e);
    console.log('курица общипанная едром из гомункула из торпедной стружки говна');
  };

  openRequest.onsuccess = function (e) {
    db = e.target.result;
    window.dbasce = db;
    Object(_widjetCircolLev__WEBPACK_IMPORTED_MODULE_0__["default"])(true);
    Object(_modules_exportQuestion__WEBPACK_IMPORTED_MODULE_1__["default"])(db);
    Object(_modules_openFile__WEBPACK_IMPORTED_MODULE_2__["default"])(db, openRequest); // расскаментирование добваило 1 мб
  };

  return;
};

/* harmony default export */ __webpack_exports__["default"] = (indexedDBLocal);

/***/ }),

/***/ "./src/js/services/matchSearch.js":
/*!****************************************!*\
  !*** ./src/js/services/matchSearch.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _replaceAt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceAt */ "./src/js/services/replaceAt.js");


const matchSearch = text => {
  let p = text;

  for (let i = 0; i < p.length; i++) {
    const element = p[i];

    if (element === '_') {
      p = Object(_replaceAt__WEBPACK_IMPORTED_MODULE_0__["default"])(p, i, '<br>');
    } // if (element === '~') {
    //   p = replaceAt(p,i, '<br>')
    // }

  }

  let time = setTimeout(() => {
    p = null; // уборка

    clearTimeout(time);
    time = null;
  }, 500);
  return p;
};

/* harmony default export */ __webpack_exports__["default"] = (matchSearch);

/***/ }),

/***/ "./src/js/services/multiPlepresButtons.js":
/*!************************************************!*\
  !*** ./src/js/services/multiPlepresButtons.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const multiPlepresButtons = (disable = true, selectorActivBtn) => {
  let button = document.querySelector(selectorActivBtn),
      allButton = document.querySelectorAll('.start-stop');

  if (disable) {
    allButton.forEach(item => {
      item.setAttribute('disabled', true);

      if (item == button) {} else {
        item.classList.add('btnDeactiv');
      }
    });
  } else {
    allButton.forEach(item => {
      item.classList.remove('btnDeactiv');
      item.removeAttribute('disabled');
    });
  }

  allButton = null;
  button = null;
  selectorActivBtn = null;
  disable = null;
};

/* harmony default export */ __webpack_exports__["default"] = (multiPlepresButtons);

/***/ }),

/***/ "./src/js/services/openciCycle.js":
/*!****************************************!*\
  !*** ./src/js/services/openciCycle.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _quetionAdd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quetionAdd */ "./src/js/services/quetionAdd.js");
// import { stopVoiseLisenerAll,stopVoiseSpeecAll } from "./LitlModules";
// import standardQuestions from "../modules/standardQuestions";
 // import dbArr from '../db/dbArr.json'
// let selectorDB,selectorDBLenght

const openciCycle = localSel => {
  let selectorListQ = null;

  switch (localSel) {
    case 'tick':
      // selectorListQ = dbArr['styles'][0];
      selectorListQ = window.objectAllCor[localSel];
      break;

    case 'cross':
      selectorListQ = window.objectAllCor[localSel];
      break;

    case 'heart':
      selectorListQ = window.objectAllCor[localSel];
      break;

    case 'flower':
      selectorListQ = window.objectAllCor[localSel];
      break;
  } // let index = document.querySelectorAll('.tinRightIn').length
  //  selectorListQ = selectorListQ.length;
  // stopVoiseLisenerAll();
  // stopVoiseSpeecAll();


  let index = document.querySelectorAll('.tinRightIn').length;

  for (index; index < selectorListQ; index++) {
    // console.log(index + " : " + (selectorListQ -1));
    // console.log(selectorListQ);
    if (index == selectorListQ - 1) {
      // console.log('true');
      Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_0__["default"])(false, false, false, false);
    } else {
      Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_0__["default"])(false, false, false, true);
    }
  }

  selectorListQ = null;
  localSel = null;
};

/* harmony default export */ __webpack_exports__["default"] = (openciCycle);

/***/ }),

/***/ "./src/js/services/quetionAdd.js":
/*!***************************************!*\
  !*** ./src/js/services/quetionAdd.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _voiceQuestion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voiceQuestion */ "./src/js/services/voiceQuestion.js");
/* harmony import */ var _modules_standardQuestions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/standardQuestions */ "./src/js/modules/standardQuestions.js");
/* harmony import */ var _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../db/dbArr.json */ "./src/js/db/dbArr.json");
var _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../db/dbArr.json */ "./src/js/db/dbArr.json", 1);
/* harmony import */ var _services_LitlModules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/LitlModules */ "./src/js/services/LitlModules.js");



 // import { Promise } from "core-js";

let counter = 0,
    arlist = [],
    seler = null,
    audio,
    selectorListQ = [];

const quetionAdd = (vioseSkib, sel, e, prop = false) => {
  if (e) {
    e.preventDefault();
  }

  if (sel) {
    counter = 0;

    switch (sel) {
      case 'tick':
        arlist = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2__['styles'][0];
        sel = 'tick';
        break;

      case 'cross':
        arlist = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2__['styles'][1];
        sel = 'cross';
        break;

      case 'heart':
        arlist = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2__['styles'][2];
        sel = 'heart';
        break;

      case 'flower':
        arlist = _db_dbArr_json__WEBPACK_IMPORTED_MODULE_2__['styles'][3];
        sel = 'flower';
        break;
    }
  }

  const localMute = localStorage.getItem('muteVoise'),
        icon_material_li = document.querySelector('.icon-material_li');

  if (sel) {
    seler = sel;
  }

  if (document.querySelectorAll('.tinRightIn').length !== 0 && window.modeloderad) {
    counter = document.querySelectorAll('.tinRightIn').length;
  }

  if (counter > arlist.length - 1) {
    arlist = [];
    console.log('ну все !');
    return;
  }

  if (!prop) {// stopVoiseLisenerAll();
  }

  if (vioseSkib) {
    return arlist = [];
  }

  const wrapperTutle = document.querySelector('.wrapperTutle');

  if (wrapperTutle.classList.contains('pps')) {
    wrapperTutle.classList.remove('pps');
  }

  Object(_modules_standardQuestions__WEBPACK_IMPORTED_MODULE_1__["default"])(arlist[counter], seler, counter + 1, prop, arlist.length);

  if (global.appleMode) {
    //  let key = counter;
    Object(_voiceQuestion__WEBPACK_IMPORTED_MODULE_0__["default"])(counter + 1, seler + 'question' + counter, arlist[counter][2], prop, 'quAdd');
  }

  counter++;
};

/* harmony default export */ __webpack_exports__["default"] = (quetionAdd);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/services/recognation.js":
/*!****************************************!*\
  !*** ./src/js/services/recognation.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function recognation() {
  const recognizer = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)(); // const recognizer =  new SpeechRecognition();
  // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить

  recognizer.interimResults = true; // Какой язык будем распознавать?

  recognizer.lang = 'ru-Ru';
  recognizer.continuous = true; // global.recog = recognizer;

  return recognizer;
}

/* harmony default export */ __webpack_exports__["default"] = (recognation);

/***/ }),

/***/ "./src/js/services/replaceAt.js":
/*!**************************************!*\
  !*** ./src/js/services/replaceAt.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const replaceAt = (text, index, replacement) => {
  return text.substring(0, index) + replacement + text.substring(index + 1, +text.length);
};

/* harmony default export */ __webpack_exports__["default"] = (replaceAt);

/***/ }),

/***/ "./src/js/services/voiceQuestion.js":
/*!******************************************!*\
  !*** ./src/js/services/voiceQuestion.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {// import { stopVoiseLisenerAll,stopVoiseSpeecAll } from "./LitlModules";
// import elemScroll from "./elemScroll";
let mySound;

const voiceQuestion = (key, selLocal, viosPath, openAll, p) => {
  let audio_butto = document.getElementById('voise_aa' + key),
      curtiem;
  mySound && pauseVid(mySound);
  mySound = new Audio(viosPath); // console.log(audio_butto);

  const recognizer = global.recog; // console.log(mySound);
  // console.log(key);
  // console.log('.progress__bar'+key);
  // console.log(selLocal);
  // console.log(viosPath);
  // console.log(openAll);
  // console.log(p);
  // document.getElementsByClassName('progress__bar'+key)[0].addEventListener('click', setProgress);

  function setProgress(e) {
    const width = this.clientWidth,
          clickX = e.offsetX,
          duration = mySound.duration;
    curtiem = clickX / width * duration;
    mySound.currentTime = clickX / width * duration;
  }

  mySound.ontimeupdate = function (e) {
    myFunction(e);
  };

  function myFunction(e) {
    // console.log(e);
    if (!document.querySelector('.progress__current' + key)) return;
    const {
      duration,
      currentTime
    } = e.srcElement,
          progressPercent = currentTime / duration * 100;
    document.querySelector('.progress__current' + key).style.width = `${progressPercent}%`;
  }

  function playVid(track, audio_button) {
    //  console.log(audio_button);
    // console.log(track.readyState);
    // recognizer.stop();
    track.play();

    track.onplay = function () {
      // alert("The video has started to play");
      audio_button.classList.remove('audio_play');
      audio_button.classList.add('audio_pause');
    };

    track.onpause = function () {
      curtiem = track.currentTime;
    };

    track.onended = function () {
      // console.log("The audio has ended function axmedet");
      audio_button.classList.remove('audio_pause');
      audio_button.classList.add('audio_play');
      track.currentTime, curtiem = 0;
      let NoneStopMode = document.querySelector('#non_stop_mode_icon').classList.contains('icon-material_tw_NonStop');

      if (NoneStopMode) {// recognizer.stop();
        // let time = setTimeout(() => {
        //   // startVoise();
        //   clearTimeout(time);
        // }, 900);
      }
    };

    track.ontimeupdate = function (e) {
      myFunction(e);
    }; // function myFunction(e) {
    //   // console.log(e);
    //   if(!document.querySelector(progress__current)) return
    //     const { duration, currentTime } = e.srcElement;
    //     const progressPercent = (currentTime / duration) * 100;
    //     document.querySelector(progress__current).style.width = `${progressPercent}%`;
    // }

  }

  function pauseVid(track, audio_button) {
    track.pause();
    document.querySelectorAll('.audioTag').forEach(item => {
      if (item.classList.contains('audio_pause')) {
        item.classList.remove('audio_pause');
        item.classList.add('audio_play');
      }
    });
    document.getElementById('voise_aa' + key).classList.remove('audio_pause');
    document.getElementById('voise_aa' + key).classList.add('audio_play'); // console.log('вызвался');
  } // if(global.appleMode) {
  //   console.log('lol');
  // } else {
  // }
  // setListeerBtnPlay();
  // if (!openAll) {
  //   let btnVoiseMute = document.querySelector('#voise_mudte_icon').classList.contains('icon-material_li_mute');
  //   if(!btnVoiseMute) {
  //     recognizer.stop();
  //     playVid(mySound);
  //   }
  //   elemScroll(selLocal);
  // }
  ///////////////////////////////////////////////////////
  //   async function waitForElement() {
  //   while (true) {
  //     // console.log('llll');
  //     const element = document.getElementById('voise_aa'+key);
  //     // console.log('#voise_aa'+key);
  //     // console.log(seler+'question'+counter);
  //     // console.log(element);
  //     if (element) {
  //       console.log('Элемент найден', element);
  //       // Далее можно выполнить действия с найденным элементом
  //       return element;
  //     }
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // Интервал проверки, в миллисекундах
  //   }
  // }
  // async function main() {
  //   var element = await waitForElement();
  //   console.log('Продолжение выполнения кода', element);
  //   let audio_butto = document.getElementById('voise_aa'+key);
  //   // Дальнейшие действия с найденным элементом
  //   // return true;
  //   // setListeerBtnPlay(audio_butto);
  //   // if (!openAll) {
  //   //   let btnVoiseMute = document.querySelector('#voise_mudte_icon').classList.contains('icon-material_li_mute');
  //   //   if(!btnVoiseMute) {
  //   //     recognizer.stop();
  //   //     playVid(mySound);
  //   //   }
  //   //   elemScroll(selLocal);
  //   // }
  // }
  // let key = counter;
  // main();


  function setListeerBtnPlay() {
    const audio_button = document.getElementById('voise_aa' + key); // console.log(key);

    if (!openAll) {
      let btnVoiseMute = document.querySelector('#voise_mudte_icon').classList.contains('icon-material_li_mute');

      if (!btnVoiseMute) {
        recognizer.stop(); //     playVid(mySound);

        mySound && pauseVid(mySound);
        mySound = new Audio(viosPath);
        playVid(mySound, audio_button);
      }
    }

    audio_button.addEventListener('click', e => {
      e.preventDefault();

      if (audio_button.classList.contains('audio_play')) {
        // mySound && mySound.pause();
        mySound && pauseVid(mySound);
        mySound = new Audio(viosPath);

        if (curtiem) {
          mySound.currentTime = curtiem;
          curtiem = null;
        }

        playVid(mySound, audio_button);
      } else {
        pauseVid(mySound, audio_button);
      }
    });
  }

  document.getElementsByClassName('progress__bar' + key)[0].addEventListener('click', setProgress); // console.log(document.getElementsByClassName('progress__bar'+key)[0]);
  // console.log('progress__bar'+key);

  setListeerBtnPlay();
};

/* harmony default export */ __webpack_exports__["default"] = (voiceQuestion);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/services/whereStCicle.js":
/*!*****************************************!*\
  !*** ./src/js/services/whereStCicle.js ***!
  \*****************************************/
/*! exports provided: pcsicle, mobailCle, CountElementIsDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pcsicle", function() { return pcsicle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mobailCle", function() { return mobailCle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountElementIsDOM", function() { return CountElementIsDOM; });
/* harmony import */ var buzz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buzz */ "./node_modules/buzz/dist/buzz.js");
/* harmony import */ var buzz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buzz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _quetionAdd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quetionAdd */ "./src/js/services/quetionAdd.js");
/* harmony import */ var _LitlModules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LitlModules */ "./src/js/services/LitlModules.js");




const pcsicle = (numberQuestion, index) => {
  console.log('вызов pcsicle');
  let count = index;

  for (count; count <= numberQuestion; count++) {
    count === numberQuestion ? Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_1__["default"])(false, false, false, false) : Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_1__["default"])(false, false, false, true);
  }

  count = null;
};

const mobailCle = (StartIndex, numberQuestion, allDowen = false) => {
  let count = 0,
      lengthIteration = numberQuestion <= 20 ? numberQuestion : 20,
      element = document.querySelector('.modals_forms'),
      selectorList = numberQuestion,
      index = 0;
  document.body.classList.add('overflowhidden');
  element.classList.add('showModal');
  console.log('count ' + count);
  console.log('lengthIteration ' + lengthIteration);
  console.log('selectorList ' + selectorList);
  console.log('StartIndex ' + StartIndex);
  console.log('numberQuestion ' + numberQuestion);
  chicle();

  function chicle() {
    console.log('вызов chicle');
    console.log(`${index} < ${lengthIteration}`);

    for (index; index < lengthIteration; index++) {
      count++; // count == selectorList?
      // setTimeout(() => {
      //   quetionAdd(false,false,false,false); //
      //   console.log('true +');
      // }, 500)
      // :
      // console.log('false -');
      // setTimeout(() => {
      //   quetionAdd(false,false,false,true);
      // }, 500)

      if (count == selectorList) {
        setTimeout(() => {
          Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_1__["default"])(false, false, false, false); //

          console.log('true +');
        }, 500);
        console.log('end in cicle');

        if (allDowen) {
          const elementList = document.querySelector('.gp_segment'),
                iconMaterialOpenAll = document.querySelector('.icon-material_gp');
          iconMaterialOpenAll.parentElement.setAttribute('data-tooltip', 'Прокрутить вниз');
          iconMaterialOpenAll.classList.add('icon-material_scrollDown'); // iconMaterialOpenAll.parentElement.dataset =

          elementList.addEventListener('click', _LitlModules__WEBPACK_IMPORTED_MODULE_2__["scrollDown"]);
        }

        document.body.classList.remove('overflowhidden');
        element.classList.remove('showModal');
        count = 0;
        return;
      } else {
        setTimeout(() => {
          Object(_quetionAdd__WEBPACK_IMPORTED_MODULE_1__["default"])(false, false, false, true);
        }, 500);
      }
    }

    if (count >= selectorList) {
      console.log('цыкл разрыв');
      count = 0;
      index = 0;
      return;
    } else {
      index = 0;
      console.log('цыкл не разрыв');
      let time3 = setTimeout(() => {
        chicle();
        clearTimeout(time3);
      }, 2500);
    }
  }
};

const CountElementIsDOM = () => {
  return document.querySelectorAll('.tinRightIn').length || 0;
};

 // const mobailCle = (StartIndex,numberQuestion) => {
//   let count = 0,
//   lengthIteration = StartIndex <= 20? StartIndex :20,
//   element = document.querySelector('.modals_forms'),
//   selectorList = numberQuestion,
//   index = 0;
//   // document.body.classList.add('overflowhidden')
//   // element.classList.add('showModal');
//   console.log('count '+count);
//   // console.log('lengthIteration '+lengthIteration);
//   // console.log('selectorList '+selectorList);
//   // console.log('index '+index);
//   // console.log('StartIndex ' +StartIndex);
//   chicle();
//   function chicle() {
//     console.log('вызов chicle');
//     console.log(`${index} < ${lengthIteration}`);
//     // console.log(lengthIteration+' '+selectorListQ); если длина меньше 20 вопросов нужно цыкл запстить на мых обороткх
//       if (lengthIteration >= StartIndex) {
//           lengthIteration = StartIndex;
//       }
//       count == selectorList?
//       setTimeout(() => {
//         quetionAdd(false,false,false,false); //
//       }, 500)
//       :
//       setTimeout(() => {
//         quetionAdd(false,false,false,true);
//       }, 500)
//       count++;
//       if(count == selectorList ){
//         // element.classList.remove('showModal');
//         // document.body.classList.remove('overflowhidden');
//         // p = 0;
//         count = 0;
//         return;
//     }
//     for ( index ; index < lengthIteration; index++) {
//         // p++;
//         count++;
//       // p == selectorList?
//       count == selectorList?
//       setTimeout(() => {
//         quetionAdd(false,false,false,false); //
//       }, 500)
//       :
//       setTimeout(() => {
//         quetionAdd(false,false,false,true);
//       }, 500)
//       // if(p == selectorListQ){
//       //   return console.log('все ребята!!!');
//       // }
//       // if(p == selectorList ){
//       if(count == selectorList ){
//           // element.classList.remove('showModal');
//           // document.body.classList.remove('overflowhidden');
//           // p = 0;
//           count = 0;
//           return;
//       }
//     }
//     // if(p >= selectorList) {
//     if(count >= selectorList) {
//       // console.log('цыкл разрыв');
//       // console.log(p);
//       // element.classList.remove('showModal');
//       // document.body.classList.remove('overflowhidden');
//       // console.log(p);
//       // console.log('все ребята!!!');
//       // p = 0;
//       count = 0;
//       index = 0;
//       return;
//     } else {
//       index = 0;
//       //   console.log('цыкл не разрыв');
//       let time3 = setTimeout(() => {
//         chicle();
//         clearTimeout(time3);
//       }, 2500);
//     }
//   }
// }

/***/ }),

/***/ "./src/js/services/whereSteyFunc.js":
/*!******************************************!*\
  !*** ./src/js/services/whereSteyFunc.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _quetionAdd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quetionAdd */ "./src/js/services/quetionAdd.js");
/* harmony import */ var _LitlModules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LitlModules */ "./src/js/services/LitlModules.js");
/* harmony import */ var _changeLevel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changeLevel */ "./src/js/services/changeLevel.js");
/* harmony import */ var _whereStCicle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./whereStCicle */ "./src/js/services/whereStCicle.js");





let clx = 0;

const whereSteyFunc = (e, selectorListQ, p) => {
  // try {
  e.preventDefault();
  const sel = localStorage.getItem('WhereStayUser');
  console.log(sel);

  if (!sel) {
    //сделать уведомления с надписью "я не знаю где ты остановился"
    return Object(_LitlModules__WEBPACK_IMPORTED_MODULE_2__["openTextUserError"])('notInfoWheyStay', 'я не знаю где ты остановился');
  } // если вопрос уже существует просто долистаем до нее


  const selen = document.querySelector('.' + sel);

  if (selen) {
    return selen.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  } // if (sel) {


  const selectorQuestionLevel = sel.replace(/(question)(\d)+/, ''); // узнаю к какой группе вопрос принадлежит

  const numberQuestion = sel.replace(/(tick|cross|heart|flower)(question)/, '') - 1,
        body = document.body,
        html = document.documentElement,
        width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth); // номер вопроса

  let selectorQuestionopen;
  console.log(selectorQuestionLevel); // существуют ли вопросы

  const selectorQues = document.querySelector(`.wrapper`); // есть? да значит смотрим что вопросы с какой группы сущесвтуют : вопроов нету

  selectorQues ? selectorQuestionopen = selectorQues.classList[1].replace(/(question)(\d)+/, '') : selectorQuestionopen = null; // с какого вопроса начать

  let index = document.querySelectorAll('.tinRightIn').length || 0; // if(selectorQuestionopen === selectorQuestionLevel){
  //   console.log('нажимать на изменения урвоня нет смысла!');
  // }
  // console.log(`${selectorQuestionopen} !== ${selectorQuestionLevel} || !${selectorQuestionopen}`);

  if (selectorQuestionopen !== selectorQuestionLevel || !selectorQuestionopen) {
    // console.log('переклюать нужно для мобилок iphone!');
    //    window.quetiAddn = true;
    Object(_changeLevel__WEBPACK_IMPORTED_MODULE_3__["default"])(document.querySelector('.' + selectorQuestionLevel), selectorListQ, document.querySelectorAll('.button'));

    if (global.mobaleMOde && width <= 775) {
      if (numberQuestion === 0) return; // если нужно запустить первый ворос то он и так сгенерируется

      let timeset = setTimeout(() => {
        index = Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["CountElementIsDOM"])(); // index = document.querySelectorAll('.tinRightIn').length||0;

        Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["mobailCle"])(index, numberQuestion);
        console.log('Цыкл для mobail!');
        clearTimeout(timeset);
      }, 800);
    } else {
      let timeset = setTimeout(() => {
        index = Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["CountElementIsDOM"])();
        Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["pcsicle"])(numberQuestion, index);
        clearTimeout(timeset);
      }, 800);
      console.log('Цыкл для PC!');
    }
  } else {
    console.log('переключать не нужно '); //  index = document.querySelectorAll('.tinRightIn').length-1;

    index = Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["CountElementIsDOM"])();
    global.mobaleMOde && width <= 775 ? Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["mobailCle"])(numberQuestion, index, p) : Object(_whereStCicle__WEBPACK_IMPORTED_MODULE_4__["pcsicle"])(numberQuestion, index, p);
  } //  } catch (error) {console.error(error); }

};

/* harmony default export */ __webpack_exports__["default"] = (whereSteyFunc);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/services/widjetCircolLev.js":
/*!********************************************!*\
  !*** ./src/js/services/widjetCircolLev.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import dbArr from '../db/dbArr.json'
let selector = null;
const obj = {
  tickquestion: 0,
  crossquestion: 0,
  heartquestion: 0,
  flowerquestion: 0
};

const widjetCircolLev = (sel, p = false) => {
  // const btns = document.querySelectorAll('.startPage')
  if (sel) {
    selector = sel;
  }

  if (sel === null) {
    console.log('sel null === !');
  } //получить все значений нужной мне колонки и сделать подсчет строк


  let db = window.dbasce; // console.log(db);

  if (document.querySelector('.tinRightIn')) {
    switch (selector + 'question') {
      case 'tickquestion':
        // console.log('tickquestion 1');
        portDB('tickquestion', true);
        break;

      case 'crossquestion':
        // console.log('crossquestion 2');
        portDB('crossquestion', true);
        break;

      case 'heartquestion':
        // console.log('heartquestion 3');
        portDB('heartquestion', true);
        break;

      case 'flowerquestion':
        // console.log('flowerquestion 4');
        portDB('flowerquestion', true);
        break;
    }
  } else {
    portDB('tickquestion', true);
    portDB('crossquestion', true);
    portDB('heartquestion', true);
    portDB('flowerquestion', true);
  }

  if (p) {
    portDB('tickquestion', true);
    portDB('crossquestion', true);
    portDB('heartquestion', true);
    portDB('flowerquestion', true);
  }

  function portDB(params, start = false) {
    // console.log(params);
    let transaction = db.transaction([params], 'readonly');
    let store = transaction.objectStore(params);
    let p = store.getAll();

    p.onsuccess = function () {
      let arr = p.result.length; // arr
      // console.log(params);

      if (start) {
        // console.log(obj);
        obj[p.source.name] = arr; // console.log(obj);
      }

      name();
      db = null;
      transaction = null;
      p = null;
      store = null;
    };
  } // 2 / 10 * 100 = 2


  function name() {
    document.querySelectorAll('.startPage').forEach(item => {
      // console.dir(item);
      let selectbivider,
          localSel = item.classList[2];

      switch (localSel) {
        case 'tick':
          // selectbivider = dbArr['styles'][0].length;
          selectbivider = window.objectAllCor[localSel]; // console.log(selectbivider);

          break;

        case 'cross':
          // selectbivider = dbArr['styles'][1].length;
          selectbivider = window.objectAllCor[localSel]; // console.log(selectbivider);

          break;

        case 'heart':
          // selectbivider = dbArr['styles'][2].length;
          selectbivider = window.objectAllCor[localSel]; // console.log(selectbivider);

          break;

        case 'flower':
          // selectbivider = dbArr['styles'][3].length;
          selectbivider = window.objectAllCor[localSel]; // console.log(selectbivider);

          break;
      }

      let counterProcent = Math.round(obj[item.classList[2] + 'question'] / selectbivider * 100);
      item.textContent = counterProcent + '%';
      item.style.setProperty('--pie-p', counterProcent + '%');
      localSel = null;
    }); // console.timeEnd('ti');
  }
};

/* harmony default export */ __webpack_exports__["default"] = (widjetCircolLev);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map