const apiKey = "9960c7eaebdd558dae24ddeb2fd5370b";

window.addEventListener('load',()=>{
    let lon;
    let lat;

    let temperaturaValor=document.getElementById("temperatura_valor");
    let temperaturaDescripcion=document.getElementById("temperatura_descripcion");
    
    let ubicacion = document.getElementById("ubicacion");
    let iconoAnimado = document.getElementById("icono_animado");
    
    let vientoVelocidad = document.getElementById("velocidad_viento");

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(posicion=>{
            lat=posicion.coords.latitude;
            lon=posicion.coords.longitude;
           

            const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&lang=es&appid=${apiKey}`;
            console.log(url);
        
            fetch(url)
                .then(response => {return response.json()})
                .then(data =>{
                    let temp = data.main.temp;
                    let descripcion=data.weather[0].description;
                    let nombreUbicacion = data.name;
                    let velViento = data.wind.speed;
                   // let animadoIco = document.getElementById("icono_animado");

                    temperaturaValor.textContent = `${temp} °C`;
                    temperaturaDescripcion.textContent=`${descripcion.toUpperCase()}`;
                    ubicacion.textContent = nombreUbicacion;
                    vientoVelocidad.textContent = `${velViento} m/s`;

                    console.log(data.weather[0].main);
                   
                    switch(data.weather[0].main){
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                          case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                          case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                          case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                              console.log('NIEVE');
                            break;                        
                          case 'Clear':
                              iconoAnimado.src='animated/day.svg'
                              console.log('LIMPIO');
                            break;
                          case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'
                              console.log('ATMOSFERA');
                              break;  
                          case 'Clouds':
                              iconoAnimado.src='animated/cloudy-day-1.svg'
                              console.log('NUBES');
                              break;  
                          default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                        }


                })
                .catch(error=>{
                    console.log(error);
                })
        
        })  
    }
})