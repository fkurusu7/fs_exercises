const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;

console.log("--- Connecting to MongoDB ---");

const ATRLAS_STR = "MongoDB Atlas";

mongoose
  .connect(MONGODB_URI)
  .then((res) => console.log(`*** Connected to: ${ATRLAS_STR}`))
  .catch((error) =>
    console.log(`*** Error connecting to ${ATRLAS_STR} - ${error.message}`)
  );

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});
module.exports = mongoose.model("Person", phonebookSchema);
