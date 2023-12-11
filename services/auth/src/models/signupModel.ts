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
                role: { type: 'object', properties: { roleId: { type: 'string' } } },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },              
                token: {type: 'string'}
            }
        }
      }
    }
  };

  
  module.exports = registerSchema ;