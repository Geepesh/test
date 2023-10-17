const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
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







