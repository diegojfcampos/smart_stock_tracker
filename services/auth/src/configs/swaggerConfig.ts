module.exports = {
    routePrefix: "/api/doc",
    swagger: {
      info: {
        title: "Smart Stock Tracker / Service AUTH",
        description:
          "API Microsevice for registering and authentications of users into the app",
        version: "0.1.0",
      },
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    },
    exposeRoute: true,
  };