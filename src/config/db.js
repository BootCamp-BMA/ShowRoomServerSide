const mongoose=require('mongoose')
const {mongoUrl}=require('./config')

const connectMongo=async()=>{
    console.log('... connecting mongo ');
    try {
        mongoose.connect(mongoUrl)
        console.log('-> connected mongo success ');
        

        
    } catch (error) {
        console.error('Error connecting mongo ',error)  
        process.exit(1); 
    }
    
}

module.exports={connectMongo}