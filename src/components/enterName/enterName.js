import React, { useEffect, useState } from 'react'
import socketIoClient from 'socket.io-client'
import { useHistory } from 'react-router-dom'

const ENDPOINT = 'http://localhost:3000/'

export default function EnterName() {

    const history=useHistory()
    const socket = socketIoClient(ENDPOINT)

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket);
            console.log('connect');
        })

        socket.on('getMessageToClient', (resMessage) => {
            history.push({pathname: '/draw', state: { startMessage: resMessage }})
        })
    }, [])

    function saveEnterName() {
        socket.emit('getMessage')
    }

    return (
        <>
            <label>Enter name</label>
            <input type='text'/>
            <button onClick={saveEnterName}>save name</button>
        </>
    )
}