# Who Funds Bitcoin Development?

Publicly disclosed bitcoin development funding, excluding downstream allocations.

## Features

- Interactive data table with mobile-responsive card view
- Filtering by funder, recipient, and year
- Search functionality across all fields
- Funding statistics and summaries
- Sort by date
- Dark mode support

## Development Setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bitcoin-dev-project/who-funds-bitcoin-development
cd who-funds-bitcoin-development
```

2. Install dependencies:
```bash
npm install
```

## Running Locally

Because this project is configured for static export, the development process is slightly different from a typical Next.js application.

1. Build the project:
```bash
npm run build
```

2. Serve the static files:
```bash
npx serve@latest out
```

The site will be available at the URL shown in the terminal (typically `http://localhost:3000`).
