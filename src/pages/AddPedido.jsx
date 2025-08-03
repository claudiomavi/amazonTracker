import React, { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import AddPedidoHeader from "../components/AddPedidoHeader";
import { Checkmark } from "react-ionicons";
import PedidoForm from "../components/PedidoFrom";

export default function AddPedido({ setOpenAddPedido }) {
  const [newPedido, setNewPedido] = useState({
    productname: "",
    amount: 0,
    deliveryDate: "",
    returnDeadline: "",
    paymentType: "",
    notes: "",
    installmentValue: 0,
  });
  const addPedido = useMutation(api.pedidos.addPedido);

  useEffect(() => {
    const { amount, paymentType } = newPedido;
    let cuotas = 1;

    if (paymentType === "amazon4") cuotas = 4;
    else if (paymentType === "klarna3") cuotas = 3;

    const valor = amount && cuotas ? amount / cuotas : 0;

    setNewPedido((prev) => ({
      ...prev,
      installmentValue: Number(valor.toFixed(2)),
    }));
  }, [newPedido.amount, newPedido.paymentType]);

  const handleAddPedido = async () => {
    if (newPedido) {
      try {
        await addPedido({ ...newPedido });
        setNewPedido({
          productname: "",
          amount: 0,
          deliveryDate: "",
          returnDeadline: "",
          paymentType: "",
          notes: "",
          installmentValue: 0,
        });
        setOpenAddPedido(false);
      } catch (error) {
        console.log("Error añadiendo un pedido", error);
      }
    }
  };

  return (
    <div className="bg z-20 h-full w-full">
      <AddPedidoHeader setOpenAddPedido={setOpenAddPedido} />
      <PedidoForm
        pedido={newPedido}
        setPedido={setNewPedido}
        action={handleAddPedido}
        buttonText="Guardar"
        eliminate={false}
      />
    </div>
  );
}
