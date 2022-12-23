const cliente = require('./dbClient')

//mostrar todos os livros
async function getAllClientes(){
    try{
    const resultado = await cliente.query("select * from Cliente ORDER BY ID_Cliente")
    return resultado.rows
    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
}

//cadastrar novo livro
async function postCliente(Nome,Sobrenome,email,telefone,cpf){
    try{
    await cliente.query(`INSERT INTO 
    Cliente(Nome,Sobrenome,email,telefone,CPF) 
    VALUES('${Nome}','${Sobrenome}','${email}','${telefone}',${cpf})`)

    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
}

//filtrar por autor
async function getCliente(cpf){
    try{
    const resultado = await cliente.query(` SELECT * 
    FROM Cliente
    WHERE CPF = '${cpf}'`)
    console.table(resultado.rows)
    return resultado.rows
    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
}


//excluir livro existente
async function delCliente(cpf){
    try{
    await cliente.query(` DELETE FROM Cliente
    WHERE CPF = ${cpf};`)

    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
}

//atualizar/editar livro
async function putCliente(Nome,Sobrenome,email,telefone,cpf){
    try{
    await cliente.query(`UPDATE Cliente SET  
        Nome = '${Nome}', 
        Sobrenome = '${Sobrenome}',
        email = '${email}',
        telefone = '${telefone}'
        WHERE CPF = ${cpf};`)
    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
    console.log(Nome,Sobrenome,email,telefone,cpf)
}

//excluir conexão
async function endCliente(){
    await cliente.end()
    console.log("Conexão finalizada")
}

//criar tabela
async function postTable(){
    try{
    await cliente.query(`
    drop schema public cascade;
    create schema public;
    CREATE TABLE Cliente 
    (
        ID_Cliente INT GENERATED ALWAYS AS IDENTITY,
        Nome varchar(200),
        Sobrenome varchar(100),
        email varchar(100),
        telefone varchar(100),
        CPF bigint,
        PRIMARY KEY (ID_Cliente)
    );`)

    }
    catch(ex){
        console.log("Ocorreu erro:"+ex)
    }
}


module.exports = {
    getAllClientes,
    getCliente,
    postCliente,
    delCliente,
    putCliente,
    endCliente,
    postTable
}


