import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewRoom = mutation({
  args: {
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("DiscussionsRoom", {
      coachingOption: args.coachingOption,
      topic: args.topic,
      expertName: args.expertName
    });
    return result;
  },
});
