// Add OneSignal ony when service worekr is in browser
if ('serviceWorker' in navigator) {
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function () {
    OneSignal.init({
      appId: '396278aa-a2ed-4602-af64-a6311c0e4230'
    });
  });
}

//  returns version of IE or false, if browser is not Internet Explorer
function detectIE () {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // const edge = ua.indexOf('Edge/');
  // if (edge > 0) {
  //   // Edge (IE 12+) => return version number
  //   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  // }

  // other browser
  return false;
}

window.addEventListener('load', function () {
  if (detectIE() !== false) {
    document.querySelector('body').innerHTML = '<div class="IE-warning">Ta aplikacja nie obsługuje przeglądarki Internet Explorer 11 i starszych:(</div>';
  }
});
