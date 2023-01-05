/* PrognRoll | https://mburakerman.github.io/prognroll/ | @mburakerman | License: MIT */
(function($) {
    $.fn.prognroll = function(options) {

        var settings = $.extend({
            height: 3, //Progress bar height
            color: "#f0e64a", //Progress bar background color
            custom: false //If you make it true, you can add your custom div and see it's scroll progress on the page.
        }, options);

        return this.each(function() {
            if ($(this).data('prognroll')) {
                return false;
            }
            $(this).data('prognroll', true);

            var $span = $("<span>", {
                class: "bar"
            });
            $("body").prepend($span);

            $span.css({
                position: "fixed",
                top: 0,
                left: 0,
                width: 0,
                height: settings.height,
                backgroundColor: settings.color,
                zIndex: 9999999
            });

            if (settings.custom === false) {

                $(window).scroll(function(e) {
                    e.preventDefault();
                    var windowScrollTop = $(window).scrollTop();
                    var windowHeight = $(window).outerHeight();
                    var bodyHeight = $(document).height();

                    var total = (windowScrollTop / (bodyHeight - windowHeight)) * 100;

                    $(".bar").css("width", total + "%");
                });

            } else {

                $(this).scroll(function(e) {
                    e.preventDefault();
                    var customScrollTop = $(this).scrollTop();
                    var customHeight = $(this).outerHeight();
                    var customScrollHeight = $(this).prop("scrollHeight");

                    var total = (customScrollTop / (customScrollHeight - customHeight)) * 100;

                    $(".bar").css("width", total + "%");
                });

            }

            /* Get scroll position on on page load */
            $(window).on('hashchange', function(e) {
                e.preventDefault();
                console.log($(window).scrollTop());
            });
            $(window).trigger('hashchange');

            var windowScrollTop = $(window).scrollTop();
            var windowHeight = $(window).outerHeight();
            var bodyHeight = $("body").outerHeight();

            var total = (windowScrollTop / (bodyHeight - windowHeight)) * 100;

            $(".bar").css("width", total + "%");
            /* Get scroll position on on page load */

        });
    };
})(jQuery);
