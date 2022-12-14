import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST:process.env.HOST || "http://localhost",
    PORT:process.env.PORT || 8090,
    LOG_ENDPOINT: process.env.LOG || 'http://localhost:10000',
    PHOTO_PATH: process.env.PHOTO_PATH || "/public/",

    /**
 * As variaveis DATABASE_TYPE e DATABASE_URL estão sendo settedas no arquivo .env
 */
    DATABASE_TYPE:"sqlite",

    /**
     * As variaveis DATABASE_TYPE e DATABASE_URL estão sendo settedas no arquivo .env
     */
    DATABASE_URL:"src/database/database.sqlite"
}