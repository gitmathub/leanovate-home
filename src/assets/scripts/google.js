
// Global site tag (gtag.js) - Google Ads: 1071340456 

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'AW-1071340456');

// Event snippet for Buchungsanfrage Corona conversion page 
// In your html page, add the snippet and call gtag_report_conversion
// when someone clicks on the chosen link or button. -->

function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof (url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-1071340456/1Y3SCL636owCEKi37f4D',
    'event_callback': callback
  });
  return false;
}