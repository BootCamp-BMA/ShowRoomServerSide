const Car = require('../models/carModel')

module.exports.getCarById=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const car = await Car.findById(id)
        if(!car){
            return res.status(404).json({message:'car not found'})
        }
        res.status(200).json(car);

        
    } catch (error) {
        next(error);
    }
}

module.exports.createCar=async(req,res,next)=>{
    try {
        const carData=req.body
        const newCar = new Car(carData)
        const savedCar=await newCar.save();
        res.status(201).json(savedCar)


    } catch (error) {
        next(error)
    }
}

module.exports.updateCar=async(req,res,next)=>{

    try {
        const {id}=req.params
        const newCarData=req.body
        const updatedCar= await Car.findByIdAndUpdate(id,newCarData,{new:true,runValidators:true});
        if (!updatedCar) 
            return    res.status(404).json({message:"car not found"});
        
        res.status(200).json(updatedCar)


    } catch (error) {
        next(error)
    }
}


module.exports.getWhere=async(req,res,next)=>{
    try {
        const {
            condition={},
            sort={},
            select='',
            limit=1,
            skip=0
        } =req.body
        const result = await Car.find(condition)
                                .sort(sort)
                                .select(select)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit))
        res.json(result)
        
    } catch (error) {
        next(error)
    }
}
module.exports.deleteCars=async(req,res,next)=>{
    try {
        const id = req.body.id;
        const {ids=[]}=req.body

        if(ids.length===0 && id ){
            const car = await Car.findByIdAndDelete(id)
            if(!car)
                return res.status(404).json({message:"car not found "})
            return res.status(200).json({message:"deleted succesfully"})   
        }
        const result =await Car.deleteMany({_id:{$in:ids}})
        if(result.deletedCount===0)
            return res.status(404).json({message:"no car found "})
        return res.status(200).json({message:`${result.deletedCount} cars deleted `});


    } catch (error) {
        next(error)
    }
}