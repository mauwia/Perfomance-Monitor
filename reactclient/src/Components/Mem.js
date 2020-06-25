import React from 'react';
import drawCircle from '../utils/CanvasAnimation'


class Mem extends React.Component {

  render(){
    const {freeMem,totalMem,usedMem,memUsage}=this.props.mem
    const canvas=document.querySelector(`.${this.props.mem.memWidgetId}`)
    drawCircle(canvas,memUsage*100)
    // console.log(memUsage)
    return (
      <div class="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas className={this.props.mem.memWidgetId} width="200" height="200"></canvas>
                <div className="mem-text">{memUsage*100}%</div>
                <div>
                  Total Memory:{Math.floor((totalMem/1073741824*100))/100}
                </div>
                <div>
                  Free Memory:{Math.floor((freeMem/1073741824*100))/100}
                </div>
            </div>
            </div>
    );
  }
}

export default Mem;
