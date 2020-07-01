import React from 'react';
import Info from './Info'
import Mem from './Mem'
import Cpu from './Cpu'
import './widget.css'


class Widget extends React.Component {
  
  render(){
    let ran=Math.floor(Math.random())
    const {osType,freeMem,totalMem,usedMem,memUsage,cpuModel,isActive,cpuCores,cpuSpeed,cpuLoad,uptime,macA}=this.props.value
    let cpuWidgetId=`cpu-widget-${macA.length+ran}`
    let memWidgetId=`mem-widget-${macA.length + ran}`
    // For Testing
    // let cpuWidgetId=`cpu-widget-${macA}`
    // let memWidgetId=`mem-widget-${macA}`
    const cpu={cpuLoad,cpuWidgetId}
    const mem={freeMem,totalMem,usedMem,memUsage,memWidgetId}
    const info={macA,cpuSpeed,cpuModel,cpuCores,uptime,osType}
    let notActiveDiv=''
 
    if(!isActive){
      notActiveDiv=<div className='not-active'>Offline</div>
    }
    return (
      <div className='widget col-sm-12'>
        {notActiveDiv}
        <Cpu cpu={cpu}/>
        <Mem mem={mem}/>
        <Info info={info}/>

      </div>
    );
  }
}

export default Widget;
