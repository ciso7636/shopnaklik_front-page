import "../style/style.less";
import Scroll from "./scroll/scroll";
import Auth from "./auth";

Scroll.scrollHeader();
Scroll.scrollNavigate();

Scroll.scrollDesignMonitor();
Scroll.scrollDesignDescription();
Scroll.scrollSliderDesignMonitor();

Scroll.scrollBuildMonitor();
Scroll.scrollBuildDescription();
Scroll.scrollSliderBuildMonitor();

Scroll.scrollLaunchMonitor();
Scroll.scrollLaunchDescription();
Scroll.scrollSliderLaunchMonitor();

Scroll.scrollContentFormAutoTop();
Scroll.scrollLaunchMonitorDuplicateSlideLeft();

document.addEventListener("DOMContentLoaded", function() {
  Auth.onAuthStateChanged();
  Auth.signUp();
  Auth.logout();
  Auth.login();

  $('a[data-target="modal-signup"]').click(function() {
    $("#modal-signup").modal({
      show: true,
      escapeClose: false,
      clickClose: false
    });
  });

  $('a[data-target="modal-login"]').click(function() {
    $("#modal-login").modal({
      show: true,
      escapeClose: false,
      clickClose: false
    });
  });

  $('a[data-target="modal-account"]').click(function() {
    $("#modal-account").modal({
      show: true,
      escapeClose: false,
      clickClose: false
    });
  });

  $('a[data-target="modal-create"]').click(function() {
    $("#modal-create").modal({
      show: true,
      escapeClose: false,
      clickClose: false
    });
  });

});
