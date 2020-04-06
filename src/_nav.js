export default {
  items: [
    {
      title: true,
      name: "Inicio",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "text-center", // optional class names space delimited list for title item ex: "text-center"
    },

    {
      name: "Ingreso Incidencias",
      url: "/dashboard",
      icon: "icon-people",
    },
    {
      name: "Validación Incidencias",
      url: "/Nueva_Llamada",
      icon: "icon-rocket",
    },

    {
      name: "Reportes",
      url: "/Reportes",
      icon: "icon-graph",
    },
  ],
};
