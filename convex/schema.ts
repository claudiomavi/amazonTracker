import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pedidos: defineTable({
    productname: v.string(),
    amount: v.number(),
    deliveryDate: v.string(),
    returnDeadline: v.string(),
    paymentType: v.string(),
    notes: v.string(),
    installmentValue: v.number(),
    returned: v.optional(v.boolean()),
    refundReceived: v.optional(v.boolean()),
    returnDate: v.optional(v.string()),
    refundCheckDate: v.optional(v.string()),
  }),
});
