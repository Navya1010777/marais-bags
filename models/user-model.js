

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "product-model"
    }],
    isAdmin: Boolean,
    orders: [{
        type: mogooose.Schema.Types.ObjectID,

    }],
    contact: Number,
    picture: String
});

module.exports = mongoose.model("user", userSchema);