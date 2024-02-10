import express from "express";
import cors from "cors";
import { getVisitor, getVisitors, createVisitor } from "./func/visitor.js";
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
    res.status(200).json(await getVisitor(req.body));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/visitor", async (req, res) => {
  try {
    res.status(200).json(await createVisitor(req.body));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Session

app.post("/delete", async (req, res) => {
  try {
    await deleteAcc(req.body);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/register", async (req, res) => {
  try {
    await register(req.body);
    res.status(200).json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/login", async (req, res) => {
  try {
    const loggedIn = await login(req.body);
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
