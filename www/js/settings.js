/**
 * Created by gilbertor on 3/31/16.
 */
function validateIPaddress(ipaddress) {
  if (ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    alert("You have entered an invalid IP address!")
    return (false)
  }
  alert('You need to enter an IP address!');

}
function isValidURL(url) {
  if (url) {
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (RegExp.test(url)) {
      return true;
    } else {
      return false;
    }
  }
  alert('You need to enter a valid URL');
}
function resolveURL(url) {
  if (url) {
    if (url.indexOf('http://') >= 0) {
      return url;
    }
    url = 'http://' + url;
    return url;
  }
}
function isLongText(length, string) {
  if (string.length > length) {
    return '...';
  }
  return '';

}

function setInputValues() {
  $('#ping-target').val(getPingTarget());
  $('#http-target').val(getSettingsUrl());
}
function setFormValues() {
  var length = 32;

  $('#ping-value').html(getPingTarget().substring(0, length) + isLongText(length, getPingTarget()));
  $('#http-value').html(getSettingsUrl().substring(0, length) + isLongText(length, getSettingsUrl()));
  setInputValues();
  $('#settings-modal').closeModal();
}
function init() {
  initializeApp();
  $("#settings-form").submit(function (e) {
    var settingsSaved = false;
    var getTarget = $('#http-target').val();
    getTarget = resolveURL(getTarget);
    var pingTarget = $('#ping-target').val();
    if (pingTarget) {
      if (validateIPaddress(pingTarget)) {
        window.localStorage.setItem("ping-target", pingTarget);
        $('#ping-target').val('');
        settingsSaved = true;
      } else {
        alert('Target is not a valid ip address');
      }
    }
    if (getTarget) {
      if (isValidURL(getTarget)) {
        window.localStorage.setItem("url", getTarget);
        $('#http-target').val('');
        settingsSaved = true;
      } else {

        alert('Not a valid URL');
      }

    }
    if (settingsSaved) {
      alert('Setting Saved');
    }

    setFormValues();

    e.preventDefault();
  });
  $('#reset').click(function (e) {
    var settingsUrl = window.localStorage.getItem("url");
    var pingTarget = window.localStorage.getItem("ping-target");
    if (settingsUrl) {
      window.localStorage.removeItem("url");
    }
    if (pingTarget) {
      window.localStorage.removeItem("ping-target");
    }

    setFormValues();

    alert('Settings Restored');
  });
  $('.modal-trigger').leanModal();
  $(".settings-input").focusout(function (e) {
    if (!e.currentTarget.value) {
      setInputValues();
    }

  });

  setFormValues();
}
document.addEventListener("deviceready", init, false);