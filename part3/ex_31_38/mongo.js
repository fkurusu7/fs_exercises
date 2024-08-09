const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("missing password as argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0-fs.qnjdn.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", peopleSchema);

// FIND Documents - select
if (process.argv.length === 3) {
  console.log("Phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// SAVE Document - insert
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  // SAVE new document
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
  process.exit(0);
}
