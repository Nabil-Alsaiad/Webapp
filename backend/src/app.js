import express from "express";
import cors from "cors";
import { getAccounts, getAccount, updateAccount } from "./func/account.js";
import { deleteAcc, login, register } from "./func/session.js";
import { fetchAccountTypes } from "./accTypes.js";

const app = express();
app.use(cors());
app.use(express.json());

//#region Account

app.get("/accounts", async (req, res) => {
  try {
    res.status(200).send(await getAccounts());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/account/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    res.status(200).json(await getAccount({ id }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.put("/account", async (req, res) => {
  try {
    await updateAccount(req.body);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: err.stack || err.toString() });
  }
});

app.post("/register", async (req, res) => {
  try {
    await register(req.body);
    res.status(200).json({ message: "Registered" });
  } catch (err) {
    console.error(err);
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
