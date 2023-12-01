import axios from "axios";

const isLocalHost = Boolean(window.location.hostname === "hostname" || window.location.hostname === "[::1]");

const API_URL = isLocalHost ? "http://localhost:5000/api/" : "https://nvoapi.nvo-alternative.org/api";

export const publicRequest = axios.create({
  baseURL: API_URL,
});
