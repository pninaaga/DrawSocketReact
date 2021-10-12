import React, { useEffect } from 'react'
import socketIoClient from 'socket.io-client'
import { Link } from 'react-router-dom'
import './enterName.css'

const ENDPOINT = 'http://localhost:3000/'

export default function EnterName() {

    const socket = socketIoClient(ENDPOINT)

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket);
        })
    }, [])

    return (
        <div className="enter-name-container">
            <div>
                <label>Enter your name: </label>
                <input type='text' />
            </div>
            <Link to={{ pathname: '/draw' }}>Let's start</Link>
        </div>
    )
}