import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    credits: v.number(),
    subscriptIcon:v.optional(v.string()),
  }),

  DiscussionsRoom: defineTable({
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),
    conversation:v.optional(v.any()),
  }),

});
