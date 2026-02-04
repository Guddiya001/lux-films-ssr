Lux Films – SSR Movie Browser
Lux Films is a server-side rendered web application for browsing films by category, viewing film details, and managing a wishlist.
The project demonstrates frontend architecture, SSR without full-stack frameworks, reusable component design, and clean state management.

🚀 Features
Server-Side Rendering (SSR) with custom Node.js server
Browse films in three categories (Popular, Top Rated, Upcoming)
Film detail page with category-based theming
Add films to persistent wishlist
Toast notification on wishlist action
Global header and sticky footer layout
Reusable UI components
Basic unit tests
🧱 Tech Stack
React
TypeScript
Vite
Node.js (Express)
SCSS
React Router
Jest + React Testing Library
🏗 Architecture
src ├─ client │ ├─ components │ ├─ pages │ ├─ styles │ ├─ router.tsx │ └─ main.tsx │ ├─ server │ ├─ server.ts │ └─ render.tsx │ └─ shared ├─ api.ts ├─ store.ts └─ types.ts

client → Browser-side React application
server → SSR logic and HTTP server
shared → Types, API layer, and global state
🧠 SSR Strategy
A custom Express server renders React routes using renderToString and returns HTML to the browser.

On the client side, React hydrates the HTML using hydrateRoot.

This approach improves:

First paint performance
SEO
Perceived loading speed
🌐 Data Layer
All TMDB API calls are centralized in:

src/shared/api.ts

This avoids duplication and keeps data access consistent between server and client.

🧩 State Management
Wishlist state is implemented using React Context:

Items stored in memory
Persisted to localStorage
Accessible via custom hook useWishlist()
🎨 Styling
SCSS split into:
base.scss
layout.scss
components.scss
Category-based theming is implemented using CSS classes.

🧪 Testing
Basic unit tests cover:

FilmCard rendering
Carousel rendering
Wishlist store logic
Run tests:

npm run test

⚙️ Setup Instructions
1) Install dependencies
TMDB_API_KEY=your_api_key_here

3) Build client
npm run build

4) Start server
node dist/server/server.js

Open:

http://localhost:3000

🔍 Trade-offs
SSR data is fetched on the client after hydration to keep implementation simple
No heavy state management libraries used
UI kept minimal to focus on architecture and structure
🔮 Future Improvements
Server-side data preloading per route
Skeleton loaders
Error boundaries
Pagination / infinite scrolling
Accessibility improvements
End-to-end tests
👤 Author
Ashish Kumar Singh
Senior Frontend Engineer