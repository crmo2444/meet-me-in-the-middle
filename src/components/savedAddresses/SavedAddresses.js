import { useEffect, useState } from "react"
import { deleteSavedAddress, getCurrentUsersSavedAddresses, updateAddress } from "../managers/SavedAddressManager"

export const SavedAddressList = () => {
    const [addresses, setAddresses] = useState([])
    const [nameState, setNameState] = useState(false)
    const [addressName, setName] = useState("")

const loadAddresses = () => {
    getCurrentUsersSavedAddresses().then(data => setAddresses(data))
}

useEffect(() => {
     loadAddresses()
}, [])

const handleDelete = (id) => {
    deleteSavedAddress(id).then(loadAddresses)
}

    return <section className="savedAddressList">
        {
            addresses.map(address => {
                return <section className="savedAddress">
                    {
                        nameState ? <><input type="text" placeholder="Input name..." onChange={(e) => setName(e.target.value)}/>
                                      <button onClick={() => {
                                        let newAddressObject = {
                                            address: address.address,
                                            coordinates: address.coordinates,
                                            name: addressName
                                        }
                                        updateAddress(address.id, newAddressObject).then(loadAddresses).then(setNameState(false))
                                    }}>Submit</button></> : null
                    }
                    <div>{address.name}</div>
                    <div>{address.address}</div>
                    {
                        address.name ? <button onClick={() => setNameState(true)}>Rename</button> : <button onClick={() => setNameState(true)}>Add Name</button>
                    }
                    <button onClick={() => {
                        handleDelete(address.id)
                    }}>Delete</button>
                    </section>
            })
        }
    </section>
}