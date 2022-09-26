const initDeliverySimulation = () => {
   const button = document.getElementById('btnGetDeliverySimulation')
   const input = document.getElementById('PostalCode')
   const iconInputChecked = document.querySelector('.delivery-simulation .minicon')

   
   $(input).mask('99999-999')


   // $(input).mask('99999-999', {
   //    onKeyPress: function (cep, e, field, options) {
   //       const isFilled = cep.length == 9

   //       console.log(cep.length)

   //       if (isFilled) {
   //          iconInputChecked.classList.add('checked')
   //          button.removeAttribute('disabled')
   //       } else {
   //          iconInputChecked.classList.remove('checked')
   //          button.setAttribute('disabled', true)
   //       }
   //    }
   // })


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
      const readValue = e.target.value
      const cep = readValue.replaceAll('_', '')
      const isFilled = cep.trim().length == 9

      
      console.log(cep)
      console.log(isFilled)

      if (isFilled) {
         iconInputChecked.classList.add('checked')
         button.removeAttribute('disabled')
      } else {
         iconInputChecked.classList.remove('checked')
         button.setAttribute('disabled', true)
      }

      if (e.key === 'Enter' || e.keyCode === 13) {
         // const cep = e.target.value
         // const isFilled = cep.trim().length == 9

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

      if (isNotAuthenticated) {
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
   if(!RTUtils.isMobileMobileScreen()){
      const information = document.querySelector('.ProductRoute .product-detail .information')

      document.addEventListener('scroll', function (e) {
         const currentPosition = window.scrollY;

         if (currentPosition >= 200) {
            information.classList.add('floating')
         } else {
            information.classList.remove('floating')
         }
      })
   }
}


const variationsHandlerB2B = () => {
   let currentColor
   const colors = [...document.querySelectorAll('.subvariation-group label')]

   colors.forEach(color => {
      color.addEventListener('click', event => {
         currentColor = color.id
         const options = document.querySelectorAll(`#product-variations div[class*="${currentColor}"]`)

         options.forEach(option => {
            const value = option.dataset.value
            const sizeId = option.id.split('|')[0].replace('.', '-')

            const labelOption = document
                              .querySelector(`.variation-options .variation-group label.var-group-${sizeId}`)
            
            const sizeOption = labelOption.querySelector('.quantity--selector__value')
            sizeOption.innerText = value
         })
      })
   })



   const quantityButtons = [...document.querySelectorAll('.quantity--selector button')]

   quantityButtons.forEach(button => {
      button.addEventListener('click', event => {
         const isUnavailable = button.closest('label.unavailable')
         if(isUnavailable) return

         const operation = button.innerText
         const size = button.closest('label').querySelector('input').value
         const variation = document.getElementById(`${size}|${currentColor}|`)
         

         const field = button.parentElement.querySelector('.quantity--selector__value')
         let currentValue = Number(field.innerText)

         switch(operation){
            case '-':
               field.innerText = (currentValue - 1 < 0) ? 0 : --currentValue
               break
            case '+':
               field.innerText = ++currentValue
               break
            default:
               return
         }

         variation.dataset.value = currentValue
         
      })
   })
}

const variationsHandlerB2C = () => {
   const firstVariations = [...document.querySelectorAll('.variation-group.first .options label input')]
   const options = document.getElementById('product-variations')

   firstVariations.map(variation => {
      variation.addEventListener('click', function (e) {
         const variationPath = e.target.value
         const subvariations = document.querySelector('.subvariation-group .options ')
         const skus = [...options.querySelectorAll(`div[class*="${variationPath}"]`)]
         const listDisponibleSubvariations = []

         skus.map(sku => {
            const targetVariation = sku.id.split('|')[1]
            const canBeSold = sku.querySelector('.availability').value.toLowerCase() !== "o"

            const subvariation = document.querySelector(`label.var-group-${targetVariation.replace('.', '-')}`)
            const subvariationInput = subvariation.querySelector('input')

            subvariation.classList.remove('selected')
            if (canBeSold) {
               subvariationInput.disabled = false
               subvariationInput.checked = false
               subvariation.classList.remove('disabled')
               listDisponibleSubvariations.push(subvariation)
            } else {
               subvariationInput.disabled = true
               subvariation.classList.add('disabled')
            }
         })

         if(listDisponibleSubvariations.length == 1){
            listDisponibleSubvariations[0].click()
         }else{

         }

      })
   })
}

const initVariationsHandler = () => {
   const isB2C = RTUtils.getChannel() == 'b2c'

   if(isB2C)
      variationsHandlerB2C()
   else
      variationsHandlerB2B()

}

const initBuyButton = () => {
   const button = document.querySelector('.wd-buy-button button.btn-buy')

   button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()

      let firstVariation = document.querySelector('.variation-group input:checked')
      let secondVariation = document.querySelector('.subvariation-group input:checked')

      if (firstVariation && secondVariation) {
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

      } else {
         RTUtils.alert('error', 'Selecione todas as variações')
      }

   })
}

const slickMedias = () => {
   if(RTUtils.isMobileMobileScreen()){
      $('.medias .wd-product-media-selector-mobile ').slick(
         {
            slidesToShow: 1, 
            slidesToScroll:1, 
            arrows: true, 
            dots: false,
            prevArrow: `
            <button type="button" class="slick-prev">
                <img src="/custom/content/themes/Shared/Templates/general/images/left-arrow-basic.png" />
            </button>`,
            nextArrow: `
            <button type="button" class="slick-next">
                <img src="/custom/content/themes/Shared/Templates/general/images/right-arrow-basic.png" />
            </button>`
         }
      )
   }
}


document.addEventListener('DOMContentLoaded', function(){
   initDeliverySimulation()
   initWishlistButton()
   initFloatInformation()
   initVariationsHandler()
   initBuyButton()
   slickMedias()
})