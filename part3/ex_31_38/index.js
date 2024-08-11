require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phonebook = require("./models/phonebook");

// *************************************
// ************ MIDDLEWAREs ************
// *************************************
// show static content
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
morgan.token("type", function (req, res) {
  return JSON.stringify(req.body);
});
morgan.format(
  "kurusu",
  ":method :url :status :response-time ms - :res[content-length] :type"
);
app.use(morgan("kurusu"));
// POST /api/persons 200 2.818 ms - 53 {"name":"Fer Cuva","number":"01-654321-123"}

// *************************************
// *********** ROUTES ***********
// *************************************
app.get("/", (req, res) => {
  res.send("<h1>Hello, Express!</h1>");
});

app.get("/info", async (req, res) => {
  try {
    // Count all documents in the Phonebook collection
    const totalPeople = await Phonebook.countDocuments({});

    // Create the response content
    const totalPersons = `<p>Phonebook has info for ${totalPeople} people</p>`;

    // Format the date
    const fullDate = new Date().toString(); // Use current date instead of the hardcoded value
    const stringDate = `<p>${fullDate}</p>`;

    // Send the response
    res.send(`<h1>Hello, FullStack!</h1>${totalPersons}${stringDate}`);
  } catch (error) {
    // Handle any errors
    res.status(500).send("An error occurred while retrieving information.");
  }
});

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        //res.status(404).end();
        res.status(404).json({ error: `no person found with id ${id}` });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  // if (!body.name) {
  //   return res.status(400).json({ error: "name missing" });
  // } else if (!body.number) {
  //   return res.status(400).json({ error: "number missing" });
  // }
  // if (nameExists) return res.status(409).json({ error: "name must be unique" });

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  // const person = {
  //   name: body.name,
  //   number: body.number,
  // };
  Phonebook.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((personReturned) => res.json(personReturned))
    .catch((error) => next(error));
});

// *************************************
// ************ MIDDLEWAREs ************
// *************************************
const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandlers = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandlers);

// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
