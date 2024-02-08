import express from "express";
import cors from "cors";
import { getVisitor, getVisitors, registerVisitor } from "./func/visitor.js";
import { deleteRouter, loginRouter, registerRouter } from "./session.js";
import { fetchAccountTypes } from "./accTypes.js";

const app = express();
app.use(cors());
app.use(express.json());

//#region Visitor

app.get("/visitors", async (req, res) => {
  res.status(200).send(await getVisitors());
});

app.get("/visitor", async (req, res) => {
  const { name, phone } = req.body;
  res.status(200).json(await getVisitor({ name, phone }));
});

app.get("/visitor/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  res.status(200).json(await getVisitor({ id }));
});

app.post("/visitor", async (req, res) => {
  const { name, phone } = req.body;
  res.status(201).json(await registerVisitor(name, phone));
});

//#endregion

//#region Session

app.use(loginRouter);
app.use(registerRouter);
app.use(deleteRouter);

//#endregion

const port = 8888;
app.listen(port, () => {
  fetchAccountTypes();
  console.log(`App listening at http://localhost:${port}`);
});
