import { CardOutline } from "react-ionicons";

export default function PedidosHeader({ activeFilter, setActiveFilter }) {
  return (
    <div className="text flex w-full items-center justify-between p-7">
      <div className="bg-primary flex items-center justify-center gap-2 rounded-2xl px-2 py-1">
        <CardOutline width="30px" />
        <div className="text-xl font-semibold">Pedidos</div>
      </div>
      {/* <div className="outline-border flex items-center justify-center gap-4 rounded-2xl px-2 py-1 outline-1">
        <div className="justify-start text-base font-medium text-zinc-100">
          Reembolsados
        </div>
        <ChevronDownOutline width="15px" />
      </div> */}

      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
        className="text outline-border rounded-2xl px-2 py-1 outline-1"
      >
        <option value="todos">Todos</option>
        <option value="pendientes">Pendientes</option>
        <option value="proximos">Próximos 7 días</option>
        <option value="devueltos">Devueltos</option>
        <option value="reembolsados">Reembolsados</option>
      </select>
    </div>
  );
}
