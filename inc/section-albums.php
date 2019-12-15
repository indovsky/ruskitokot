<?php
/*
 Albums list. Just add new field and init to add new album.
*/
$album1 = get_field('album1');
$album2 = get_field('album2');
$album3 = get_field('album3');
$album4 = get_field('album4');
$album5 = get_field('album5');

$albums = [$album1, $album2, $album3, $album4, $album5]; ?>
<section id="section-albums" class="section section--black">
    <div class="container reveal">
        <div class="row">
            <div class="col-12">
                <div class="section__header">
                    <h2 class="section__title section__title--white">Albumy</h2>
                </div>
                <div class="section__content">
                    <div class="glide">
                        <div data-glide-el="track" class="glide__track">
                            <ul class="glide__slides">
                            <?php if( $albums ) { 
                                foreach($albums as $hero) { ?>
                                <li class="glide__slide">
                                    <div class="glide__card" style="background-image: url('<?php echo $hero['miniatura']['sizes']['large']; ?>');">
                                        <div class="glide__card-wrapper">
                                            <h3 class="glide__title"><?php echo $hero['tytul']; ?></h3>
                                            <img class="glide__picture" src="<?php echo $hero['miniatura']['sizes']['medium']; ?>"
                                                alt="<?php echo $hero['miniatura']['alt']; ?>" />
                                            <div class="glide__buttons-wrapper">
                                                <a class="btn btn-outline-primary glide__button" title="Odsłuchaj" href="<?php echo $hero['odsluch']; ?>" 
                                                rel="nofollow" target="_blank">
                                                Odsłuch
                                                </a>
                                                <a class="btn btn-outline-primary glide__button" title="Pobierz album" href="<?php echo $hero['download']['url']; ?>">Pobierz</a>
                                            </div>
                                            <div class="glide__socials-wrapper">
                                                <a class="glide__social-link tooltip" data-tippy-content="Ruski Facebook" href="https://www.facebook.com/Ruskitokot/" rel="nofollow" title="Facebook"><i class="fab fa-facebook"></i></a>
                                                <a class="glide__social-link tooltip" data-tippy-content="Ruski YouTube" href="https://www.youtube.com/channel/UCxmUUahj-R8MpIsWzrPloMQ" rel="nofollow" title="Ruski YouTube"><i class="fab fa-youtube"></i></a>
                                                <a class="glide__social-link tooltip" data-tippy-content="Ruski Spotify" href="https://open.spotify.com/artist/6kvUufPdZNqr2m5VyUFxPr" rel="nofollow" title="Ruski Spotify"><i class="fab fa-spotify"></i></a>
                                            </div>
                                        </div>
                                        <div class="glide__arrows" data-glide-el="controls">
                                            <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><i class="fas fa-angle-left"></i></button>
                                            <button class="glide__arrow glide__arrow--right" data-glide-dir=">"><i class="fas fa-angle-right"></i></button>
                                        </div>
                                    </div>
                                </li>
                            <?php } } ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>