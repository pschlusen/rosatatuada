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
    const minicartContent = document.getElementById('minicartModal--content')

    button.addEventListener('click', (e) => {
        RTUtils.openMinicart()
    })

    minicartContainer.addEventListener('click', (e) => {
        e.stopImmediatePropagation()

        if(e.target == minicartContainer){
           RTUtils.closeMinicart()
        }

    })
}



(function(){
    initMinicart()
})()