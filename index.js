const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))



app.get('/', (req, res) =>{
    res.render('index')
})


app.listen(8080, () =>{
    console.log('Servidor Rodando Com Sucesso!')
})