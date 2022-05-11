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

(function(){
    facetHandler()

    $(document).ajaxComplete( () => {
        facetHandler()
    })
})()