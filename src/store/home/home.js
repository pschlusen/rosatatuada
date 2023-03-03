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


    if (!RTUtils.isMobileMobileScreen()) {
        $shelf.slick(
            {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                variableWidth: true,
            }
        )
    } else {
        $shelf.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            autoplay: false,
            autoplaySpeed: 3500,
            prevArrow: `
            <button type="button" class="slick-prev">
                <img src="/custom/content/themes/Shared/Templates/general/images/left-arrow-basic.png" />
            </button>`,
            nextArrow: `
            <button type="button" class="slick-next">
                <img src="/custom/content/themes/Shared/Templates/general/images/right-arrow-basic.png" />
            </button>`
        })
    }




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
    ).done(response => {
        if (typeof response == 'object') {
            response.forEach(item => {
                const quickLink = RTUtils.createElement('a', null, 'quicklink__item')
                quickLink.text = item.item
                quickLink.href = `${browsingContext.Common.Urls.BaseUrl + item.link}`

                $quickLinks.append(quickLink)
            })
        }
    })
}

const onPlayerReady = (event) => {
    const image = document.querySelector('.video--section img')

    image.style.display = 'none'
    event.target.getIframe().style.display = 'block'

    event.target.playVideo()
}

/* manipula o video */
const handleYoutubeVideo = () => {
    const button = document.querySelector('.video--section img')
    const video = browsingContext.Common.Config.General.Store.Field2

    button.addEventListener('click', (e) => {
        if(!video) return
        
        var image = e.target

        const player = new YT.Player('yt-player', {
            height: image.height,
            width: image.width,
            videoId: video,
            events: {
                'onReady': onPlayerReady
            }
        })

    })


}


const slickQuickLinks = () => {
    const quickLinkContainer = document.querySelector('.home--quicklinks__options')

    if (RTUtils.isMobileMobileScreen()) {
        $(quickLinkContainer).slick({
            dots: false,
            arrows: true,
            centerMode: true,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            prevArrow: `
            <button type="button" class="slick-prev">
                <img src="/custom/content/themes/Shared/Templates/general/images/left-arrow.png" />
            </button>`,
            nextArrow: `
            <button type="button" class="slick-next">
                <img src="/custom/content/themes/Shared/Templates/general/images/right-arrow.png" />
            </button>`
        })
    }
}

const slickMultibanner = () => {
    const multibanner = document.querySelectorAll('.multibanner-slick .wd-marketing-banner')

    if (RTUtils.isMobileMobileScreen()) {
        $(multibanner).slick({
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1800,
        })
    }
}


document.addEventListener('DOMContentLoaded', function () {
    slickFullbanner()
    slickShelf()
    slickMultibanner()
    handleYoutubeVideo()
    // slickQuickLinks()
})
