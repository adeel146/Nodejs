const httpfunction =require("express")
const data =httpfunction()
const users=[
    
]
data.get("/api/users",(req,res)=>{
    res.send([1,2,3])
})
data.get('/api/users/:id',(req,res)=>{
    res.send(req.params.id)
})
const port = process.env.PORT || 3000
data.listen(port,()=>console.log(`listening on port ${port}`))