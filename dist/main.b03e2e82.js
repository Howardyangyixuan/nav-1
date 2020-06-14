// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList"); //   const $last = $(".last");

var $last = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: "A",
  logoType: "Text",
  url: "https://developer.mozilla.org"
}, {
  logo: "W",
  logoType: "Text",
  url: "https://www.w3.org"
}, {
  logo: "I",
  logoType: "Text",
  url: "https://www.iconfont.cn/"
}, {
  logo: "B",
  logoType: "Text",
  url: "https://www.bootcdn.cn/"
}, {
  logo: "D",
  logoType: "Text",
  url: "https://dribbble.com/"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
}; //a标签跳转<a href="${node.url}"></a>，改为js实现跳转


var renderEach = function renderEach(node, index) {
  //   console.log(index);
  var $li = $("<li>\n    <div class=\"site\">\n        <div class=\"logo\">".concat(node.logo, "</div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        <div class=\"close\"> \n         <svg class=\"icon\" aria-hidden=\"true\">\n          <use xlink:href=\"#icon-close\"></use>\n         </svg>\n        </div>\n    </div>\n    </li>"));
  $li.insertBefore($last);
  $li.on("click", function () {
    //新开窗口
    if (is_touch_device()) {
      console.log("是触屏设别");
      window.location.href = node.url;
    } else {
      window.open(node.url);
    }
  });
  $li.on("click", ".close", function (e) {
    e.stopPropagation();
    hashMap.splice(index, 1);
    render(); // console.log(index);
  });
};

var render = function render() {
  $siteList.find("li:not(.last").remove();
  hashMap.forEach(renderEach);
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入要添加的网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  var simpleUrl = simplifyUrl(url);
  hashMap.push({
    logo: simpleUrl[0].toUpperCase(),
    logoType: "Text",
    url: url
  });
  console.log(url);
  render(); //   console.log($siteList);
  //   const $site = $(`<li>
  //     <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${simpleUrl[0].toUpperCase()}</div>
  //       <div class="link">${simpleUrl}</div>
  //     </div>
  //   </a>
  //   </li>`).insertBefore($last);
});

window.onbeforeunload = function () {
  //   console.log("关闭");
  var string = JSON.stringify(hashMap); //   console.log(typeof hashMap);
  //   console.log(hashMap);
  //   console.log(typeof string);
  //   console.log(string);

  window.localStorage.setItem("x", string);
};

$(document).on("keypress", function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.location.href = hashMap[i].url;
      break;
    }
  }
});

function is_touch_device() {
  var bool;

  if ("ontouchstart" in window) {
    return true;
  } else {
    return false;
  }
} // $(".info >.text").on("click", (e) => {});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.b03e2e82.js.map