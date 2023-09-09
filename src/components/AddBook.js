import React, { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Col } from "reactstrap";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

function AddBook({ bookData, setBookData }) {
  // theses states are you hold the data entered in the form
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  const handelSubmit = () => {
    const newBook = {
      name: name,
      poster: poster,
      rating: rating,
      summary: summary,
    };
    console.log(newBook);
    //we can use both axios or a fetch call
    fetch(`${API}/books`, {
      method: "POST",
      body: JSON.stringify(newBook), //need convert nrml obj to JSOn to put it in API
      headers: { "Content-Type": "application/json" }, //makes sure the content is json
    })
      //promise
      .then((data) => data.json()) //to make sure the data is json
      .then((res) => {
        setBookData(res); //this will update the data like add the new book to list
        console.log(res);
        //we have to store and update this res on the data
      })
      .then(() => navigate("/"));
  };
  return (
    <div>

          <h1> Add Books</h1>

          <Button style={{ marginLeft: "75%" }} onClick={() => navigate(-1)}>Back</Button><Form>
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
                          value={name} />
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
                          value={poster} />
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
                          value={rating} />
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
                          value={summary} />
                  </Col>
              </FormGroup>

              <Button onClick={handelSubmit}>Submit</Button>
          </Form>
    </div>
  );

}

export default AddBook;
