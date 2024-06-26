import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
    },

    pizzaTypes: {
        type: [String],
        required: [true, "At least one pizza type is required."],
    },

    size: {
        type: String,
        required: [true, "Size is required."],
    },

    toppings: {
        type: [String],
        required: [true, "At least one topping is required."],
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [1, "Quantity must be at least 1."],
    },

    address: {
        type: String,
        required: [true, "Address is required."],
    },

    deliveryTime: {
        type: String,
        required: [true, "Delivery time is required."],
    },

    totalCost: {
        type: Number,
        required: [true, "Total cost is required."],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
