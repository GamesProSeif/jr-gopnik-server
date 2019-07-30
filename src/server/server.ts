import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from 'path';
const app: express.Application = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// EJS Middleware
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the server');
});

app.use('/api/', require(path.join(__dirname, 'routes', 'api')));
app.use('/util/', require(path.join(__dirname, 'routes', 'util')));

app.disable('etag');

app.get('/home', (req: express.Request, res: express.Response) =>
  res.redirect('/')
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));

export default app;
