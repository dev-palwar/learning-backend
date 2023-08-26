const express = require("express");
const connectDatbase = require("./Database/config");
const router = require("./Routes/users");

const app = express();
connectDatbase();
app.use(express.json());
app.use("/users", router);

app.listen(2000, ()=>{
    console.log("Server running smooth");
})