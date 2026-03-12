# Current.ai

Signal-driven retail intelligence platform. Current monitors real-time local signals — weather, game days, campus events, foot traffic — and uses AI to generate revenue-driving campaigns for independent retailers.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **Auth**: Clerk (keyless mode supported)
- **Database**: Supabase
- **AI**: Anthropic Claude 4.6
- **Language**: TypeScript (strict mode)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/current-ai.git
cd current-ai

# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/signals/        # REST API for signal analysis
│   ├── actions/            # Server actions (AI branding)
│   ├── dashboard/          # Dashboard page + store actions
│   ├── features/           # Features overview page
│   ├── signup/             # Signup flow
│   ├── waitlist/           # Waitlist capture
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   └── contact/            # Contact form
├── components/             # Reusable React components
│   └── ui/                 # Design system primitives
├── hooks/                  # Custom React hooks
├── lib/                    # Backend utilities
│   └── services/           # Domain service layer
└── types/                  # TypeScript domain models
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude 4.6 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (optional) |
| `CLERK_SECRET_KEY` | Clerk secret key (optional) |

## API Routes

- `GET /api/signals` — Returns active signals for Ann Arbor
- `POST /api/signals/analyze` — Accepts signals array, returns generated campaigns
- `GET /api/health` — Health check endpoint

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler check
```
