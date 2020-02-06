function colorMarker(rating) {
  var customColor = "DarkRed";
  if (rating < 3)
    customColor = "green";
  else if (rating < 4.5)
    customColor = "orange";
  else if (rating < 6)
    customColor = "red";
  return customColor;
};

let capa1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
});

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", json=>{
  let response = json.features;
  let earthquakeMarkers = response.map(features => L
    .circleMarker([features.geometry.coordinates[0],features.geometry.coordinates[1]],{
      radius: features.properties.mag *2,
      stroke: true,
      color: 'black',
      opacity: 1,
      weight: 1,
      fill: true,
      fillColor: colorMarker(features.properties.mag),
      fillOpacity: 0.3
    })
    .bindPopup(`<h3>Location: ${features.properties.place}</h3><hr><h3>Eartquake Magnitude: ${features.properties.mag}</h3>`)
    )
  
/* var cm1 = new L.circleMarker([42.53, -93.42],{
 radius: 20,
 stroke: true,
 color: 'black',
 opacity: 1,
 weight: 1,
 fill: true,
 fillColor: "green",
 fillOpacity: 0.3
}).addTo(map);
*/  

  // let earthquakeMarkers = [];
  // for(geometry of response){
  //   earthquakeMarkers.push(
  //     L.marker([geometry.lat, geometry.lon]).bindPopup(`<h3>${geometry.name}</h3><hr><h3>${geometry.capacity}</h3>`)
  //   )
  // }

  let baseMaps={
    "Light Map": capa1
  }

  let earquakes = L.layerGroup(earthquakeMarkers);

  let earquakesLayer = {
    "Earthquakes": earquakes
  }

  let mymap = L.map('map-id',{
    center:[39.9802131,-104.8766877],
    zoom: 2,
    layers: [capa1, earquakes]
  });

  L.control.layers(baseMaps, earquakesLayer).addTo(mymap);

});