/**
 * Created by gilbertor on 3/31/16.
 */
var connected = false;
var dnsDone = false;
var pingDone = false;
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
  $('#netInfoLed').html('<div class="' + setConnectionState(states[networkState]) + '"></div>');
}
function closeApp() {
  navigator.app.exitApp();
}
function getRequest() {
  if (!connected) {
    var url = "https://toolbox.cloudstaff.com/~noc-display/test.txt";
    var settingsUrl = window.localStorage.getItem("url");
    if (settingsUrl) {
      url = settingsUrl;
    }
    cordovaHTTP.setHeader("Access-Control-Allow-Origin", "*");
    cordovaHTTP.get(url, {}, {}, function (response) {
      $('#httpResult').html(response.data);
      $('#httpLed').html('<div class="led-green"></div>');
      $('#isConnected').html('<span class="green-text">Connected</span>');
      networkinterface.getIPAddress(function (ip) {
        $('#ip-address').html(ip);
      });
      window.MacAddress.getMacAddress(
        function (macAddress) {
          $('#mac-address').html(macAddress);
        }, function (fail) {
          $('#mac-address').html(fail);
        }
      );
      $('#network-status').html('On-Line');
      connected = true;
    }, function (response) {

      $('#httpResult').html(response.error);
      $('#httpLed').html('<div class="led-red"></div>');
      $('#isConnected').html('<span class="red-text">Please connect to the internet</span>');
      connected = false;
      if (response.status) {
        if (response.status == '302') {
          $('#isConnected').html('<span class="red-text">Request Has Been redirected to a different url</span>');
        }
        connected = true;
      }
    });
  }
}
function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function getDns(url) {
  cordova.plugins.dns.resolve(url, function (ip) {
    if (ip) {
      $('#led-dns').html('<div class="led-green"></div>');
      $('#status-dns').html('<strong class="green-text text-darken-3">Resolved</strong>');
      $('#dns').html('<strong class="green-text text-darken-3">Resolved</strong>');
    }
    $('#ip-dns').html('<strong class="green-text text-darken-3">' + ip + '</strong>');
    $('#target-dns').html('<strong class="green-text text-darken-3">' + url + '</strong>');


  });
}
function updateUi() {
  intervalID = setInterval(function () {
    checkConnection();
    getRequest();
    if (connected) {
      if (!pingDone) {
        var pingTarget = '8.8.8.8';
        var settingsPingTarget = window.localStorage.getItem("ping-target");
        if (settingsPingTarget) {
          pingTarget = settingsPingTarget;
        }
        ping(pingTarget, 'ping');
        pingDone = true;
      }
      if (!dnsDone) {
        getDns(makeid() + '.cloudstaff.io');
        dnsDone = true;
      }
    }
  }, 100);
}
function setLed(target, result) {
  var speed = '<strong class="yellow-text text-darken-3">Slow</strong>';
  if (result) {
    result = parseInt(result);
    if (result < 50) {
      speed = '<strong class="green-text">Fast</strong>';
      $('#led-' + target).html('<div class="led-green"></div>');

    }
    if (result < 100) {
      speed = '<strong class="blue-text">OK</strong>';
      $('#led-' + target).html('<div class="led-blue"></div>');

    }
    if (result < 100) {
      speed = '<strong class="yellow-text text-darken-3">Slow</strong>';
      $('#led-' + target).html('<div class="led-yellow"></div>');

    }
    $('#' + target).html(speed);
  } else {
    $('#' + target).html('<strong class="red-text text-darken-3">Timeout</strong>');
  }

}
function ping(url, target) {
  var p, success, err, ipList;
  ipList = [url];
  success = function (results) {
    if (results[0]) {
      $('#target-' + target).html(results[0].target);
      $('#ave-' + target).html(results[0].avg);
      $('#status-' + target).html(results[0].status);
      setLed(target, results[0].avg)
    }


  };
  err = function (e) {
    $('#' + target).html(e);
  };
  p = new Ping();
  p.ping(ipList, success, err);
}
function initializeApp() {
  $(".button-collapse").sideNav();
  $('#exit-app').click(function () {
    closeApp();
  });
}