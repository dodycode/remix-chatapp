## Remix Chat App (WIP)
chat app build with Remix JS and [shadcn/ui](https://github.com/shadcn/ui) for UI Components. Built for learning purpose.

![Alt text](image.png)

## Getting Started
- First, you need to setup your database, I recommend use plan free from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or plan free from [Planetscale](https://planetscale.com/).

- After that, put your database url in `.env` file.

```bash
DATABASE_URL=YOUR_DATABASE_URL
```

- Then, go to github to setup your [OAuth App]. You can follow this [tutorial](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to setup your OAuth App.

- After that, put your client id and client secret in `.env` file.

```bash
GITHUB_CLIENT_ID=YOUR_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
APP_URL=YOUR_HOST
#eg: APP_URL=http://localhost:3000
```

- Then, you can run the app with `npm run dev` or `yarn dev`.

- If you want to test the chat, make sure you have 2 different github account. Then, login with different account in different browser.

## Todo
- [ ] Multiple login provider. Currently the chat app only support login with github. I want to add more login provider like google, facebook, etc.
- [ ] Responsive UI. Currently some elements not responsive yet.
- [ ] Add more features. Currently the chat app only have basic features. (maybe will do this when have free time)
