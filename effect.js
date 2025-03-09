$(window).on('load', function () {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function () {
    const audio = $('.song')[0];

    // Initialize audio on first user interaction
    $('#turn_on').click(function () {
        audio.play().catch(() => alert("Click anywhere to enable audio"));
        $('[id^="bulb_"]').addClass('bulb-glow');
        $('body').addClass('pink');
        $(this).fadeOut('slow').delay(5000).promise().done(() => $('#play').fadeIn('slow'));
    });

    // Unified balloon animation
    function createLoop(selector) {
        function loop() {
            const randleft = 1000 * Math.random();
            const randtop = 500 * Math.random();
            $(selector).animate({ left: randleft, bottom: randtop }, 10000, loop);
        }
        loop();
    }

    // Event flow controls
    const flowControls = [
        { selector: '#play', next: '#bannar_coming', action: () => audio.play() },
        { selector: '#bannar_coming', next: '#balloons_flying' },
        { selector: '#balloons_flying', next: '#cake_fadein', action: () => {
            $('.balloon-border').animate({ top: 0 }, 8000);
            for (let i = 1; i <= 9; i++) createLoop(`#b${i}`);
        }},
        { selector: '#cake_fadein', next: '#light_candle' },
        { selector: '#light_candle', next: '#wish_message' },
        { selector: '#wish_message', next: '#story' }
    ];

    flowControls.forEach(({ selector, next, action }) => {
        $(selector).click(function () {
            action?.();
            $(this).fadeOut('slow').delay(5000).promise().done(() => $(next).fadeIn('slow'));
        });
    });

    // Final message animation
    $('#story').click(function () {
        $(this).fadeOut('slow');
        $('.cake').fadeOut('fast').promise().done(() => {
            $('.message').fadeIn('slow');
            animateMessages(0);
        });
    });

    function animateMessages(i) {
        $(`p:nth-child(${i})`).fadeOut('slow').delay(800).promise().done(() => {
            if (i >= 50) return;
            $(`p:nth-child(${i + 1})`).fadeIn('slow').delay(1000);
            animateMessages(i + 1);
        });
    }
});
