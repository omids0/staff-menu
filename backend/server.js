const express = require("express");
const db = require("./db");
const foodRout = require("./routers/foodRout");
const userRout = require("./routers/userRout");
const customerRout = require("./routers/customerRout");
const orderRout = require("./routers/orderRout");
const path = require("path");
const root = require("path").join(__dirname, "../frontend", "build");

const app = express();

app.use(express.json());
app.use("/api/foods/", foodRout);
app.use("/api/users/", userRout);
app.use("/api/customers/", customerRout);
app.use("/api/orders/", orderRout);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });

  // app.use(express.static(path.join(__dirname, "../frontend", "build")));

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  // });
}

app.get("/", (req, res) => {
  res.send("Hi, Server is UP!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is UP!`));
