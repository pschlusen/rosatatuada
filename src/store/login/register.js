const initInputListener = () => {
    const inputs = [...document.querySelectorAll('input')]
    inputs.forEach( input => {
        input.addEventListener('keyup', e => {
            const hasText = input.value.length > 0
            const label = input.previousElementSibling
            if(hasText){
                $(label).hide()
            }else{
                $(label).show()
            }
        })
    } )
}

const changeSelectDefaultOption = () => {
    const defaultOption = document.querySelector('#AddOrSetCustomer-Gender option')
    
    defaultOption.innerText = 'Gênero'
}


document.addEventListener('DOMContentLoaded', () => {
    try{
        initInputListener()
        changeSelectDefaultOption()
    }catch(e){
        console.error(e)
    }
})