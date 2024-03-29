const getQuantityOfItemsOnCart = () => {
    const element = document.getElementById('cart--itemsQuantity')
    const itemsQuantity = browsingContext.Common.Basket.Items
                            .map( 
                                item => { return item.Quantity  }
                            )
                            .reduce( (previousValue, currentValue) =>  previousValue + currentValue , 0)

    element.innerText = `(${itemsQuantity})`

}

const handleBasketChange = () => {
    $.subscribe(`/${browsingContext.Common.Urls.BaseUrl}/checkout/basket/changed`, function() {
        const placeholder = document.getElementById('cart--itemsQuantity')
        const inputsQuantity = [...document.querySelectorAll('.item .quantity input[name="quantity"]')]

        let totalItems = 0
        for(const input of inputsQuantity){
            totalItems = totalItems + Number(input.value)
        }

        placeholder.innerText = `(${totalItems})`
    })
}

const handleDeliveryAndCoupon = () => {
    const elements = [...document.querySelectorAll('.container-options-cart > div > .header')]

    elements.map( element => {
        element.addEventListener('click', (event) => {
            const parent = event.target.closest('.wd-widget')
            const content = parent.querySelector('.content')
            const title = parent.querySelector('.header .title')

            $(content).toggleClass('active')
            $(title).toggleClass('active')
        })
    })
}

document.addEventListener('DOMContentLoaded', function(){
    getQuantityOfItemsOnCart()
    handleBasketChange()
    handleDeliveryAndCoupon()
})