# Qiskit Fall Fest 2026 - Frontend

Modern, responsive Next.js frontend for the Qiskit Fall Fest 2026 event website.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios

## Features

- 🎨 Modern, quantum-inspired design
- 📱 Fully responsive (mobile-first)
- ♿ Accessibility-focused
- 🔒 Secure admin dashboard
- ✅ Client-side form validation
- 🚀 Optimized performance
- 📊 Registration management

## Pages

### Public Pages
- **Home** (`/`) - Event overview, objectives, and highlights
- **Resources** (`/resources`) - Learning materials and tutorials
- **Speakers** (`/speakers`) - Speaker profiles and sessions
- **Our Team** (`/team`) - Organizing team members
- **Supporters** (`/supporters`) - Sponsors and partners
- **About Us** (`/about`) - Organization vision and mission
- **Register** (`/register`) - Event registration form

### Admin Pages
- **Admin Login** (`/admin`) - Secure authentication
- **Dashboard** (`/admin/dashboard`) - Registration management

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see `../backend/README.md`)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── admin/               # Admin pages
│   │   ├── page.tsx         # Admin login
│   │   └── dashboard/       # Admin dashboard
│   ├── register/            # Registration page
│   ├── resources/           # Resources page
│   ├── speakers/            # Speakers page
│   ├── supporters/          # Supporters page
│   └── team/                # Team page
├── components/              # React components
│   ├── Navigation.tsx       # Main navigation
│   └── Footer.tsx           # Footer component
├── lib/                     # Utilities and configurations
│   ├── api.ts              # API client and endpoints
│   ├── types.ts            # TypeScript types
│   └── validations.ts      # Zod schemas
├── public/                  # Static assets
├── .env.local              # Environment variables (not in git)
├── .env.example            # Environment template
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## API Integration

The frontend communicates with the FastAPI backend through the API client (`lib/api.ts`).

### Registration Flow

```typescript
// Submit registration
const response = await registrationApi.create(formData);
// Returns: { registration_id: "QFF-XXXXXX", message: "..." }
```

### Admin Authentication

```typescript
// Login
const response = await adminApi.login(username, password);
localStorage.setItem('admin_token', response.access_token);

// Fetch registrations
const registrations = await adminApi.getRegistrations();

// Update registration status
await adminApi.updateRegistration(id, { status: 'confirmed' });

// Export CSV
const blob = await adminApi.exportRegistrations();
```

## Form Validation

Registration form uses Zod for schema validation:

```typescript
// lib/validations.ts
export const registrationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  // ... other fields
});
```

React Hook Form handles form state and validation:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(registrationSchema),
});
```

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with a custom quantum-inspired color palette:

- **Primary**: Purple/Indigo gradient
- **Accent**: Cyan/Blue
- **Highlights**: Pink/Purple

### Responsive Design

All pages are mobile-first and responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Admin Dashboard

### Features
- View all registrations
- Search by name, email, or ID
- Filter by status (pending/confirmed/cancelled)
- Update registration status
- Export registrations to CSV
- Real-time statistics

### Authentication
Admin routes are protected. Users must login at `/admin` before accessing the dashboard.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

The production build is optimized and includes:
- Minified JavaScript/CSS
- Image optimization
- Static page generation where possible

## Docker Deployment

See the root `docker-compose.yml` for containerized deployment.

```bash
# From project root
docker-compose up frontend
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Performance

- Server-side rendering (SSR)
- Static generation for public pages
- Image optimization
- Code splitting
- Lazy loading

## Security

- XSS protection via React
- CSRF protection
- Secure token storage (localStorage)
- Input validation (client + server)
- HTTPS in production

## Troubleshooting

### API Connection Issues

If you see connection errors:
1. Verify backend is running (`http://localhost:8000`)
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Ensure CORS is configured in backend

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Type Errors

```bash
# Run type checking
npx tsc --noEmit
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write semantic, accessible HTML
4. Test on multiple devices/browsers
5. Keep components small and focused

## License

This project is part of Qiskit Fall Fest 2026.

## Support

For issues or questions:
- Check the documentation
- Review existing issues
- Contact the development team

---

Built with ❤️ for the quantum computing community