import { StatsChartOutline } from "react-ionicons";

export default function PedidosHeader() {
  return (
    <div className="text flex w-full items-center justify-center p-7">
      <div className="bg-primary flex place-items-center gap-4 rounded-2xl px-2 py-1">
        <StatsChartOutline width="30px" />
        <div className="text-3xl font-semibold">Stats</div>
      </div>
    </div>
  );
}
