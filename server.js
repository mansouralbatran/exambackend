const express= require('express')
const server=express()
const axios =require('axios')
const cors=require('cors')
server.use(cors())

require('dotenv').config()
PORT=process.env.PORT
 
server.use(express.json())

const mongoose = require('mongoose');
// mongoose.connect(`${process.env.MONGO_ATLAS}`);
mongoose.connect(`${process.env.MONGO_ATLAS}`,{ useNewUrlParser: true, useUnifiedTopology: true });
///////////////
const ChoclrtSchema = new mongoose.Schema({
    email:String,
    titil: String,
    url:String
  });
  const Choclit = mongoose.model('Choclit', ChoclrtSchema);
  //////////////
  server.listen(PORT,()=>{
      console.log('LISTING');
  })
///localhost:3002/test
  server.get('/test',(req,res)=>{
      res.send('OK')
  })
  server.get('/data',handelget)
  server.get('/get',handel2get)
  server.post('/add',handeladd)
  server.delete('/remove',handelremove)
  server.put('/updat',handelupdat)

//////////
///localhost:3002/data?email=
async function handelget(req,res){
    let email1=req.email
    let arr=[]

let dat1='https://ltuc-asac-api.herokuapp.com/allChocolateData'
let data=await axios.get(`${dat1}`)

data.data.map(elm=>{

    let newmod= new Choclit({
        email:"mansouralbatran@gmail.com",
        titil: elm.title,
        url:elm.imageUrl,
    }) 
    arr.push(newmod)
})

res.send(arr)

}


///localhost:3002/add?email=mansouralbatran@gmail.com,body

async function handeladd(req,res){
    let email1=req.query.email
    const{email,titil,url}=req.body

  await Choclit.create({email,titil,url})

  Choclit.find({email:email1},(error,dataco) =>{
      if(error){console.log('errrrrro')}else{
          res.send(dataco)
      }
  })





}
//localhost:3002/updat?id=t44g34t544,body

function handelremove(req,res){
    let email1=req.query.email
    let id=req.query.id
    Choclit.remove({_id:id},(erro,delteddata)=>{
        if(erro){console.log('errrrrro')}else{
            Choclit.find({email:email1},(error,dataco) =>{
                if(error){console.log('errrrrro')}else{
                    res.send(dataco)
                }
            })
          




        }

    })


}
function handelupdat(req,res){
   
    let id=req.query.id

    const{email,titil,url}=req.body
    Choclit.findByIdAndUpdate(id,{email:email,titil:titil,url:url},(erro,updateddata)=>{
        if(erro){console.log('errrrrro')}else{
            Choclit.find({email:req.body.email},(error,dataco) =>{
                if(error){console.log('errrrrro')}else{
                    res.send(dataco)
                }
            })
          




        }

    })


}



///localhost:3002/get?email2=
function handel2get(req,res){
   
    let email2=req.query.email2

    
    
            Choclit.find({email:email2},(error,dataco) =>{
                if(error){console.log('errrrrro')}else{
                    res.send(dataco)
                }
            })
          




        }

  


