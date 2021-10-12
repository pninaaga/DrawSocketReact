import React, { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import socketIoClient from 'socket.io-client'
import PenDraw from '../draw/draw'
import './socket.css'


const ENDPOINT = 'http://localhost:3000/'

export default function Socket() {

    const socket = socketIoClient(ENDPOINT)
    // const location = useLocation()
    // const { startMessage, name } = location.state
    // const [messageText, setMessegeText] = useState('')
    // const [resMessage, setResMessage] = useState()

    useEffect(() => {
        // setResMessage(startMessage)
        // socket.on('messageToClient', (resMessage) => {
        //     setResMessage(resMessage)
        // })
    }, [])

    // function sendMessage() {
    //     socket.emit('sendMessage', messageText)
    // }

    return (
        <>
            {/* <label className="title-draw">Drawing</label> */}
            <PenDraw socket={socket}></PenDraw>
        </>
    )
}