const initProductLine = () => {
    const variations = [...document.querySelectorAll('.variation-item__option')]

    const handleVariations = () => {
        variations.map( (variation) => {
            variation.addEventListener('click', (event) => {
                const currentSelected = variation
                    .closest('.media-variation-list')
                    .querySelector('.variation-item__option.selected')

                if(currentSelected){
                    currentSelected.classList.remove('selected')
                }

                variation.classList.add('selected')
            })
        })
    }

    const validateVariations = () => {

    }


    handleVariations()

}



(function(){
    initProductLine()
})()