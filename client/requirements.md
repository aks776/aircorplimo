## Packages
framer-motion | Required for smooth, premium scroll animations and the hero scale effect
react-hook-form | Form state management for the booking system
@hookform/resolvers | Zod resolver for form validation

## Notes
- Smooth scrolling is handled via native CSS `scroll-behavior: smooth`.
- Booking form submits to the provided Google Apps Script URL using `no-cors` mode, while simultaneously sending a backup to the local `/api/bookings` endpoint.
- Google Maps visual representation uses an API-key-free standard embed iframe.
- Tailwind config should extend fonts: `font-serif` to Playfair Display, and `font-sans` to Montserrat to match the CSS variables.
