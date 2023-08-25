const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use built-in urlencoded middleware for form data
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/UserData")
  .then(() => console.log("Database connectedddd"))
  .catch((e) => console.log(e));

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Creating a model/collection in the database
const users = mongoose.model("users", usersSchema);

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/add", async (req, res) => {
  const result = await users.findOne({ email: req.body.email });
  const message = result ? "User already exists." : "Add your details";
  if (result) {
    res.render("signup", { message });
  } else {
    const response = await users.create(req.body);
    const message = response ? "You can login now" : "User already exists";
    res.render("signup", {message});
  }
});


app.get('/signup', (req, res)=>{
  const message = "Add you details";
  res.render("signup", {message});
})

// Login api 
app.post('/login', async (req, res)=>{
  const result = await users.findOne({ email: req.body.email });
  if(result){
    console.log(req.body);
    res.render('logout');
  } else{
    res.redirect('add');
  }
})


app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
