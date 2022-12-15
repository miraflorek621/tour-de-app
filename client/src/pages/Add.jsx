import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: null,
    desc: "",
    price: null,
    time: null,
    Jazyk: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Přidat záznam</h1>
      <input
        type="date"
        placeholder="Datum"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Jak to šlo"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="time"
        placeholder="Čas v min."
        name="time"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Hodnocení"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Jazyk"
        name="Jazyk"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Přidat</button>
      {error && "Something went wrong!"}
      <Link to="/">Zobrazit všechny záznamy</Link>
    </div>
  );
};

export default Add;
