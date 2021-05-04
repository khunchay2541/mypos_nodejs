const experss = require('express')
const router = experss.Router()

//upload file
const multerConfig = require('./config/multer_config')
const multer = require('multer')
var upload = multer(multerConfig.config).single(multerConfig.keyUpload)  //ใส่ config //และยอมรับ key photo มา

const db = require('./models')//ตัวติดต่อฐานข้อมูล


//localhost:1150/product?name=macbook&price=1234            //query string ==> ?name=macbook
router.get('/product', async (req, res)=>{ 
   // res.send(`${req.query.name}, ${req.query.price} `)
   try {
     const result = await db.Products.findAll({
       order: [
         ['id','DESC'], //ใส่ option เพิ่ม
       ],
       //attributes :['name','image']
     }); //findAll คือ SELECT *
     res.status(200).json(result) //status ใส่ไม่ใส่ก็ได้ แต่ใส่เพราะเราสามารถพิมเพาะได้
   } catch (error) {
     res.status(500).json({ message: error.message}) //return message เวลาเกิด exception
   }

});

//pass parameter เข้ามาแบบ path 
router.get('/product/:id', async (req, res)=>{ 
  try {
    const result = await db.Products.findOne({
      where: {
        id : req.params.id 
      }
    }); 

    //กรณีไม่มีข้อมูล
    if (result){
      res.status(200).json(result) 
    } else {
      res.status(404).json({message: 'Product not found'})
      //not found 
    }
        
  } catch (error) {
    res.status(500).json({ message: error.message}) 
  }
});



//-------------- POST  ------------------------------
//insert
router.post('/product',(req, res)=>{  

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          //console.log(`error: ${JSON.stringify(err)}`);
          return res.status(500).json({ message: err}) 
        } else if (err) {
         // console.log(`error: ${JSON.stringify(err)}`);
          return res.status(500).json({ message: err}) 
        }
        // const fileName = req.file ? req.file.fieldname : undefined

        const data = {
          ...req.body,
          image: req.file ? req.file.filename : undefined
        }

        //insert
        try {
          const product = await db.Products.create(data)
          res.status(201).json(product) //201 create
        } catch (error) {
          res.status(500).json({ message: error.message}) 
        }
      })
});


module.exports = router