import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
	const q = "select * from books";
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post("/books", (req, res) => {
	const q = "INSERT INTO books(`title`, `desc`, `cover`, `price`) VALUES(?)";

	const values = [
		req.body.title,
		req.body.desc,
		req.body.cover,
		req.body.price,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.delete("/books/:id", (req, res) => {
	const bookid = req.params.id;

	const q = "DELETE FROM books WHERE id=?";

	db.query(q, [bookid], (err, data) => {
		if (err) return res.json(err);
		return res.json("Book Deleted Successfully");
	});
});

app.put("/books/:id", (req, res) => {
	const bookid = req.params.id;

	const q =
		"UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id=?";

	const values = [
		req.body.title,
		req.body.desc,
		req.body.price,
		req.body.cover,
	];

	db.query(q, [...values, bookid], (err, data) => {
		if (err) return res.json(err);
		return res.json("Book Updated Successfully");
	});
});

app.listen(8800, () => {
	console.log("Connected to backend !");
});
