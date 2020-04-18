import http from '../../http-common';



const getAll = () => {
  return http.get("/rooms/");
};

const get = pk => {
  return http.get(`/rooms/${pk}`);
};

const create = data => {
  return http.post("/rooms/", data);
};

const update = (pk, data) => {
  return http.put(`/rooms/${pk}`, data);
};

const remove = pk => {
  return http.delete(`/rooms/${pk}`);
};

const removeAll = () => {
  return http.delete(`/rooms`);
};

const findByTitle = nome => {
  return http.get(`/rooms/?nome=${nome}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
