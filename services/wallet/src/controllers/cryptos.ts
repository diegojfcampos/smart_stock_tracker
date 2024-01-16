import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
const cryptoModel = require('../models/cryptoSchemas')

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=";
const possibleCurrency = ["usd", "eur", "btc"];

async function fetchData(
  app: FastifyInstance,
  currency: String,
  reply: FastifyReply
) {
  try {
    const response = await app.axios.get(`${url}${currency}`);
    return response.data;
  } catch (err) {
    console.log("Error while getting currency data: " + err);
    reply
      .code(500)
      .send({ status: false, message: "Error while getting currency data" });
  }
}

export default async function (
  app: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  opts: any,
  done: () => void
) {
  app.get("/:currency",cryptoModel, async (request, reply) => {
    const currency: string = (
      request.params as { currency: string }
    ).currency.toLowerCase();

    if (!possibleCurrency.includes(currency))
      return reply
        .code(400)
        .send({ status: false, message: "Invalid currency" });

    try {
      const response = await fetchData(app, currency, reply);

      reply
        .code(200)
        .send({ status: true, message: "Success", data: response });
    } catch (err) {
      console.log("Error while fetching currency data: " + err);
      reply
        .code(500)
        .send({ status: false, message: "Error while fetching currency data" });
    }

  });

  app.get("/get/:id", async (request, reply) => {

    const params = request.params as { id?: string };
    const id = params.id;
    
    if (!id)
      return reply.code(400).send({ status: false, message: "Id coin name doesen't exists" });

    const url = `https://api.coingecko.com/api/v3/coins/${id}`;

    try {
      const response = await app.axios.get(url);
      reply
        .code(200)
        .send({ status: true, message: "Success", data: response.data });
    } catch (err) {
      console.log("Coin does not exists" + err);
      reply.code(500).send({ status: false, message: "Coin does not exists" });
    }
  });

}
