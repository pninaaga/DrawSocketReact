import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import socketIoClient from 'socket.io-client'
import PenDraw from '../draw/draw'
// import { useLocation } from 'react-router-dom'
import './socket.css'

const ENDPOINT = 'http://localhost:3000/'

export default function Socket() {

    // const location = useLocation()
    // const { socket } = location.state
    const socket = socketIoClient(ENDPOINT)
    const [arrPointsDrawing, setArrPointsDrawing] = useState()

    useEffect(() => {
        socket.emit('sendConnect')
        socket.on('getStartDraw', (arrPointsDraw) => {
            debugger
            setArrPointsDrawing(arrPointsDraw)
            console.log('arrPointsDraw', arrPointsDraw);
        })
    }, [])

    return (
        <>
            {arrPointsDrawing &&
                <PenDraw socket={socket} arrPointsDraw={arrPointsDrawing}></PenDraw>
            }
        </>
    )
}