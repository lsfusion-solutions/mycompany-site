$(document).ready(function() {
    $(document).click(function(e){

        let target = e.target;

        if( $(target).is(".language") || $(target).closest(".language").size() > 0 ){
            $("div.language").toggleClass("active");
        }else{
            $("div.language").removeClass("active");
        }
    })
    $(".menu-link").click(function(e){$(this).toggleClass("active");e.preventDefault()})
    $("#section-work nav .for_developers").click(function(){
        $(this).closest(".inner").removeClass("for_administrators").addClass("for_developers")
    })
    $("#section-work nav .for_administrators").click(function(){
        $(this).closest(".inner").removeClass("for_developers").addClass("for_administrators")
    })
})