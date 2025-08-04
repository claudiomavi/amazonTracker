import React from "react";
import { CardOutline, StatsChartOutline } from "react-ionicons";

export default function TabBar({ showPedidosPage, setShowPedidosPage }) {
  return (
    <div className="bg-light fixed bottom-0 z-10 flex w-full items-baseline justify-center gap-36 px-16 pb-7 pt-3.5">
      <div
        onClick={() => setShowPedidosPage(true)}
        className={`${showPedidosPage ? "text-secondary" : "text"} flex flex-col items-center justify-center gap-1`}
      >
        <CardOutline width="25px" />
        <p className="text-xs">Pedidos</p>
      </div>
      <div
        onClick={() => setShowPedidosPage(false)}
        className={`${!showPedidosPage ? "text-secondary" : "text"} flex flex-col items-center justify-center gap-1`}
      >
        <StatsChartOutline className="" width="25px" />
        <p className="text-xs">Stats</p>
      </div>
    </div>
  );
}
