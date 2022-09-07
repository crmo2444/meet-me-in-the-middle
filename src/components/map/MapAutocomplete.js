import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { createSavedAddress, getCurrentUsersSavedAddresses } from "../managers/SavedAddressManager";
import { midpointTo } from "./Midpoint";

export const MapAutocomplete = ({setCenter, setMarkerOne, setMarkerTwo}) => {
  const [addressOne, setAddressOne] = useState("");
  const [coordinatesOne, setCoordinatesOne] = useState({
    lat: null,
    lng: null
  });
  const [addressTwo, setAddressTwo] = useState("");
  const [coordinatesTwo, setCoordinatesTwo] = useState({
    lat: null,
    lng: null
  });

  const [addresses, setAddresses] = useState([])
  const [addressOneState, setAddressOneState] = useState(false)
  const [addressTwoState, setAddressTwoState] = useState(false)

  const loadAddresses = () => {
    getCurrentUsersSavedAddresses().then(data => setAddresses(data))
    }

    useEffect(() => {
        loadAddresses()
    }, [])

  useEffect(() => {
    if(coordinatesOne.lat !== null && coordinatesTwo.lat !== null) {
        setMarkerOne(coordinatesOne)
        setMarkerTwo(coordinatesTwo)
        let midpoint = midpointTo(coordinatesOne, coordinatesTwo)
        setCenter(midpoint)
    }
  }, [coordinatesOne, coordinatesTwo])

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressOne(value);
    setCoordinatesOne(latLng);
    if(addresses.length !== 0) {
        let foundAddress = addresses.find(address => address.address === value)
            if(!foundAddress) {
                const confirmBox = window.confirm("Would you like to save this address?")
                if (confirmBox) {
                    let newAddress = {
                        name: "",
                        address: value,
                        coordinates: latLng
                    }
                    createSavedAddress(newAddress).then(loadAddresses)
                }
            }
    }
    if(addresses.length === 0) {
        const confirmBox = window.confirm("Would you like to save this address?")
                if (confirmBox) {
                    let newAddress = {
                        name: "",
                        address: value,
                        coordinates: latLng
                    }
                    createSavedAddress(newAddress).then(loadAddresses)
                }
    }
  };

  const handleSelectTwo = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddressTwo(value);
    setCoordinatesTwo(latLng);
    if(addresses.length !== 0) {
        let foundAddress = addresses.find(address => address.address === value)
            if(!foundAddress) {
                const confirmBox = window.confirm("Would you like to save this address?")
                if (confirmBox) {
                    let newAddress = {
                        name: "",
                        address: value,
                        coordinates: latLng
                    }
                    createSavedAddress(newAddress).then(loadAddresses)
                }
            }
    }
    if(addresses.length === 0) {
        const confirmBox = window.confirm("Would you like to save this address?")
                if (confirmBox) {
                    let newAddress = {
                        name: "",
                        address: value,
                        coordinates: latLng
                    }
                    createSavedAddress(newAddress).then(loadAddresses)
                }
    }
  };

  return <>
  {
    addressOneState ? <> 
        {
            addresses ? <><select name="addressOne"
                                    onChange={(event) => {
                                        let foundAddress = addresses.find(address => address.id === parseInt(event.target.value))
                                        setCoordinatesOne(foundAddress.coordinates)
                                    }}>
                                    <option value="0">Choose an address...</option>
                                    {addresses.map(a => (
                                        <option key={a.id} value={a.id}>
                                        {a.address}
                                        </option>
                                    ))}
                                    </select>
                                    <button onClick={() => setAddressOneState(false)}>Input Address</button>
                                    </>
            : null
        }
        </> :  <div>
      <PlacesAutocomplete
        value={addressOne}
        onChange={setAddressOne}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address one..." })} />
            <button onClick={() => 
                {
                    if(addresses.length !== 0) {
                        setAddressOneState(true)   
                    }
                    else {
                        window.alert("No saved addresses!")
                    }
                }}>Choose from Saved Addresses</button>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>

  }
    
    {
    addressTwoState ? <> 
        {
            addresses ? <><select name="addressTwo"
                                    onChange={(event) => {
                                        setAddressTwo(event.target.id)
                                        setCoordinatesTwo(event.target.value)
                                    }}>
                                    <option value="0">Choose an address...</option>
                                    {addresses.map(a => (
                                        <option key={a.id} id={a.address} value={a.coordinates}>
                                        {a.address}
                                        </option>
                                    ))}
                                    </select>
                                    <button onClick={() => setAddressTwoState(false)}>Input Address</button>
                                    </>
            : null
        }
        </> :  <div>
      <PlacesAutocomplete
        value={addressTwo}
        onChange={setAddressTwo}
        onSelect={handleSelectTwo}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address two..." })} />
            <button onClick={() => 
                {
                    if(addresses.length !== 0) {
                        setAddressTwoState(true)   
                    }
                    else {
                        window.alert("No saved addresses!")
                    }
                }}>Choose from Saved Addresses</button>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>

  }
  </>
}