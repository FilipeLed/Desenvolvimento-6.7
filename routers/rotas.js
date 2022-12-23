const DB = require('./DB')
const express = require ('express')
const faker = require('faker');

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({message: "Bem vindo!"})
    })
    //Mostrar cadastrado
    app.route('/usuario/:cpf').get(async(req,res) => {
        const cpf = parseInt(req.params.cpf,10);
        const mostrarcliente = await DB.getCliente(cpf)
        if (mostrarcliente) {
            res.status(200).send(mostrarcliente)
        } else {
        res.sendStatus(204)
        }
    });
    //Criar N cadastrados de N clientes
    app.route('/cadastrar/:num').post((req,res) => {
        let num = req.params.num;

        if(isFinite(num) && num > 0){
            for (i=0; i <= num-1; i++){
                Nome = faker.name.firstName();
                Sobrenome = faker.name.lastName();
                email = faker.internet.email();
                telefone = faker.phone.phoneNumberFormat();
                cpf = faker.datatype.number({min:11111111111, max:100000000000})
                DB.postCliente(Nome,Sobrenome,email,telefone,cpf) 
                
            }
            res.status(201).send(`Clientes inseridos com sucesso`);
        }else{
         res.status(400).send({message: 'Número de clientes invalido'});   
        }
    });
    //Ver clientes cadastrados
    app.route('/cadastrados').get(async(req,res) => {
        const mostrarClientes = await DB.getAllClientes()
        if (mostrarClientes) {
            res.status(200).json(mostrarClientes)
        } else {
            res.sendStatus(204)
        }
    })

    //formatar tabelas existentes e criar uma nova
    app.route('/criarTabela').get(async(req,res) => {
        await DB.postTable();
        res.status(200).send({message: "Tabela criada!"})
    })

    //atualizar cliente já existente
    app.route('/clientes/atualizar/:cpf').put(async(req,res) => {
        let cliente = req.body;
        let cpf = parseInt(req.params.cpf,10);
        await DB.putCliente(cliente.Nome,cliente.Sobrenome,cliente.email,cliente.telefone,cpf)
        res.status(200).json(`Cliente atualizado com sucesso`);
    })

    //atualizar cliente já existente
    app.route('/clientes/excluir/:cpf').delete(async(req,res) => {
        let cpf = parseInt(req.params.cpf,10);
        await DB.delCliente(cpf)
        res.status(200).json(`Cliente excluido com sucesso`);
    })

    //Criar um cliente manualmente 
    app.route('/cadastrar').post((req,res) => {
        const cliente = req.body;
        DB.postCliente(cliente.Nome,cliente.Sobrenome,cliente.email,cliente.telefone,cliente.CPF);
        res.status(201).send(`Cliente inserido com sucesso`);
    });
}

module.exports = routes