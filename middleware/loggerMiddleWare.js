
const fs = require('fs');

// custom middleware create
    const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    let content = `Logged  ${req.url}  ${req.method} -- ${new Date()}` + '\n';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
  }
  
})

    next();
}
module.exports = {LoggerMiddleware} 
