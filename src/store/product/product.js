const initDeliverySimulation = () => {
   const button = document.getElementById('btnGetDeliverySimulation')
   const input = document.getElementById('PostalCode')
   const iconInputChecked = document.querySelector('.delivery-simulation .minicon')


   $(input).mask('99999-999', {
      onKeyPress: function (cep, e, field, options) {
         const isFilled = cep.length == 9

         if (isFilled) {
            iconInputChecked.classList.add('checked')
            button.removeAttribute('disabled')
         } else {
            iconInputChecked.classList.remove('checked')
            button.setAttribute('disabled', true)
         }
      }
   })

   const mountSimulation = (cep) => {
      RTUtils
         .getDeliverySimulation(product.ProductID, product.ProductID, cep)
         .then(response => {
            if (!response.error) {
               RTUtils.mountDeliveryContent(
                  response.Groups[0].DeliveryOptions
               )

               $('#btnGetDeliverySimulation img').addClass('hidden');
               $('#btnGetDeliverySimulation span').removeClass('hidden');
            }
         })
   }

   input.addEventListener('keyup', (e) => {
      console.log(e.key)
      if (e.key === 'Enter' || e.keyCode === 13) {
         const cep = e.target.value
         const isFilled = cep.trim().length == 9

         if (isFilled) {
            mountSimulation(cep)
         } else {
            console.log('erro')
         }
      }
   })

   button.addEventListener('click', (event) => {
      const cep = input.value
      const isFilled = cep.trim().length == 9

      if (isFilled) {
         mountSimulation(cep)
      } else {
         console.log('erro')
      }

   })

}

const initWishlistButton = () => {
   const buttonWishlist = document.getElementById('btn-add-wishlist')
   const inputVariations = [...document.querySelectorAll('.variation-options input[type="radio"]')]
   const variationsQuantity = document.querySelectorAll('.variation-options').length
   const filledIcon = document.querySelector('.wishlist-hover-icon')
   const regularIcon = document.querySelector('.wishlist-regular-icon')
 

   buttonWishlist.addEventListener('click', (event) => {
      const isNotAuthenticated = !browsingContext.Common.Shopper.IsAuthenticated

      if(isNotAuthenticated){
         RTUtils.alert('error', 'Faça login para adicionar um produto à sua lista de desejos')
         return
      }

      const response = checkVariations()

      if (response.isValid) {
         RTUtils
            .addProductToWishlist(36, product.ProductID, response.skuOption)
            .then(response => {
               if (response.ServiceResponse.Data.IsValid) {
                  regularIcon.classList.add('hidden')
                  filledIcon.classList.remove('hidden')

                  RTUtils.alert('success', 'Produto adicionado à sua lista de desejos')
               }
            })
      }
      else {
         RTUtils.alert('error', 'Selecione a variação')
      }
   })

   const checkVariations = () => {
      let target = ""
      let count = 0

      inputVariations.forEach(variation => {
         if (variation.checked) {
            count++
            target += `${variation.value}|`
         }
      })


      if (count == variationsQuantity) {
         const skuOption = document.getElementById(target).querySelector('.sku').value
         return {
            isValid: true,
            skuOption
         }

      } else {
         return { isValid: false }
      }
   }


}

const initFloatInformation = () => {
   const information = document.querySelector('.ProductRoute .product-detail .information')

   document.addEventListener('scroll', function(e) {
      const currentPosition = window.scrollY;
      
      if(currentPosition >= 200){
         information.classList.add('floating')
      }else{
         information.classList.remove('floating')
      }
    })
}

 
const initVariationsHandler = () => {
   const firstVariations = [...document.querySelectorAll('.variation-group.first .options label input')]
   const options = document.getElementById('product-variations')

   firstVariations.map(variation => {
      variation.addEventListener('click', function(e){
         const variationPath = e.target.value
         const skus = [...options.querySelectorAll(`div[class*="${variationPath}"]`)]
        console.log(variationPath)
        console.log(skus)

         skus.map(sku => {
            const targetVariation = sku.id.split('|')[1]
            const canBeSold = sku.querySelector('.availability').value.toLowerCase() !== "o"

            const subvariation = document.getElementById(`${targetVariation}`)
            const subvariationInput =  subvariation.querySelector('input')

            if(canBeSold){
               subvariationInput.disabled = false
               subvariationInput.checked = false
               subvariation.classList.remove('disabled')
            }else{
               subvariationInput.disabled = true
               subvariation.classList.add('disabled')
            }
            
         })

      })
   })

   
}

const initBuyButton = () => {
   const button = document.querySelector('.wd-buy-button button.btn-buy')

   button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()

      let firstVariation = document.querySelector('.variation-group input:checked')
      let secondVariation = document.querySelector('.subvariation-group input:checked')
      
      if(firstVariation && secondVariation){
         firstVariation = firstVariation.value
         secondVariation = secondVariation.value

         const skuContainer = document.querySelector(`#product-variations div[class*="${firstVariation}|${secondVariation}"]`)
         const sku = skuContainer.querySelector('input.sku')

         RTUtils
            .addToCart(
               product.ProductID, 
               sku.value, 
               1
            )

      }else{
         RTUtils.alert('error', 'Selecione todas as variações')
      }

   })
}



(function () {
   initDeliverySimulation()
   initWishlistButton()
   initFloatInformation()
   initVariationsHandler()
   initBuyButton()
})()
