require('dotenv').config();

const secretKey=process.env.SECRET_KEY
const mongoUrl=process.env.DB_URL


module.exports={secretKey,mongoUrl}