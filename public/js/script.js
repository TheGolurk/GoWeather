const btn = document.getElementById('btnLoad')

var modalBg = document.querySelector('.modal-bg')
var modalClose = document.querySelector('.modal-close')


const getWeather = () => {
    
    var getCountry = document.getElementById('country').value
    var getCity = document.getElementById('city').value
    
    var url = 'http://localhost:5000/getWeather';
    var data = {country: getCountry, city: getCity};
    
    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => {
        console.error('Error:', error)
        draw(error)
    })
    .then(response => {
        modalBg.classList.add('bg-activate')
        draw(response)
    });

}

btn.addEventListener('click', evt =>{
    evt.preventDefault()
    getWeather()    
})

modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-activate')
})

const draw = data => {

    const modal = document.getElementById('myContent')
    const header = document.getElementById('header')
    const subHeader = document.getElementById('header-2')
    const image = document.getElementById('image')
    const description = document.getElementById('description')

    if(data.cod == '404'){

        header.textContent = '¡UPS!'
        subHeader.textContent = 'An error has occurred'
        image.setAttribute('src', '../images/error.png')
        image.setAttribute('width', '70px')
        description.textContent = 'Please try again'
        modal.style.background = 'linear-gradient(rgb(255, 92, 92), rgb(136, 93, 29))'
        
    } else {
        
        header.textContent = data.main.temp-273.15 + '°C'
        subHeader.textContent = data.name + ', ' + data.sys.country
        image.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
        image.setAttribute('width', '120px')
        description.textContent = data.weather[0].description
        modal.style.background = 'linear-gradient(rgb(95, 92, 255), rgb(84, 29, 136))'
        
    }

}