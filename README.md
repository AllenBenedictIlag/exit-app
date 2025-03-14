# Exit Interview System

A web-based exit interview management system for Electronic Manufacturing Company. This application streamlines the employee exit process by digitizing exit interviews and providing analytics on employee feedback.

## Features

- Multi-step exit interview form
- Dashboard with analytics and visualizations
- User management for administrators
- Detailed reports on exit trends and reasons
- Mobile-responsive design

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **UI Library**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API, Zustand
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/exit-interview-system.git
   cd exit-interview-system
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login Credentials (for demo)

- Username: admin
- Password: password

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/services` - API service functions
- `/src/hooks` - Custom React hooks
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions
- `/public` - Static assets

## Development

### Coding Style

This project uses ESLint and TypeScript for code quality. Run the linter with:

```
npm run lint
```

### Building for Production

```
npm run build
npm start
```

## License

This project is proprietary and confidential.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [React Hook Form](https://react-hook-form.com/)
