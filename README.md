# Receipt Tracker

A modern React application for tracking and managing your receipts and expenses. Keep your financial records organized with an intuitive interface and powerful search capabilities.

## Features

- 📸 **Receipt Capture** - Upload and store receipt images
- 💰 **Expense Tracking** - Log amounts, categories, and dates
- 🔍 **Smart Search** - Find receipts by merchant, amount, or category
- 📊 **Analytics** - View spending patterns and summaries
- 🏷️ **Categories** - Organize expenses with customizable categories
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 💾 **Data Export** - Export your data to CSV or PDF

## Getting Started

### Prerequisites

- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/receipt-tracker.git
cd receipt-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Adding a Receipt

1. Click the "Add Receipt" button
2. Upload an image of your receipt (optional)
3. Fill in the details:
   - Merchant name
   - Amount
   - Date
   - Category
   - Description (optional)
4. Click "Save" to store the receipt

### Managing Categories

- Go to Settings > Categories
- Add, edit, or delete expense categories
- Assign colors to categories for better organization

### Searching Receipts

Use the search bar to find receipts by:
- Merchant name
- Amount range
- Date range
- Category
- Description keywords

## Tech Stack

- **Frontend**: React 18, React Router
- **Styling**: CSS Modules / Styled Components
- **State Management**: React Context API / Redux Toolkit
- **Image Processing**: Canvas API for receipt image handling
- **Data Storage**: LocalStorage / IndexedDB
- **Build Tool**: Create React App / Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Receipt/
│   ├── ReceiptForm/
│   └── SearchBar/
├── pages/              # Main application pages
│   ├── Dashboard/
│   ├── Receipts/
│   └── Settings/
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── utils/              # Helper functions
├── styles/             # Global styles
└── App.js             # Main application component
```

## API Integration

To connect with a backend API, update the configuration in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://your-api-endpoint.com';
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter
- `npm run format` - Formats code with Prettier

## Deployment

### Build for Production

```bash
npm run build
```

The build folder will contain the optimized production build.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `build`
4. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=your_api_url_here
REACT_APP_STORAGE_KEY=receipt_tracker_data
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Roadmap

- [ ] OCR text extraction from receipt images
- [ ] Cloud storage integration
- [ ] Multi-user support
- [ ] Receipt sharing capabilities
- [ ] Advanced reporting features
- [ ] Mobile app (React Native)

## Troubleshooting

### Common Issues

**App doesn't start**
- Ensure Node.js version 16+ is installed
- Delete `node_modules` and run `npm install` again

**Images not uploading**
- Check browser permissions for file access
- Verify image file size is under 10MB

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check the [FAQ](docs/FAQ.md)
- Contact: your-email@example.com

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from [Dribbble](https://dribbble.com/)
- Built with [Create React App](https://create-react-app.dev/)

---

Made with ❤️ by [Your Name]
