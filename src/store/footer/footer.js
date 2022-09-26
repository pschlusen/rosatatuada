const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const successRegister = (response) => {
    const button = document.getElementById('btnAcceptNewsletter')

    if(response.Response.IsValid){
        button.classList.add('success')
        button.innerText = 'SUCESSO'
        button.disabled = true
    }
}

const initNewsletter = () => {
    const button = document.getElementById('btnAcceptNewsletter')
    const input = document.querySelector('.newsletter--container__footer .newsletter--input input')

    button.addEventListener('click', (event) => {
        const email = input.value
        const isValidEmail = validateEmail(email)

        if(isValidEmail){
            RTUtils.acceptNewsletter(
                { email, name:'Cliente' }, 
                successRegister
            )
        }
    })

}

const initInstitucionalHandler = () => {
    if(RTUtils.isMobileMobileScreen()){
        const titles = [...document.querySelectorAll('.container--institucional .plus-symbol')]

        titles.map( title => {
            title.addEventListener('click', (event) => {
                const content = event.target.nextElementSibling
                console.log(content)

                event.target.classList.toggle('active')
                content.classList.toggle('active')
            })
        } )
    }
}


document.addEventListener('DOMContentLoaded', function(){
    initNewsletter()
    initInstitucionalHandler()
})