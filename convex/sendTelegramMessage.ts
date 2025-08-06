import { v } from "convex/values";
import { action } from "./_generated/server";

export const sendTelegramMessage = action({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error("Variables de entorno de Telegram no configuradas");
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: args.text,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al enviar mensaje:", errorText);
      throw new Error("No se pudo enviar el mensaje a Telegram");
    }

    return await res.json();
  },
});
