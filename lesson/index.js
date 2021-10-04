const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const btnGet = document.querySelector(".btn-get");

const handleGet = async () => {
  const json = await fetch("http://localhost:4000/fruits");
  const parse = await json.json();
  console.log(parse);
};

const handleSubmit = async () => {
  const inputValue = input.value;
  const fruit = {
    id: 7,
    name: inputValue,
    count: 10,
  };
  console.log(fruit);
  const json2 = await fetch("http://localhost:4000/fruits", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fruit),
  });
  const parse2 = json2.json();
  console.log(parse2);

  console.log("ishladi");
};

btnGet.addEventListener("click", handleGet);
btn.addEventListener("click", handleSubmit);

(async () => {
  const js = await fetch("http://10.10.115.75:4000");
  const data = await js.json();
  console.log(data);
})();

(async () => {
  const jso = await fetch("http://localhost:3000/fruits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 10, name: "anor", count: 7 }),
  });
  const par = await jso.json();
  console.log(par);
})();
