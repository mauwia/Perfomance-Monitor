const mongoose=require('mongoose')
const Machine=require('./Model/Machine')
mongoose.connect(`mongodb+srv://mauwia12:muawiyah17@merng-fddnz.mongodb.net/test?retryWrites=true&w=majority`,{ useUnifiedTopology: true,useNewUrlParser: true ,'useFindAndModify':false,'useCreateIndex': true})
const checkAndAdd=data=>{
    return new Promise(async(resolve,reject)=>{
        Machine.findOne({macA:data.macA},(err,doc)=>{
            console.log('with')
            if(err){
                throw err
                reject(err)
            }
            else if(doc==null){
                let newMachine=new Machine(data)
                 newMachine.save()
                resolve('added')
            }
            else{
                resolve('found')
            }
        })
    })
}
let socketMain=(io,socket)=>{
    let macA
    socket.on('clientAuth',key=>{
        if(key==='5twkjebdj993h')
        socket.join('clients')
        else if(key==='sndjsbdjbj'){
            // console.log('React client')
            socket.join('UI')
            Machine.find({},(err,docs)=>{
                docs.forEach(aMachine=>{
                    aMachine.isActive=false
                    io.to('UI').emit('data',aMachine)
                })
            })
        }
        else{
            socket.disconnect(true)
        }
    })
    socket.on('disconnect',()=>{
        Machine.find({macA:macA},(err,docs)=>{
            if(docs.length>0){
                docs[0].isActive=false
                io.to('UI').emit('data',docs[0])
            }
        })
    })
    socket.on('initPerfData',async data=>{
        macA=data.macA
        // console.log(data)    

        let mongooseResponse=await checkAndAdd(data)
    })
    socket.on('perfData',(res)=>{
        console.log('Tick...')
        io.to('UI').emit('data',res)
    })
}

module.exports=socketMain