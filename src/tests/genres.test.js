const request = require("supertest");
const app = require("../app");
require("../models");
let id;

//Test para GET genres
test("GET /genres debe traer a todos los generos", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

//Test para POST genre
test("POST /genres debe crear un genero", async () => {
  const createGenre = {
    name: "Horror",
  };
  const res = await request(app).post("/genres").send(createGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(createGenre.name);
  expect(res.body).toBeDefined();
});

//Test para PUT genre
test("PUT /genres/:id debe actualizar un genero", async () => {
  const updatedGenre = {
    name: "Suspenso",
  };
  const res = await request(app).put(`/genres/${id}`).send(updatedGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
  expect(res.body).toBeDefined();
});

//Test para DELETE genre
test("DELETE /genre/:id elimina un genero", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
