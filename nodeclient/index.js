const os= require('os')
const io=require('socket.io-client')
let socket=io('http://127.0.0.1:8181')

socket.on('connect',()=>{
    // console.log('I connected to the socket server')
    const nI=os.networkInterfaces()
    let macA
    for(let key in nI){
        // for testing purpose use this 
        // macA=Math.floor(Math.random()*3)+1
        // break;
        // otherwise use this condition 
        if(!nI[key][0].internal){
            if(nI[key][0].mac==="00:00:00:00:00:00")
                macA=Math.random().toString(36).substr(2,15)
            else
                macA=nI[key][0].mac
            break;
        }
    }
    // console.log(macA)
    socket.emit('clientAuth','5twkjebdj993h')
    performanceData().then(res=>{
        res.macA=macA
        socket.emit('initPerfData',res)
    })
    let perfDataInterval=setInterval(()=>{
        performanceData().then(res=>{
            res.macA=macA
            socket.emit('perfData',res)
        })
    },1000)
    socket.on('disconnect',()=>{
        clearInterval(perfDataInterval)
    })
})

const performanceData=()=>{
    return new Promise(async(resolve,reject)=>{
        const cpus=os.cpus()
        const uptime=os.uptime()
    
        const freeMem=os.freemem()
        const osType=os.type()=='Darwin'?'MAC':os.type()
    
        const totalMem=os.totalmem()
        const usedMem=totalMem-freeMem
        const memUsage=Math.floor(usedMem/totalMem*100)/100
        const cpuModel=cpus[0].model
        const cpuCores=cpus.length
        const cpuSpeed=cpus[0].speed
        const cpuLoad=await getCpuLoad()
        let isActive=true
        resolve({
            isActive,
            osType,
            freeMem,
            totalMem,
            usedMem,
            memUsage,
            cpuModel,
            cpuCores,
            cpuSpeed,
            cpuLoad,uptime
        })
    })
   
}
const cpuAverage=()=>{

    const cpus=os.cpus()
    
    let idleMs=0,totalMs=0
    cpus.forEach(aCore=>{
        for(type in aCore.times){
            totalMs+=aCore.times[type]
        }
        idleMs+=aCore.times.idle
    })
    return{
        idle:idleMs/cpus.length,
        total:totalMs/cpus.length
    }
}
const getCpuLoad=()=>{
    return new Promise((resolve,reject)=>{
        const start=cpuAverage()
        setTimeout(()=>{
            let end=cpuAverage()
            const idleDifference=end.idle-start.idle
            const totalDifference=end.total-start.total
            // console.log(idleDifference,totalDifference)
            const percentageCPU=100-Math.floor(100*idleDifference/totalDifference)
            resolve(percentageCPU)
        },100)  
    })
   
}

// performanceData().then(res=>console.log(res))