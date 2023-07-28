const request = require("supertest");
const app = require("../app");
require("../models");
let id;

//Test para GET actors
test("GET /actors debe traer a todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

//Test para POST actor
test("POST /actors debe crear un actor", async () => {
  const createActor = {
    firstName: "Sylvester",
    lastName: "Stallone",
    nationality: "USA",
    image:
      "https://hollywoodlife.com/wp-content/uploads/2022/07/Sylvester-Stallone-young-1.jpg?w=680",
    birthday: "1946-07-06",
  };
  const res = await request(app).post("/actors").send(createActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(createActor.firstName);
});

//Test para PUT actor
test("PUT /actors/:id debe actualizar un actor", async () => {
  const updatedActor = {
    firstName: "Vin",
    lastName: "Diesel",
    nationality: "USA",
    image:
      "https://phantom-marca.unidadeditorial.es/023de5244b791c5aa890a89e8a67ebbe/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/19/16844885388361.jpg",
    birthday: "1967-07-18",
  };
  const res = await request(app).put(`/actors/${id}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedActor.firstName);
  expect(res.body).toBeDefined();
});

//Test para DELETE actor
test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
