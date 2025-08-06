import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Comprobar pedidos y enviar notificaciones",
  {
    hourUTC: 20, // Hora UTC (7 = 09:00 en España durante horario de verano)
    minuteUTC: 15,
  },
  api.checkAndNotifyPedidos.checkAndNotifyPedidos,
);

export default crons;
