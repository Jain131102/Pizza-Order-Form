import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
    const { name, email, pizzaTypes, size, toppings, quantity, address, deliveryTime, totalCost } = await req.json();

    console.log("Received data: ", { name, email, pizzaTypes, size, toppings, quantity, address, deliveryTime, totalCost });

    try {
        await connectDB();
        const newOrder = await Order.create({ name, email, pizzaTypes, size, toppings, quantity, address, deliveryTime, totalCost });
        console.log("Order saved: ", newOrder);

        return NextResponse.json({
            msg: ["Order placed successfully"],
            success: true,
            totalCost: newOrder.totalCost,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({ msg: errorList });
        } else {
            console.log(error);
            return NextResponse.json({
                msg: ["Unable to place order."]
            });
        }
    }
}
