(function($){
  $(function(){
      $(".button-collapse").sideNav();
    $("#includedNavBar").load("html/navigation.html");
      $("#includeMainContent").load("html/mainContentMC.html");
    $("#includedFooter").load("html/footer.html");
    $('.collapsible').collapsible();
  }); // end of document ready
})(jQuery); // end of jQuery name space