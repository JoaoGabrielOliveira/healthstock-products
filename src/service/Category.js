import { QueryFailedError } from "typeorm";
import { SendEvent } from "../config/index.js";
import Category from "../models/Category.js";

export async function saveCategory(req, res, next){
    const category = new Category(req.body);
    try {
        await SendEvent("Salvando um novo catalgo");
        await category.save();
        SendEvent("Catalgo salvo com sucesso!", category);
        res.status(201).send(category);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = `Categoria '${category.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
            SendEvent(message, category, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar Categoria", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllCategories(req, res) {
    try {
        const allCategories = await Category.find();
        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allCategories);
    } catch (error) {
        SendEvent("Erro ao pegar Categorias", error, 'error');
        res.status(500).send(error);
    }
}

export async function getCategory(req, res) {
    try {
        const category = await Category.findOneBy({id: req.params.id});
        res.status(200).send(category);
        SendEvent(`Pegou Categoria com sucesso!`, category);
    } catch (error) {
        SendEvent("Erro ao pegar Categoria", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}
