const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// Movie.hasMany(Actor);
// Actor.belongsTo(Movie);

// Movie.hasMany(Director);
// Director.belongsTo(Movie);

// Movie.hasMany(Genre);
// Genre.belongsTo(Movie);

Movie.belongsToMany(Actor, { through: "MovieActors" });
Actor.belongsToMany(Movie, { through: "MovieActors" });

Movie.belongsToMany(Genre, { through: "MovieGenres" });
Genre.belongsToMany(Movie, { through: "MovieGenres" });

Movie.belongsToMany(Director, { through: "MovieDirectors" });
Director.belongsToMany(Movie, { through: "MovieDirectors" });
