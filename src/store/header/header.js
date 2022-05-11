// const getItemsMinicart = (container) => {
//     $.ajax({
//         url: `${browsingContext.Common.Urls.BaseUrl}/carrinho`,
//         type: "GET"
//     }).done( response => {
//         container.innerHTML = response
//     })
// }



const initMinicart = () => {
    const button = document.getElementById('button-cart')
    const minicartContainer = document.getElementById('minicartModal')

    button.addEventListener('click', (e) => {
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

        if(documentScrolled)
            navbar.classList.add('fixed')
        else    
            navbar.classList.remove('fixed')

    })
    
}

const initSearch =() => {
    const button = document.getElementById('buttonSearch')
    const search = document.getElementById('containerSearch')

    button.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()

        search.classList.toggle('visible')
        
    })
}

(function(){
    RTUtils.updateCartBadge()
    initMinicart()
    handleFixedNavbar()
    initSearch()
})()