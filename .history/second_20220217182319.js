const httpfunction =require("http")
const data =httpfunction()
data.get("/api/users",(req,res)=>{
    res.send([1,2,3])
})