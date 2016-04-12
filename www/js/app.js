/**
 * Created by gilbertor on 3/17/16.
 */
function init() {
  initializeApp();
  $('#reload').click(function(){
    window.location.reload(true);
  });
  $('.modal-trigger').leanModal();
  updateUi();
}
document.addEventListener("deviceready", init, false);