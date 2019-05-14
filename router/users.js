const Router = require("koa-router");
const router = new Router();
const User = require("../controllers/User");


router
  .prefix("/api/users")

  // .post("/", async ctx => {
  //   try {
  //     const user = await User.createUser(ctx.request.body);
  //     ctx.response.body = user;
  //   } catch (error) {
  //     console.log("error", error);
  //     ctx.status = 500;
  //     ctx.body = "Internal error";
  //   }
  // })

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

// для теста

// router.post("/api/token", async ctx => {
//   try {
//     const user = await User.createUser(ctx.request.body);
//     ctx.response.body = { user };

//     const token = TokenGenerator.sign(user);

//     ctx.response.set("x-auth-token", token);
//     ctx.response.body = { token };

//   } catch (error) {
//     console.log("error", error);
//     ctx.status = 500;
//     ctx.body = "Internal error";
//   }
// });

// router.get("/api/token", auth, async ctx => {
//   try {
//     const user = {
//       _id: "_id555",
//       name: "pavel",
//       phone: "+9998909174498"
//       //{ phone, id: (id or null), iat, exp }
//     };

//     const token = TokenGenerator.sign(user);
//     //TODO: Какого он сеттит объект, а не стринг?
//     ctx.response.set("x-auth-token", token);
//     ctx.response.body = { token };
//   } catch (error) {
//     console.log("error", error);
//     ctx.body = "TOKEN ERROR";
//   }
// });

module.exports = router;
