import { action } from "./_generated/server";
import { api } from "./_generated/api";

const parseDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const daysBetween = (a: Date, b: Date) => {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};

const stripTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const checkAndNotifyPedidos = action({
  args: {},
  handler: async (ctx, args) => {
    const pedidos = await ctx.runQuery(api.pedidos.getPedidos);

    const today = stripTime(new Date());

    for (const pedido of pedidos) {
      const {
        productname,
        returned,
        refundReceived,
        returnDeadline,
        returnDate,
      } = pedido;

      if (!returnDeadline) continue;

      let returnDat: Date | undefined = undefined;

      const returnDead = stripTime(parseDate(returnDeadline));
      if (typeof returnDate === "string") {
        returnDat = stripTime(parseDate(returnDate));
      }
      const daysToReturn = daysBetween(today, returnDead);

      // 🚨 Antes de devolver
      if (!returned) {
        if (daysToReturn === 2) {
          await ctx.runAction(api.sendTelegramMessage.sendTelegramMessage, {
            text: `⏰ Faltan 2 días para devolver: ${productname}`,
          });
        }
        if (daysToReturn === 1) {
          await ctx.runAction(api.sendTelegramMessage.sendTelegramMessage, {
            text: `⚠️ Mañana vence el plazo de devolución: ${productname}`,
          });
        }
        if (daysToReturn === 0) {
          await ctx.runAction(api.sendTelegramMessage.sendTelegramMessage, {
            text: `🚨 HOY es el último día para devolver: ${productname}`,
          });
        }
      }

      // 📦 Después de marcar como devuelto, pero sin reembolso
      if (returned && !refundReceived && returnDat) {
        const daysSinceReturn = daysBetween(returnDat, today);

        if (daysSinceReturn === 4) {
          await ctx.runAction(api.sendTelegramMessage.sendTelegramMessage, {
            text: `📩 Hace 4 días devolviste ${productname}. ¿Ya llegó el reembolso?`,
          });
        }

        if (daysSinceReturn > 4) {
          await ctx.runAction(api.sendTelegramMessage.sendTelegramMessage, {
            text: `🔁 Aún no has marcado como reembolsado: ${productname}`,
          });
        }
      }
    }
  },
});
