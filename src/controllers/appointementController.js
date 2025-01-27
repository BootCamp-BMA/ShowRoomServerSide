const AppointmentModel = require('../models/AppointementModel');
const UserModel = require('../models/userModel');
const CarModel = require('../models/carModel');

module.exports.createAppointment = async (req, res, next) => {
  try {
    const appointmentData = req.body;

    // Check if the user exists
    const userExists = await UserModel.findById(appointmentData.userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the car exists
    const carExists = await CarModel.findById(appointmentData.carId);
    if (!carExists) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Create the new appointment
    const newAppointment = await AppointmentModel.create(appointmentData);

    // Send the response with the new appointment details
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

module.exports.getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Assuming you want user and car details separately
    const user = await UserModel.findById(appointment.userId);
    const car = await CarModel.findById(appointment.carId);

    res.status(200).json({ appointment, user, car });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newAppointmentData = req.body;

    // Validate user and car before updating
    if (newAppointmentData.userId) {
      const userExists = await UserModel.findById(newAppointmentData.userId);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    if (newAppointmentData.carId) {
      const carExists = await CarModel.findById(newAppointmentData.carId);
      if (!carExists) {
        return res.status(404).json({ message: 'Car not found' });
      }
    }

    // Update the appointment
    const isUpdated = await AppointmentModel.update(id, newAppointmentData);
    
    if (!isUpdated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getAppointmentsWhere = async (req, res, next) => {
  try {
    const { condition = {}, sort = {}, select = '', limit = 10, skip = 0 } = req.body;

    const appointments = await AppointmentModel.findWhere(condition, sort, limit, skip);

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
    const { id, ids = [] } = req.body;

    if (!id && ids.length === 0) {
      return res.status(400).json({ message: 'No valid appointment ID provided' });
    }

    if (ids.length === 0 && id) {
      const isDeleted = await AppointmentModel.delete(id);
      if (!isDeleted) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    }

    const deletedCount = await AppointmentModel.deleteMany(ids);
    if (deletedCount === 0) { 
      return res.status(404).json({ message: 'Appointments not found' });
    }

    res.status(200).json({ message: `${deletedCount} appointments deleted successfully` });
  } catch (error) {
    next(error);
  }
};
