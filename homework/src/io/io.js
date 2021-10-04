const fs = require("fs");

class IO {
  dir;
  constructor(dir) {
    this.dir = dir;
  }
  write(data) {
    return fs.writeFileSync(this.dir, JSON.stringify(data, null, 4));
  }
  read() {
    return fs.readFileSync(this.dir, { encoding: "utf-8", flag: "r" });
  }
}
module.exports = IO;
