let map

function init() {
    renderMap()
    getStoresFromDB()
}


function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#my-map'),
        { zoom: 12, center: { lat: 40.431859446064884, lng: -3.7001443629423076 }, styles: mapStyles.retro }
    )
}


function getStoresFromDB() {

    axios
        .get('/api')
        .then(response => printMarkers(response.data))
        .catch(err => console.log(err))
}


function printMarkers(stores) {
    stores.forEach(store => {

        let position = { lat: store.location.coordinates[0], lng: store.location.coordinates[1] }

        new google.maps.Marker({ position, map })
    })

    map.setCenter({ lat: stores[0].location.coordinates[0], lng: stores[0].location.coordinates[1] })
}