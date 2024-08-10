require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

const app = express();
app.use(express.json());
app.use(cors());

// show static content
app.use(express.static("dist"));

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body);
});
morgan.format(
  "kurusu",
  ":method :url :status :response-time ms - :res[content-length] :type"
);
app.use(morgan("kurusu"));
// POST /api/persons 200 2.818 ms - 53 {"name":"Fer Cuva","number":"01-654321-123"}

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express!</h1>");
});

app.get("/info", (req, res) => {
  const totalPersons = `<p>Phonebook has info for ${persons.length} people</p>
  `;

  const fullDate = new Date(8.64e15).toString();
  const stringDate = `<p>${fullDate}</p>`;

  res.send(`<h1>Hello, FullStack!</h1>${totalPersons}${stringDate}`);
});

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((people) => {
    console.log(people);

    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = Phonebook.find(id).then((person) => res.json(person));

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: `no person found with id ${id}` });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((person) => Number(person.id)))
      : 0;

  return String(maxId + 1);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  // if (nameExists) return res.status(409).json({ error: "name must be unique" });

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
