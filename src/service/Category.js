import { SendEvent } from "../config/index.js";
import Category from "../models/Category.js";

export async function saveCategory(req, res, next){
    const category = new Category(req.body);
    try {
        await SendEvent("Salvando um novo catalgo");
        await category.save();
        SendEvent("Catalgo salvo com sucesso!", category);
        res.status(201).send(supplier);
    } catch (error) {
        SendEvent("Erro ao salvar catalgo", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    } finally {
        next();
    }
}