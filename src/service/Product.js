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
            let message = `Produto '${product.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
            SendEvent(message, product, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar Produto", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllProducts(req, res) {
    try {
        const allProducts = await Product.find();
        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allProducts);
    } catch (error) {
        SendEvent("Erro ao pegar Produtos", error, 'error');
        res.status(500).send(error);
    }
}

export async function getProduct(req, res) {
    try {
        const product = await Product.findOneBy({id: req.params.id});
        res.status(200).send(product);
        SendEvent(`Pegou Produto com sucesso!`, product);
    } catch (error) {
        SendEvent("Erro ao pegar Produto", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}
