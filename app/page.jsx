import OrderForm from "@/components/OrderForm";

export default function Home() {
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">Order Pizza</h1>
            <p>Please fill in the form below to place your order</p>

            <OrderForm />
        </div>
    );
}
