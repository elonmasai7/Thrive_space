const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    moodLogs: [{ mood: String, date: { type: Date, default: Date.now } }],
    points: { type: Number, default: 0 },
    completedMissions: [{ task: String, date: { type: Date, default: Date.now } }],
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
