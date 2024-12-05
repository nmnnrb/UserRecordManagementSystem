import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true, unique: true },
    f_Mobile: { type: String, required: true },
    f_Destination: { type: String, required: true},
    f_Gender: { type: String, required: true},
    f_Course: { type: Array, required: true},
    f_CreateDate: { type: Date, default: Date.now() },
    f_Image: { type: String ,default: "placeholder.png"},
    f_UniqueId: { type: Number, default: 1}
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew || user.isModified('name')) {
        // Count the existing users with the same name
        const count = await mongoose.model('User').countDocuments({ f_Name: user.f_Name });
        user.f_UniqueId = count + 1; // 
    }
    next();
});

const User = mongoose.model('User', userSchema);


export default User;
