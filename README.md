# PayFari Waiting List

Modern, secure, and performant landing page for PayFari.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Vanilla CSS
- **Waitlist**: Kit (formerly ConvertKit)
- **Security**: Upstash Redis (Rate Limiting)

## Getting Started

### 1. Prerequisites
Ensure you have Node.js installed. We recommend using `pnpm` for package management.

### 2. Installation
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Kit (ConvertKit) Configuration
WAITLIST_KIT_API_KEY=your_kit_api_key
WAITLIST_KIT_FORM_ID=your_form_id

# Upstash Redis (Rate Limiting) Configuration
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Local Development
```bash
pnpm run dev
```

## Security Features
- **Rate Limiting**: Integrated using Upstash Redis to prevent bot spam. Each IP is limited to 3 waitlist submissions per 24 hours.
- **Data Validation**: Strict server-side validation for email formats and name integrity.