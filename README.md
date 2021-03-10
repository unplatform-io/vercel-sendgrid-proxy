# Sendgrid proxy on Vercel
Sendgrid requires you to setup SSL for click and opening tracking for a custom authenticated domain.
See https://sendgrid.com/docs/ui/analytics-and-reporting/click-tracking-ssl/ for details.

This repository makes it simple to use Vercel as proxy for your Sendgrid Link Branding domain.

## Usage
To set up the proxy:

1. Deploy this repository to Vercel
2. (Optionally) remove the CNAME that you created to verify your Link Branding domain with Sendgrid
3. Configure your Sendgrid Link Branding domain in Vercel, e.g. someurl123.yourdomain.com, to point to your Vercel deployment
4. Create a Sendgrid support ticket to enable SSL click and opening tracking
