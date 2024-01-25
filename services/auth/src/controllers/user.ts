import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  getUsersSchema,
  getUserSchema,
  deleteUserSchema,
  putUserSchema,
  patchUserSchema,
} from "../models/userModel";

const authMiddleware = require("../configs/authMiddleware");

interface UserRequestParams {
  id?: string;
  userId?: string
}

async function userRoute(
  app: FastifyInstance,
  request: FastifyRequest,
  options: any,
  reply: FastifyReply,
  done: () => void
) {

  app.addHook("preHandler", (request, reply, done) => {
    authMiddleware(app, request, reply);
    done();
  });

  app.get("/users", getUsersSchema, async (request, reply) => {
    try {
      const users = await app.prisma.user.findMany();
      console.log("user");

      if (!users) {
        reply
          .code(400)
          .send({ status: false, message: "Error while getting users" });
      } else {
        reply.code(200).send({ status: true, users });
      }
    } catch (err) {
      console.log("error to get users: " + err);
      reply.code(500).send({ status: false, message: "Error to get users" });
    }
    done();
  });

  app.get("/user/:id", getUserSchema, async (request, reply) => {
    try {
      const params = request.params as UserRequestParams;
      const id = params.id;

      if (!id)
        return reply
          .code(400)
          .send({ status: false, message: "Request missing user id" });

      const user = await app.prisma.user.findFirst({
        where: {
          id,
        },
      });

  

      if (!user) {
        reply.code(400).send({ status: false, message: "User not found" });
      } else {
        reply.code(200).send({ status: true, user });
      }
    } catch (err) {
      console.log("Error getting user: " + err);
      reply.code(500).send({ status: false, message: "Error getting user" });
    }
  });

  app.delete("/user/:id", deleteUserSchema, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!id)
        return reply
          .code(400)
          .send({ status: false, message: "Request missing user id" });

      const user = await app.prisma.user.delete({
        where: {
          id: id,
        },
      });

      if (!user) {
        reply.status(400).send({ status: false, message: "user not found" });
      } else {
        reply.status(200).send({ status: true, message: "User deleted" });
      }
    } catch (err) {
      console.log("error to get user: " + err);
      reply
        .code(500)
        .send({ status: false, message: "Error to delete user" });
    }

    done();
  });

  /*
  app.put("/user/:id", putUserSchema, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const {
        newPassword,
        currentPassword,
        userName,
        phoneNumber,
        birthday,
        role,
      } = request.body as {
        newPassword: string;
        currentPassword: string;
        userName: string;
        phoneNumber: string;
        birthday: string;
        role: Role;
      };
  
      if (!newPassword || !currentPassword || !userName || !phoneNumber || !birthday || !role) {
        return reply
          .code(404)
          .send({ status: false, message: "One or more information is/are missing" });
      }
  
      const rolesExistent = ["USER", "PREMIUM"];
  
      if (!rolesExistent.includes(role)) {
        return reply
          .code(404)
          .send({ status: false, message: "Role does not exist" });
      }
  
      const existingUser = await app.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingUser) {
        return reply
          .code(404)
          .send({ status: false, message: "User not found" });
      }
  
      if (existingUser.password === null) {
        return reply
          .code(400)
          .send({ status: false, message: "User password is null" });
      }
  
      const isPasswordValid = await app.bcrypt.compare(
        currentPassword,
        existingUser.password
      );
  
      if (!isPasswordValid) {
        return reply
          .code(400)
          .send({ status: false, message: "Incorrect current password" });
      }
  
      const hashedPassword = await app.bcrypt.hash(newPassword, 12);
  
      const updatedUser = await app.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedPassword,
          userName,
          phoneNumber,
          birthday,
          role,
          updatedAt: new Date(),
        },
      });
  
      reply.code(200).send({status: true, message: "User Updated"})
    } catch (err) {
      console.log("Error updating user: " + err);
      reply.code(500).send({ status: false, message: "Error updating user" });
    }
  });  

  app.patch("/user/:id", patchUserSchema, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const {
        userName,
        currentPassword,
        newPassword,
        phoneNumber,
        birthday,
        role,
      } = request.body as {
        currentPassword?: string;
        newPassword?: string;
        userName?: string;
        phoneNumber?: string;
        birthday?: string;
        role?: Role;
      };

      const rolesExistent = ["USER", "PREMIUM"];

      if (role && !rolesExistent.includes(role)) {
        return reply
          .code(400)
          .send({ status: false, message: "Role does not exist" });
      }

      const existingUser = await app.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingUser) {
        return reply.status(404).send({
          status: false,
          message: "User not found",
        });
      }

      if (currentPassword && existingUser.firebase != true) {
       
        if (existingUser.password !== null) {
          const isPasswordValid = await app.bcrypt.compare(
            currentPassword,
            existingUser.password
          );

          if (!isPasswordValid) {
            return reply
              .code(400)
              .send({ status: false, message: "Incorrect current password" });
          }

          const hashedNewPassword = await app.bcrypt.hash(
            newPassword ?? "",
            12
          );

          const updatedUser = await app.prisma.user.update({
            where: {
              id: id,
            },
            data: {
              password: hashedNewPassword,
              userName,
              phoneNumber,
              birthday,
              role,
              updatedAt: new Date(),
            },
          });

          reply.code(200).send({ status: true, message: "User Updated" });
        } else {
          return reply
            .code(400)
            .send({ status: false, message: "Current password is null" });
        }
      } else {
        const updatedUser = await app.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            userName,
            phoneNumber,
            birthday,
            role,
            updatedAt: new Date(),
          },
        });

        reply.code(200).send({ status: true, message: "User updated" });
      }
    } catch (err) {
      console.log("Error updating user: " + err);
      reply.code(500).send({ status: false, message: "Error updating user" });
    }
  });
  */
}

module.exports = userRoute;
