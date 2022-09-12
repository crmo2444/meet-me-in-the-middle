export const getAllEvents = () => {
    return fetch("http://localhost:8000/events", {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    }).then(res => res.json())
  }

export const getCurrentUsersEvents = () => {
    return fetch(`http://localhost:8000/events?user=${localStorage.getItem('mm_id')}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      }
    })
      .then(res => res.json())
  }

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('mm_token')}`
      },
      body: JSON.stringify(event)
    }).then(res => res.json())
  }
