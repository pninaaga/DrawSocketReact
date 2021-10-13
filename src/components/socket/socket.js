import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import PenDraw from '../draw/draw'
import {setStartAllPoints} from '../../redux/actions/draw'
import { connect } from 'react-redux';
import $ from 'jquery'
import './socket.css'

const mapDispatchToProps = (dispatch) => ({
    setStartAllPoints: (value) => dispatch(setStartAllPoints(value)),
})

export default connect(null,mapDispatchToProps)(
    function Socket(props) {

    const { socket, setStartAllPoints } = props
    const { firstName } = useParams()
    const [arrPointsDrawing, setArrPointsDrawing] = useState()
    const [arrNames, setArrNames] = useState()
    const [chooseDelete, setChooseDelete] = useState()
    const [namesDrawToDelete, setNamesDrawToDelete] = useState([])

    useEffect(() => {
        socket.emit('sendConnect')
        socket.on('getStartDraw', (dataStart) => {
            setArrPointsDrawing(dataStart.setArrPoints)
            setStartAllPoints(dataStart.setArrPoints)
            setArrNames(dataStart.arrNames)
            console.log('arrPointsDraw', dataStart);
        })
    }, [])

    function deleteDrawForName(name) {
        // const nameButton =
        debugger
         if($(`#${name}`).hasClass('active')){
         $(`#${name}`).removeClass('active')
         setNamesDrawToDelete(namesDrawToDelete.filter(n => n != name))
         }
         else{
         $(`#${name}`).addClass('active')
         setNamesDrawToDelete(namesDrawToDelete.concat(name))
         }
        // nameButton.style.backgroundColor == "rgb(239, 239, 239)" ?
        //     nameButton.style.backgroundColor = '#f3e9c2' :
        //     nameButton.style.backgroundColor = "rgb(239, 239, 239)"
    //     setChooseDelete(!chooseDelete,
    //         !chooseDelete ?
    }

    return (
        <>
            {arrPointsDrawing && <div className="socket-container">
                <PenDraw socket={socket} arrPointsDraw={arrPointsDrawing} firstName={firstName} chooseDeleteLine={chooseDelete} nameDrawToDelete={namesDrawToDelete}></PenDraw>
                <div className="names-container">
                    {arrNames && arrNames.map(name =>
                        <button id={name} onClick={() => deleteDrawForName(name)}>{name}</button>)}
                </div>
            </div>}
        </>
    )
}
)