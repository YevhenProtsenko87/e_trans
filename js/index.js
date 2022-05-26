const map = L.map('map').setView([50.50953, 30.43249], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([50.50953, 30.43249])
  .addTo(map)
  .bindPopup('E-trans')
  .openPopup();