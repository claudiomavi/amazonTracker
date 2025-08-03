import { Add, Close } from "react-ionicons";

export default function AddPedidoHeader() {
  return (
    <div className="text flex w-full items-center justify-between p-7">
      <div className="bg-primary flex items-center justify-center gap-2 rounded-2xl px-2 py-1">
        <Add width="40px" />
        <div className="text-xl font-semibold">Añadir pedido</div>
      </div>
      <Close width="40px" color="#fff" />
    </div>
  );
}
