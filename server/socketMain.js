const mongoose=require('mongoose')
mongoose.connect(`mongodb+srv://mauwia12:muawiyah17@merng-fddnz.mongodb.net/test?retryWrites=true&w=majority`,{ useUnifiedTopology: true,useNewUrlParser: true ,'useFindAndModify':false,'useCreateIndex': true})
let socketMain=(io,socket)=>{
    socket.on('clientAuth',key=>{
        if(key==='5twkjebdj993h')
        socket.join('clients')
        else if(key==='sndjsbdjbj'){
            socket.join('UI')
        }
        else{
            socket.disconnect(true)
        }
    })
    socket.on('initPerfData',data=>{
        console.log(data)
    })
    socket.on('perfData',(res)=>console.log(res))
}
module.exports=socketMain