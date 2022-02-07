/* slick fullbanner */
const slickFullbanner = () => {
    const $fullbannerHome = $('.banner-slick__container')

    $fullbannerHome.slick(
        {
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 1,
            slidesToScroll: 1
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
                const quickLink = RTUtils.creteElement('a', null, 'quicklink__item')
                quickLink.text = item.item
                quickLink.href = item.link

                $quickLinks.append(quickLink)
            })
        }
    })
}


(function() {
    slickFullbanner()
    fillQuickLinks()
})()






