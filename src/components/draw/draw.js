import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { addPointToArr, addManyPointToArr } from '../../redux/actions/draw'
import './draw.css'

function mapStateToProps(state) {
    return {
        allPoints: state.drawReducer.allPoints
    }
}
const mapDispatchToProps = (dispatch) => ({
    addPointToArr: (value) => dispatch(addPointToArr(value)),
    addManyPointToArr: (value) => dispatch(addManyPointToArr(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
    function PenDraw(props) {

        const { allPoints, addPointToArr, addManyPointToArr } = props
        const [cvs, setCvs] = useState(null)
        const [mouse, setMouse] = useState(0)
        const [ctx, setCtx] = useState(null)
        const [x1, setX1] = useState(2)
        const [y1, setY1] = useState(30)
        const [x2, setX2] = useState(180)
        const [y2, setY2] = useState(70)
        const [clearScreen, setClearScreen] = useState(0)
        const [chooseColor, setChooseColor] = useState('black')
        const [point, setPoint] = useState([])
        const { socket, arrPointsDraw, chooseDeleteLine, firstName, nameDrawToDelete } = props
        const isInitialMount = useRef(true);

        useEffect(() => {
            var cvs = document.getElementById("mycanvas")
            var ctx = cvs.getContext("2d");
            setCvs(cvs)
            setCtx(ctx)
            ctx.restore()

            if (arrPointsDraw != '-1') {
                arrPointsDraw.map(item => { drowFromDiffrentCanvas(item) })
            }

            socket.on('pointsDrawToClient', (resMessage) => {
                addPointToArr(resMessage)
                drowFromDiffrentCanvas(resMessage)
            })

            socket.on('clearCanvasToClient', () => {
                clearCanvas()
            })
        }, [])

        useEffect(() => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
            }
            else {
                let arrFilter = allPoints.filter(p => p.firstName != nameDrawToDelete[0])
                if (arrFilter != '-1') {
                    clearCanvas()
                    arrFilter.map(item => { drowFromDiffrentCanvas(item) })
                }
            }
        }, [nameDrawToDelete])

        const drowFromDiffrentCanvas = (resMessage) => {
            const canvas = document.getElementById("mycanvas")
            const context = canvas.getContext('2d')
            context.beginPath()
            context.strokeStyle = resMessage.color;
            context.lineJoin = "round";
            context.lineCap = "round";
            context.lineWidth = '1';
            context.moveTo(resMessage.x1, resMessage.y1);
            context.lineTo(resMessage.x2, resMessage.y2);
            context.stroke();
        }

        function getMousePos(e) {
            var rect = cvs.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }

        function clearCanvas() {
            const cvs = document.getElementById("mycanvas")
            const ctx = cvs.getContext("2d")
            ctx.save()
            ctx.globalCompositeOperation = "copy"
            ctx.strokeStyle = "transparent"
            ctx.beginPath()
            ctx.lineTo(0, 0)
            ctx.stroke()
            ctx.restore()
        }

        function onMouseUp(e) {
            setMouse(0);
            const canvas = document.getElementById("mycanvas")
            const context = canvas.getContext('2d')
            addManyPointToArr(point)
        }

        const onMouseDown = (e) => {
            var p = getMousePos(e)
            setMouse(1)
            setX1(p.x)
            setY1(p.y)
        }

        function drawLine(p, q) {
            const canvas = document.getElementById("mycanvas")
            const ctx = canvas.getContext('2d')
            ctx.beginPath()
            ctx.strokeStyle = chooseColor;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = '1';
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            socket.emit('sendPointsDraw', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, firstName: firstName, color: chooseColor })
            setPoint([...point, { x1: p.x, y1: p.y, x2: q.x, y2: q.y, firstName: firstName, color: chooseColor }])
        }

        const onMouseMove = (e) => {
            if (mouse) {
                var p = getMousePos(e)
                setX2(p.x)
                setY2(p.y)
                drawLine({ x: x1, y: y1 }, p)
                setX1(p.x)
                setY1(p.y)
            }
        }

        return (
            <>
                <div className="first-name-title">{firstName}</div>
                <div className="canvas-container">
                    <div>
                        <label>Choose color:  </label>
                        <input type='color' onChange={e => setChooseColor(e.target.value)} />
                    </div>
                    <canvas
                        id="mycanvas"
                        width={"200px"}
                        height={"200px"}
                        style={{ border: '1px solid rgb(165, 146, 37)' }}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}>
                    </canvas>
                    <button onClick={clearCanvas}>Clear</button>
                </div>
            </>
        )
    }
)