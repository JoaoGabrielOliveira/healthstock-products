import { SendEvent } from "../config/index.js";
import PackageType from "../models/PackageType.js";
    
export async function savePackageType(req, res, next){
    const packagetype = new PackageType(req.body);
    try {
        await SendEvent("Salvando um novo Tipo de Pacote");
        await packagetype.save();
        SendEvent("PackageType salvo com sucesso!", packagetype);
        res.status(201).send(packagetype);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = `Tipo de Pacote '${packagetype.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
            SendEvent(message, packagetype, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar Tipo de Pacote", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllPackageTypes(req, res) {
    try {
        const allPackageTypes = await PackageType.find();
        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allPackageTypes);
    } catch (error) {
        SendEvent("Erro ao pegar Tipos de Pacote", error, 'error');
        res.status(500).send(error);
    }
}

export async function getPackageType(req, res) {
    try {
        const packageType = await PackageType.findOneBy({id: req.params.id});
        res.status(200).send(packageType);
        SendEvent(`Pegou Tipo de Pacote com sucesso!`, packageType);
    } catch (error) {
        SendEvent("Erro ao pegar Tipo de Pacote", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}