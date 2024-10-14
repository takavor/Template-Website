This is a template TypeScript Next.js web application with a responsive navigation bar and an account creation/login system using the NextAuth credentials provider. The template uses Tailwind styling and the Prisma ORM for database management (SQLite is the default database I've integrated). The project uses the Next.js App Router.

https://github.com/user-attachments/assets/445a5ee9-f6e7-4036-be5d-3d7a9d4272cb

## Getting Started

To set up the template website, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/takavor/Template-Website.git
cd Template-Website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:
```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=...
```
Note that your `DATABASE_URL` will be different if you use a different database. You should put a secret key in the `NEXTAUTH_SECRET` field. Make sure you add the `.env` file to your `.gitignore`.

4. Generate and migrate Prisma:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Start the development server in the root of the project:
```bash
npm run dev
```

6. Open `http://localhost:3000` in your browser to see the website.

Voilà!

## Styling
To configure the primary colours of the website, you can edit the `primary` field in the `tailwind.config.ts` file and set your desired colour palette for the different shades.

## Navigation links
Add your desired navigation links to the `data/navLinks.ts` file, and they will be rendered automatically. Make sure to create the pages for the links you add in the `app` folder.

## Viewing the database
To view the contents of your database, run `npx prisma studio`. You will see changes in your database in realtime at `http://localhost:5555`.

## Contributions
Feel free to open an issue or PRs to contribute to this template.
