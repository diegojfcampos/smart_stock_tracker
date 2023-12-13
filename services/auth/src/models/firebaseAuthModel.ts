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
                success: {type: 'boolean'},
                id: { type: 'string' },  
                token: {type: 'string'}
            }
        }
      }
    }
  };
  
  
  module.exports = firebaseAuthSchema;