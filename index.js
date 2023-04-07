const express = require('express')
const bodyParse = require('body-parser')


const app = express()

app.set('view engine', 'ejs')




app.get('/',(req, res) =>{
    res.send(`Hello World!`)
})


app.listen(8080, () =>{
    console.log('Servidor Rodando Com Sucesso!')
})