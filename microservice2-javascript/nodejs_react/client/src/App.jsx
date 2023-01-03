import React, { useState } from 'react'

const Home = () => {
  const [getMessages, setMessages] = useState([])

  async function fetchMessages() {
    const response = await fetch('/rabbitmq')
    const json = await response.json()
    setMessages(json.messages)
  }

  function reverseString(str) {
    var splitString = str.split('')
    var reverseArray = splitString.reverse()
    var joinArray = reverseArray.join('')
    return joinArray // "olleh"
  }

  return (
    <div>
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Show messages</h1>
            <p className="lead">A way to show that it gets published to queue and gets reverted</p>
            <hr className="my-4" />
            {getMessages.map((message, index) => {
              return (
                <div key={index}>
                  <p>{reverseString(message)}</p>
                </div>
              )
            })}
            <div className="d-flex flex-column">
              <button className="mt-3 btn btn-lg custom-button" role="button" onClick={() => fetchMessages()}>
                Fetch Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
