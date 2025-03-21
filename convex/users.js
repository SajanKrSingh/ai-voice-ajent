import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { name, email }) => {
    //if user already exists
    const userData = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"),email))
      .collect();
    //if not then add new user
    const data = {
      name:name,
      email:email,
      credits: 50000,
    };
    if (userData.length === 0) {
      const result = await ctx.db.insert("users", {
        ...data,
      });
      return data;
    }
    return userData[0];
  },
});
