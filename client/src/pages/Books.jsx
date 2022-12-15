import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar">
        <nav> 
          <a className="list" href="">Domov</a>
          <a className="list" href="">Databáze</a>
          <a className="list" href="">O projeku</a>
          <a className="list" href="">Kontakty</a>
          <a className="list" href="">Náš Tým</a>
          <div className="animation start-home"></div>
        </nav>
      </div>
      <h1>Databáze Hodnocení</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.time}</span>
            <span>{book.price}</span>
            <h2>{book.Jazyk}</h2>
            <button className="delete" onClick={() => handleDelete(book.id)}>Smazat</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Aktualizovat
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Přidat záznam
        </Link>
      </button>
    </div>
  );
};

export default Books;
