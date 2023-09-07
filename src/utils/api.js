import axios from "axios";
import Cookies from "js-cookie";


const baseUrl = "http://localhost:8000";
const headersConfig = {
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
};

export const GetAllNotes = () => {
  return axios.get(`${baseUrl}/notes`);
};

export const DeleteNoteById = (id) => {
  return axios.delete(`${baseUrl}/notes/${id}`, headersConfig);
};

export const AddNote = (data) => {
  return axios.post(`${baseUrl}/notes`, data, headersConfig);
};

export const EditNote = (data) => {
  return axios.put(`${baseUrl}/notes/${data.id}`, data, headersConfig);
};

export const Login = (data) => {
  return axios.post(`${baseUrl}/auth/login`, data);
};

export const FilterNote = (title) => {
  return axios.get(`${baseUrl}/notes?title_like=${title}`);
}

export const getArchives = () => {
  return axios.get(`${baseUrl}/notes?archived=true`);
}

export const getFilterArchive = (title) => {
  return axios.get(`${baseUrl}/notes?archived=true&title_like=${title}`);
}