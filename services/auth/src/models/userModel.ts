const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          users: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                createdAt: { type: 'string' },
                email: { type: 'string' },
                userName: { type: 'string' },
                phoneNumber: { type: 'string' },
                birthday: { type: 'string' },
                updatedAt: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const getUserSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              createdAt: { type: 'string' }, 
              email: { type: 'string' },
              userName: { type: 'string' },
              phoneNumber: { type: 'string' },
              birthday: { type: 'string' },
              updatedAt: { type: 'string' },
              role: { type: 'string' },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const deleteUserSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const putUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['newPassword', 'currentPassword', 'userName', 'phoneNumber', 'birthday', 'role' ],
      properties: {
        newPassword: {type: 'string'},
        currentPassword: {type: 'string'},
        userName: {type: 'string'},
        phoneNumber: {type: 'string'},
        birthday: {type: 'string'},
        role: {type: 'string'},
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const patchUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        userName: { type: 'string' },
        phoneNumber: { type: 'string' },
        birthday: { type: 'string' },
        role: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          message: { type: 'string' },
 
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export {
  getUsersSchema,
  getUserSchema,
  deleteUserSchema,
  putUserSchema,
  patchUserSchema,
};
