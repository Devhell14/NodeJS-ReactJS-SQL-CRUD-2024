const express = require("express");
const port = 8081;
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB!");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student"; 
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data); 
  });
});

app.post("/create", (req, res) => {
  const { name, email } = req.body; 

  const sql = "INSERT INTO student (name, email) VALUES (?, ?)"; 
  const values = [name, email]; 

  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error"); 
    return res.json(data); 
  });
});

app.get("/read/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM student WHERE ID = ?";
  const values = [id];

  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put('/update/:id', (req, res) => {
  const sql = 'UPDATE student SET `name` =?,`email` =? WHERE ID = ?';
  const id = req.params.id
  db.query(sql, [req.body.name, req.body.email, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  })
})

app.delete("/delete/:id", (req, res) => {
  const sql = 'DELETE FROM student WHERE ID =?';
  const id = req.params.id
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
