const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2), {
  default: {
    port: 3000,
  },
});

const port = parseInt(args.port);
console.log(args.port);

let homecontent = "";
let projectcontent = "";
let registercontent = "";

//this will be used to only render the home page
// fs.readFile("home.html", (err, home) => {
//   //console.log(home.toString());
//   if (err) throw err;
//   http
//     .createServer((request, response) => {
//       response.writeHeader(200, { "Content-type": "text/html" });
//       response.write(home);
//       response.end();
//     })
//     .listen(5000);
// });

fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  homecontent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) throw err;
  projectcontent = project;
});

fs.readFile("registration.html", (err, data) => {
  if (err) throw err;
  registercontent = data;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectcontent);
        response.end();
        break;
      case "/registration":
        response.write(registercontent);
        response.end();
        break;
      default:
        response.write(homecontent);
        response.end();
        break;
    }
  })
  .listen(port);
