const initProductLine = () => {

    /* gerencia as subvariacoes disponiveis de acordo com a variacao selecionada */
    const handleVariationsOptions = () => {
        const firstVariations = [...document.querySelectorAll('.variations--list .variation-item__option')]

        firstVariations.map(variation => {
            variation.addEventListener('click', (event) => {

                const options = [...variation
                    .closest('.product-line-variations-list')
                    .querySelectorAll(`.sku--data[data-path*="${variation.dataset.propertyPath}"]`)]


                let availableOptions = options.filter(option => {
                    const availability = option.querySelector('.sku--data__availability')
                    const isAvailableOption = availability.value.toUpperCase() != "O"

                    if (isAvailableOption) return option

                })

                const allSubvariations = [...variation
                    .closest('.product-line-variations-list')
                    .querySelectorAll(`.subvariations--list .variation-item__option`)]
                    

                allSubvariations.map(subvariation => {
                    subvariation.classList.add('disabled')
                    subvariation.classList.remove('selected-rt')
                })

                availableOptions = [...availableOptions]

                let firstAvailable = null

                for(var i=0; i<availableOptions.length; i++){
                    const index = i
                    const target = availableOptions[index].dataset.path.split('|')[2]

                    const subvariations = [...variation
                        .closest('.product-line-variations-list')
                        .querySelectorAll(`.subvariations--list .variation-item__option[data-property-path="${target}"]`)]


                    subvariations.map(subvariation => {
                        subvariation.classList.remove('disabled')
                    })

                    if(index == 0) firstAvailable = subvariations[0]
                }

                
                firstAvailable.click()

                // availableOptions?.map(option => {
                //     const target = option.dataset.path.split('|')[2]

                //     const subvariations = [...variation
                //         .closest('.product-line-variations-list')
                //         .querySelectorAll(`.subvariations--list .variation-item__option[data-property-path="${target}"]`)]


                //     subvariations.map(subvariation => {
                //         subvariation.classList.remove('disabled')
                //     })
                // })


            })
        })
    }

    /* gerencia todas os botoes de variacoes para que sejam destacados ao click adicionando a classe selected-rt */
    const handleVariations = () => {
        const subvariations = [...document.querySelectorAll('.variation--list__container .variation-item__option')]
        subvariations.map((variation) => {
            variation.addEventListener('click', (event) => {

                const self = event.target
                const classes = [...self.classList]
                console.log(self);
                console.log(classes);

                if (classes.includes('disabled')) return false

                const currentSelected = variation
                    .closest('.variation--list__container')
                    .querySelector('.variation-item__option.selected-rt')

                if (currentSelected) {
                    currentSelected.classList.remove('selected-rt')
                }

                variation.classList.add('selected-rt')
            })
        })
    }

    const changeImageVariation = () => {
        const subvariations = [...document.querySelectorAll('.subvariations--list .variation-item__option')]


        subvariations.map(subvariation => {
            subvariation.addEventListener('click', (event) => {
                
                const self = event.target
                const parent = self.closest('.product-line-variations-list')
                const variationSelected = parent.querySelector('.variations--list .variation-item__option.selected-rt')

                if(!variationSelected) return

                const productLine = self.closest('.wd-product-line')
                const firstVariation = variationSelected.dataset.propertyPath
                const secondVariation = self.dataset.propertyPath

                let content = productLine.querySelector('.container--variationsImage')
                content = JSON.parse(content.innerText)
                console.log('content')

                const images = content.filter( 
                                item => { 
                                    return item.VariationPath == `/${firstVariation}/${secondVariation}/`
                                })

                const cdnPath = browsingContext.Common.ImagesPath.Product.Cdn.replaceAll('/Custom/Content/Products/', '')
                
                for(var i=0; i<images.length; i++){
                    const current = i;
                    const media = productLine.querySelector(`.variation-root img:nth-child(${current+1})`)
                    if(!media) break

                    media.src = `${cdnPath + images[i].MediaPath}` 
                }

                
            })
        })
    }

    const handleBuyButton = () => {
        const buttons = [...document.querySelectorAll('.wd-product-line-medias-variations .buy-in-line')]

        buttons.map(button => {
            button.addEventListener('click', (event) => {
                const parent = button.closest('.container-medias-variation')
                const firstVariation = parent?.querySelector('.variations--list .variation-item__option.selected-rt')
                const secondVariation = parent?.querySelector('.subvariations--list .variation-item__option.selected-rt')
                console.log(firstVariation);
                console.log(secondVariation);
                if (!firstVariation || !secondVariation) {
                    return
                }

                const variationPath = firstVariation.dataset.propertyPath
                const subvariationPath = secondVariation.dataset.propertyPath

                const container = parent.querySelector(`.sku--data[data-path="|${variationPath}|${subvariationPath}|"]`)

                const productInput = container.querySelector('.sku--data__product')
                const productID = productInput.value

                const skuInput = container.querySelector('.sku--data__sku')
                const skuID = skuInput.value

                RTUtils.addToCart(productID, skuID, 1)

                button.innerText = "Comprando"
                setInterval(() => {
                    button.innerText = "Comprar"
                }, 1500)

            })
        })
    }


    const init = () => {
        handleVariations()
        handleBuyButton()
        handleVariationsOptions()
        changeImageVariation()
    }

    init()

}



(function () {
    initProductLine()
})()