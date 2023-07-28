const request = require("supertest");
const app = require("../app");
require("../models");
let id;

//Test para GET directors
test("GET /directors debe traer a todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

//Test para POST director
test("POST /directors debe crear un director", async () => {
  const createDirector = {
    firstName: "Justin",
    lastName: "Lin",
    nationality: "Taiwan",
    image:
      "https://variety.com/wp-content/uploads/2022/06/AP21178240160530.jpg",
    birthday: "1971-10-11",
  };
  const res = await request(app).post("/directors").send(createDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(createDirector.firstName);
});

//Test para PUT director
test("PUT /directors/:id debe actualizar un director", async () => {
  const updatedDirector = {
    firstName: "Daniel",
    lastName: "Caruso",
    nationality: "USA",
    image: "https://es.web.img3.acsta.net/pictures/17/01/11/16/46/413206.jpg",
    birthday: "1965-01-17",
  };
  const res = await request(app).put(`/directors/${id}`).send(updatedDirector);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(updatedDirector.firstName);
});

//Test para DELETE director
test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
