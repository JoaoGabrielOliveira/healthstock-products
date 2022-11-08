export default class ProductErrorHandler {
    static handler(error, product){
        let response = { message:"Aconteceu um erro inesperado", status:500 }

        if(error.code == 'SQLITE_CONSTRAINT')
            response = ProductErrorHandler.constraintError(error.driverError, product);

        return response;
    }

    static constraintError(error, product){
        let message = "Aconteceu um erro inesperado", status = 400;
        if(error.message.match("UNIQUE"))
            message = `Produto '${product.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
        return {message: message, status: status};
    }


} 