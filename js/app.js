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
    $("#section-tarrifs .select").click(function(){
        switch ($(this).attr("data-tarrif")) {
            case "start":
                $("#contactus-supportpopup #tarrif-start").prop("checked", true);
                $("#contactus-supportpopup #tarrif-standard").prop("checked", false);
                $("#contactus-supportpopup #tarrif-premium").prop("checked", false);
                break;
            case "standard":
                $("#contactus-supportpopup #tarrif-start").prop("checked", false);
                $("#contactus-supportpopup #tarrif-standard").prop("checked", true);
                $("#contactus-supportpopup #tarrif-premium").prop("checked", false);
                break;
            case "premium":
                $("#contactus-supportpopup #tarrif-start").prop("checked", false);
                $("#contactus-supportpopup #tarrif-standard").prop("checked", false);
                $("#contactus-supportpopup #tarrif-premium").prop("checked", true);
                break;
            default:
                $("#contactus-supportpopup #tarrif-start").prop("checked", true);
                $("#contactus-supportpopup #tarrif-standard").prop("checked", true);
                $("#contactus-supportpopup #tarrif-premium").prop("checked", true);
        }

        $("#contactus-supportpopup").popup({closeelement:".close"}).popup("show");
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


    $(".contactus, #contactus").click(function(e){
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
    function getYouTubeCode(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    function getDzenCode(url){
        return url;
    }
    function getVKCode(url){
        if(getUrlVars(url)["z"]) {
            let vals = getUrlVars(url)["z"].substring(5).split("_");
            return "oid=" + vals[0] + "&id=" + vals[1];
        }
        //example: https://vk.com/video870533294_456239048
        url = url.substring(url.indexOf("video") + 5);
        let vals = url.split("_");
        return "oid=" + vals[0] + "&id=" + vals[1];
    }
    $(document).on("click", "#videopopup .c", function(e){
        $(this).closest("span.notice").hide();
    })
    $(document).on("click", "a.v, a.video, a.youtube, a.dzen, a.vk", function(e){
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
        let _html = "";
        if($(this).attr("alt-youtube") || $(this).attr("alt-dzen") || $(this).attr("alt-vk")){
            _noticeHTML = '<span class="notice"><em class="c" title="Скрыть">x</em>Медленно работает видео? Смотреть в';
            if($(this).attr("alt-youtube")){
                _noticeHTML += ' <a href="' + $(this).attr("alt-youtube") + '" class="youtube">YouTube</a>'
            }
            if( $(this).attr("alt-dzen") ){
                let _id = "";
                if( $(this).attr("data-id") ){
                    _id = $(this).attr("data-id")
                }else {
                    _id = $(this).closest(".video-wrapper").find(".dzen").attr("data-id")
                }

                if(_id) {
                    _noticeHTML += ' <a href="' + $(this).attr("alt-dzen") + '" data-id="' + _id + '" class="dzen">Дзен</a>'
                }
            }
            if($(this).attr("alt-vk")){
                _noticeHTML += ' <a href="' + $(this).attr("alt-vk") + '" class="vk">ВК</a>'
            }
            _noticeHTML += "</span>"

            _html += _noticeHTML;
        }

        $("#videopopup").removeClass("video-dzen").removeClass("video-vk").removeClass("video-youtube")
        if($(this).is(".dzen")){
            $("#videopopup").addClass("video-dzen")
            _html += '<iframe src="https://dzen.ru/embed/' + getDzenCode($(this).attr("data-id")) + '?mute=0&autoplay=1&tv=0" allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media" frameborder="0" scrolling="no" allowfullscreen></iframe>';
        }else if($(this).is(".vk")){
            $("#videopopup").addClass("video-vk")
            _html += '<iframe src="https://vk.com/video_ext.php?' + getVKCode($(this).attr("href")) + '&autoplay=1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>';
        }else{//by default it is youtube video
            //$("#videopopup").addClass("video-youtube")
            _html += '<iframe src="https://www.youtube.com/embed/' + getYouTubeCode($(this).attr("href")) + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }

        $("#videopopup .inner").html( _html )
        $("#videopopup").popup("show");

        e.preventDefault()
        return false;
    })

    if( $(".commits").length > 0 ) {

        //Extract the date from a GitHub datetime string
        function extractDateTime(str) {
            var strSplit = str.split(/-|T|:/);
            return strSplit[2] + '.' + strSplit[1] + '.' + strSplit[0];
        }

        $.ajax({
            'url': $(".commits").attr("data-url"),//'https://api.github.com/repos/lsfusion-solutions/mycompany/commits',
            'type': 'GET',
            'success': function (data) {
                $(".commits").html("");

                for (var i in data) {
                    $(".commits").append("<p><em>" + data[i].committer.login + "</em> <date>" + extractDateTime(data[i].commit.committer.date) + "</date>: <strong>" + data[i].commit.message + "</strong></p>");
                }
            }
        });
    }

})