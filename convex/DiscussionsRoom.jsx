import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const getDiscussionRoom = query({
  args: {
    id: v.id("DiscussionsRoom"),
  },
  handler: async (ctx,args) => {
    const result = await ctx.db.get(args.id);
    return result;
  }
  
})