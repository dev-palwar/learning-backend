const app = require("../New folder/index.js");
const connectDatbase = require("./Database/config");

connectDatbase();

app.listen(9000, () => {
  console.log("Server is running on port 3000");
});
