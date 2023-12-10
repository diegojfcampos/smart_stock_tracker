const schema = {
    type: 'object',
    required: ['DATABASE_URL', 'SECRET'],
    properties:{        
        DATABASE_URL: {type: 'string'},
        SECRET: {type: 'string'},
        FIREBASE_API_KEY: {type: 'string'},
        FIREBASE_AUTH_DOMAIN: {type: 'string'},
        FIREBASE_PROJECT_ID: {type: 'string'},
        FIREBASE_STORAGE_BUCKET: {type: 'string'},
        FIREBASE_MESSAGING_SENDER_ID: {type: 'string'},
        FIREBASE_APP_ID: {type: 'string'},
        FIREBASE_MEASUREMENT_ID: {type: 'string'}
    }
}

const options = {
    dotenv: true,
    confKey: 'config',
    schema: schema,
    data: process.env
}

module.exports = options;