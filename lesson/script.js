const http = require("http");
const fruits = require("./fruits");
const PORT = 4000;

const bodyParse = function (req) {
  return new Promise((resolve, reject) => {
    try {
      req.on("data", (chunk) => {
        resolve(JSON.parse(chunk.toString()));
      });
    } catch (error) {
      reject(error);
    }
  });
};

const server = http.createServer(async (req, res) => {
  if (req.url == "/fruits" && req.method == "GET") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json ",
    });
    res.end(JSON.stringify(fruits));
  } else if (req.url == "/fruits" && req.method == "POST") {
    res.writeHead(201, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });

    const body = await bodyParse(req);

    const fruit = {
      id: body.id,
      name: body.name,
      count: body.count,
    };

    fruits.push(fruit);

    res.end(JSON.stringify(fruit));
  }
});

server.listen(PORT, () => {
  console.log(`site has been started ${PORT}`);
});