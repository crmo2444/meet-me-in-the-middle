import { useEffect, useState } from "react"
import { deleteSavedAddress, getCurrentUsersSavedAddresses } from "../managers/SavedAddressManager"

export const SavedAddressList = () => {
    const [addresses, setAddresses] = useState([])

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
                    <div>{address.name}</div>
                    <div>{address.address}</div>
                    <button onClick={() => {
                        handleDelete(address.id)
                    }}>Delete</button>
                    </section>
            })
        }
    </section>
}