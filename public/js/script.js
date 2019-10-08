const btn = document.getElementById('btnLoad')
const spn = document.getElementById('spinner')

spn.style.display = 'none'

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
    .catch(error => console.error('Error:', error))
    .then(response => {
        const data = response
        // console.log('Success:', data.weather[0].description)
        // console.log('Success:', response.weather[0].description)
        // console.log('Success:', data)

        console.log('Success:', response)
        console.log('Success:', response.name)  
        console.log('Success:', response.sys.country)  
        console.log('Success:', response.weather[0].description)  
        let tmp = response.main.temp 
        tmp = tmp - 273.15
        console.log('succes:',tmp, '°C')
    });
    spn.style.display = 'none'

}

btn.addEventListener('click', evt =>{
    spn.style.display = 'block'
    evt.preventDefault()
    getWeather()    
})



// Crear un card o modal y mostrar si es un error o si hizo bien la peticion
// mostrar el clima