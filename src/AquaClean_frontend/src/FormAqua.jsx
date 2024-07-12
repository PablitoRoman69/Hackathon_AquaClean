import React, { useState } from 'react';
import { Form, Button, Container, Row, Card, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AquaClean_backend } from 'declarations/AquaClean_backend';
import { useNavigate } from "react-router-dom";

const FormAqua = ({
  id = null,
  pTitle = null,
  pDescription = null,
  pRating = null,
  isEditable = null,
  getSongs = null,
  setShow = null
}) => {
  const [title, setTitle] = useState(pTitle ? pTitle : "");
  const [description, setDescription] = useState(pDescription ? pDescription : "");
  const [rating, setRating] = useState(pRating ? pRating : 0);

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    e.preventDefault();
    const preTitle = e.target.value;
    setTitle(preTitle);
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    const preDescription = e.target.value;
    setDescription(preDescription);
  };

  const onChangeRating = (e) => {
    e.preventDefault();
    const preRating = e.target.value;
    setRating(preRating);
  };

  function createAqua() {
    Swal.fire("Guardando registro, espere por favor...");
    Swal.showLoading();
    AquaClean_backend.addAqua(BigInt(rating), title, description).then(aqua => {
      Swal.fire({
        icon: "success",
        title: "Tu registro se guardó correctamente :)",
        showConfirmButton: false,
        timer: 1500
      }).then(() => navigate('/'));
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Ops, algo salió mal",
      });
      console.log("Error al intentar guardar registro :(", err);
    });
  }

  function updateAqua() {
    Swal.fire("Actualizando registro, espere por favor...");
    Swal.showLoading();
    AquaClean_backend.updateAqua(BigInt(id), title, description, BigInt(rating)).then(aqua => {
      Swal.fire({
        icon: "success",
        title: "Tu registro se actualizó correctamente :)",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setShow(false);
        getAquas();
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Ops, algo salió mal",
      });
      console.log("Error al intentar actualizar registro :(", err);
    });
  }

  console.log("Valores al cargar el componente al editar", id);
  console.log("Valores al cargar el componente al editar", pTitle);
  console.log("Valores al cargar el componente al editar", pDescription);
  console.log("Valores al cargar el componente al editar", pRating);
  console.log("Valores al cargar el componente al editar", isEditable);

  return (
    <Container className='m-5'>
      <Row>
        <Col>
          <Card>
            <Card.Title>{isEditable ? "Editar" : "Agregar"} Registro</Card.Title>
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Ingresa el registro</Form.Label>
                      <Form.Control defaultValue={title} name="title" onChange={onChangeTitle} type="text" placeholder="Ingresa registro" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Ingresa la descripción del registro</Form.Label>
                      <Form.Control defaultValue={description} name="description" onChange={onChangeDescription} as="textarea" placeholder="Ingresa descripción" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Ingresa el rating del registro</Form.Label>
                      <Form.Control defaultValue={rating} name="rating" onChange={onChangeRating} type="number" placeholder="Ingresa rating" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="primary" onClick={isEditable ? updateAqua : createAqua}>
                      {isEditable ? "Editar" : "Guardar"} Registro
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormAqua;
