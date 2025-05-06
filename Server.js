const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

// Correct the paths using backticks (``) for template literals
const templatehome = fs.readFileSync(
  `${__dirname}/Template/Template-Home.html`,
  "utf-8"
);

const templatemenu = fs.readFileSync(
  `${__dirname}/Template/Template-Menu.html`,
  "utf-8"
);

const templatelist = fs.readFileSync(
  `${__dirname}/Template/Template-AddList.html`,
  "utf-8"
);

const templatepayment = fs.readFileSync(
  `${__dirname}/Template/Template-Payment.html`,
  "utf-8"
);

const templateaddcard = fs.readFileSync(
  `${__dirname}/Template/Template-Addcard.html`,
  "utf-8"
);
const templatedetails = fs.readFileSync(
  `${__dirname}/Template/Template-Details.html`,
  "utf-8"
);
const templatecontact = fs.readFileSync(
  `${__dirname}/Template/Template-Contact.html`,
  "utf-8"
);

// Read the food data (JSON)
const data = fs.readFileSync(
  path.join(__dirname, "Data", "food.json"),
  "utf-8"
);
const dataObj = JSON.parse(data);

// Function to replace placeholders in the template
const replaceTemplate = (template, product) => {
  return template
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%NAME%}/g, product.name)
    .replace(/{%PRICE%}/g, product.price);
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Serve home page
  if (pathName === "/" || pathName === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(templatehome);

    // Serve menu page
  } else if (pathName === "/Menu") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateaddcard, el))
      .join("");
    const output = templatemenu.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Serve payment page
  } else if (pathName === "/Payment") {
    res.writeHead(200, { "content-type": "text/html" });
    const listAdd = dataObj
      .map((el) => replaceTemplate(templatelist, el))
      .join("");
    const outputs = templatepayment.replace("{%ADDLIST%}", listAdd);
    res.end(outputs);
  } else if (pathName === "/Details") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(templatedetails);
  } else if (pathName === "/Contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(templatecontact);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

// Start the server
server.listen(8087, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:8087/");
});
