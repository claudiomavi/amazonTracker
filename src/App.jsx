import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function App() {
  const [newPedido, setNewPedido] = useState({
    productname: "Cascos Bose",
    amount: 350,
    deliveryDate: "14/07/25",
    returnDeadline: "14/08/25",
    paymentType: "Amazon 4",
    notes: "",
    installmentValue: 87.5,
    returned: false,
    refundReceived: false,
    returnDate: "",
    refundCheckDate: "",
  });
  const pedidos = useQuery(api.pedidos.getPedidos);
  const addPedido = useMutation(api.pedidos.addPedido);

  const handleAddPedido = async () => {
    if (newPedido) {
      try {
        await addPedido({
          productname: newPedido.productname,
          amount: newPedido.amount,
          deliveryDate: newPedido.deliveryDate,
          returnDeadline: newPedido.returnDeadline,
          paymentType: newPedido.paymentType,
          notes: newPedido.notes,
          installmentValue: newPedido.installmentValue,
          returned: newPedido.returned,
          refundReceived: newPedido.refundReceived,
          returnDate: newPedido.returnDate,
          refundCheckDate: newPedido.refundCheckDate,
        });
        setNewPedido({});
      } catch (error) {
        console.log("Error añadiendo un pedido", error);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <button
        onClick={handleAddPedido}
        className="rounded-4xl bg-blue-500 p-12 text-7xl text-white"
      >
        Enviar
      </button>
      {pedidos &&
        pedidos.map((pedido) => (
          <div key={pedido._id}>
            <p>{pedido.productname}</p>
            <p>{pedido.amount}</p>
            <p>{pedido.deliveryDate}</p>
            <p>{pedido.returnDeadline}</p>
            <p>{pedido.paymentType}</p>
            <p>{pedido.notes}</p>
            <p>{pedido.installmentValue}</p>
            <p>{pedido.returned}</p>
            <p>{pedido.refundReceived}</p>
            <p>{pedido.returnDate}</p>
            <p>{pedido.refundCheckDate}</p>
          </div>
        ))}
    </div>
  );
}
