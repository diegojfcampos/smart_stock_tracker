const dbSchema = {
    type: 'object',
    required: ['DATABASE_URL', 'SECRET'],
    properties:{        
        DATABASE_URL: {type: 'string'},
        SECRET: {type: 'string'}
    }
}

const dbOptions = {
    dotenv: true,
    confKey: 'config',
    schema: dbSchema,
    data: process.env
}

module.exports = dbOptions;