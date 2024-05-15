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

    $("#section-easy nav .for_users").click(function(){
        $(this).closest(".inner").removeClass("for_business").addClass("for_users")
    })
    $("#section-easy nav .for_business").click(function(){
        $(this).closest(".inner").removeClass("for_users").addClass("for_business")
    })

    $("#order").click(function(e){
        //$("#orderpopup").popup({closeelement: "span.close",}).popup("show")
        $("#contactuspopup").popup({closeelement:".close"}).popup("show");
        e.preventDefault()
        return false;
    })


    $.validator.methods.matches = function( value, element, params ) {
        return this.optional( element ) || (new RegExp( params )).test( value );
    }
    let phoneErrorMessage = "Please enter a valid phone number";
    if(document.location.href.indexOf("/ru/") !== -1){
        phoneErrorMessage = "Некорректный формат номера телефона";
    }else if(document.location.href.indexOf("/uk/") !== -1){
        phoneErrorMessage = "Некоректний формат номера телефону";
    }else if(document.location.href.indexOf("/by/") !== -1){
        phoneErrorMessage = "Некарэктны фармат нумара тэлефона";
    }
    $("#orderpopup form").validate({
        rules: {
            phone: {
                matches: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            }
        },
        messages: {
            phone: phoneErrorMessage,
        }
    });


    $(".contactus").click(function(e){
        $("#contactuspopup").popup({closeelement:".close"}).popup("show");
        e.preventDefault()
        return false;
    })
    if( $("#contactuspopup").length > 0) {
        $("#contactuspopup form").validate({
            errorPlacement: function(error, element) {
                if( $(element).closest(".line").length > 0 ){
                    error.appendTo($(element).closest(".line"));
                }else{
                    error.insertAfter(element);
                }
            }
        });
    }
    if( $("#contactusfrm").length > 0) {
        $("#contactusfrm").validate({
            errorPlacement: function(error, element) {
                if( $(element).closest(".line").length > 0 ){
                    error.appendTo($(element).closest(".line"));
                }else{
                    error.insertAfter(element);
                }
            }
        });
    }

    if(window.Swiper) {
        const services = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 0,
            loop: true,


            autoplay: {
                delay: 3500,
                pauseOnMouseEnter: true,
            },

        });
    }

    function getUrlVars(url) {
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    }
    function getYouTubeCode(url){
        let t = getUrlVars(url)["t"];
        let start = "";
        if(t){
            start = "?start=" + parseInt( t )
        }
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] + start : false;
    }
    $("a.video").click(function(e){
        if( $("#videopopup").length == 0 ){
            $("body").append(
                '<div id="videopopup" class="popup"><span class="close">x</span><div class="inner"></div></div>'
            )
            $("#videopopup").popup({
                closeelement: ".close",
                onclose: function(){
                    $("#videopopup .inner").html("");
                }
            });
        }
        $("#videopopup .inner").html( '<iframe src="https://www.youtube.com/embed/' + getYouTubeCode($(this).attr("href")) + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' )
        $("#videopopup").popup("show");

        e.preventDefault()
        return false;
    })

})