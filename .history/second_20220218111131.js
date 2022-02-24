const httpfunction =require("express")
const data =httpfunction()
const users=[
    {id:1,name:'a'},
    {id:2,name:'b'},
    {id:3,name:'c'},
]
data.get("/api/users",(req,res)=>{
    res.send(users)
})
data.get('/api/users/:id',(req,res)=>{
    const user= users.find((i)=> (i.id === (req.params.id))
    if(!user) res.status(404).send('invalid url')
    res.send(user)
})
const port = process.env.PORT || 3000
data.listen(port,()=>console.log(`listening on port ${port}`))