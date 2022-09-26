const facetHandler = () => {
    const facets = [...document.querySelectorAll('.facets .facet-title h3')]

    facets.map(facet => {
        facet.addEventListener('click', event => {
            event.preventDefault()
            event.stopImmediatePropagation()
            const parent = event.target.parentElement
            const facetIsOpen = !parent.classList.contains('facet-closed')

            facets.map( facet => { 
                const parentElement = facet.parentElement
                if( !parentElement.classList.contains('facet-closed') ){
                    parentElement.classList.add('facet-closed')
                } 
            })

            if(facetIsOpen){
                event.target.parentElement.classList.add('facet-closed')
            }else{
                event.target.parentElement.classList.remove('facet-closed')
            }
        })
    })

}

const facetHandlerMobile = () => {
    const buttonApplyFilters = document.getElementById('applyFiltersOnShelf')
    const buttonOpenFilters = document.getElementById('openFilterOnShelf')
    const filterContainer = document.querySelector('.container--filters')

    buttonApplyFilters.addEventListener('click', (event) => {
        filterContainer.classList.remove('active')
    })

    buttonOpenFilters.addEventListener('click', (event) => {
        filterContainer.classList.add('active')
    })
}

const handleFixedFacets = () => {
    const facets = document.querySelector('.container--facets')

    document.addEventListener('scroll', () => {
        const documentScrolled = window.scrollY > 150

        if(documentScrolled){
            facets.classList.add('fixed')
        }
        else{
            facets.classList.remove('fixed')
        }   
    })
    
}

const slickFullbannerCategory = () =>{
    const fullbanner = document.querySelector('.fullbanner--category .wd-marketing-banner')

    $(fullbanner).slick({
        slidesToShow: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1800
    })
}


document.addEventListener('DOMContentLoaded', function(){
    facetHandler()
    facetHandlerMobile()
    handleFixedFacets()
    slickFullbannerCategory()
})

$(document).ajaxComplete( () => {
    facetHandler()
    facetHandlerMobile()
})