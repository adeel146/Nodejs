const httpfunction =require("express")
const data =httpfunction()
data.get("/",(req,res)=>{
    res.send("hello world")
})
data.listen(3000,()=>console.log("listening on port 3000"))