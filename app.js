const cityNameEl = document.querySelector('.city-name')
const inputType = document.querySelector('.input-type')
const temperatureEl = document.querySelector('.temperature')
const boxEl = document.querySelector('.box')
const max = document.querySelector('.max')
const min = document.querySelector('.min')
const cloudEl = document.querySelector('.cloud')
const overlayEl = document.querySelector('.spinner-grow')

const api_key = 'f5c3214d9978415f874054f7c7857693' 
const api_link = 'https://api.openweathermap.org/data/2.5/weather'


async function sendReq(cityName) {
    overlayEl.classList.remove('hidden')
    try {
        const req = await fetch(
            `${api_link}?q=${cityName}&units=metric&appid=${api_key}`
        )
        console.log(req)

        if (req.statusText == 'Unauthorized') {
            throw new Error("So'ro'v bilan bog'liq xatolik yuz berdi")
        } else if (!req.ok) {
            throw new Error(
                "Notog'ri shahar malumatlarini kiritingiz."
            )
        }
        const data = await req.json()
        getData(data)
    }catch (err) {
        console.log("try bilan muamo")
        console.log(err.message)
        overlayEl.textContent = `${err.message}`
    }
        
    
    
    
    
    function getData(data) {
        overlayEl.classList.add('hidden')
        const weather = data 
        console.log(data)
        cityNameEl.innerHTML = `<span>${weather.name}, <span>${weather.sys.country}</span></span>`
        temperatureEl.textContent = `${weather.main.temp.toFixed(0)}℃`
        max.textContent = `${Math.ceil(weather.main.temp_max)}`
        min.textContent = `${Math.ceil(weather.main.temp_min)}`
        cloudEl.textContent = `${weather.weather[0].main}`
    }
}

boxEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const nameOfCity = inputType.value
    sendReq(nameOfCity)
})

overlayEl.addEventListener('click', () => {
    overlayEl.classList.add('hidden')
    overlayEl.textContent = 'Loading...'
    inputType.value = ''
    console.clear()
})