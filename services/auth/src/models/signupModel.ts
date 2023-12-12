const registerSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password', 'passwordVerification'],
            properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            passwordVerification: { type: 'string' }
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

  
  module.exports = registerSchema ;