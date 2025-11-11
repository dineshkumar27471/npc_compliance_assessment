import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API Docs",
      version: "1.0.0",
      description: "API documentation for my app",
    }
  },
  apis: ["./routes/*.js"], // This will scan comments in routes folder
};

const swaggerSpec = swaggerJsDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
