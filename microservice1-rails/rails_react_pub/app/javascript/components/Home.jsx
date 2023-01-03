import React, { useState } from 'react'

const Home = () => {
  const [stringChange, setStringChange] = useState({ stringChange: '' })

  function publishToQueue() {
    const url = '/api/v1/string_revert/create'

    if (Object.keys(stringChange).length !== 0) {
      const token = document.querySelector('meta[name="csrf-token"]').content
      fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stringChange),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Network response was not ok.')
        })
        .catch((error) => console.log(error.message))
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setStringChange({
      ...stringChange,
      [name]: value,
    })
  }

  return (
    <div>
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Insert a string</h1>
            <p className="lead">A way to show that it gets published to queue and gets reverted</p>
            <hr className="my-4" />
            <div className="d-flex flex-column">
              <input value={stringChange['stringChange']} name="stringChange" onChange={handleChange} />
              <button disabled={!stringChange['stringChange']} className="mt-3 btn btn-lg custom-button" role="button" onClick={() => publishToQueue()}>
                Send string
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
