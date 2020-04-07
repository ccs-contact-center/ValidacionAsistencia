import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
} from "reactstrap";
import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-loader-spinner";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

const columns = [
  {
    title: "ID",
    field: "id",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60,
  },
  {
    title: "Fecha Asistencia",
    field: "Fecha_Asistencia",
    align: "center",
    color: "#F0F3F5",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100,
  },
  {
    title: "Fecha Captura",
    field: "Fecha_Captura",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 150,
  },
  {
    title: "ID Mitrol",
    field: "idMitrol",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100,
  },
  {
    title: "Nombre",
    field: "Nombre",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120,
  },
  {
    title: "Asistencia",
    field: "Asistencia",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 135,
  },
  {
    title: "Conexión",
    field: "Conexion",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
  {
    title: "Hora Extra",
    field: "Hora_Extra",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130,
  },
  {
    title: "Supervisor",
    field: "Supervisor",
    align: "center",
    color: "#F0F3F5",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100,
  },
  {
    title: "Comentario",
    field: "Comentario",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 150,
  },
];

const options = {
  movableRows: true,
  pagination: "local",
  paginationSize: 5,
};

class Llamada_General extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      nombre: "",
      id: "",
      fecha: "",
      id_user: this.Auth.getProfile().id_ccs,
      data: [],
      selectedAgent: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  rowClick = (e, row) => {
    this.setState({
      selectedAgent: `${row.getData().id}`,
    });
  };

  async handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    var datos = await this.API_CCS.getAgentes(this.state);
    this.setState({ data: datos });
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height="70" width="70" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          {this.state.selectedAgent !== "" ? null : (
            <div className="animated fadeIn">
              <Card>
                <CardHeader className="text-center">
                  Ingreso de Incidencias
                </CardHeader>

                <CardBody>
                  <Form
                    className="form-horizontal"
                    onSubmit={this.handleFormSubmit}
                    innerRef={this.formRef}
                    autoComplete="off"
                  >
                    <Row>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">Nombre</Label>
                          <Input
                            type="text"
                            placeholder="Nombre"
                            onChange={this.handleChange}
                            id="nombre"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">ID</Label>
                          <Input
                            type="text"
                            placeholder="ID"
                            onChange={this.handleChange}
                            id="id"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">Fecha</Label>
                          <Input
                            type="date"
                            date-format="dd/mm/yyyy"
                            placeholder="Fecha"
                            onChange={this.handleChange}
                            id="fecha"
                            value={this.state.fecha}
                            lang="es"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <button type="submit" className="btn btn-primary">
                          Buscar
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <br />
                        <ReactTabulator
                          rowClick={this.rowClick}
                          index={"id"}
                          data={this.state.data}
                          columns={columns}
                          tooltips={true}
                          layout={"fitColumns"}
                          options={options}
                        />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </div>
          )}
          {this.state.selectedAgent === "" ? null : (
            <div className="animated fadeIn">
              <Card>
                <CardHeader className="text-center">
                  Incidencias Operaciones
                  <div className="card-header-actions">
                    <Button
                      color="link"
                      className="card-header-action btn-close"
                      onClick={() => this.setState({ selectedAgent: "" })}
                    >
                      <i className="icon-close" />
                    </Button>
                  </div>
                </CardHeader>

                <CardBody>
                  <Form
                    className="form-horizontal"
                    innerRef={this.formRef}
                    autoComplete="off"
                  >
                    <Row>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">Medio</Label>
                          <Input
                            type="select"
                            id="medio"
                            required
                            onChange={this.handleChange}
                          >
                            <option value="">-Selecciona-</option>
                            <option>Retardo</option>
                            <option>Justificación</option>
                            <option>Desconexión</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-2">
                        <FormGroup>
                          <Label htmlFor="prospecto">Asistencia</Label>
                          <Input
                            type="select"
                            id="asistencia"
                            required
                            onChange={this.handleChange}
                          >
                            <option value="">-Selecciona-</option>
                            <option>A</option>
                            <option>D</option>
                            <option>F</option>
                            <option>V</option>
                            <option>I</option>
                            <option>PJ</option>
                            <option>FJ</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">Motivo</Label>
                          <Input
                            type="text"
                            placeholder="Motivo"
                            onChange={this.handleChange}
                            id="motivo"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-2">
                        <FormGroup>
                          <Label htmlFor="prospecto">Desconexión</Label>
                          <Input
                            type="text"
                            placeholder="00:00:00"
                            onChange={this.handleChange}
                            id="desconexion"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <button type="submit" className="btn btn-primary">
                          Guardar
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      );
    }
  }
}

export default withAuth(Llamada_General);
