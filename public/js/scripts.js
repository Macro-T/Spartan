(function() {
  'use strict';
  $(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.dropdown-button').dropdown({hover:false});
    $('.dropdown-trigger').dropdown();
    $('.button-collapse').sideNav();
  });
})();
