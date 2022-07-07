const socket = io.connect();

function sendMessage() {
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (!email.value || !message.value) {
    alert("¡Debe completar los campos!");
    return false;
  }

  socket.emit("newMessage", { email: email.value, text: message.value });
  message.value = "";
  return false;
}

socket.on("messages", (messages) => {
  let messagesHtml = messages
    .map(
      (message) =>
        `<span><b>${message.email}</b> [${message.timestamp}] : ${message.text}</span>`
    )
    .join("<br>");

  document.getElementById("messagesList").innerHTML = messagesHtml;
});

const createProductTable = async (products) => {
  const template = await (await fetch("views/table.hbs")).text();
  const templateCompiled = Handlebars.compile(template);
  return templateCompiled({ products });
};

const addProduct = () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  if (!title.value || !price.value) {
    alert("¡Debe completar los campos!");
  }

  socket.emit("add-product", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });

  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

document.getElementById("add-product").addEventListener("click", addProduct);

socket.on("products", async (products) => {
  const template = await createProductTable(products);
  document.getElementById("products").innerHTML = template;
});