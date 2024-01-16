const cryptoSchema = {
  schema: {
    params: {
      type: "object",
      properties: {
        currency: {
          type: "string",
          enum: ["usd", "eur", "btc"],
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                symbol: { type: "string" },
                name: { type: "string" },
                image: { type: "string" },
                current_price: { type: "number" },
                market_cap: { type: "number" },
                market_cap_rank: { type: "number" },
                fully_diluted_valuation: { type: "number" },
                total_volume: { type: "number" },
                high_24h: { type: "number" },
                low_24h: { type: "number" },
                price_change_24h: { type: "number" },
                price_change_percentage_24h: { type: "number" },
                market_cap_change_24h: { type: "number" },
                market_cap_change_percentage_24h: { type: "number" },
                circulating_supply: { type: "number" },
                total_supply: { type: "number" },
                max_supply: { type: ["number", "null"] },
                ath: { type: "number" },
                ath_change_percentage: { type: "number" },
                ath_date: { type: "string", format: "date-time" },
                atl: { type: "number" },
                atl_change_percentage: { type: "number" },
                atl_date: { type: "string", format: "date-time" },
                roi: {
                  type: "object",
                  properties: {
                    times: { type: "number" },
                    currency: { type: "string" },
                    percentage: { type: "number" },
                  },
                },
                last_updated: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = cryptoSchema;
