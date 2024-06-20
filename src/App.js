import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function App() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fathername: '',
    email: '',
    city: '',
    state: '',
    resume: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, resume: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('fathername', formData.fathername);
      data.append('email', formData.email);
      data.append('city', formData.city);
      data.append('state', formData.state);
      data.append('resume', formData.resume);

      const url = "http://localhost:3001/register";
      axios.post(url, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  };

  return (
    <>
      <div className='form'>
        <div className='para'>
          <p>Registration</p>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='d-column justify-content-center'>
          <Row className="box1">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Father Name"
                name="fathername"
                value={formData.fathername}
                onChange={handleChange}
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  defaultValue=""
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="box2">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required
                name="city"
                value={formData.city}
                onChange={handleChange}
                defaultValue="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required
                name="state"
                value={formData.state}
                onChange={handleChange}
                defaultValue=""
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="box2">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload your resume</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Row>
          <Row className='box2'>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
}

export default App;
