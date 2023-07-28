const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
require("../models");
let id;

// Test para GET movies
test("GET /movies debe traer a todas las peliculas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Test para POST movie
test("POST /movies debe crear una pelicula", async () => {
  const createMovie = {
    name: "xXx-Triple X",
    image: "https://es.web.img3.acsta.net/pictures/14/03/19/12/06/372728.jpg",
    synopsis:
      "Un estrella del deporte extremo es elegido para infiltrarse en el santuario de un anarquista que pretende desatar un caos.",
    releaseYear: 2002,
  };
  const res = await request(app).post("/movies").send(createMovie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(createMovie.name);
});

//Test para PUT movie
test("PUT /movies/:id debe actualizar una pelicula", async () => {
  const updatedMovie = {
    name: "Rapidos y Furiosos 1",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    synopsis:
      "El oficial Brian O'Conner debe decidir dónde queda su lealtad cuando se enamora del mundo de las carreras callejeras, donde trabaja como agente encubierto con la misión de desaparecerlas.",
    releaseYear: 2001,
  };
  const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(updatedMovie.name);
});

// Test para crear una relación movie/actor
test("/movies/:id/actors debe crear una relación", async () => {
  const actor = await Actor.create({
    firstName: "Vin",
    lastName: "Diesel",
    nationality: "USA",
    image:
      "https://phantom-marca.unidadeditorial.es/023de5244b791c5aa890a89e8a67ebbe/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/19/16844885388361.jpg",
    birthday: "1967-07-18",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

//Test para crear una relación movie/genero
test("/movies/:id/genres debe crear una relación", async () => {
  const genre = await Genre.create({
    name: "Policial",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

// Test para crear una relación movie/director
test("/movies/:id/directors debe crear una relación", async () => {
  const director = await Director.create({
    firstName: "Justin",
    lastName: "Lin",
    nationality: "Taiwan",
    image:
      "https://variety.com/wp-content/uploads/2022/06/AP21178240160530.jpg",
    birthday: "1971-10-11",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

//Test para DELETE movie
test("DELETE /movies/:id debe eliminar una pelicula", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
