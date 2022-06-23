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
        $("#orderpopup").popup({
            closeelement: "span.close",
        }).popup("show")
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

})