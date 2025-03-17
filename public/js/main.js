(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


let currentImageIndex = 0; // Keeps track of the current image in the gallery
let images = []; // Array to store image sources for navigation

function openLightbox(imgElement) {
    var modal = document.getElementById("lightboxModal");
    var lightboxImage = document.getElementById("lightboxImage");

    // Store all image sources in the images array (from the gallery container)
    images = document.querySelectorAll('.col-4 img');
    currentImageIndex = Array.from(images).indexOf(imgElement);

    // Set the source of the lightbox image to the clicked image
    lightboxImage.src = imgElement.src;

    // Display the modal
    modal.style.display = "block";
}

function closeLightbox() {
    var modal = document.getElementById("lightboxModal");
    modal.style.display = "none";
}

function changeImage(direction) {
    // Update the current image index based on the direction (next or previous)
    currentImageIndex += direction;

    // Wrap around if we go beyond the first or last image
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Go to the first image
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Go to the last image
    }

    // Get the next image source and set it in the lightbox
    var lightboxImage = document.getElementById("lightboxImage");
    lightboxImage.src = images[currentImageIndex].src;
}


