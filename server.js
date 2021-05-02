const express = require('express') //require express จาก nodemodule มายัดตัวแปร express สรา้งเป็นค่าคงที่
const app = express() // new obj มาให้ตัว app อีกที //หลังจากนั้นตัวแปร app จะเป็นตัวจัดการให้แล้ว

//upload file
const multerConfig = require('./config/multer_config')
const multer = require('multer')
var upload = multer(multerConfig.config).single(multerConfig.keyUpload)  //ใส่ config //และยอมรับ key photo มา

//middle ware--------------------------------------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false})) //x-www-form-urlencoded //ถ้าแบบ false จะเป็นแบบ  {key: value} 
//แต่ถ้าแบบ true จะเป็นการสนใจ nested data structure คือการมี obj ซ้อน {xxx: {aaa:bbb}}

 
app.get('/', function (req, res) {  //ลบ function ก็ได้ แล้วเพิ่ม => 
    res.send('Hello World')
})

//ต้องเข้าใจ webapi  req > peocess > res //----process อะไรก็ได้แล้วแต่เรา ในที่นี้จะเป็น Database
//localhost:1150/sayhi  (parameter ตัวแรก request , parameter ตัวแรก response )
//------------- GET ----------------------------
//localhost:1150/sayhi/CodeMobiles --> โจทย์เค้า CodeMobiles มาแสดง
app.get('/sayhi/:name', (req, res)=>{ 
    res.send(`iBlurBlur, ${req.params.name}`)
});


//localhost:1150/sayhi/chaynoi/naysai --> 
app.get('/sayhi/:firstname/:lastname', (req, res)=>{ 
    res.send(`${req.params.firstname} , ${req.params.lastname}`)
});


//localhost:1150/product?name=macbook&price=1234            //query string ==> ?name=macbook
app.get('/product', (req, res)=>{ 
   // res.send(`${req.query.name}, ${req.query.price} `)
   res.send('GET product')
});

//-------------- POST  ------------------------------
app.post('/product/:id',(req, res)=>{  

    upload(req, res,  (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(`error: ${JSON.stringify(err)}`);
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(`error: ${JSON.stringify(err)}`);
        }

        const fileName = req.file ? req.file.fieldname : undefined
        res.send(`POST Product: ${req.params.id}, ${fileName}`)
      })

});

 
const PORT = process.env.PORT || 1150
app.listen(PORT, ()=> {
    const env = `${process.env.NODE_ENV || 'development'}` //เช็คว่ารัน env ไหน
    console.log(`App listening on port ${PORT} `);
    console.log(`App listening on env ${env}`);
    console.log(`Press Ctrl+C to quit.`);
}) 