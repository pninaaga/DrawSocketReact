import React, { useState, useEffect } from 'react'
import './enterName.css'
import { useHistory } from 'react-router-dom'

export default function EnterName(props) {

    const { socket } = props
    const [firstName, setFirstName] = useState()
    const history = useHistory()

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket) })
    }, [])

    function saveName() {
        socket.emit('sendName', firstName)
        history.push({ pathname: `/draw/${firstName}` })
    }

    return (
        <div className="enter-name-container">
            <div>
                <label>Enter your name: </label>
                <input type='text' onChange={e => { setFirstName(e.target.value) }} />
            </div>
            <button onClick={saveName}>Let's start</button>
        </div>
    )
}