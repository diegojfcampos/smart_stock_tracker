const authSchema = {
  schema: {
      body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string'},
            password: { type: 'string'},
          }
      },
      response: {
          200: {
          type: 'object',
          properties: {
              success: {type: 'boolean'},
              id: { type: 'string' },  
              token: {type: 'string'}
          }
      }
    }
  }
};


module.exports = authSchema;