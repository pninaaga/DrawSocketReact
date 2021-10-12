import React, { useEffect } from 'react'
import socketIoClient from 'socket.io-client'
import PenDraw from '../draw/draw'
import './socket.css'


const ENDPOINT = 'http://localhost:3000/'

export default function Socket() {

    const socket = socketIoClient(ENDPOINT)

    return (
        <>
            <PenDraw socket={socket}></PenDraw>
        </>
    )
}