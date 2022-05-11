class RosaTatuadaUtils {
    constructor() {
        if (typeof $ != 'function') {
            throw 'jQuery não inicializado'
        }
    }

    createElement(element, id, classes) {
        let _element = null
        // const { element, id, classes } = options

        element ?
            _element = document.createElement(element) :
            _element = document.createElement('div')

        if (id) {
            _element.id = id
        }

        if (classes) {
            typeof classes == 'string' ?
                _element.classList.add(classes.split(' ')[0]) :
                classes.map(className => { _element.classList.add(className) })
        }


        return _element
    }

    /* type: error || success */
    alert(type, message) {
        Swal.fire({
            position: 'top-end',
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 2000
        })
    }

    addToCart(productId, skuId, quantity) {
        $.ajax(
            {
                url: `${browsingContext.Common.Urls.BaseUrl}carrinho/adicionar-produto`,
                type: 'POST',
                dataType: 'json',
                data: {
                    "Products[0].Variations": true,
                    "WebSiteID": browsingContext.Common.WebSite.WebSiteID,
                    "FeatureID": 0,
                    "Products[0].ProductID": productId,
                    "Products[0].SkuID": skuId,
                    "Products[0].Quantity": quantity
                }
            }
        )
            .done(response => {
                if (response.IsValid) {
                    if (response.Warnings.length < 1) {
                        this.openMinicart()
                    } else {
                        this.alert('error', 'Não foi possível adicionar o produto ao carrinho')
                    }
                }


            })
            .fail(error => {
                this.alert('error', 'Não foi possível adicionar o produto ao carrinho')
            })

    }

    getCart(callback) {
        $.ajax(
            {
                url: `${browsingContext.Common.Urls.BaseUrl}carrinho.json`,
                type: 'GET'
            }
        )
        .done(response => {
            callback(response)
        })
    }

    openModal(html, classes, onClosedCallback) {
        app.modal(
            {
                "html": html,
                "className": classes,
                "onClosed": onClosedCallback
            }
        )
    }

    getChannel() {
        if (browsingContext.Common.WebSite.WebSiteID == 1) {
            return 'b2c'
        } else {
            return 'b2b'
        }
    }

    listWishlist() {
        const response = $.ajax({
            url: '/painel-do-cliente/lista-de-desejo/listar',
            type: 'GET'
        })
            .done(response => {
                return response
            })
            .fail(error => {
                return {
                    error: true,
                    data: error
                }
            })

        return response
    }

    addProductToWishlist(wishlist, productId, skuId) {
        const response = $.ajax({
            url: '/b2c/Profile/Wishlist/AddProductToWishlist',
            type: 'POST',
            data: {
                'WishlistID': wishlist,
                'WebSiteID': browsingContext.Common.WebSite.WebSiteID,
                'ProductID': productId,
                'Quantity': 1,
                'SkuID': skuId
            }
        })
            .done(response => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Adicionado à sua lista de desejos`,
                    showConfirmButton: false,
                    timer: 2000
                })
            })

        return response
    }

    getDeliverySimulation(productId, skuId, postalCode) {
        const response = $.ajax({
            url: `${browsingContext.Common.Urls.BaseUrl}widget/product_deliveryfee
                    ?ProductID=${productId}
                    &SkuID=${skuId}
                    &PostalCode=${postalCode}
                    &Template=~/custom/content/themes/Base/Templates/contexto.template&nocache=5351427189&latitude=0&longitude=0`,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $('#btnGetDeliverySimulation img').removeClass('hidden')
                $('#btnGetDeliverySimulation span').addClass('hidden')
            }
        })
            .done(response => {
                return response
            })
            .fail(error => {
                return {
                    error: true,
                    data: error
                }
            })

        return response

    }

    mountDeliveryContent(deliveryList) {
        const options = deliveryList
        const container = document.getElementById('delivery-options')
        const containerToAppend = document.getElementById('delivery-options__content')
        containerToAppend.innerHTML = ""

        options.forEach(option => {
            const optionContainer = document.createElement('div')
            optionContainer.classList.add('delivery-option')

            const optionName = document.createElement('span')
            optionName.innerText = option.Name

            const optionETA = document.createElement('span')
            optionETA.innerText = option.EstimatedUnit

            const optionPrice = document.createElement('span')
            optionPrice.innerText = option.Amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

            optionContainer.append(optionName)
            optionContainer.append(optionETA)
            optionContainer.append(optionPrice)

            containerToAppend.append(optionContainer)
        })

        container.classList.add('visible')
    }

    updateCartBadge = (data) => {
        const cartBadge = document.getElementById('badge-total-items')
        const basket = data ? data.Basket : browsingContext.Common.Basket
    
        const totalItemOnCart = basket.Items
                                .map( item => { return item.Quantity } )
                                .reduce( (previousValue, currentValue) => previousValue + currentValue, 0 )
    
        cartBadge.innerText = totalItemOnCart 
    }

    openMinicart() {
        const minicartContainer = document.getElementById('minicartModal')
        const minicartContent = document.getElementById('minicartModal--content')

        minicartContent.classList.add('active')

        setTimeout(function () {
            minicartContainer.classList.add('active')
            document.documentElement.style.overflowY = 'hidden'
            const iframe = RTUtils.createElement('iframe', false, false)

            iframe.src = `${browsingContext.Common.Urls.BaseUrl}carrinho?v=${new Date().getTime()}`
            minicartContent.append(iframe)

        }, 200)

        // $.ajax({
        //     url: `${browsingContext.Common.Urls.BaseUrl}/carrinho`,
        //     type: "GET"
        // })
        // .fail((error) => {
        //     this.alert('success', 'Não foi possível obter seu carrinho')
        // })

    }

    closeMinicart() {
        let minicartContainer
        let minicartContent
        let iframe
        let mainDocument

        if (window !== window.parent) {
            const minicartContainer = window.parent.document.getElementById('minicartModal')
            minicartContent = window.parent.document.getElementById('minicartModal--content')
            iframe = minicartContent.querySelector('iframe')
            mainDocument = window.parent.document.documentElement

            minicartContainer.click()
        } 
        else {
            minicartContainer = document.getElementById('minicartModal')
            minicartContent = document.getElementById('minicartModal--content')
            iframe = minicartContent.querySelector('iframe')
            mainDocument = document.documentElement
        }

        

        minicartContent.classList.remove('active')

        setTimeout(function () {
            minicartContainer.classList.remove('active')
            mainDocument.style.overflowY = 'initial'
            minicartContent.innerHTML = ""
        }, 200)
    }

    acceptNewsletter(data, callback) {
        const { name, email } = data

        $.ajax({
            url: `${browsingContext.Common.Urls.BaseUrl}shopping/newsletter.json`,
            type: 'POST',
            dataType: 'json',
            data: {
                name,
                email
            }
        }).done( response => { callback(response) } )
    }
}



const RTUtils = new RosaTatuadaUtils()
