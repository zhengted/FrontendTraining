const http = require('http');

http.createServer((request,response) => {
    console.log("request received");
    console.log(request.headers);
    response.setHeader('Content-Type','text/html')
    response.setHeader('X-Foo','bar')
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end(`
        <html maaa=a >
        <head>
            <style>
        body div #myid{
            width:100px;
            background-color: #ff5000;
        }
        body div img{
            width: 30px;
            background-color: #ff1111;
        }
            </style>
        </head>
        <body>
            <div>
                <img id="myid">
                </img>
            </div>
        </body>
        </html>
         `);
    //)
    // request.on('error', (err) => {
    //     console.error(err);
    // }).on('data',(chunk) => {
    //     body.push(chunk);
    // }).on('end', () => {
    //     body = Buffer.concat(body).toString();
    //     console.log("body:",body);
    //     response.writeHead(200,{'Content-Type':'text/html'});
    //     response.end(`
    //     <html maaa=a >
    //     <head>
    //         <style>
    //     body div #myid{
    //         width:100px;
    //         background-color: #ff5000;
    //     }
    //     body div img{
    //         width: 30px;
    //         background-color: #ff1111;
    //     }
    //         </style>
    //     </head>
    //     <body>
    //         <div>
    //             <img id="myid">
    //             <img />
    //         </div>
    //     </body>
    //     </html>
    //     `);
    // })
}).listen(8080);
