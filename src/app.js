// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     const chunks = [];

//     req.on('data', chunk => {
//       const buf = Buffer.from(chunk);
//       const str = buf.toString();
//       chunks.push(str);
//       const obj = JSON.parse(chunks)
//       const value = obj.num1;
    
//      // Write the code here to check if the number is odd or even
//       if(value % 2 === 0){
//         res.writeHead(200,{'Content-Type':'text/plain'});
//         res.end(`The number ${value} is even`);
//       }
//       else{

//       }
//    });
//   }

  
// });


// module.exports = server;
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const num1 = parseInt(data.num1);

        if (Number.isNaN(num1)) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid number provided');
        } else {
          if (num1 % 2 === 0) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num1} is even`);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num1} is odd`);
          }
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON format');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Endpoint not found');
  }
});

module.exports = server;

