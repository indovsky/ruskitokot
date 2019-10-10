import $ from "jquery";
import PopperJs from 'popper.js';
import tippy from 'tippy.js';
import 'bootstrap/js/dist/collapse';
import '../sass/style.scss';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';
import Glide from '@glidejs/glide';

// Init funcitons
$(function () {
    initNavbar();
    smoothScroll();
    pagePath();
    initTypedString();
    initScrollReveal();
    customCheckbox();
    spotify();
    tippy('.tooltip', {
        animation: 'scale',
        arrow: true,
    });
    if (pagePath() !== 'muzyka') {
        initCarousel();
    }
    if (pagePath() === 'muzyka') {
        youtubeApi();
    }
});

// Get current page path
function pagePath() {
    const path = window.location.pathname;
    const array = path.split('/');

    const filtered = array.filter(function (el) {
        return el != "";
    });

    const currentUri = filtered.pop();

    return currentUri;
}

// Check if document is ready
const documentReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Main navbar
const initNavbar = () => {
    const nav = document.getElementById('navbarNav');
    const hamburger = document.querySelector('.navbarToggler');

    documentReady(() => {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle("is-active");
            nav.classList.toggle("navbarNav--is-active");
        });

        document.addEventListener("click", (e) => {
            if (!$('#navbarNav').is(e.target) && $('#navbarNav').has(e.target).length === 0) {
                hamburger.classList.remove("is-active");
                nav.classList.remove("navbarNav--is-active");
            }
        });
    });
};

// Typing animation
const initTypedString = () => {
    const options = {
        strings: ["Ruski to kot ^700", "ruskitokot.eu"],
        typeSpeed: 65
    }

    const typed = new Typed("#typed", options);
};

// Show elements on scroll
const initScrollReveal = () => {
    const element = $('.reveal');
    const options = {
        delay: 100,
        distance: '140px',
        origin: 'top',
        duration: 500,
        opacity: 0,
        easing: 'ease-in-out',
        viewFactor: 0.1
    };

    documentReady(() => {
        if (element) {
            ScrollReveal().reveal(element, options);
        }
    });
};

// Carousel
const initCarousel = () => {
    const element = document.querySelector('.glide');

    const glide = new Glide(element, {
        type: 'slider',
        startAt: 0,
        focusAt: 'center',
        perView: 1,
        gap: 0,
        peek: {
            before: 0,
            after: 0
        },
        activeNav: 'glide__bullet--active'
    });

    documentReady(() => {
        if (element) {
            glide.mount();
        }

        const section = document.getElementById('section-albums');
        let firstSlide = document.querySelector('.glide__slide--active .glide__card');
        let firstSlideThumb = firstSlide.style.backgroundImage;

        section.style.backgroundImage = firstSlide.style.backgroundImage;

        glide.on(['move.after', 'move'], function () {
            let slideActive = document.querySelector('.glide__slide--active .glide__card');
            section.style.backgroundImage = slideActive.style.backgroundImage;
        });
    });
};

// Smooth scroll to ID
const smoothScroll = () => {
    documentReady(() => {
        $('a[href*="#"]').on('click', function (e) {
            // e.preventDefault();
            const element = $(this);
            const hash = element[0].hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 400);
        });
    });
};

