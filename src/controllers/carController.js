const Car = require('../models/carModel')
const File= require('../models/fileModel')
const { deleteFileById } = require('../config/gridFS'); 

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
module.exports.deleteCars = async (req, res, next) => {
    try {
      const { id, ids = [] } = req.body;
  
      // Delete a single car
      if (ids.length === 0 && id) {
        const car = await Car.findById(id);
        if (!car) {
          return res.status(404).json({ message: "Car not found" });
        }
  
        // Delete associated files first (model3D and images)
        if (car.model3D) {
          await deleteFileById(car.model3D);  // Delete 3D model file
          console.log(`Deleted model3D file with ID: ${car.model3D}`);
        }
  
        if (car.images && car.images.length > 0) {
          for (let imageId of car.images) {
            console.log(imageId);
            
            await deleteFileById(imageId);  // Delete image files
            console.log(`Deleted image file with ID: ${imageId}`);
          }
        }
  
        // Now delete the car
        await car.deleteOne();
        return res.status(200).json({ message: "Car and associated files deleted successfully" });
      }
  
      // Delete multiple cars
      if (ids.length > 0) {
        const cars = await Car.find({ _id: { $in: ids } });
  
        if (cars.length === 0) {
          return res.status(404).json({ message: "No cars found" });
        }
  
        // Iterate over each car and delete its associated files
        for (let car of cars) {
          if (car.model3D) {
            await deleteFileById(car.model3D);  // Delete 3D model file
            console.log(`Deleted model3D file with ID: ${car.model3D}`);
          }
  
          if (car.images && car.images.length > 0) {
            for (let imageId of car.images) {
              await deleteFileById(imageId);  // Delete image files
              console.log(`Deleted image file with ID: ${imageId}`);
            }
          }
  
          // Delete the car
          await car.deleteOne();
        }
  
        return res.status(200).json({ message: `${cars.length} cars and their associated files deleted successfully` });
      }
  
    } catch (error) {
      next(error);
    }
  };
  