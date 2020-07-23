import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  title: "",
  director: ""
};


const UpdateForm = props => {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.log(error))
  }, [id]);

  const handleChanges = event => {
    setItem({
      ...item,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(history.push(`/`))
      .catch(error => console.log(error))
  }

  return (
    <div className="updateForm">
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <h2>Movie Name</h2>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="title"
          value={item.title}
        />
        <br />
        <h2>Movie Director</h2>
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={item.director}
        />
        <br />
        <button className="editButton">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;
