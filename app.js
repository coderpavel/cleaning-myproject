const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const authMiddleware = require("./middleware/auth");
const serverSettings = require("./configs/config.json").serverSettings;
const db = require("./db/connect");

const authRoute = require("./router/auth");
const router = require("./router/users");

var options = {
  key: fs.readFileSync('./csr.pem', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8')
};

db.mongoConnect();

app
  .use(koaBody())
  .use(authMiddleware)
  .use(authRoute.routes())
  .use(authRoute.allowedMethods())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(serverSettings.port, () => {
  console.log("Port:", serverSettings.port);
});
