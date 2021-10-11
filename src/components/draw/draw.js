import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PenDraw extends Component {

    state = {
        cvs: null,
        ctx: null,
        mouse: 0,
        x1: 2,
        y1: 30,
        x2: 180,
        y2: 70,
        clearScreen: 0
    }
    componentDidMount() {
        var cvs = document.getElementById("mycanvas")
        var ctx = cvs.getContext("2d");
        this.setState({ cvs, ctx })
        ctx.restore();
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
        debugger
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
        ctx.strokeStyle = this.props.lineColor;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = this.props.lineWidth;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
    }
    onMouseMove = (e) => {
        var { x1, y1, mouse } = this.state
        if (mouse) {
            var p = this.getMousePos(e)
            this.setState({ x2: p.x, y2: p.y })
            this.drawLine({ x: x1, y: y1 }, p)
            this.setState({
                x1: p.x,
                y1: p.y
            })
        }
    }
    render() {
        const { style } = this.props

        return (
            <div>
                <canvas
                    id="mycanvas"
                    width={"200px"}
                    height={"200px"}
                    color={chooseColor}
                    style={{ border: '1px solid rgb(165, 146, 37)' }}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}>
                </canvas>
                <label>Choose color</label>
                <input type='color'/>
            </div>
        )
    }
}