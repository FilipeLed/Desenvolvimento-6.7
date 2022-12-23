const Client = require('pg').Client
const cliente = new Client({

    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "softex_desemvolvimentos",
    password: "1625"

})
console.log("iniciando a conexão...")
cliente.connect()
console.log("Conexão bem sucedida!")
module.exports = cliente