import { useEffect, useState } from 'react';
import { AquaClean_backend } from 'declarations/AquaClean_backend';
import { Container, Row, td, Card, Table, Button, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormAqua from './FormAqua';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function App() {
  const [aquas, setAquas] = useState([]);
  const [aqua, setAqua] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAquas();
  }, []);

  function getAquas() {
    Swal.fire("Cargando tu registro, espere por favor...");
    Swal.showLoading();
    musica2_backend.getAllAquas().then(aquas => {
      setAquas(aquas);
      Swal.close();
    });
  }

  function getAqua(id) {
    Swal.fire("Cargando tu registro, espere por favor...");
    Swal.showLoading();
    AquaClean_backend.getAquaById(BigInt(id)).then(aqua => {
      console.log(aqua);
      setAqua(aqua.shift());
      Swal.close();
      setShow(true);
    });
  }

  function deleteAqua(id) {
    Swal.fire("Eliminando tu registro, espere por favor...");
    Swal.showLoading();
    AquaClean_backend.deleteAqua(BigInt(id)).then(() => {
      getAquas();
    });
  }

  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>
                  Lista de Registros
                </Card.Title>
              </Col>
              <Col>
                <Button variant="warning"><Link to='/Crear-registro'>Agregar Registro</Link></Button>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Rating</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  aquas.length > 0 ?
                    aquas.map((aqua) => (
                      <tr key={Number(aqua.id)}>
                        <td>{Number(aqua.id)}</td>
                        <td>{aqua.title}</td>
                        <td>{aqua.description}</td>
                        <td>{Number(aqua.rating)}</td>
                        <td>
                          <Row>
                            <Col><Button variant="info" onClick={() => getAqua(Number(aqua.id))}>Editar</Button></Col>
                            <Col><Button variant="danger" onClick={() => deleteAqua(Number(aqua.id))}>Eliminar</Button></Col>
                          </Row>
                        </td>
                      </tr>
                    ))
                    : <tr></tr>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAqua
            id={Number(aqua.id)}
            pTitle={aqua.title}
            pDescription={aqua.description}
            pRating={Number(aqua.rating)}
            isEditable={true}
            getAquas={getAquas}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;

