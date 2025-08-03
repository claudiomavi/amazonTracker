import { useMutation } from "convex/react";
import { useEffect } from "react";
import { Checkmark, TrashOutline } from "react-ionicons";
import { api } from "../../convex/_generated/api";

export default function PedidoForm({
  pedido,
  setPedido,
  action,
  buttonText,
  eliminate,
}) {
  const deletePedido = useMutation(api.pedidos.deletePedido);

  useEffect(() => {
    const { amount, paymentType } = pedido;
    let cuotas = 1;

    if (paymentType === "amazon4") cuotas = 4;
    else if (paymentType === "klarna3") cuotas = 3;

    const valor = amount && cuotas ? amount / cuotas : 0;

    setPedido((prev) => ({
      ...prev,
      installmentValue: Number(valor.toFixed(2)),
    }));
  }, [pedido.amount, pedido.paymentType]);

  const handleDeletePedido = async (id) => {
    if (pedido) {
      try {
        await deletePedido({ id });
        setPedido(null);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("No se encuentra el pedido");
    }
  };

  return (
    <div className="bg z-20 h-full w-full">
      <form
        action={action}
        className="mt-12 flex w-full flex-col items-center justify-center gap-4"
      >
        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="text"
            placeholder="productName"
            value={pedido.productname}
            onChange={(e) =>
              setPedido((prev) => ({ ...prev, productname: e.target.value }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="number"
            placeholder="amount"
            value={pedido.amount}
            onChange={(e) =>
              setPedido((prev) => ({
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
            value={pedido.deliveryDate}
            onChange={(e) =>
              setPedido((prev) => ({
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
            value={pedido.returnDeadline}
            onChange={(e) =>
              setPedido((prev) => ({
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
            value={pedido.paymentType}
            onChange={(e) =>
              setPedido((prev) => ({ ...prev, paymentType: e.target.value }))
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

        {pedido.paymentType !== "completo" && pedido.paymentType !== "" && (
          <div className="text-muted">
            Valor cuota: {pedido.installmentValue}€
          </div>
        )}

        <div className="bg-dark outline-border flex w-80 flex-col items-center justify-center gap-2 rounded-2xl p-4 outline-1">
          <input
            type="text"
            placeholder="notes"
            value={pedido.notes}
            onChange={(e) =>
              setPedido((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="bg-light text-muted self-stretch rounded-2xl px-4 py-2"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          {eliminate && (
            <button
              type="button"
              className="bg-danger text mt-6 flex items-center justify-center gap-2 rounded-2xl px-3 py-1.5 text-xl font-bold"
              onClick={() => handleDeletePedido(pedido._id)}
            >
              Eliminar
              <TrashOutline width="25px" />
            </button>
          )}
          <button className="bg-primary text mt-6 flex items-center justify-center gap-2 rounded-2xl px-3 py-1.5 text-xl font-bold">
            {buttonText}
            <Checkmark width="25px" />
          </button>
        </div>
      </form>
    </div>
  );
}
