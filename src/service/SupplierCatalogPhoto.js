
import { SendEvent } from "../config/index.js";
import SupplierCatalogErrorHandler from "../exception/SupplierCatalogErrorHandler.js";
import SupplierCatalog from "../models/SupplierCatalog.js";
import SupplierCatalogPhoto from "../models/SupplierCatalogPhoto.js";
import SavePhoto from '../strategy/SavePhoto.js';

export async function saveSupplierCatalogPhotos(req, res, next){
    try {
        await SendEvent(`Iniciando: Salvando um nova foto para 'Catalogo do Fornecedor ${req.params.id}`);

        if (!req.files || Object.keys(req.files).length === 0) {
            SendEvent(`Não há fotos para serem salvas!`, {}, 'error');
            return res.status(400).send('Não há fotos para serem salvas!');
        }

        let photos = [];
        for(let i = 0; i < Number.parseInt(req.body.length); i++){
            photos.push(req.files['photo' + i]);
        }

        let supplierCatalogPhotos = [];

        for(let i = 0; i < photos.length; i++){
            supplierCatalogPhotos.push(await saveCatalogPhoto(photos[i], req.params.id, i));
        }
        
        SendEvent(`Fotos para 'Catalogo do Fornecedor ${req.params.id}' foram salvas com sucesso!`, supplierCatalogPhotos);
        res.status(201).send(supplierCatalogPhotos);
    } catch (error) {
        let { message, status} = SupplierCatalogErrorHandler.handler(error);
        SendEvent(message, error, 'error')
        res.status(status).send({message: message, error: error.message});
    } finally {
        next();
    }
}

async function saveCatalogPhoto(photo, id, index = 0){
    let supplierCatalogPhoto = new SupplierCatalogPhoto({supplierCatalogId: id}); 
    try {
        supplierCatalogPhoto.path = SavePhoto.SINGLETON.save(`supplier_catalog_${id}_${index}`, photo);
        await supplierCatalogPhoto.save();
        if(index === 0) setProfilePhoto(id, supplierCatalogPhoto.id);
    } catch (error) {
        throw new SupplierCatalogErrorHandler(error, supplierCatalogPhoto);
    }

    SendEvent(`Foto para 'Catalogo do Fornecedor ${id}' foi salvo com sucesso!`, supplierCatalogPhoto);
    return supplierCatalogPhoto;
}

function setProfilePhoto(catalogId, photoId){
    SupplierCatalog.findOneBy({id: catalogId}).then( catalog => {
        catalog.photo = photoId;
        catalog.save();
    });
}

export async function getAllPhotosOfSupplierCatalog(req, res) {
    try {
        const allSupplierCatalogPhotos = await SupplierCatalogPhoto.find({where: { supplierCatalog: { id: req.params.id}}});
        SendEvent(`Pegou todas as fotos do 'Catalogo do Fornecedor ${req.params.id}' com sucesso!`);
        res.status(200).send(allSupplierCatalogPhotos);
    } catch (error) {
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
    