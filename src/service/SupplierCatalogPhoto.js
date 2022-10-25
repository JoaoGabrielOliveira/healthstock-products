
import { SendEvent } from "../config/index.js";
import SupplierCatalogPhoto from "../models/SupplierCatalogPhoto.js";

export async function saveSupplierCatalogPhoto(req, res, next){
    const supplierCatalogPhoto = new SupplierCatalogPhoto(req.body);
    supplierCatalogPhoto.supplierCatalogId = req.params.id;
    try {
        await SendEvent(`Salvando um nova foto para 'Catalogo do Fornecedor ${req.params.id}`);
        
        await supplierCatalogPhoto.save();
        SendEvent(`Foto para 'Catalogo do Fornecedor ${req.params.id}' foi salvo com sucesso!`, supplierCatalogPhoto);
        res.status(201).send(supplierCatalogPhoto);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = "Erro com body da requisão!";
            SendEvent(message, supplierCatalogPhoto, 'warn');
            res.status(400).send({message: message, error: error.message});
        } else {
            SendEvent(`Erro ao salvar uma foto para 'Catalogo do Fornecedor ${req.params.id}'`, error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllPhotosOfSupplierCatalog(req, res) {
    try {
        const allSupplierCatalogPhotos = await SupplierCatalogPhoto.find({where: { supplierCatalog: { id: req.params.id}}});
        SendEvent(`Pegou todas as fotos do 'Catalogo do Fornecedor ${req.params.id}' com sucesso!`);
        res.status(200).send(allSupplierCatalogPhotos);
    } catch (error) {
        console.error(error);
        SendEvent(`Erro ao pegar as fotos 'Catalogo do Fornecedor ${req.params.id}'`, error, 'error');
        res.status(500).send(error);
    }
}

export async function getSupplierCatalogPhoto(req, res) {
    try {
        const supplierCatalogPhoto = await SupplierCatalogPhoto.findOneBy({supplierCatalog: { id: req.params.id}, id: req.params.photoId});
        if(!supplierCatalogPhoto)
            throw {message: `Esse ID não existe dentro do 'Catalogo do Fornecedor ${req.params.id}'`};
        res.status(200).redirect(supplierCatalogPhoto.path);
        SendEvent(`Pegou foto ${req.params.photoId} de 'Catalogo do Fornecedor ${req.params.id}' com sucesso!`, supplierCatalogPhoto);
    } catch (error) {
        SendEvent(`Erro ao pegar foto ${req.params.photoId} de 'Catalogo do Fornecedor ${req.params.id}'`, error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}    
    