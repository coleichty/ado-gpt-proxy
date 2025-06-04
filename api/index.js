const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/wiql", async (req, res) => {
  const pat = process.env.AZURE_PAT;
  const org = "leadfirstdev";
  const url = `https://dev.azure.com/${org}/_apis/wit/wiql?api-version=7.0`;

  const auth = Buffer.from(`:${pat}`).toString("base64");
  const headers = {
    "Authorization": `Basic ${auth}`,
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = app;
