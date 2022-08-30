import { ApolloServer } from "apollo-server-express";
import { createServer } from "https";
import express from "express";
import fs from "fs";
import cookieParser from "cookie-parser";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { APP_SECRET, getDynamicContext, getUserId } from "./utils";

const httpsOptions = {
  cert: fs.readFileSync("./ssl/blackstoregb_com.crt"),
  ca: fs.readFileSync("./ssl/blackstoregb_com.ca-bundle"),
  key: fs.readFileSync("./ssl/blackstoregb_com.key"),
};

const prisma = new PrismaClient();
export const pubsub = new PubSub();

async function main() {
  const app = express();
  const httpServer = createServer(httpsOptions, app);

  app.use(cookieParser(APP_SECRET));

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscription",
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        const userAuth = await getDynamicContext({ ...prisma.user }, ctx);

        return {
          userAuth,
          pubsub,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
    context: async ({ req, res }) => {
      const user =
        req && req.headers.authorization && (await getUserId(prisma.user, req));

      return {
        ...req,
        res,
        prisma,
        pubsub,
        userId: user ? user.userId : null,
        userRole: user ? user.userRole : null,
        token: user ? user.token : null,
        cartId: user ? user.cartId : null,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      // origin: "*",
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://garmin-clone.netlify.app",
        "https://62f8c9ae94aca554c7cf5d75--friendly-fox-a3e655.netlify.app/",
        "garmin-clone-aekryz1993.vercel.app",
        "garmin-clone-git-main-aekryz1993.vercel.app",
        "garmin-clone.vercel.app",
        "https://vercel.com/aekryz1993/garmin-clone/BYSrcaFv1R45F8EG9gCif37EyNg2",
        "http://192.168.100.10:3000",
        "https://garmin-clone.vercel.app/",
        "https://garmin-clone-o48qfmlrx-aekryz1993.vercel.app/",
        // "https://garmin-clone-frontend.herokuapp.com/",
        "https://garmin-clone.vercel.app/",
      ],
    },
  });

  await new Promise((resolve) =>
    // httpServer.listen({ port: process.env.PORT || 4001 }, resolve)
    httpServer.listen({ port: 443, host: "blackstoregb.com" }, resolve)
  );
  // console.log(
  //   `🚀 Server ready at http://localhost:${process.env.PORT || 4001}${
  //     server.graphqlPath
  //   }`
  // );
}

main();
