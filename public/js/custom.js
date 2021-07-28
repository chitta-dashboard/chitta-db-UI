$(document).ready(function () {
  $("input,textarea").on("keydown", function (event) {
    if (event.which == 121) {
      $(this).toggleClass("tamil");
      return false;
    }
    if ($(this).hasClass("tamil")) {
      // toggleKBMode(event);
      convertThis(event);
      return true;
    } else {
      return true;
    }
  });
  $("input,textarea").on("keypress", function (event) {
    if ($(this).hasClass("tamil")) {
      convertThis(event);
      return true;
    }
  });
});
