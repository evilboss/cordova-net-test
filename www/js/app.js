/**
 * Created by gilbertor on 3/17/16.
 */
function setConnectionState(connectionType) {
  if (connectionType === 'WiFi connection') {
    return 'led-green'
  }
  if (connectionType === 'Cell 4G connection') {
    return 'led-blue'
  }
  if (connectionType === 'Cell 3G connection') {
    return 'led-yellow'
  } else {
    return 'led-red';
  }
}
function checkConnection() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.CELL] = 'Cell generic connection';
  states[Connection.NONE] = 'No network connection';
  $('#netInfo').html(states[networkState]);
  $('#netInfoLed').addClass(setConnectionState(states[networkState]));
}
function closeApp() {
  navigator.app.exitApp();
}
function getRequest() {
  var url = "https://toolbox.cloudstaff.com/~noc-display/test.txt";
  cordovaHTTP.setHeader("Access-Control-Allow-Origin", "*");
  cordovaHTTP.get(url, {}, {}, function (response) {
    $('#httpResult').html(response.data);
    $('#httpLed').addClass('led-green');

  }, function (response) {
    $('#httpResult').html(response.error);
    $('#httpLed').addClass('led-red');
  });

}
function updateUi() {
  intervalID = setInterval(function () {
    getRequest();
    checkConnection();
    ping('github.com', 'ping');
    ping('8.8.8.8', 'dns');
  }, 100);
}
function setLed(target,result){

}
function ping(url, target) {
  var p, success, err, ipList;
  ipList = [url];
  success = function (results) {
    $('#' + target).html(JSON.stringify(results));

  };
  err = function (e) {
    $('#' + target).html(e);
  };
  p = new Ping();
  p.ping(ipList, success, err);
}

function init() {
  $("#exit-app").click(function () {
    closeApp();
  });

  updateUi();
}


document.addEventListener("deviceready", init, false);