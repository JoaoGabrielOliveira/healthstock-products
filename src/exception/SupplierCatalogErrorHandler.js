export default class SupplierCatalogErrorHandler extends Error {
    product; code;

    constructor(error, product){
        super(error.message);
        this.code = error.code;
        this.product = product;
    }

    static handler(error){
        let response = { message:"Aconteceu um erro inesperado", status:500 }

        if(error.code == 'SQLITE_CONSTRAINT')
            response = SupplierCatalogErrorHandler.constraintError(error.driverError);
        if(error.product)
            response = SupplierCatalogErrorHandler.productError(error);

        return response;
    }

    static constraintError(error){
        let message = "Aconteceu um erro inesperado", status = 400;
        //if(error.message.match("UNIQUE"))
        //message = `Produto '${product.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;

        return {message: message, status: status};
    }

    static productError(error){
        `Erro ao salvar ${photo.name} foto para 'Catalogo do Fornecedor ${req.params.id}'`
        return { message:"Aconteceu um erro inesperado", status:500 }
    }


} 