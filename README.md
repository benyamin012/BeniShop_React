# 🛍️ Beni Shop

### A modern e-commerce web application built with React ⚡

**Beni Shop** is a modern and responsive e-commerce web application built with **React** and a collection of modern frontend technologies.

The project was built to go beyond a simple product listing and to simulate a more realistic shopping experience — including authentication pages, product details, cart management, checkout flow, data fetching, routing and global state management.

> 🚀 Built as a personal frontend project to practice building scalable React applications and real-world e-commerce interfaces.

---

## ✨ Features

* 🛍️ Product browsing and product listing
* 🔎 Product details page
* 🛒 Shopping cart management
* ➕ Increase / decrease product quantity
* 🔐 Login & Signup pages
* 💳 Checkout flow
* 🧭 Client-side routing
* 📦 Product data management
* ⚡ Server-state management with React Query
* 🗃️ Global state management
* 📱 Fully responsive design
* 🎨 Modern UI with Tailwind CSS
* 💀 Loading states with Skeleton UI
* 🖼️ Product carousel with Swiper
* ❌ Custom 404 / Not Found page
* 📋 Form handling with React Hook Form
* 🌐 HTTP requests with Axios

---

## 🧠 What I Practiced

This project was mainly focused on understanding how different parts of a real-world React application work together.

### React Architecture

* Component-based architecture
* Reusable components
* Props & state management
* Hooks
* `useEffect`, `useState`, `useRef` and `useCallback`
* React Strict Mode

### State Management

The project explores multiple approaches to state management, including:

* **Redux Toolkit**
* **React Redux**
* **Zustand**

This helped me understand the differences between local state, global state and server state, and when each approach makes sense.

### Server State

The project uses **TanStack React Query** for handling asynchronous data and server-state related operations.

```js
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  {/* Application */}
</QueryClientProvider>
```

### Routing

Navigation is handled with **React Router**, including routes for:

```text
/
├── /login
├── /signup
├── /product/:id
├── /checkOut
└── /not-found
```

### Forms

Authentication and form-related functionality is handled using:

**React Hook Form**

### Styling

The UI is built with:

**Tailwind CSS**

with a focus on responsive layouts and reusable styling patterns.

---

## 🧰 Tech Stack

| Technology                | Purpose                      |
| ------------------------- | ---------------------------- |
| ⚛️ React                  | UI development               |
| ⚡ Vite                    | Development & build tooling  |
| 🎨 Tailwind CSS           | Styling                      |
| 🧭 React Router           | Client-side routing          |
| 🔄 TanStack React Query   | Server state & data fetching |
| 🗃️ Redux Toolkit         | Global state management      |
| 🐻 Zustand                | Lightweight state management |
| 🌐 Axios                  | HTTP requests                |
| 📝 React Hook Form        | Form management              |
| 🎠 Swiper                 | Product sliders / carousels  |
| 💀 React Loading Skeleton | Loading states               |
| 🧩 React Icons            | Icons                        |
| 🗄️ JSON Server           | Local API / mock backend     |

---

## 📂 Project Structure

The application is organized into reusable React components and separate pages/features.

```text
Beni-Shop/
│
├── public/
│   └── assets & static files
│
├── src/
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── ...
│   │
│   ├── app.jsx
│   ├── main.jsx
│   └── ...
│
├── db.json
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/benyamin012/Beni-Shop.git
```

### 2. Navigate to the project

```bash
cd Beni-Shop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local development URL shown in your terminal.

---

## 📸 Screenshots

> Screenshots of the application will be added here.

## 📸 Screenshots

| Home | Products |
|------|----------|
| ![Home](./ScreenShot/HomePage.png) | ![Products](./ScreenShot/ProductDetils.png) |

|  Shopping Cart |
|-----------------|
| ![Details](./ScreenShot/ShoppingCart.png) 

| Logint |
|-------|
| ![Login](./ScreenShot/Login.png) 
---

## 🛣️ Application Flow

```text
                ┌──────────────┐
                │    Beni Shop │
                └──────┬───────┘
                       │
             ┌─────────┴─────────┐
             │                   │
          Products           Authentication
             │                   │
       ┌─────┴─────┐        ┌────┴────┐
       │           │        │         │
    Details      Search    Login     Signup
       │
       ▼
     Cart
       │
       ▼
   Checkout
```

---

## 🎯 Project Goals

The main goal of Beni Shop was not simply to create another shopping website.

The project was built to practice how a real React application can be structured and how different frontend technologies can work together in a single application.

Some of the main goals were:

* Improve React fundamentals
* Practice scalable component architecture
* Understand global state management
* Work with asynchronous data
* Build reusable UI components
* Practice client-side routing
* Create responsive layouts
* Build realistic e-commerce flows
* Gain experience working with multiple libraries in one project

---

## 🔮 Future Improvements

There are still several areas that can be improved as the project evolves.

* [ ] Connect the application to a real backend
* [ ] Implement real authentication
* [ ] Add persistent user accounts
* [ ] Add wishlist functionality
* [ ] Add product search & advanced filtering
* [ ] Add order history
* [ ] Add payment integration
* [ ] Improve accessibility
* [ ] Add automated testing
* [ ] Improve performance and code splitting
* [ ] Add production deployment
* [ ] Add an admin dashboard

---

## 📚 What I Learned

Building Beni Shop helped me understand an important part of frontend development:

> **A real application is more than just making components look good.**

I had to think about application structure, state, asynchronous data, routing, forms, reusable components and how these pieces communicate with each other.

Working on the project also helped me become more comfortable with the React ecosystem and understand the trade-offs between different state-management approaches.

---

## 👨‍💻 Author

### Benyamin

Frontend Developer focused on building modern web applications with JavaScript and React.

* GitHub: [@benyamin012](https://github.com/benyamin012)

---

## ⭐ Support

If you find this project useful or interesting, consider giving it a ⭐ on GitHub.

---

### Built with ❤️ and a lot of debugging.

**Beni Shop — turning React practice into real projects.**
