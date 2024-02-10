import express from "express";
import cors from "cors";
import { getVisitor, getVisitors, registerVisitor } from "./func/visitor.js";
import { deleteAcc, login, register } from "./func/session.js";
import { fetchAccountTypes } from "./accTypes.js";

const app = express();
app.use(cors());
app.use(express.json());

//#region Visitor

app.get("/visitors", async (req, res) => {
  try {
  res.status(200).send(await getVisitors());
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/visitor", async (req, res) => {
  try {
    const { name, phone } = req.body;
    res.status(200).json(await getVisitor({ name, phone }));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/visitor", async (req, res) => {
  try {
  const { name, phone } = req.body;
  res.status(201).json(await registerVisitor(name, phone));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Session

app.post("/delete", async (req, res) => {
  const { accType, email, password } = req.body;
  try {
    await deleteAcc(accType, email, password);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/register", async (req, res) => {
  const { accType, email, password } = req.body;
  try {
    await register(accType, email, password);
    res.status(200).json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggedIn = await login(email, password);
    res.status(200).json(loggedIn);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

const port = 8888;
app.listen(port, () => {
  fetchAccountTypes();
  console.log(`App listening at http://localhost:${port}`);
});
