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
                success: {type: 'boolean'},
                id: { type: 'string' },
                token: {type: 'string'}
            }
        }
      }
    }
  };

  
  module.exports = registerSchema ;