import fs from 'fs';

/**
 * 
 * @param {string} nome 
 * @param {string} nomePlural 
 */
function criarEndpoint(nome, nomePlural, nomeEmPortugues,nomePluralEmPortugues){
    let texto = `
import { QueryFailedError } from "typeorm";
import { SendEvent } from "../config/index.js";
import ${capitalize(nome)} from "../models/${capitalize(nome)}.js";

export async function save${capitalize(nome)}(req, res, next){
    const ${nome} = new ${capitalize(nome)}(req.body);
    try {
        await SendEvent("Salvando um novo ${nome}");
        await ${nome}.save();
        SendEvent("${capitalize(nome)} salvo com sucesso!", ${nome});
        res.status(201).send(${nome});
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = \`${capitalize(nomeEmPortugues)} '\${${nome}.name}' já existe no Banco de dados e não pode ser cadastrado novamente!\`;
            SendEvent(message, ${nome}, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar ${capitalize(nomeEmPortugues)}", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAll${capitalize(nomePlural)}(req, res) {
    try {
        const all${capitalize(nomePlural)} = await ${capitalize(nome)}.find();
        SendEvent(\`Pegou todas as categoria com sucesso!\`);
        res.status(200).send(all${capitalize(nomePlural)});
    } catch (error) {
        SendEvent("Erro ao pegar ${capitalize(nomePluralEmPortugues)}", error, 'error');
        res.status(500).send(error);
    }
}

export async function get${capitalize(nome)}(req, res) {
    try {
        const ${nome} = await ${capitalize(nome)}.findOneBy({id: req.params.id});
        res.status(200).send(${nome});
        SendEvent(\`Pegou ${capitalize(nomeEmPortugues)} com sucesso!\`, ${nome});
    } catch (error) {
        SendEvent("Erro ao pegar ${capitalize(nomeEmPortugues)}", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}    
    `;
    
    criarArquivo(nome, texto);
}

function criarArquivo(nome, texto){
    let nome_do_arquivo = capitalize(nome);
    fs.appendFile("src/models/" + nome_do_arquivo + ".js", texto,  (error) => {
        if (error) throw error;
        console.log("Log criado com sucesso!");
    });
}

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

criarEndpoint("packageType", "packageTypes", "Tipo de Pacote", "Tipos de Pacote");