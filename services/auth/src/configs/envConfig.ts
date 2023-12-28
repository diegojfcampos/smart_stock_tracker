const schema = {
    type: 'object',
    required: ['DATABASE_AUTH_URL', 'SECRET'],
    properties:{        
        DATABASE_AUTH_URL: { type: 'string' },
        SECRET: { type: 'string' },
        FIREBASE_API_KEY: { type: 'string' },
        FIREBASE_AUTH_DOMAIN: { type: 'string' },
        FIREBASE_PROJECT_ID: { type: 'string' },
        FIREBASE_STORAGE_BUCKET: { type: 'string' },
        FIREBASE_MESSAGING_SENDER_ID: { type: 'string' },
        FIREBASE_APP_ID: { type: 'string' },
        FIREBASE_MEASUREMENT_ID: { type: 'string' },
        MYSQL_ROOT_PASSWORD: { type: 'string' },
        MYSQL_DATABASE: { type: 'string' },
        MYSQL_USER: { type: 'string' },
        MYSQL_PASSWORD: { type: 'string' },
        FIREBASE_PRIVATE_KEY: { type: 'string' },
        FIREBASE_FIREBASE_TYPE: { type: 'string' },
        FIREBASE_CLIENT_ID: { type: 'string' },
        FIREBASE_CLIENT_EMAIL: { type: 'string' },
        FIREBASE_CLIENT_X509_CERT_URL: { type: 'string' },
        FIREBASE_PRIVATE_KEY_ID: { type: 'string' },
        FIREBASE_AUTH_URI: { type: 'string' },
        FIREBASE_TOKEN_URI: { type: 'string' },
        FIREBASE_AUTH_PROVIDER_X509_CERT_URL: { type: 'string' },
        FIREBASE_UNIVERSE_DOMAIN: { type: 'string' }
    }
}

const options = {
    dotenv: true,
    confKey: 'config',
    schema: schema,
    data: process.env
}

module.exports = options;