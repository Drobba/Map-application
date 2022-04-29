'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  // Använder geolocation API för att hämta kordinater.
  // Använder https://leafletjs.com/ library för att jobba med maps.
  //Kollar om geolocation existerar, ibland på vissa gamla browsers gör det ej.
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position); // Vi hittar alla värden position ger oss som ett objekt i consolen.
      const { latitude } = position.coords; // Använder destructuring där variabel namnet "latitude" kommer matcha latitude i objektet och paras med den.
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);

      // L är ett namespace från leafletjs.com som innehåller massa metoder.
      // Alla globala variabeler i olika JS filer är nåbara till andra JS filer så länge de är Globala och ligger över i ordning i HTML dokumentet.
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    }
  ); // metoden tar emot 2 callback functions. Den första är success och den andra error.
}
