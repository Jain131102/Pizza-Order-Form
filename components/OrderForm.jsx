"use client";

import { useState, useEffect } from "react";

// Assuming costs for different pizzas
const pizzaCosts = {
    "Margherita": 200,
    "Farm House": 300,
    "Peppy Paneer": 250,
    "Veg Extravaganza": 280,
    "Chicken Dominator": 350,
    "Chicken Sausage": 320,
    "Chicken Pepperoni": 330,
    "Keema Do Pyaza": 360,
};

export default function OrderForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [size, setSize] = useState("Medium");
    const [toppings, setToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    // Update total cost whenever pizza types, size, or quantity changes
    useEffect(() => {
        let cost = 0;
        pizzaTypes.forEach(type => {
            cost += pizzaCosts[type] * quantity;
        });
        setTotalCost(cost);
    }, [pizzaTypes, size, quantity]);

    const handlePizzaTypeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPizzaTypes(prev => [...prev, value]);
        } else {
            setPizzaTypes(prev => prev.filter(type => type !== value));
        }
    };

    const handleToppingsChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setToppings(prev => [...prev, value]);
        } else {
            setToppings(prev => prev.filter(topping => topping !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                pizzaTypes,
                size,
                toppings,
                quantity,
                address,
                deliveryTime,
                totalCost,
            }),
        });

        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);

        if (success) {
            setName("");
            setEmail("");
            setPizzaTypes([]);
            setSize("Medium");
            setToppings([]);
            setQuantity(1);
            setAddress("");
            setDeliveryTime("");
            setTotalCost(0);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="shadow-md px-6 py-2 border border-slate-300"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="john@gmail.com"
                        className="shadow-md px-6 py-2 border border-slate-300"
                    />
                </div>

                <div>
                    <label>Pizza Types</label>
                    <div className="flex flex-wrap gap-2">
                        <div>
                            <input
                                type="checkbox"
                                value="Margherita"
                                id="pizza-margherita"
                                checked={pizzaTypes.includes("Margherita")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-margherita">Margherita - ₹200</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="Farm House"
                                id="pizza-farm-house"
                                checked={pizzaTypes.includes("Farm House")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-farm-house">Farm House - ₹300</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="Peppy Paneer"
                                id="pizza-peppy-paneer"
                                checked={pizzaTypes.includes("Peppy Paneer")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-peppy-paneer">Peppy Paneer - ₹250</label>
                        </div><div>
                            <input
                                type="checkbox"
                                value="Veg Extravaganza"
                                id="pizza-veg-extravaganza"
                                checked={pizzaTypes.includes("Veg Extravaganza")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-veg-extravaganza">Veg Extravaganza - ₹280</label>
                        </div><div>
                            <input
                                type="checkbox"
                                value="Chicken Dominator"
                                id="pizza-chicken-dominator"
                                checked={pizzaTypes.includes("Chicken Dominator")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-chicken-dominator">Chicken Dominator - ₹350</label>
                        </div><div>
                            <input
                                type="checkbox"
                                value="Chicken Sausage"
                                id="pizza-chicken-sausage"
                                checked={pizzaTypes.includes("Chicken Sausage")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-chicken-sausage">Chicken Sausage - ₹320</label>
                        </div><div>
                            <input
                                type="checkbox"
                                value="Chicken Pepperoni"
                                id="pizza-chicken-pepperoni"
                                checked={pizzaTypes.includes("Chicken Pepperoni")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-chicken-pepperoni">Chicken Pepperoni - ₹330</label>
                        </div><div>
                            <input
                                type="checkbox"
                                value="Keema Do Pyaza"
                                id="pizza-keema-do-pyaza"
                                checked={pizzaTypes.includes("Keema Do Pyaza")}
                                onChange={handlePizzaTypeChange}
                            />
                            <label htmlFor="pizza-keema-do-pyaza">Keema Do Pyaza - ₹360</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="size">Size</label>
                    <select
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                        id="size"
                        className="shadow-md px-6 py-2 border border-slate-300"
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                <div>
                    <label>Toppings</label>
                    <div className="flex flex-wrap gap-2">
                        <div>
                            <input
                                type="checkbox"
                                value="Cheese"
                                id="topping-cheese"
                                checked={toppings.includes("Cheese")}
                                onChange={handleToppingsChange}
                            />
                            <label htmlFor="topping-cheese">Cheese</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="Pepperoni"
                                id="topping-pepperoni"
                                checked={toppings.includes("Pepperoni")}
                                onChange={handleToppingsChange}
                            />
                            <label htmlFor="topping-pepperoni">Pepperoni</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="Onion"
                                id="topping-onion"
                                checked={toppings.includes("Onion")}
                                onChange={handleToppingsChange}
                            />
                            <label htmlFor="topping-onion">Onion</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="Tomato"
                                id="topping-tomato"
                                checked={toppings.includes("Tomato")}
                                onChange={handleToppingsChange}
                            />
                            <label htmlFor="topping-tomato">Tomato</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        type="number"
                        id="quantity"
                        min="1"
                        className="shadow-md px-6 py-2 border border-slate-300"
                    />
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <textarea
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="h-32 shadow-md px-6 py-2 border border-slate-300"
                        id="address"
                        placeholder="Type your address here..."
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="deliveryTime">Preferred Delivery Time</label>
                    <input
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        value={deliveryTime}
                        type="time"
                        id="deliveryTime"
                        className="shadow-md px-6 py-2 border border-slate-300"
                    />
                </div>

                <div>
                    <label>Total Cost</label>
                    <div>₹{totalCost}</div>
                </div>

                <button className="bg-green-700 p-3 text-white font-bold" type="submit">
                    Order
                </button>
            </form>

            <div className="bg-slate-100 flex flex-col">
                {error && (
                    <div className={`₹{success ? "text-green-800" : "text-red-600"} px-5 py-2`}>
                        {error}
                    </div>
                )}
            </div>
        </>
    );
}
