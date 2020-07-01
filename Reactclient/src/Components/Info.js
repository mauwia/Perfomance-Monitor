import React from 'react';
import moment from 'moment';

class Info extends React.Component {
  
  render(){
    return (
      <div className="col-sm-3 col-sm-offset-1 cpu-info">
      <h3>Operating System</h3>
      <div className="widget-text">{this.props.info.osType}</div>
      <h3>Time Online</h3>
      <div className="widget-text">{moment.duration(this.props.info.uptime).humanize()}</div>
      {/* <div className="widget-text">{this.props.info.uptime}</div> */}
      
      <h3>Processor information</h3>
      <div className="widget-text"><strong>Type:</strong> {this.props.info.cpuModel}</div>
      <div className="widget-text"><strong>Number of Cores:</strong> {this.props.info.cpuCores}</div>
      <div className="widget-text"><strong>Clock Speed:</strong> {this.props.info.cpuSpeed}</div>
    </div>
    );
  }
}

export default Info;
