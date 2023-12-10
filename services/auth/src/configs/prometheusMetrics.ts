const prometheus = require("prom-client");

const totalRequestsCounter = new prometheus.Counter({
    name: "app_total_requests",
    help: "Total number of requests",
});

module.exports = {
    prometheus,
    totalRequestsCounter
}