const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setDirectorMovie,
} = require("../controllers/director.controllers");
const express = require("express");

const directorRouter = express.Router();

directorRouter.route("/").get(getAll).post(create);

directorRouter.route("/:id").get(getOne).delete(remove).put(update);

directorRouter.route("/:id/movies").post(setDirectorMovie);

module.exports = directorRouter;
