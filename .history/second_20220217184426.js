const httpfunction =require("express")
const data =httpfunction()
data.get("/api/users",(req,res)=>{
    res.send([1,2,3])
})
const port = process.env.PORT || 3000
data.listen(3000,()=>console.log("listening on port 3000"))