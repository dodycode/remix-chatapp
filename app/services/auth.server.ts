import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";

import {
  GitHubStrategy,
  SocialsProvider
} from "remix-auth-socials";

import { sessionStorage } from "~/services/session.server";

import { db } from "~/db.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  throwOnError: true
});

const getCallback = (provider: SocialsProvider) => {
  return `${process.env.APP_URL}/auth/${provider}/callback`;
};

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
      callbackURL: getCallback(SocialsProvider.GITHUB),
    },
    async ({ profile }) => {
      let registeredUser = await db.user.findUnique({
        where: { email: profile.emails![0].value },
      });

      if (!registeredUser) {
        const newUser = await db.user.create({
          data: {
            email: profile.emails![0].value,
            username: profile._json.login,
            imageUrl: profile._json.avatar_url,
          },
        });

        if (!newUser) {
          throw new Error("Error creating user");
        }

        registeredUser = newUser;
      }

      return registeredUser;
    }
  )
);
