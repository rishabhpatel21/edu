# Student Dashboard

A modern, responsive dashboard for tracking student academic performance built with React, TypeScript, and Supabase.

![Student Dashboard](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000)

## Features

- 📊 Real-time performance tracking
- 📚 Course enrollment management
- 📈 Interactive performance charts
- 🎓 Student profile overview
- 🔐 Secure authentication and authorization
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: Supabase
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── lib/           # Utility functions and configurations
│   ├── components/    # React components
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── supabase/         # Database migrations and configurations
```

## Database Schema

See [DB.md](./DB.md) for detailed database documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.