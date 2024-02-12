import express from "express";
import cors from "cors";
import { getAccounts, getAccount, updateAccount } from "./func/account.js";
import { deleteAcc, login, register } from "./func/session.js";
import { fetchAccountTypes } from "./accTypes.js";
import { createAnnouncement, getAnnouncements } from "./func/announcement.js";
import { getMaintenances, updateMaintenances } from "./func/maintenance.js";
import { approveMaintenanceReport, createMaintenanceReport, getMaintenanceReports } from "./func/maintenanceReport.js";
import { createReport, getReports } from "./func/report.js";
import { checkQRCode, createQRCode } from "./func/QRCode.js";

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
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Announcement

app.get("/announcements", async (req, res) => {
  try {
    res.status(200).send(await getAnnouncements());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/announcement", async (req, res) => {
  try {
    await createAnnouncement(req.body);
    res.status(200).json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Maintenance

app.get("/maintenances", async (req, res) => {
  try {
    res.status(200).send(await getMaintenances());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/maintenances", async (req, res) => {
  try {
    await updateMaintenances(req.body);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Maintenance Report

app.get("/maintenance-reports", async (req, res) => {
  try {
    res.status(200).send(await getMaintenanceReports());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/maintenance-report", async (req, res) => {
  try {
    await createMaintenanceReport(req.body);
    res.status(200).json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.put("/maintenance-report", async (req, res) => {
  try {
    await approveMaintenanceReport(req.body);
    res.status(200).json({ message: "Approved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region Report

app.get("/reports", async (req, res) => {
  try {
    res.status(200).send(await getReports());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.post("/report", async (req, res) => {
  try {
    await createReport(req.body);
    res.status(200).json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

//#region QR Code

app.post("/qr", async (req, res) => {
  try {
    await createQRCode(req.body);
    res.status(200).json({ message: "Stored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/qr/:id", async (req, res) => {
  try {
    const { id: acc_id } = req.params;
    await checkQRCode(parseInt(acc_id));
    res.status(200).json({ message: "Passed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

//#endregion

const port = 8888;
app.listen(port, () => {
  fetchAccountTypes();
  console.log(`App listening at http://localhost:${port}`);
});
