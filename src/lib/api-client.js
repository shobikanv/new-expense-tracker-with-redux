import { Component } from "react";

export default class Api extends Component {
  static returnApiUrl() {
    const host = "http://127.0.0.1";
    const port = "8000";
    return `${host}:${port}/api/v1`;
  }

  static get(url) {
    return this.apiCall(url, null, "GET");
  }

  static put(url, params) {
    return this.apiCall(url, params, "PUT");
  }

  static post(url, params) {
    const fullUrl = `${this.returnApiUrl()}${url}`;
    const formData = new FormData();

    formData.append("file", params.file);

    return fetch(fullUrl, {
      method: "POST",
      body: formData, 
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }

  static delete(url, params) {
    return this.apiCall(url, params, "DELETE");
  }

  static apiCall(url, params, method) {
    const fullUrl = `${this.returnApiUrl()}${url}`;
    const body = params ? JSON.stringify(params) : null;

    return fetch(fullUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }
}
