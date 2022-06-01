let villeChoisie;

if("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude +'&appid=ecd370db82f690a9b54ee06dfcce2c75&units=metric&lang=fr';
        let requete = new XMLHttpRequest();
        requete.open('GET', url);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function() {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                    let response        = requete.response;
                    let temperature     = response.main.temp;
                    let city            = response.name;
                    let descSky         = response.weather[0].description;
                    let feelsLike       = response.main.feels_like;
                    let humidity        = response.main.humidity;
                    let wind            = response.wind.speed;
                    let icon            = response.weather[0].icon;
                    document.querySelector('#temperature_label').textContent    = temperature;
                    document.querySelector('#city').textContent                 = city;
                    document.querySelector('#desc-sky').textContent             = descSky;
                    document.querySelector('#feels-like').textContent           = feelsLike;
                    document.querySelector('#humidity').textContent             = humidity;
                    document.querySelector('#wind').textContent                 = wind;
                    document.querySelector('img').src                           = `http://openweathermap.org/img/wn/${icon}@2x.png`
                } else {
                    alert('Une erreur est survenue. Merci de revenir plus tard');
                }
            }
        }
    }, erreur, options)
} else {
    // Si la géolocalisation n'est pas activée, la ville par défaut sera Paris
    villeChoisie = 'Paris';
    recevoirTemperature(villeChoisie);
}

var options = {
    enableHighAccuracy: true
}; // pour améliorer la position sur smarthphone

let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
    ville = prompt('Quelle ville souhaitez-vous voir la températuer ?');
    recevoirTemperature(ville);
});

//Si la personne bloque la géolocalisation, la ville par défaut sera Paris
function erreur() {
    villeChoisie = 'Paris';
    recevoirTemperature(villeChoisie);
};

function recevoirTemperature(ville) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=ecd370db82f690a9b54ee06dfcce2c75&units=metric&lang=fr';

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let response        = requete.response;
                let temperature     = response.main.temp;
                let city            = response.name;
                let descSky         = response.weather[0].description;
                let feelsLike       = response.main.feels_like;
                let humidity        = response.main.humidity;
                let wind            = response.wind.speed;
                let icon            = response.weather[0].icon;
                document.querySelector('#temperature_label').textContent    = temperature;
                document.querySelector('#city').textContent                 = city;
                document.querySelector('#desc-sky').textContent             = descSky;
                document.querySelector('#feels-like').textContent           = feelsLike;
                document.querySelector('#humidity').textContent             = humidity;
                document.querySelector('#wind').textContent                 = wind;
                document.querySelector('img').src                           = `http://openweathermap.org/img/wn/${icon}@2x.png`
            } else {
                // Si le fichier json n'a pas été trouvé
                alert('Une erreur est survenue. Merci de revenir plus tard');
            }
        }
    }
}
