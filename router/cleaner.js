const Router = require("koa-router");
const router = new Router();
const Cleaner = require("../controllers/Cleaner");

router
  .prefix("/api/cleaner")

    .post("/", async ctx => {
        try {
            const user = await User.createUser(ctx.request.body);
            ctx.response.body = user;
        } catch (error) {
            console.log("error", error);
            ctx.status = 500;
            ctx.body = "Internal error";
        }
    })

    .get("/", async ctx => {
        try {
            const users = await User.getUsers();
            ctx.response.body = users;
        } catch (error) {
            console.log("error", error);
            ctx.status = 402;
            ctx.body = "Users not found";
        }
    })

    .get("/:id", async ctx => {
        try {
            const user = await User.getUser(ctx.params.id);
            ctx.response.body = user;
        } catch (error) {
            console.log("error", error);
            ctx.status = 402;
            ctx.body = "User not found";
        }
    })

    .put("/:id", async ctx => {
        try {
            const user = await User.updateUser(ctx.params.id, ctx.request.body);
            ctx.response.body = user;
        } catch (error) {
            console.log("error", error);
            ctx.status = 402;
            ctx.body = "Users not found";
        }
    })

    .delete("/:id", async ctx => {
        try {
            const removedUser = await User.removeUser(ctx.params.id);
            ctx.response.body = removedUser;
        } catch (error) {
            console.log("error", error);
            ctx.status = 402;
            ctx.body = "Users not found";
        }
    });