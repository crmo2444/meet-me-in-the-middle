export const createSavedAddress = (address) => {
    return fetch("http://localhost:8000/saved_address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      },
      body: JSON.stringify(address)
    }).then(res => res.json())
  }

export const deleteSavedAddress = (id) => {
    return fetch(`http://localhost:8000/saved_address/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    })
  }

export const getAllSavedAddresses = () => {
    return fetch("http://localhost:8000/saved_address", {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    }).then(res => res.json())
  }

export const getCurrentUsersSavedAddresses = () => {
    return fetch(`http://localhost:8000/saved_address?user=${localStorage.getItem('mm_id')}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    })
      .then(res => res.json())
  }