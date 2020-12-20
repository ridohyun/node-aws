$(document).ready(function(){
    $("#about").on('click',function(e){
        $("aside>div").animate( {
        left: '0'
      });
      $("#close_about").animate( {
        left: '97vw'
      });
    });
    $("#close_about").on('click',function(e){
        $("aside>div").animate( {
        left: '-100vw'
      });
      $(this).animate( {
        left: '-97vw'
      });
    });
});