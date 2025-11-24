# WorkWise

## TODO

- [] Add prisma v7
- [] Deploy to hosting (Vercel)
- [] Generate basic ui with mock data
- [] Actually set up a database (neondb)
- [] Integrate database with ui (Shadcn/ui)
- [] Add Authentication (Custom JWT/Better Auth)
- [] Monitoring (Uptime, Error, Incident, etc) Management (Better Stack)
- [] Analytics (Posthog, Unami, etc)
- [] Ratelimiting (upstash)

```json

    "postinstall": "prisma generate",
    "db:generate": "prisma migrate dev",
    "db:migrate": "prisma migrate deploy",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
    ```