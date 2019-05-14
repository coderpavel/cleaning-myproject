//import { Context } from "koa";
const { getTokenFromHeader } = require("../utils/token/UserAuthManager");
const TokenGenerator = require("../utils/token/TokenGenerator");
const jwtSettings = require("../configs/config.json").jwt;

// Don't do redundant work for these paths
// TODO: /code/token/verify routes (из тз), если правильно
const noAuthPrefixes = [
  "/api/auth/",
  "/api/attendant/",
  "/api/signin/",
  "/api/signup/",
  "/api/refreshtoken"
];

async function authMiddleware(ctx, next) {
  for (const prefix of noAuthPrefixes) {
    if (ctx.url.startsWith(prefix)) {
      await next();
      return;
    }
  }

  const authHeader = ctx.request.header.authorization;
  const token = getTokenFromHeader(authHeader);

  let isAdmin = false;

  // Admin token for access without signup
  const env = process.env.NODE_ENV || "dev";
  const adminToken = "b32f9a44-151b-46ed-8cba-1eaeb58360da";

  if (env === "dev" && token === adminToken) {
    isAdmin = true;
  }

  //TODO: tokenType из settings
  const auth = token
    ? TokenGenerator.verify(token, jwtSettings.jwtSecret)
    : null; // jwtSettings.tokenType.access

  if (!auth && !isAdmin) {
    return ctx.throw(401, "Unauthorizaed");
  }
  
  ctx.response.body = auth;

  //TODO: как я понял это не для нашего проекта
  // const userRepository = getRepository(User);
  // const user = isAdmin ? await userRepository.findOne(adminToken) :
  //     (auth ? await userRepository.findOne(auth.id) : null);

  // if (!user) {
  //     return context.throw(401, "Unauthorized");
  // }

  // user.lastOnline = new Date();
  // await userRepository.save(user);

  // context.user = user;

  await next();
}

module.exports = authMiddleware;
