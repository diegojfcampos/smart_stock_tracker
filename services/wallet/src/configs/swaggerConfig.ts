module.exports = {
    routePrefix: "/api/v1/doc",
    swagger: {
      info: {
        title: "Smart Stock Tracker / Service AUTH",
        description:
          "API Microservice for registering and authenticating users in the app",
        version: "1.0.0",
      },
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    exposeRoute: true,
  };
  