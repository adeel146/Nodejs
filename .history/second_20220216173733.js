const http =require("http")
const port =http.createServer((req,res)=>{
    if (req.url ==='/') {
        res.write('hello browser')
    }
})
port .listen(3400)

console.log("listening on port 3400")