//YouTube API
const youtubeApi = () => {
    documentReady(() => {
        const key = 'AIzaSyDQyGR7Id8gE0tfqO73AxRwLzacvr18AYU';
        const channelId = 'UCxmUUahj-R8MpIsWzrPloMQ';

        // Api urls
        const channelsApi = 'https://www.googleapis.com/youtube/v3/channels';
        const playlistItems = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const videosApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

        $.get(channelsApi, {
                part: 'contentDetails',
                key: key,
                id: channelId
            },
            (data) => {
                $.each(data.items, (i, item) => {
                    const pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid);
                });
            }
        );

        const getVids = (pid, stats) => {
            $.get(playlistItems, {
                    part: 'snippet, status',
                    maxResults: 12,
                    key: key,
                    playlistId: pid
                },
                (data) => {
                    mainVid(data.items[0].snippet.resourceId.videoId);

                    $.each(data.items, (i, item) => {
                        const info = {
                            thumb: item.snippet.thumbnails.medium.url,
                            title: item.snippet.title,
                            desc: item.snippet.description.substring(0, 250),
                            vid: item.snippet.resourceId.videoId,
                        };

                        // Send video id and info object to CreateVideo
                        const video = info.vid;
                        createVids(video, info);
                    });
                }
            );
        };

        const createVids = (vid, info) => {
            $.get(videosApiUrl, {
                    part: 'statistics, snippet',
                    key: key,
                    id: vid
                },
                (data) => {
                    $.each(data.items, (i, item) => {
                        const stats = {
                            views: item.statistics.viewCount,
                            comments: item.statistics.commentCount,
                            likes: item.statistics.likeCount,
                            dislikes: item.statistics.dislikeCount
                        };
                        // Create single video
                        $('.videos').append(`
                        <article class="videos__item" data-key="${info.vid}">

                            <div class="videos__thumb-container"><img class="videos__thumb" src="${info.thumb}" alt="${info.title}"></div>
                            <div class="videos__details">
                                <h3 class="videos__title">${info.title}</h3>
                                <p class="videos__desc">${info.desc}</p>
                                <ul class="videos__rating">
                                    <li class="videos__rating-item"><i class="fas fa-eye"></i> ${stats.views}</li>
                                    <li class="videos__rating-item"><i class="fas fa-comment"></i> ${stats.comments}</li>
                                    <li class="videos__rating-item"><i class="fas fa-thumbs-up"></i> ${stats.likes}</li>
                                    <li class="videos__rating-item"><i class="fas fa-thumbs-down"></i> ${stats.dislikes}</li>
                                </ul>
                            </div>

                        </article>
                    `);
                    });
                }
            );
        };

        const mainVid = (id) => {
            $('#video').html(`
                        <div id="loader"></div>
                        <iframe id="main-video-iframe" width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=0&showinfo=0" frameborder="0" allowfullscreen></iframe>
                    `);

            const hideLoader = () => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                loader.style.display = 'none';
            }

            setTimeout(hideLoader, 1500);
        };

        //CLICK EVENT
        $('.videos').on('click', 'article', function () {
            const id = $(this).attr('data-key');
            mainVid(id);

            $('html, body').animate({
                scrollTop: $('#main').offset().top
            }, 500);

        });
    });
};

const customCheckbox = () => {
    documentReady(() => {
        const checkboxs = $('input[type=checkbox]');

        checkboxs.each(function () {
            $(this).wrap('<div class="customCheckbox"></div>');
            $(this).before('<span>&#10004;</span>');
        });

        checkboxs.change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().addClass('customCheckboxChecked');
            } else {
                $(this).parent().removeClass('customCheckboxChecked');
            }
        });
    });
}

const spotify = () => {
    const trigger = document.querySelector('.spotify__button');
    const triggerIcon = document.querySelector('.spotify__button i');

    documentReady(() => {
        const player = document.getElementById('spotify-player');
        const title = document.querySelector('.spotify__title');
        const overlay = document.getElementById('page');

        const multiToggleClass = (element, class0, class1) => {
            element.classList.toggle(class0);
            element.classList.toggle(class1);
        }

        trigger.addEventListener('click', (e) => {
            trigger.classList.toggle('spotify__button--is-active');
            multiToggleClass(triggerIcon, 'fas', 'fa-times-circle');
            player.classList.toggle('spotify__player--is-active');
            overlay.classList.toggle('overlay--active');
            title.classList.toggle('spotify__title--active');
        }, false);

        player.innerHTML = '<iframe src="https://open.spotify.com/embed/artist/6kvUufPdZNqr2m5VyUFxPr" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
    });
}