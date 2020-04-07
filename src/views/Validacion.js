import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Form } from "reactstrap";
import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";

import "moment/locale/es";

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

class Validacion extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);

    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      nombre: "",
      id: "",
      fecha: "",
      user: this.Auth.getProfile().id_ccs,
      data: [],
      selectedAgent: "",
      medio: "",
      motivo: "",
      asistencia: "",
      desconexion: "",
      su: this.Auth.getProfile().su,
    };
  }

  async componentDidMount() {
    if (this.state.su !== 0) {
      var datos = await this.API_CCS.getAgentesValidacion();
      if (datos.length === 0) {
        MySwal.fire({
          title: "Sin Resultados",
          text: "No hay registros por validar",
          type: "info",
          confirmButtonColor: "#C00327",
          allowOutsideClick: true,
        });
      } else {
        this.setState({ data: datos });
      }
    }
  }

  rowClick = (e, row) => {
    this.setState(
      {
        selectedAgent: `${row.getData().id}`,
        id: `${row.getData().id}`,
      },
      () => {
        MySwal.fire({
          title: "¿Procede la justificaión?",
          text: "¡No podras modificarlo despues!",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#C00327",
          cancelButtonColor: "#B0AFB4",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            this.API_CCS.patchAgentesValidacion(this.state)
              .then((res) => {
                MySwal.fire({
                  title: "¡Correcto!",
                  text: "¡Se ha validado correctamente el registro!",
                  type: "success",
                  confirmButtonColor: "#C00327",
                });

                return res;
              })
              .then(async (ret) => {
                this.ref.table.deleteRow(this.state.id);
                var datos = await this.API_CCS.getAgentesValidacion();
                if (datos.length === 0) {
                  MySwal.fire({
                    title: "Sin Resultados",
                    text: "No hay registros por validar",
                    type: "info",
                    confirmButtonColor: "#C00327",
                    allowOutsideClick: true,
                  });
                } else {
                  this.setState({ data: datos });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            MySwal.fire({
              title: "¡Se canceló la validación!",
              text: "¡El registro se quedará pendiente de validación!",
              type: "error",
              confirmButtonColor: "#C00327",
            });
          }
        });
      }
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.su === 0 ? null : (
          <Card>
            <CardHeader className="text-center">
              Validación de Incidencias
            </CardHeader>

            <CardBody>
              <Form
                className="form-horizontal"
                innerRef={this.formRef}
                autoComplete="off"
              >
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
                      ref={(ref) => (this.ref = ref)}
                    />
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default withAuth(Validacion);
