const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationNumber: {
        type: Number,
    },
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: "Location",
        },
    ],
})

userSchema.pre("save", async function(next) {
    if(this.isNew || this.isModified("password")) {
        const saltRoundsToApply = 10;
        this.password = await bcrypt.hash(this.password, saltRoundsToApply);
    };

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;