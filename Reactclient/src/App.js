  import React from 'react';
  import socket from './utils/socket'
import Widget from './Components/Widget';
import './App.css'
  class App extends React.Component {
    state={
      performanceData:{}
    }
    componentDidMount(){
      socket.on('data',data=>{
        // console.log(data)
        const currentState=({...this.state.performanceData})
        currentState[data.macA]=data
        this.setState({performanceData:currentState})
        // console.log(this.state)
      })
    }
    render(){
      let widgets=[]
      let data=this.state.performanceData
      Object.entries(data).forEach(([key,value])=>{
        widgets.push(<Widget key={key} value={value} />)
      })
      return (
        <div className="App">
          {widgets}
        </div>
      );
    }
  }

  export default App;
