const firebaseAuthSchema = {
  schema: {
      body: {
          type: 'object',
          required: ['idToken'],
          properties: {
          idToken: { type: 'string'},

          }
      },
      response: {
          200: {
          type: 'object',
          properties: {
              id: { type: 'string' },
              email: { type: 'string', format: 'email' },   
              token: {type: 'string'}
          }
      }
    }
  }
};


module.exports = firebaseAuthSchema;