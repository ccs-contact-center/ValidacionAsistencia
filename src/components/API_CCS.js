import AuthService from "./AuthService";
import moment from "moment";
import "moment/locale/es";

class API_CCS {
  constructor() {
    this.Auth = new AuthService();
    this.fetch = this.fetch.bind(this); // React binding stuff
  }

  async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (await this.Auth.loggedIn()) {
      headers["Authorization"] = "Bearer " + (await this.Auth.getToken());
    } else {
      window.location.href = "/login";
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  getCampaignAvatar(id) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/Campaigns/Avatar?id=" + id,
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);

    return [pad(d.getDate()), pad(d.getMonth()), d.getFullYear()].join("/");
  }
  getAgentes(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/personal/Asistencia?id=" +
        data.id +
        "&fecha=" +
        moment(data.fecha).format("DD/MM/YYYY") +
        "&nombres=" +
        data.nombre,
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  sendValidacion(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/personal/Asistencia",
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
  getAgentesValidacion(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/personal/AsistenciaValidacion",
      {
        method: "GET",
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }

  patchAgentesValidacion(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/personal/AsistenciaValidacion",
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    ).then((res) => {
      return Promise.resolve(res);
    });
  }
}

export default API_CCS;
