import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Comprobar pedidos y enviar notificaciones",
  {
    hourUTC: 8, // Hora UTC (8 = 10:00 en España durante horario de verano)
    minuteUTC: 0,
  },
  api.checkAndNotifyPedidos.checkAndNotifyPedidos,
);

export default crons;
