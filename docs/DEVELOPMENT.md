# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- Basic knowledge of React, Next.js, and TypeScript

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pool-monitoring-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For Electron development:
   ```bash
   npm run electron-dev
   ```

## Project Structure

```
pool-monitoring-dashboard/
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   │   ├── features/    # Feature-specific components
│   │   └── ui/          # Reusable UI components
│   ├── lib/            # Utility functions and helpers
│   ├── styles/         # Global styles and Tailwind config
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
├── docs/              # Documentation
└── main.js            # Electron main process
```

## Development Workflow

### 1. Branching Strategy
- `main`: Production-ready code
- `development`: Integration branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### 2. Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Follow component composition patterns
- Implement proper error handling

### 3. Testing
- Write unit tests for components
- Test business logic thoroughly
- Implement integration tests
- Perform end-to-end testing

### 4. Performance Considerations
- Optimize bundle size
- Implement code splitting
- Use proper caching strategies
- Monitor performance metrics

## Available Scripts

- `npm run dev`: Start Next.js development server
- `npm run build`: Build the application
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run electron-dev`: Start Electron development

## Contributing

1. Create a new branch
2. Make your changes
3. Write/update tests
4. Submit a pull request
5. Wait for review and approval

## Troubleshooting

### Common Issues
1. Port conflicts
   - Check for running processes
   - Use different port if needed

2. Build errors
   - Clear `.next` cache
   - Reinstall dependencies

3. Type errors
   - Update TypeScript definitions
   - Check import paths 