$(window).load(function () {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function () {
    let vw;

    // Resize event for balloon positioning
    $(window).resize(function () {
        vw = $(window).width() / 2;
        $('#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9').stop();
        $('#b11').animate({ top: 240, left: vw - 350 }, 500);
        $('#b22').animate({ top: 240, left: vw - 250 }, 500);
        $('#b33').animate({ top: 240, left: vw - 150 }, 500);
        $('#b44').animate({ top: 240, left: vw - 50 }, 500);
        $('#b55').animate({ top: 240, left: vw + 50 }, 500);
        $('#b66').animate({ top: 240, left: vw + 150 }, 500);
        $('#b77').animate({ top: 240, left: vw + 250 }, 500);
        $('#b88').animate({ top: 240, left: vw + 350 }, 500);
        $('#b99').animate({ top: 240, left: vw + 450 }, 500);
    });

    // Button event handlers
    $('#turn_on').click(function () {
        $('.bulb').addClass('bulb-glow');
        $('body').addClass('pink');
        $(this).fadeOut('slow').delay(5000).promise().done(function () {
            $('#play').fadeIn('slow');
        });
    });

    $('#play').click(function () {
        const audio = $('.song')[0];
        audio.play().catch(error => console.error("Audio playback failed: ", error));
        $('.bulb').addClass('bulb-glow-after');
        $('body').addClass('pink-after');
        $(this).fadeOut('slow').delay(6000).promise().done(function () {
            $('#bannar_coming').fadeIn('slow');
        });
    });

    $('#bannar_coming').click(function () {
        $('.bannar').addClass('bannar-come');
        $(this).fadeOut('slow').delay(6000).promise().done(function () {
            $('#balloons_flying').fadeIn('slow');
        });
    });

    // Balloon animation functions
    function animateBalloon(balloonId) {
        const randleft = 1000 * Math.random();
        const randtop = 500 * Math.random();
        $(balloonId).animate({ left: randleft, bottom: randtop }, 10000, function () {
            animateBalloon(balloonId);
        });
    }

    $('#balloons_flying').click(function () {
        $('.balloon-border').animate({ top: -0 }, 8000);
        $('#b1, #b4, #b5, #b7, #b9').addClass('balloons-rotate-behaviour-one');
        $('#b2, #b3, #b6, #b8').addClass('balloons-rotate-behaviour-two');
        ['#b1', '#b2', '#b3', '#b4', '#b5', '#b6', '#b7', '#b8', '#b9'].forEach(animateBalloon);
        $(this).fadeOut('slow').delay(5000).promise().done(function () {
            $('#cake_fadein').fadeIn('slow');
        });
    });

    $('#cake_fadein').click(function () {
        $('.cake').fadeIn('slow');
        $(this).fadeOut('slow').delay(3000).promise().done(function () {
            $('#light_candle').fadeIn('slow');
        });
    });

    $('#light_candle').click(function () {
        $('.fuego').fadeIn('slow');
        $(this).fadeOut('slow').promise().done(function () {
            $('#wish_message').fadeIn('slow');
        });
    });

    $('#wish_message').click(function () {
        vw = $(window).width() / 2;
        $('#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9').stop();
        $('#b1').attr('id', 'b11');
        $('#b2').attr('id', 'b22');
        $('#b3').attr('id', 'b33');
        $('#b4').attr('id', 'b44');
        $('#b5').attr('id', 'b55');
        $('#b6').attr('id', 'b66');
        $('#b7').attr('id', 'b77');
        $('#b8').attr('id', 'b88');
        $('#b9').attr('id', 'b99');
        $('#b11').animate({ top: 240, left: vw - 350 }, 500);
        $('#b22').animate({ top: 240, left: vw - 250 }, 500);
        $('#b33').animate({ top: 240, left: vw - 150 }, 500);
        $('#b44').animate({ top: 240, left: vw - 50 }, 500);
        $('#b55').animate({ top: 240, left: vw + 50 }, 500);
        $('#b66').animate({ top: 240, left: vw + 150 }, 500);
        $('#b77').animate({ top: 240, left: vw + 250 }, 500);
        $('#b88').animate({ top: 240, left: vw + 350 }, 500);
        $('#b99').animate({ top: 240, left: vw + 450 }, 500);
        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);
        $(this).fadeOut('slow').delay(3000).promise().done(function () {
            $('#story').fadeIn('slow');
        });
    });

    $('#story').click(function () {
        $(this).fadeOut('slow');
        $('.cake').fadeOut('fast').promise().done(function () {
            $('.message').fadeIn('slow');
        });

        let i = 0;
        function msgLoop(i) {
            $("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function () {
                i = i + 1;
                $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
                if (i == 50) {
                    $("p:nth-child(49)").fadeOut('slow').promise().done(function () {
                        $('.cake').fadeIn('fast');
                    });
                } else {
                    msgLoop(i);
                }
            });
        }
        msgLoop(0);
    });
});
