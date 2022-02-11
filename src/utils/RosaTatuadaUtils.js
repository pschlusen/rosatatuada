class RosaTatuadaUtils {
    constructor() {
        if (typeof $ != 'function') {
            throw 'jQuery não inicializado'
        }
    }

    creteElement(element, id, classes) {
        let _element = null

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

    addToCart(productId, skuId, quantity, successCallback, errorCallback) {
        $.ajax(
            {
                url: '/carrinho/adicionar-produto',
                type: 'POST',
                dataType: 'application/json',
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
            .done((data) => {
                typeof successCallback == 'function' ? successCallback(data) : null
            })
            .fail(() => {
                typeof errorCallback == 'function' ? errorCallback() : null
            })
    }

    getCart() {
        $.ajax(
            {
                url: '/carrinho.json',
                type: 'GET'
            }
        )
        .done(response => {
            return response
        })
        .fail(() => {
            return { error: true }
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
        if(browsingContext.Common.WebSite.WebSiteID == 1){
            return 'b2c'
        }else{
            return 'b2b'
        }
    }
}



const RTUtils = new RosaTatuadaUtils()
