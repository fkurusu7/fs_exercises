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
  name: {
    type: String,
    minLength: 3,
    required: [true, "Person name required"],
  },
  number: {
    type: String,
    validate: {
      validator: (value) => {
        return /^\d{2,3}-\d{8,}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});
module.exports = mongoose.model("Person", phonebookSchema);
