const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.send("HEY VERCEL, please deploy me");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app listening...");
});
