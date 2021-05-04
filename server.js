const express = require('express') //require express จาก nodemodule มายัดตัวแปร express สรา้งเป็นค่าคงที่
const app = express() // new obj มาให้ตัว app อีกที //หลังจากนั้นตัวแปร app จะเป็นตัวจัดการให้แล้ว



//middle ware--------------------------------------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false})) //x-www-form-urlencoded //ถ้าแบบ false จะเป็นแบบ  {key: value} 
//แต่ถ้าแบบ true จะเป็นการสนใจ nested data structure คือการมี obj ซ้อน {xxx: {aaa:bbb}}

 app.use(require('./controller'))

 
const PORT = process.env.PORT || 1150
app.listen(PORT, ()=> {
    const env = `${process.env.NODE_ENV || 'development'}` //เช็คว่ารัน env ไหน
    console.log(`App listening on port ${PORT} `);
    console.log(`App listening on env ${env}`);
    console.log(`Press Ctrl+C to quit.`);
}) 