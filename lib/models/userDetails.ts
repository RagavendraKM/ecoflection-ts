import * as mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    acceptedTerms: {
        type: Boolean,
        required: true
    },
    loggedInType: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: undefined
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
        default: undefined
    }
});

export const UserDetails = mongoose.model('userDetails', userDetailsSchema);