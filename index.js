const express = require('express')
const app = express()
const os = require('os')
const port = 3010 || process.env.PORT
const multer = require('multer')

const upload = multer({dest : os.tmpdir()});
app.set('view engine','ejs')
app.use(express.static(__dirname + "/static_files"))
app.use('/uploads',express.static("/uploads"))
const get =(root,file)=>{
  app.get(root,(req,res)=>{
    res.render(file)
  })
}


  app.post("/uploaded",upload.single('file'),(req,res)=>{
    res.json({
      status : "uploaded",
      file_name : req.file.filename,
      mime_type : req.file.mimetype
    })
  })


get('/',"main")


app.listen(port,()=>{
  console.log(port)
})







