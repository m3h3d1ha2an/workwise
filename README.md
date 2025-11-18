# WorkWise - Smart Task Manager

WorkWise is a modern, intelligent task management application designed to help teams streamline their workflow, manage projects efficiently, and balance workloads effectively. Built with a powerful and modern tech stack, it provides features like smart task assignment, automatic workload balancing, and detailed activity logging.

This project is built to be submitted by November 19th, 9 PM.

## ✨ Features

*   **Team Management:** Create teams and add members with specific roles and task capacities.
*   **Project Management:** Organize work into projects linked to specific teams.
*   **Task Tracking:** Create, update, delete, and filter tasks with details like priority, status, and assigned member.
*   **Smart Task Assignment:** When assigning a task, view each team member's current workload (`current tasks / capacity`) to make informed decisions.
*   **Overload Warnings:** Get alerts when assigning tasks to a team member who is already over capacity.
*   **Auto-Reassignment:** A one-click button to automatically rebalance tasks from overloaded members to those with available capacity, prioritizing high-priority tasks.
*   **Dashboard:** Get a quick overview of total projects, tasks, team workload summaries, and recent activity.
*   **Activity Log:** Track all task reassignments to maintain transparency.
*   **Secure Authentication:** User registration and login handled securely by Clerk.

## 🚀 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Database:** [Vercel Postgres](https://vercel.com/storage/postgres)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **API Layer:** [tRPC](https://trpc.io/)
*   **Package Manager:** [Bun](https://bun.sh/)
*   **Linting & Formatting:** [Biome](https://biomejs.dev/)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [Bun](https://bun.sh/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/workwise.git
cd workwise
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

```bash
cp .env.example .env.local
```

You will need to get API keys and secrets from:
*   **Clerk:** for authentication.
*   **Vercel Postgres:** for the database connection string.

### 4. Push Database Schema

Push the Prisma schema to your Vercel Postgres database to create the necessary tables.

```bash
bun prisma db push
```

### 5. Run the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ☁️ Deployment

This application is configured for easy deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to a new Vercel project, and it will be deployed automatically.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
