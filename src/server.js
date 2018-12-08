import express from  'express';
import App from '../dist/ssr/app';
import { StaticRouter } from  'react-router';
import reactDOMserver from 'react-dom/server';
var app = express();


app.get('*', (req, res)=>{
    //console.log(req.url)
    const html =  reactDOMserver.renderToString(
        <StaticRouter
            location={req.url}
            context={{
                name: 'miguel'
            }}
        >
            <App />
        </StaticRouter>
    );
    res.write(`
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Platzi Video</title>
  </head>
  <body>
    <div id="home-container">${req.url}</div>
    <div id="modal-container"></div>
    <script src="http://localhost/js/app.js" charset="utf-8"></script>
  </body>
</html>
        
    `);
    res.end();
});

app.listen(8080);
console.log(' Server prendio');