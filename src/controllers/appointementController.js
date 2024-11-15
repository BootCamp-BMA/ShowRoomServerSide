const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Car = require('../models/carModel');


module.exports.createAppointment = async (req, res, next) => {
  try {
    const appointmentData = req.body;


    const userExists = await User.findById(appointmentData.userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const carExists = await Car.findById(appointmentData.carId);
    if (!carExists) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const newAppointment = new Appointment(appointmentData);
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    next(error);
  }
};

module.exports.getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate('userId').populate('carId');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};


module.exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newAppointmentData = req.body;

 
    if (newAppointmentData.userId) {
      const userExists = await User.findById(newAppointmentData.userId);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    if (newAppointmentData.carId) {
      const carExists = await Car.findById(newAppointmentData.carId);
      if (!carExists) {
        return res.status(404).json({ message: 'Car not found' });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, newAppointmentData, { new: true, runValidators: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);

  } catch (error) {
    next(error);
  }
};


module.exports.getAppointementWhere = async (req, res, next) => {
  try {
    const { condition = {}, sort = {}, select = '', limit = 10, skip = 0 } = req.body;

    const parsedLimit = Number.isInteger(parseInt(limit)) ? parseInt(limit) : 10;
    const parsedSkip = Number.isInteger(parseInt(skip)) ? parseInt(skip) : 0;

    const appointments = await Appointment.find(condition)
      .sort(sort)
      .select(select)
      .skip(parsedSkip)
      .limit(parsedLimit);

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    res.status(200).json(appointments);

  } catch (error) {
    next(error);
  }
};


module.exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { ids = [] } = req.body;

    if (!id && ids.length === 0) {
      return res.status(400).json({ message: 'No valid appointment ID provided' });
    }

    if (ids.length === 0 && id) {
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    }

    const result = await Appointment.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'appointement not found ' });
    }

    res.status(200).json({ message: `${result.deletedCount} appointments deleted successfully`});
  } catch (error) {
    next(error);
  }
};
