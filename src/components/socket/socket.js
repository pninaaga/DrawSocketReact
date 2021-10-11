import react, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import socketIoClient from 'socket.io-client'
import PenDraw from '../draw/draw'
import './socket.css'


const ENDPOINT = 'http://localhost:3000/'

export default function Socket() {

    const socket = socketIoClient(ENDPOINT)
    const location = useLocation()
    const { startMessage, name } = location.state
    const [messageText, setMessegeText] = useState('')
    const [resMessage, setResMessage] = useState()

    useEffect(() => {
        setResMessage(startMessage)
        socket.on('messageToClient', (resMessage) => {
            setResMessage(resMessage)
        })
    }, [])

    function sendMessage() {
        socket.emit('sendMessage', messageText)
    }

    return (
        <>
            <input type='text'
                value={messageText}
                onChange={e => setMessegeText(e.target.value)} />
            <button onClick={sendMessage}>Add</button>
            {resMessage && resMessage.map(item => <p>{item}</p>)}
            <label className="title-draw">Drawing</label>
            <PenDraw></PenDraw>
        </>
    )
}