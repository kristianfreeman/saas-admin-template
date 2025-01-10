# SaaS Admin Template

A complete admin dashboard template built with Astro, Shadcn UI, and Cloudflare's developer stack. Quickly deploy a fully functional admin interface with customer and subscription management capabilities.

## Features

- 🎨 Modern UI built with Astro and Shadcn UI
- 🔐 Built-in API with token authentication
- 👥 Customer management
- 💳 Subscription tracking
- 🚀 Deploy to Cloudflare Workers
- 📦 Powered by Cloudflare D1 database
- ✨ Clean, responsive interface
- 🔍 Data validation with Zod

## Tech Stack

- Frontend: [Astro](https://astro.build)
- UI Components: [Shadcn UI](https://ui.shadcn.com)
- Database: [Cloudflare D1](https://developers.cloudflare.com/d1)
- Deployment: [Cloudflare Workers](https://workers.cloudflare.com)
- Validation: [Zod](https://github.com/colinhacks/zod)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kristianfreeman/saas-admin-template.git
cd saas-admin-template
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
# Create a .dev.vars file for local development
touch .dev.vars
```

Add your API token:
```
API_TOKEN=your_token_here
```

## Development

Run the development server:
```bash
npm run dev
```

If you're testing Workflows, you should run `npm run wrangler:dev` instead.

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Set your production API token:
```bash
npx wrangler secret put API_TOKEN
```

## API Endpoints

(Documentation coming soon)

All API endpoints require authentication via API token.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

If you have any questions or run into issues, please open an issue in the repository.

---

Note: This project is under active development. Production use is not recommended yet.
