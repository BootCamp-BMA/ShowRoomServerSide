require('dotenv').config();

const secretKey=process.env.SECRET_KEY
const mongoUrl=process.env.DB_URL
const imageMaxSize=parseInt(process.env.IMAGE_MAX_SIZE_MB)
const model3dMaxSize=parseInt(process.env.MODEL3D_MAX_SIZE_MB)



module.exports={secretKey,mongoUrl,imageMaxSize,model3dMaxSize}