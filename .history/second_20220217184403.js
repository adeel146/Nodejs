const httpfunction =require("express")
const data =httpfunction()
data.get("/api/users",(req,res)=>{
    res.send([1,2,3])
})
cons
data.listen(3000,()=>console.log("listening on port 3000"))