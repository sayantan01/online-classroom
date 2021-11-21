const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Online classroom system",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
    license: {
      name: "GNU GPL",
      url: "https://spdx.org/licenses/GPL-3.0-only.html",
    },
  },
  servers: [
    {
      url: "https://online-classroom-2021.herokuapp.com",
      description: "Production server",
    },
    {
      url: "http://localhost:4000",
      description: "Development server",
    }
  ],
};

module.exports = swaggerDefinition;
