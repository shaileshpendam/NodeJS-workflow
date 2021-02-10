const fs = require('fs');
    const  requestHandler = (req , res) => {
    const url = req.url;
    const method = req.method
if(url ==='/'){
    res.setHeader('content-type','text/html');
    res.write("<html>")
    res.write("<head><h1>HELLO</h1></head>")
    res.write("<body><form action ='/message' method='post'><input type='text' name='message'><button type='submit'>send</button> </form></body")
    res.write("</html>");
   return res.end();
}  
if(url === '/message' && method =='POST'){
     const body = [];
     req.on('data' , chunk => {
         console.log(chunk);
         body.push(chunk);
     });
     req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         const message = parsedBody.split('=')[1]
         console.log(message)
    fs.writeFileSync('message.txt', message);

     })
    res.statusCode = 302;
 res.setHeader('location' , '/')
   return res.end();
}
}
module.exports = {
    handler  : requestHandler ,
   someText : "hello routes js"
};