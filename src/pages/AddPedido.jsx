import React, { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import AddPedidoHeader from "../components/AddPedidoHeader";
import { Checkmark } from "react-ionicons";

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
      <form
        action={handleAddPedido}
        className="mt-12 flex w-full flex-col items-center justify-center gap-4"
      >
        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="text"
            placeholder="productName"
            value={newPedido.productname}
            onChange={(e) =>
              setNewPedido((prev) => ({ ...prev, productname: e.target.value }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="number"
            placeholder="amount"
            value={newPedido.amount}
            onChange={(e) =>
              setNewPedido((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="bg-dark outline-border relative flex w-80 flex-col justify-center gap-2 rounded-2xl p-4 outline-1">
          <label htmlFor="deliveryDate" className="text-muted absolute right-8">
            deliveryDate
          </label>
          <input
            id="deliveryDate"
            type="date"
            placeholder="deliveryDate"
            value={newPedido.deliveryDate}
            onChange={(e) =>
              setNewPedido((prev) => ({
                ...prev,
                deliveryDate: e.target.value,
              }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="bg-dark outline-border relative flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <label
            htmlFor="returnDeadline"
            className="text-muted absolute right-8"
          >
            returnDeadline
          </label>
          <input
            id="returnDeadline"
            type="date"
            placeholder="returnDeadline"
            value={newPedido.returnDeadline}
            onChange={(e) =>
              setNewPedido((prev) => ({
                ...prev,
                returnDeadline: e.target.value,
              }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <select
            type=""
            placeholder="paymentType"
            value={newPedido.paymentType}
            onChange={(e) =>
              setNewPedido((prev) => ({ ...prev, paymentType: e.target.value }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          >
            <option value="" defaultValue>
              Seleccionar
            </option>
            <option value="completo">Completo</option>
            <option value="amazon4">Amazon 4</option>
            <option value="klarna3">Klarna 3</option>
          </select>
        </div>

        {newPedido.paymentType !== "completo" &&
          newPedido.paymentType !== "" && (
            <div className="text-muted">
              Valor cuota: {newPedido.installmentValue}€
            </div>
          )}

        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="text"
            placeholder="notes"
            value={newPedido.notes}
            onChange={(e) =>
              setNewPedido((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <button className="bg-primary text mt-6 flex items-center justify-center gap-2 rounded-2xl px-3 py-1.5 text-xl font-bold">
          Guardar
          <Checkmark width="25px" />
        </button>
      </form>
    </div>
  );
}
