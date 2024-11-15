const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum2: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null,
        validate: {
            validator: function(value) {
                
                const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
                return !value || base64Regex.test(value);
            },
            message: 'Invalid image format. Expected base64 string.'
        }
    },
    role: {
        type: String,
        enum: ['guest', 'admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.pre('remove', async function(next) {
    try {

      await Appointment.deleteMany({ userId: this._id });
      next();
    } catch (err) {
      next(err);
    }
  });


UserSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
