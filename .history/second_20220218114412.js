const Joi= require('joi')
const httpfunction =require("express")
const data =httpfunction()
data.use(httpfunction.json())
const users=[
    {id:1,name:'a'},
    {id:2,name:'b'},
    {id:3,name:'c'},
]
data.get("/api/users",(req,res)=>{
    res.send(users)
})

data.post("/api/users",(req,res)=>{
    const user = {
        id:users.length +1,
        name:req.body.name
    }
    users.push(user)
    res.send(user)
})

data.get('/api/users/:id',(req,res)=>{
    const scheme={
        name:
    }
    const user= users.find((i)=> (i.id == req.params.id))
    if(!user) res.status(404).send('invalid url')
    res.send(user)
})
const port = process.env.PORT || 3000
data.listen(port,()=>console.log(`listening on port ${port}`))