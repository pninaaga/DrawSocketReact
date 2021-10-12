import React, { Component } from 'react'
import './draw.css'

export default class PenDraw extends Component {

    state = {
        cvs: null,
        ctx: null,
        mouse: 0,
        x1: 2,
        y1: 30,
        x2: 180,
        y2: 70,
        clearScreen: 0,
        chooseColor: 'black'
    }

    componentDidMount() {
        var cvs = document.getElementById("mycanvas")
        var ctx = cvs.getContext("2d");
        this.setState({ cvs, ctx })
        ctx.restore();
        this.props.socket.on('pointsDrawToClient', (resMessage) => {
                this.drowFromDiffrentCanvas(resMessage)            
        })
    }

    drowFromDiffrentCanvas=(resMessage)=>{
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
            console.log('resMessage',resMessage)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.clearScreen) {
            this.clearCanvas()
        }
    }

    getMousePos(e) {
        var rect = this.state.cvs.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }
    clearCanvas() {
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
    onMouseUp = (e) => {
        this.setState({ mouse: 0 })
        const canvas = document.getElementById("mycanvas")
        const context = canvas.getContext('2d')
    }
    onMouseDown = (e) => {
        var p = this.getMousePos(e)
        this.setState({
            mouse: 1,
            x1: p.x,
            y1: p.y
        })
    }
    drawLine(p, q) {
        const canvas = document.getElementById("mycanvas")
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.strokeStyle = this.state.chooseColor;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = '1';
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
        this.props.socket.emit('sendPointsDraw', {x1:p.x ,y1:p.y, x2:q.x, y2:q.y, color:this.state.chooseColor})
    }
    onMouseMove = (e) => {
        var { x1, y1, mouse } = this.state
        if (mouse) {
            var p = this.getMousePos(e)
            this.setState({ x2: p.x, y2: p.y })
            this.drawLine({ x: x1, y: y1 }, p)
            this.setState({ x1: p.x, y1: p.y })
        }
    }

    render() {

        return (
            <div className="canvas-container">
                <div>
                    <label>Choose color:  </label>
                    <input type='color' onChange={e => this.setState({ chooseColor: e.target.value })} />
                </div>
                <canvas
                    id="mycanvas"
                    width={"200px"}
                    height={"200px"}
                    style={{ border: '1px solid rgb(165, 146, 37)' }}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}>
                </canvas>
            </div>
        )
    }
}