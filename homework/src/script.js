const http = require("http");
const path = require("path");
const IO = require("./io/io");

const productIo = new IO(path.resolve("base", "fruits.json"));
const userIo = new IO(path.resolve("base", "users.json"));
const PORT = 3000;

const warehouse = productIo.read();
const products = warehouse ? JSON.parse(warehouse) : [];
const users = userIo.read() ? JSON.parse(userIo.read()) : [];

const bodyRequest = function (req) {
  return new Promise((resolve, rejected) => {
    try {
      req.on("data", (chunk) => {
        resolve(JSON.parse(chunk.toString()));
      });
    } catch (error) {
      rejected(error);
    }
  });
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(users));
  } else if (req.url === "/users" && req.method === "POST") {
    const body = await bodyRequest(req);

    if (users.length) {
      const newUser = {
        id: Number(users[users.length - 1].id) + 1,
        firstName: body.firstName,
        lastName: body.lastName,
      };
      userIo.write([...users, newUser]);

      res.end(JSON.stringify(newUser));
    } else {
      const newUser = {
        id: 0,
        firstName: body.firstName,
        lastName: body.lastName,
      };
      userIo.write[newUser];
      res.end(JSON.stringify(newUser));
    }
  } else if (req.url === "/fruits" && req.method === "GET") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json ",
    });
    res.end(JSON.stringify(products));
  } else if (req.url === "/fruits" && req.method === "POST") {
    const body = await bodyRequest(req);

    const findUser = users.find((user) => user.id == body.id);

    const fruit = findUser
      ? {
          id: body.id,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          fruits: [
            {
              name: body.name,
              count: body.count,
            },
          ],
        }
      : {
          id: body.id,
          firstName: "Falonchi",
          lastName: "Falonchiev",
          fruits: [
            {
              name: body.name,
              count: body.count,
            },
          ],
        };
    const findFruitId = products.find((item) => item.id == fruit.id);
    if (findFruitId) {
      const findFruit = findFruitId.fruits.find(
        (item) => item.name === body.name
      );
      if (findFruit) {
        findFruit.count = Number(findFruit.count) + Number(body.count);
        productIo.write(products);
      } else {
        findFruitId.fruits.push({ name: body.name, count: body.count });
        productIo.write(products);
      }
    } else {
      productIo.write(
        [...products, fruit].sort((a, b) => Number(a.id) - Number(b.id))
      );
    }

    res.end(JSON.stringify(fruit));
  }
});
server.listen(PORT, () => {
  console.log(`server has been started ${PORT}`);
});
