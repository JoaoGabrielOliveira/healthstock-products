import Product from "../models/Product.js";
import { SendEvent } from '../config/index.js';

export async function saveProduct(req, res, next){
    const product = new Product(req.body);
    try {
        await SendEvent("Salvando um novo catalgo");
        await product.save();
        SendEvent("Catalgo salvo com sucesso!", product);
        res.status(201).send(product);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = `Categoria '${product.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
            SendEvent(message, product, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar Categoria", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}