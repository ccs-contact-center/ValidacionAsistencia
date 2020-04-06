import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// eslint-disable-next-line

const Inicio = React.lazy(() => import("./views/Inicio"));
const Incidencias = React.lazy(() => import("./views/Incidencias"));
const Validacion = React.lazy(() => import("./views/Validacion"));
const Reportes = React.lazy(() => import("./views/Reportes"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },

  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Llamada_General", name: "Llamada General", component: Incidencias },
  { path: "/Buscador", name: "Consulta Leads", component: Validacion },
  { path: "/Reportes", name: "Reportes", component: Reportes },
];

export default routes;
