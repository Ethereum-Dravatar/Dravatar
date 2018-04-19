import Koa from "koa";
import bodyParser from "koa-bodyparser";
// CORS
import CORS from "./middleware/cors";
// Routers
import { routerRules, allowedMethods } from "./routers";

// Start the Koa App
const app = new Koa()
// Body Parser and CORS setting
app.use(bodyParser())
    .use(CORS)

// router
app.use(routerRules)
    .use(allowedMethods)

const port = process.env.LEANCLOUD_APP_PORT || '8000'
app.listen(port)
