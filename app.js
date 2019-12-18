import express from "express";
import morgan  from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import { userRouter } from "./routers/userRouter" // export default 로 하지 않으면 {}
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev")); // param으로 logging 방법이 바뀐다.

// global router: join, login, home("/"), search...
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 누군가 내 파일을 불러올 때 app object를 뱉어준다.