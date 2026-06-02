(function (global) {
  var version = new Date().getTime();

  global.IP_VERSION = version;

  function withVersion(url) {
    if (!url || /^https?:\/\//i.test(url) || url.indexOf("//") === 0) {
      return url;
    }
    var base = url.split("?")[0];
    return base + "?v=" + version;
  }

  global.ipVersionLocalAsset = withVersion;

  global.ipLoadScript = function (src) {
    var script = document.createElement("script");
    script.src = withVersion(src);
    script.async = false;
    document.head.appendChild(script);
    return script;
  };

  global.ipLoadStylesheet = function (href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = withVersion(href);
    document.head.appendChild(link);
    return link;
  };
})(window);
