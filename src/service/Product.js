import Product from "../models/Product.js";
import ProductPhoto from '../models/ProductPhoto.js';
import { SendEvent } from '../config/index.js';
import { Like } from "typeorm";
import ProductErrorHandler from "../exception/ProductErrorHandler.js";
import SavePhoto from "../strategy/SavePhoto.js";

export async function saveProduct(req, res, next){
    const product = new Product(req.body);
    try {
        await SendEvent("Salvando um novo produto");
        await product.save();
        SendEvent(`Produto '${product.name}' salvo com sucesso!`, product);
        res.status(201).send(product);
    } catch (error) {
        let responseError = ProductErrorHandler.handler(error, product);
        SendEvent("Erro ao salvar Produto", error, 'error');
        res.status(responseError.status).send({message: responseError.message});

    } finally {
        next();
    }
}

export async function getAllProducts(req, res) {
    try {
        const { limit, offset, total, search } = req.query;
        const relations = {
            productPhoto: true
        };

        if(total == ""){
            res.status(200).send({total: await Product.count()});
            return;
        }

        if(search){
            const searchProducts = await Product.findAndCount({
                take: limit,
                skip: offset,
                order: {
                    name: 'ABC'
                },
                where: {
                    name: Like(`%${search.trim()}%`),
                },
                relations: relations
            });
            

            res.status(200).send(searchProducts);
            return;
        }

        const allProducts = await Product.find({
            take: limit,
            skip: offset,
            relations: relations
        });

        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allProducts);
    } catch (error) {
        SendEvent("Erro ao pegar Produtos", error, 'error');
        res.status(500).send({error: error.message});
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

export async function uploadPhoto(req, res){
    if (!req.files || Object.keys(req.files).length === 0) {
        SendEvent(`N??o h?? fotos para serem salvas!`, {}, 'error');
        return res.status(400).send('N??o h?? fotos para serem salvas!');
    }

    let photoFile = req.files.photo;

    try {
        let productPhoto = new ProductPhoto();
        let name = 'product_' + req.params.id;
        productPhoto.path = SavePhoto.SINGLETON.save(name, photoFile);
        await productPhoto.save();
        SendEvent("Imagem para Produto id=" + req.params.id + " foi salva com sucesso!", productPhoto);
        
        SendEvent("Atualizando Produto id=" + req.params.id + " para receber imagem!", {});
        let product = await Product.findOneBy({id: req.params.id});
        product.productPhoto = productPhoto;
        await product.save();

        SendEvent("Produto id=" + req.params.id + " foi atualizado com sucesso!", {});

        res.status(201).send(productPhoto);
    } catch (error) {
        SendEvent("Erro ao salvar imagem para Produto id=" + req.params.id, error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }

}