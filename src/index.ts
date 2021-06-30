import express from "express"; 
import config from "./config";
const app = express(); 
const nunjucks = require('nunjucks');
import connectDB from "./Loaders/db";
import routes from './routes';


connectDB();

//app.use(express.urlencoded);
app.use(express.json());  
app.set('view engine', 'html');
nunjucks.configure('src/views', {
  express: app,
})
app.use(routes);   //라우터 
// error handler
app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get('/', (req, res) => {
  res.render('index');
})
app.get(config.REDIRECT_URI);
app 
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });