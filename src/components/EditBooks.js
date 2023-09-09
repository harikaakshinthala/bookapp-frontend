import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Button, Input, Col } from "reactstrap";

function EditBooks(bookData, setBookData) {
  const { bookid } = useParams();
  const [book, setBook] = useState(); //setBook will update book
  //console.log("Book",book)
  useEffect(() => {
    //avoid number of API calls
    axios
      .get(`${API}/books/${bookid}`)
      //promise

      .then((res) => {
        
        console.log(res.data);
        setBook(res.data); //this will take response data and put it in bookData
      });
  }, []);


  if (book) {
    return <EditBookForm book={book} />;
  } else {
    return "Loading...";
  }
}

//seperating the form
function EditBookForm({book}) {
  const navigate = useNavigate();

  const [name, setName] = useState(book.name);
  const [poster, setPoster] = useState(book.poster);
  const [rating, setRating] = useState(book.rating);
  const [summary, setSummary] = useState(book.summary);
  
  
  const handleSubmit = () => {
    const updatedBook = {
      name: name,
      poster: poster,
      rating: rating,
      summary: summary,
    };
    console.log(updatedBook);

    fetch(`${API}/books/${book.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBook),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(() => navigate("/"));
  };
  
  return (
    <>
      
        <h1>Edit Books-</h1>
        

        <Button
          style={{ marginLeft: "75%" }}
          color="info"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        
      
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              name="name"
              placeholder="Enter Book Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="poster" sm={2}>
            Poster
          </Label>
          <Col sm={10}>
            <Input
              id="poster"
              name="poster"
              placeholder="Enter Poster Link"
              type="text"
              onChange={(e) => setPoster(e.target.value)}
              value={poster}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="rating" sm={2}>
            Rating
          </Label>
          <Col sm={10}>
            <Input
              id="rating"
              name="rating"
              placeholder="Enter Rating"
              type="number"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="summary" sm={2}>
            Summary
          </Label>
          <Col sm={10}>
            <Input
              id="summary"
              name="summary"
              placeholder="Enter Summary"
              type="text"
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
            />
          </Col>
        </FormGroup>

        <Button color="success" onClick={handleSubmit}>Update</Button>
      </Form>
    </>
  );
}
export default EditBooks;
