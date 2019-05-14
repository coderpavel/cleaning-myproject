const Router = require("koa-router");
const router = new Router();
const User = require("../controllers/User");
// test token generation
const TokenGenerator = require("../utils/token/TokenGenerator");


router
  .prefix("/api/auth")

  .post("/:action", async ctx => {
    switch (ctx.params.action) {
      case "registration": {
        const user = User.createUser(ctx.request.body);
        ctx.response.body = TokenGenerator.sign(user);
        break;
      }
      case "login": {
        const user = User.findUserWithParam(ctx.request.body.email);
        ctx.response.body = await TokenGenerator.sign(user);
        break;
      }
      default: {
        return ctx.throw(402, "Action not found");
      }
    }
  });

module.exports = router;
