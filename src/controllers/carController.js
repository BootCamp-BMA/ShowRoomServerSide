const CarModel = require('../models/carModel'); // Import the Car Model
const {connectMongo} = require('../config/db')
const COLLECTION_NAME = 'cars';

module.exports.getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await CarModel.findById(id); // Use CarModel's findById method

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

module.exports.createCar = async (req, res, next) => {
  try {
    const carData = req.body;

    // Validate required fields
    if (!carData.make || !carData.model || !carData.year) {
      return res.status(400).json({ error: "Make, model, and year are required" });
    }

    // Set default values for optional fields
    carData.color = carData.color || "";
    carData.mileage = carData.mileage || 0;
    carData.fuelType = carData.fuelType || "Other";
    carData.transmission = carData.transmission || "Manual";
    carData.isAvailable = carData.isAvailable !== undefined ? carData.isAvailable : true;
    carData.features = carData.features || [];
    carData.images = carData.images || [];
    carData.model3D = carData.model3D || null;

    // Set timestamps for createdAt and updatedAt
    carData.createdAt = new Date();
    carData.updatedAt = new Date();

    // Connect to the database
    const db = await connectMongo();

    // Insert the car data into the collection
    const result = await db.collection(COLLECTION_NAME).insertOne(carData);

    // Return the insertedId as the response
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error('Error creating car:', error);  // Log the error for debugging
    next(error);
  }
};

module.exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newCarData = req.body;

    // Validate the car data
    if (newCarData.pricePerDay && (typeof newCarData.pricePerDay !== 'number' || newCarData.pricePerDay <= 0)) {
      return res.status(400).json({ error: "pricePerDay must be a positive number" });
    }

    // Use CarModel to update the car
    const updatedCar = await CarModel.update(id, newCarData);

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};

module.exports.getWhere = async (req, res, next) => {
  try {


  const {
      condition = {},
      sort = {},
      select = {},
      limit = 6, // Default value for limit
      skip = 0,   // Default value for skip
    } = req.body;

    // Use user-provided limit and skip values, falling back to defaults if they are not set
    const userLimit = limit || 6;   // Default to 10 if no limit provided
    const userSkip = skip || 0;   

    const cars = await CarModel.getWhere(condition, sort, select, userLimit, userSkip);

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCars = async (req, res, next) => {
  try {
    const { id, ids = [] } = req.body;

    if (ids.length === 0 && id) {
      // Delete a single car
      const deleted = await CarModel.delete(id);

      if (deleted) {
        return res.status(200).json({ message: 'Car and associated files deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Car not found' });
      }
    } else if (ids.length > 0) {
      // Delete multiple cars
      const deletedCount = await CarModel.delete(ids);

      if (deletedCount > 0) {
        return res.status(200).json({ message: `${deletedCount} cars and their associated files deleted successfully` });
      } else {
        return res.status(404).json({ message: 'No cars found' });
      }
    } else {
      return res.status(400).json({ message: 'No IDs provided for deletion' });
    }
  } catch (error) {
    next(error);
  }
};
