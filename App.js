const express = require ('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require("./routers/rotas")


const PORTA = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
routes(app);

const server = app.listen(PORTA, function(){
    console.log(`Servidor de pé em http://localhost:${server.address().port}`)
    console.log('Para desligar o servidor: Crtl + c');
})
