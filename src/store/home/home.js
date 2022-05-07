/* slick fullbanner */
const slickFullbanner = () => {
    const $fullbannerHome = $('.banner-slick__container')

    $fullbannerHome.slick(
        {
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    )
}

/* slick vitrines */
const slickShelf = () => {
    const $shelf = $('.products-slider .products-slider__slick')

    $shelf.slick(
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots:false,
            variableWidth: true
        }
    )
}

/* compre no seu tamanho */
const fillQuickLinks = () => {
    const $quickLinks = $('.home--quicklinks__options')
    const endpointQuickLinks = "/custom/content/themes/Shared/Templates/general/data/options-compre-no-seu-tamanho.json"

    $.ajax(
        {
            url: endpointQuickLinks,
            type: 'GET'
        }
    ).done( response => {
        if(typeof response == 'object'){
            response.forEach(item => {
                const quickLink = RTUtils.createElement('a', null, 'quicklink__item')
                quickLink.text = item.item
                quickLink.href = item.link

                $quickLinks.append(quickLink)
            })
        }
    })
}

const onPlayerReady = (event) => {
    const image = document.querySelector('.video--section img')
    image.style.display = 'none'
    event.target.playVideo()
}

/* manipula o video */
const handleYoutubeVideo = () => {
    var button = document.querySelector('.video--section img')

    button.addEventListener('click', (e) => {
        var image = e.target

        const player = new YT.Player('yt-player', {
            height: image.height,
            width: image.width,
            videoId: 'mdbS2nRthws',
            events: {
              'onReady': onPlayerReady
            }
        })
        
    })

    
}

(function() {
    slickFullbanner()
    slickShelf()
    fillQuickLinks()
    handleYoutubeVideo()
    // $(window).on('scroll', function(){
    //     $('.wd-product-line-medias .variation img').each(function(id, item){
            
    //         $(item).attr('src', 'https://rosatatuada.core.dcg.com.br/custom/content/themes/Shared/Templates/general/images/download.png')
    //         if( $(item).attr('src') == 'https://rosatatuada.core.dcg.com.br/custom/content/themes/Shared/Templates/general/images/download.png' ){
    //             $(item).addClass('ready')
    //         }
    //     })
    // })
})()
