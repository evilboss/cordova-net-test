/**
 * Created by gilbertor on 3/31/16.
 */
var connected = false;
var httpDone = false;
var pingDone = false;
var tested = false;
function getSettingsUrl() {
  var url = "https://toolbox.cloudstaff.com/~noc-display/test.txt";
  var settingsUrl = window.localStorage.getItem("url");
  if (settingsUrl) {
    url = settingsUrl;
  }
  return url;
}
function getPingTarget() {
  var pingTarget = '8.8.8.8';
  var settingsPingTarget = window.localStorage.getItem("ping-target");
  if (settingsPingTarget) {
    pingTarget = settingsPingTarget;
  }
  return pingTarget;
}
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
  var url = getSettingsUrl();
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
  }, function (response) {
    $('#httpResult').html(response.error);
    $('#httpLed').html('<div class="led-red"></div>');
    $('#isConnected').html('<span class="red-text">Please connect to the internet</span>');
    if (response.status) {
      if (response.status == '302') {
        $('#isConnected').html('<span class="red-text">Request Has Been redirected to a different url</span>');
      }
    }
  });
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
      connected = true;

    }
    $('#ip-dns').html('<strong class="green-text text-darken-3">' + ip + '</strong>');
    $('#target-dns').html('<strong class="green-text text-darken-3">' + url + '</strong>');
  });
}
function stopLoading() {
  showToast('Finished Test', '#000000');
  $('#spinner-container').html('');
  tested = true;

}
function setLed(target, result) {
  var speed = '<strong class="yellow-text text-darken-3">Slow</strong>';
  if (result) {
    result = parseInt(result);
    if (result >= 30) {
      speed = '<strong class="green-text">Super Fast</strong>';
      $('#led-' + target).html('<div class="led-green"></div>');
    }
    else if (result < 100) {
      speed = '<strong class="blue-text">Fast</strong>';
      $('#led-' + target).html('<div class="led-blue"></div>');
    }
    else if (result < 200) {
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
  $('.button-collapse').sideNav();
  $('#exit-app').click(function () {
    closeApp();
  });
}
function showToast(message, status) {
  window.plugins.toast.showWithOptions({
    message: message,
    duration: 'short', // 2000 ms
    position: 'center',
    styling: {
      //  opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: status, // make sure you use #RRGGBB. Default #333333
      // textColor: '#FFFF00', // Ditto. Default #FFFFFF
      cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      // horizontalPadding: 20, // iOS default 16, Android default 50
      //   verticalPadding: 16 // iOS default 12, Android default 30
    }
  });

}

function updateUi() {
  intervalID = setInterval(function () {
    checkConnection();
    if (!connected) {
      getDns(makeid() + '.cloudstaff.io');
    }


    if (connected) {
      if (!pingDone) {
        var pingTarget = getPingTarget();
        ping(pingTarget, 'ping');
        pingDone = true;
      }
      if (!httpDone) {
        getRequest();

        httpDone = true;
      }
      if (httpDone && pingDone) {
        if (!tested) {
          stopLoading();
        }

      }
    }
  }, 100);
}
