const { ObjectId } = require('mongodb');
const { connectMongo } = require('../config/db'); // Assuming connection logic is here
const { deleteFileById } = require('../config/gridFS'); // Function for GridFS file deletion

const COLLECTION_NAME = 'cars';

module.exports.getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = await connectMongo();
    const car = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

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
    const db = await connectMongo();

    carData.createdAt = new Date();
    carData.updatedAt = new Date();

    const result = await db.collection(COLLECTION_NAME).insertOne(carData);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newCarData = req.body;
    const db = await connectMongo();

    newCarData.updatedAt = new Date();

    const result = await db
      .collection(COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: newCarData },
        { returnDocument: 'after' }
      );

    if (!result.value) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(result.value);
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
      limit = 10,
      skip = 0,
    } = req.body;

    const db = await connectMongo();
    const result = await db
      .collection(COLLECTION_NAME)
      .find(condition)
      .project(select)
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCars = async (req, res, next) => {
  try {
    const { id, ids = [] } = req.body;
    const db = await connectMongo();

    // Delete a single car
    if (ids.length === 0 && id) {
      const car = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }

      // Delete associated files
      if (car.model3D) {
        await deleteFileById(car.model3D);
        console.log(`Deleted model3D file with ID: ${car.model3D}`);
      }

      if (car.images && car.images.length > 0) {
        for (const imageId of car.images) {
          await deleteFileById(imageId);
          console.log(`Deleted image file with ID: ${imageId}`);
        }
      }

      await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ message: 'Car and associated files deleted successfully' });
    }

    // Delete multiple cars
    if (ids.length > 0) {
      const cars = await db
        .collection(COLLECTION_NAME)
        .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
        .toArray();

      if (cars.length === 0) {
        return res.status(404).json({ message: 'No cars found' });
      }

      for (const car of cars) {
        if (car.model3D) {
          await deleteFileById(car.model3D);
          console.log(`Deleted model3D file with ID: ${car.model3D}`);
        }

        if (car.images && car.images.length > 0) {
          for (const imageId of car.images) {
            await deleteFileById(imageId);
            console.log(`Deleted image file with ID: ${imageId}`);
          }
        }

        await db.collection(COLLECTION_NAME).deleteOne({ _id: car._id });
      }

      return res.status(200).json({ message: `${cars.length} cars and their associated files deleted successfully` });
    }
  } catch (error) { 
    next(error);
  }
};
