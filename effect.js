$(window).on('load', function() {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function() {
    var vw;

    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }

    // Handle window resize with debouncing
    $(window).on('resize', debounce(function() {
        vw = $(window).width() / 2;
        $('#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9').stop();
        ['#b1', '#b2', '#b3', '#b4', '#b5', '#b6', '#b7', '#b8', '#b9'].forEach((id) => {
            $(id).animate({ top: 240, left: vw + (id.slice(-1) - 1) * 100 }, 500);
        });
    }, 200));

    // Button click handlers
    $('#turn_on').click(async function() {
        await Promise.all([
            $('#bulb_yellow').addClass('bulb-glow-yellow'),
            $('#bulb_red').addClass('bulb-glow-red'),
            $('#bulb_blue').addClass('bulb-glow-blue'),
            $('#bulb_green').addClass('bulb-glow-green'),
            $('#bulb_pink').addClass('bulb-glow-pink'),
            $('#bulb_orange').addClass('bulb-glow-orange'),
            $('body').addClass('pink')
        ]);
        $(this).fadeOut('slow').delay(5000).then(() => {
            $('#play').fadeIn('slow');
        });
    });

    $('#play').click(async function() {
        const audio = $('.song')[0];
        try {
            await audio.play();
        } catch (error) {
            console.error('Audio playback failed:', error);
            alert('Unable to play audio. Please check your browser settings.');
        }
        await Promise.all([
            $('#bulb_yellow').addClass('bulb-glow-yellow-after'),
            $('#bulb_red').addClass('bulb-glow-red-after'),
            $('#bulb_blue').addClass('bulb-glow-blue-after'),
            $('#bulb_green').addClass('bulb-glow-green-after'),
            $('#bulb_pink').addClass('bulb-glow-pink-after'),
            $('#bulb_orange').addClass('bulb-glow-orange-after'),
            $('body').css('background-color', '#FFF').addClass('pink-after')
        ]);
        $(this).fadeOut('slow').delay(6000).then(() => {
            $('#bannar_coming').fadeIn('slow');
        });
    });

    // Balloon animations
    const balloonIds = ['#b1', '#b2', '#b3', '#b4', '#b5', '#b6', '#b7', '#b8', '#b9'];
    let isRunning = true;

    function loopBalloon(id) {
        if (!isRunning) return;
        const randLeft = Math.random() * 1000;
        const randTop = Math.random() * 500;
        $(id).animate({ left: randLeft, bottom: randTop }, 10000, () => {
            loopBalloon(id);
        });
    }

    $('#balloons_flying').click(async function() {
        $('.balloon-border').animate({ top: -500 }, 8000);
        ['#b1', '#b4', '#b5', '#b7', '#b9'].forEach((id) => {
            $(id).addClass('balloons-rotate-behaviour-one');
        });
        ['#b2', '#b3', '#b6', '#b8'].forEach((id) => {
            $(id).addClass('balloons-rotate-behaviour-two');
        });
        balloonIds.forEach(loopBalloon);
        $(this).fadeOut('slow').delay(5000).then(() => {
            $('#cake_fadein').fadeIn('slow');
        });
    });

    // Cake and message animations
    $('#cake_fadein').click(async function() {
        $('.cake').fadeIn('slow');
        await $(this).fadeOut('slow').delay(3000);
        $('#light_candle').fadeIn('slow');
    });

    $('#light_candle').click(async function() {
        $('.fuego').fadeIn('slow');
        await $(this).fadeOut('slow');
        $('#wish_message').fadeIn('slow');
    });

    $('#wish_message').click(async function() {
        vw = $(window).width() / 2;
        balloonIds.forEach((id) => {
            $(id).stop();
            $(id).attr('id', `${id.slice(0, -1)}${parseInt(id.slice(-1)) + 10}`);
        });
        ['#b11', '#b22', '#b33', '#b44', '#b55', '#b66', '#b77', '#b88', '#b99'].forEach((id) => {
            $(id).animate({ top: 240, left: vw + (id.slice(-2) - 1) * 100 }, 500);
        });
        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);
        await $(this).fadeOut('slow').delay(3000);
        $('#story').fadeIn('slow');
    });

    $('#story').click(async function() {
        await $(this).fadeOut('slow');
        $('.cake').fadeOut('fast').then(() => {
            $('.message').fadeIn('slow');
        });

        let i = 0;

        async function msgLoop() {
            if (i > 50) return;
            await $("p:nth-child(" + i + ")").fadeOut('slow').delay(800);
            i++;
            await $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
            if (i === 50) {
                await $("p:nth-child(49)").fadeOut('slow');
                $('.cake').fadeIn('fast');
            } else {
                msgLoop();
            }
        }

        msgLoop();
    });
});
