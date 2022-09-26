// const getItemsMinicart = (container) => {
//     $.ajax({
//         url: `${browsingContext.Common.Urls.BaseUrl}/carrinho`,
//         type: "GET"
//     }).done( response => {
//         container.innerHTML = response
//     })
// }



const initMinicart = () => {
    const buttonMobile = document.getElementById('button-cart')
    const button = document.querySelector('.container--userOptions .user--options__openCart')
    const minicartContainer = document.getElementById('minicartModal')
    const facets = document.querySelector('.container--facets')


    buttonMobile.addEventListener('click', (e) => {
        console.log('click')
        RTUtils.openMinicart()
        $(facets).hide()
    })

    button.addEventListener('click', (e) => {
        e.preventDefault()
        RTUtils.openMinicart()
    })

    minicartContainer.addEventListener('click', (e) => {
        e.stopImmediatePropagation()

        if(e.target == minicartContainer){
           RTUtils.closeMinicart()
           RTUtils.getCart(RTUtils.updateCartBadge)
        }

    })
}

const handleFixedNavbar = () => {
    const navbar = document.getElementById('header')

    document.addEventListener('scroll', () => {
        const documentScrolled = window.scrollY > 150

        if(documentScrolled){
            navbar.classList.add('fixed')
        }
        else{
            navbar.classList.remove('fixed')
        }   
    })
    
}

const initSearch = () => {
    const isDesktop = !RTUtils.isMobileMobileScreen()

    if(isDesktop){
        const button = document.getElementById('buttonSearch')
        const search = document.getElementById('containerSearch')

        button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopImmediatePropagation()

            search.classList.toggle('visible')
            
        })
    }
}

const slickTipbar = () => {
    const tipbar = document.querySelector('.container--informations__wrapper')

    if(window.innerWidth <= breakpoints.MEDIUM){
        $(tipbar).slick(
            {
                slidesToShow:1, 
                slidesToScroll:1, 
                autoplay:true, 
                autoplaySpeed: 1400, 
                arrows: false, 
                dots: false
            }
        )
    }
}

const handleCategoriesMobile = () => {
    if(RTUtils.isMobileMobileScreen()){
        const categories = [...document.querySelectorAll('.wd-category-menu h3')]

        categories.map( category => {
            category.addEventListener('click', (event) => {
                const subcategories = event.target.nextElementSibling

                event.target.classList.toggle('active')
                subcategories.classList.toggle('active')
            })
        })
    }
}

const handleMenuMobile = () => {
    if(RTUtils.isMobileMobileScreen()){
        const openButton = document.getElementById('openMenuMobile')
        const closeButton = document.getElementById('closeMenuMobile')
        const menu = document.querySelector('.menu--category')
        const facets = document.querySelector('.container--facets')

        openButton.addEventListener('click', (event) => {
            menu.classList.add('active')
            $(facets).hide()
        })

        closeButton.addEventListener('click', (event) => {
            menu.classList.remove('active')
            $(facets).show()
        })
    }
}


document.addEventListener('DOMContentLoaded', function(){
    RTUtils.updateCartBadge()
    initMinicart()
    handleFixedNavbar()
    initSearch()
    slickTipbar()

    handleCategoriesMobile()
    handleMenuMobile()
})