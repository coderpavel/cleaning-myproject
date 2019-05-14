const Router = require("koa-router");
const router = new Router();
const User = require("../controllers/User");
// test token gen
const TokenGenerator = require("../utils/token/TokenGenerator");
const auth = require("../middleware/auth");

router
  .prefix("/api/auth")

  .post("/:action", async ctx => {
    switch (ctx.params.action) {
      case "registration": {
        const user = User.createUser(ctx.request.body);
        const token = TokenGenerator.sign(user);
        ctx.response.body = token;
        break;
      }
      case "login": {
        console.log(ctx.request.body.email);
        const user = User.findUserWithParam(ctx.request.body.email);
        const token = TokenGenerator.sign(user);
        ctx.response.body = token;
        break;
      }
      default: {
        return ctx.throw(402, "Action not found");
      }
    }
  });

module.exports = router;
