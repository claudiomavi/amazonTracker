import { useQuery } from "convex/react";
import StatsHeader from "../components/StatsHeader";
import { api } from "../../convex/_generated/api";
import { ClimbingBoxLoader } from "react-spinners";

export default function Stats() {
  const pedidos = useQuery(api.pedidos.getPedidos);

  const today = new Date();
  const in7Days = new Date();
  in7Days.setDate(today.getDate() + 7);

  const stats = {
    pedidosActivos: 0,
    pendienteReembolso: 0,
    totalActivos: 0,
    totalPendienteRee: 0,
    devProx7Dias: 0,
    devueltos: 0,
    reembolsados: 0,
    totalHistorico: 0,
  };

  pedidos?.forEach((pedido) => {
    const deadline = new Date(pedido.returnDeadline);
    const isReturned = pedido.returned;
    const isRefunded = pedido.refundReceived;
    const installment = Number(pedido.installmentValue.toFixed(2) || 0);

    stats.totalHistorico += installment;

    if (!isReturned && deadline > in7Days) {
      stats.pedidosActivos += 1;
      stats.totalActivos += installment;
    }

    if (isReturned && !isRefunded) {
      stats.pendienteReembolso += 1;
      stats.totalPendienteRee += installment;
    }

    if (!isReturned && deadline <= in7Days) {
      stats.devProx7Dias += 1;
    }

    if (isReturned) {
      stats.devueltos += 1;
    }

    if (isRefunded) {
      stats.reembolsados += 1;
    }
  });

  return (
    <div className="bg h-full">
      <StatsHeader />
      {!pedidos ? (
        <div className="text-muted flex h-[50vh] w-full flex-col items-center justify-center">
          <ClimbingBoxLoader loading color="#fff" className="opacity-40" />
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="text outline-border mx-7 mt-10 flex flex-col rounded-2xl text-lg font-bold outline-1">
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Pedidos Activos</p>
            <p className="text-secondary">{stats.pedidosActivos}</p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Pendientes Reembolso</p>
            <p className="text-primary">{stats.pendienteReembolso}</p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Total activos</p>
            <p className="text-secondary">{stats.totalActivos}€</p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Total pend. ree.</p>
            <p className="text-primary">{stats.totalPendienteRee}€</p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Dev. prox. 7 días</p>
            <p className="text-secondary">{stats.devProx7Dias}</p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Devueltos</p>
            <p className="text-primary">{stats.devueltos} </p>
          </div>
          <div className="border-b-1 border-border bg-light flex w-full justify-between p-4">
            <p>Reembolsados</p>
            <p className="text-secondary">{stats.reembolsados}</p>
          </div>
          <div className="bg-light flex w-full justify-between p-4">
            <p>Total historico</p>
            <p className="text-primary">{stats.totalHistorico}€</p>
          </div>
        </div>
      )}
    </div>
  );
}
