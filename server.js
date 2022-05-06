// Dependencies
const path = require('path');
const express = require('express'); // https://www.npmjs.com/package/express
const session = require('express-session'); // https://www.npmjs.com/package/express-session
// Handlebars - view engine for Express
const exphbs = require('express-handlebars'); //https://www.npmjs.com/package/express-handlebars
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
// connect database using sequelize
const sequelize = require('./config/config'); 
// connect-session-sequelize is a SQL session store using Sequelize.js.
// https://www.npmjs.com/package/connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Create a session middleware
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// creating ExpressHandlebars instances
const hbs = exphbs.create({ helpers });

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
