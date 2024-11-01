import express, { json, request, response, } from 'express'

const app = express()
app.use(json())
const PORT = process.env.PORT || 3000
const mockData = [
    { id:1, username:"abhirami", displayName:"Abhirami" },
    { id:2, username:"renuka", displayName:"Renuka"},
    { id:3, username:"anushka", displayName:"Anushka"}
]
app.get('/',(request ,response)=>{
    
   return  response.status(200).send({msg:'Hello'})
})

app.get("/api/users" , (request,response)=>{
    const {query : {filter , value}} = request
    if(filter && value){
        const findUsers = mockData.filter((user)=>user[filter].includes(value))
        return response.status(200).send(findUsers)
    }

    return response.send(mockData)
})

app.get("/api/products" , (request,response)=>{
    response.send({id:1,name:"Chicken Biriyani" , price:33})
})

app.get("/api/users/:id" , (request,response)=>{
    const {params} = request
    const parsedId = parseInt(params.id)

    if(isNaN(parsedId)) return response.status(400).send("Bad Request")
    
    const findUser = mockData.find((user) => user.id===parsedId)
    if(!findUser) return response.status(404).send("User not available")
    response.status(200).send(findUser)
})


app.post("/api/users",(request,response)=>{
    const {body} = request
    console.log(body)
    return response.end()
})

app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})