import React from 'react';
import drawCircle from '../utils/CanvasAnimation'

class Cpu extends React.Component {
  
  render(){
    const canvas=document.querySelector(`.${this.props.cpu.cpuWidgetId}`)
    drawCircle(canvas,this.props.cpu.cpuLoad)
    // console.log(this.props.cpu.cpuLoad)
    return (
      <div className='col-sm-3 cpu'>
        <h3>CPU LOAD</h3>
        <div className='canvas-wrapper'>
          <canvas className={this.props.cpu.cpuWidgetId} width='200' height='200'></canvas>
          <div className='cpu-text'>{this.props.cpu.cpuLoad}%</div>
        </div>
      </div>
    );
  }
}

export default Cpu;
