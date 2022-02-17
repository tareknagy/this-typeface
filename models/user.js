const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { projects } = require('../controllers/api/users');

SALT_ROUNDS = 6;

const projectSchema = new Schema ({
    name: {type: String, required: true},
    typefaces: {type: Array}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    favorites: {
        type: Array
    },
    projects: [projectSchema]
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret
        }
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    // password changed:
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
    });
});

userSchema.statics.getUser = async function(userId) {
    return this.findOne({_id: userId})
}

userSchema.statics.getProject = async function(projectID) {
    return this.findOne({"projects._id": projectID}, "projects._id projects.typefaces projects.name")
}

module.exports = mongoose.model('User', userSchema);