import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPedidos = query({
  handler: async (ctx) => {
    const pedidos = await ctx.db.query("pedidos").order("desc").collect();
    return pedidos;
  },
});

export const addPedido = mutation({
  args: {
    productname: v.string(),
    amount: v.number(),
    deliveryDate: v.string(),
    returnDeadline: v.string(),
    paymentType: v.string(),
    notes: v.string(),
    installmentValue: v.number(),
    returned: v.boolean(),
    refundReceived: v.boolean(),
    returnDate: v.string(),
    refundCheckDate: v.string(),
  },
  handler: async (ctx, args) => {
    const pedidoId = await ctx.db.insert("pedidos", {
      productname: args.productname,
      amount: args.amount,
      deliveryDate: args.deliveryDate,
      returnDeadline: args.returnDeadline,
      paymentType: args.paymentType,
      notes: args.notes,
      installmentValue: args.installmentValue,
      returned: false,
      refundReceived: false,
      returnDate: "",
      refundCheckDate: "",
    });

    return pedidoId;
  },
});

export const deletePedido = mutation({
  args: { id: v.id("pedidos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateOrder = mutation({
  args: {
    id: v.id("pedidos"),
    updates: v.object({
      productname: v.optional(v.string()),
      amount: v.optional(v.number()),
      deliveryDate: v.optional(v.string()),
      returnDeadline: v.optional(v.string()),
      paymentType: v.optional(v.string()),
      notes: v.optional(v.string()),
      installmentValue: v.optional(v.number()),
      returned: v.optional(v.boolean()),
      refundReceived: v.optional(v.boolean()),
      returnDate: v.optional(v.string()),
      refundCheckDate: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, updates }) => {
    await ctx.db.patch(id, updates);
  },
});
