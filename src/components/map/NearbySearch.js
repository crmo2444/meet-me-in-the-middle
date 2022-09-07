import { useEffect } from "react";
import { keys } from "../../Settings";
import { createSavedResultLocation } from "../managers/SavedResultLocationManager"

export const NearbySearch = ({lat, lng, setNearbyResults, nearbyResults, coordinatesOne}) => {

    let radius = 500; // 1000 = 1km
    let midpoint = {
        lat: lat,
        lng: lng
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${keys.Google}&type=point_of_interest`
    useEffect(() => {

        fetch(url)
          .then(res => {
            return res.json()
          })
          .then(res => {
    
          let places = [] // This Array WIll contain locations received from google

            res.results.map(result => {
                let place = {}
                let lat = result.geometry.location.lat;
                let lng = result.geometry.location.lng;
                let coordinate = {
                    lat: lat,
                    lng: lng,
                }

                place.coordinate = coordinate
                place.placeId = result.place_id
                place.name = result.name
                /* place['gallery'] = gallery */
        
                places.push(place);
            })
   /*  
              let gallery = []
    
            if (result.photos) {
               for(let photo of result.photos) {
                 let photoUrl = photo.html_attribution;
                 gallery.push(photoUrl);
              }
            }  */
            setNearbyResults(places)
          })
    }, [])

    const distanceFormula = (point1, point2) => {
        let R = 3958.8; // Radius of the Earth in miles
        let rlat1 = point1.lat * (Math.PI/180); // Convert degrees to radians
        let rlat2 = point2.lat * (Math.PI/180); // Convert degrees to radians
        let difflat = rlat2-rlat1; // Radian difference (latitudes)
        let difflon = (point2.lng-point1.lng) * (Math.PI/180); // Radian difference (longitudes)
  
        let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

    return <section className="results">
        {nearbyResults ? nearbyResults.map(result => {
            return <section className="placeResult">
                <div>{result.name}</div>
                <button onClick={() => {
                    let location = {
                        name: result.name,
                        coordinate: result.coordinate,
                        distance: distanceFormula(coordinatesOne, result.coordinate)
                    }
                    createSavedResultLocation(location)
                }}>Save</button>
                </section>
        }) : null}
    </section>
  }