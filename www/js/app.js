/**
 * Created by gilbertor on 3/17/16.
 */
function closeApp() {
  navigator.app.exitApp();
}
function updateUi() {
  intervalID = setInterval(function () {
      getRequest();
  }, 5000);
}
function getRequest() {
  var url = "https://toolbox.cloudstaff.com/~noc-display/test.txt";
  cordovaHTTP.setHeader("Access-Control-Allow-Origin", "*");
  var result;
  cordovaHTTP.get(url, {}, {}, function (response) {
    $('#httpResult').html(response.data);
  }, function (response) {
    $('#httpResult').html(response.error);
  });

}
function ping(){

}
function init() {
  $("#exit-app").click(function () {
    closeApp();
  });
  updateUi();
}
document.addEventListener("deviceready", init, false);