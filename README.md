# Shine Ticket - Event Marketplace 🎟️

Shine Ticket is a comprehensive event marketplace platform built with React, allowing users to discover and purchase tickets, while also empowering organizers to create and manage their own events from start to finish.

---

## ✨ Live Demo & Repositories

**[➡️ View Live Demo on Vercel](https://shine-ticket-clone.vercel.app/)**

## Original University Project Code

[https://github.com/dohuy0708/SE121-ShineTicket](https://github.com/dohuy0708/SE121-ShineTicket)

---

## 🚀 Key Features & Technical Highlights

- **🎫 Full-Cycle Event Management:** Architected a complete event ecosystem with three distinct user roles:

  - **Ticket Buyers:** Can browse, search, and purchase tickets for various events.
  - **Event Organizers:** Can use a multi-step wizard to create and publish detailed events with multiple ticket tiers.
  - **Admins:** Have oversight to approve new events, confirm manual payments, and view overall platform revenue.

- **⏳ Time-Critical Reservation System:** Engineered a crucial 15-minute ticket reservation system. When a user proceeds to checkout, an order is created with a "pending" status. If not completed within 15 minutes, the system automatically cancels the order, releasing the tickets back into the pool. This was a challenging feature that required careful state and logic management.

- \*\* wizard.

- **💻 Responsive & User-Centric UI:** Designed and built a clean, intuitive, and fully responsive interface using **Tailwind CSS** to ensure a seamless experience for all users across desktop and mobile devices.

---

## 🛠️ My Role & Contributions

As the **sole frontend developer** for this project, I was responsible for:

- Designing and developing the entire frontend application from scratch.
- Implementing all user-facing features, including the event discovery, ticket purchasing flow, and the multi-step event creation wizard.
- Handling all API integrations with the backend and managing the application's client-side state.

---

## 💻 Tech Stack

- **Core:** ReactJS, JavaScript (ES6+), Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Signify
- **API Communication:** Axios

---

This project consists of a **Frontend** (this repository) and a **Backend**. For the application to function correctly, the backend server must be running.

### 1️⃣ **Backend Setup (Choose ONE option)**

The backend server is responsible for all data and business logic. You can either connect to the deployed version or run it locally for development.

- **Option A: Use the Deployed Backend (Recommended & Easiest)**

  - The backend has already been deployed on Render and is ready to use. Simply point your frontend `.env` file to the deployed URL. No further backend setup is required.

- **Option B: Run the Backend Locally**
  - If you wish to run the backend server on your own machine, please follow the setup instructions in the [**Backend Repository**](https://github.com/huyhoang462/ShineTicketClone-Backend).

### 2️⃣ **Frontend Setup (This Repository)**

1.  **Clone this repository:**

    ```sh
    git clone https://github.com/huyhoang462/ShineTicketClone
    cd ShineTicketClone
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Setup Environment Variables:**

    - Create a file named `.env` in the root of the frontend project.
    - Add the following variable, choosing the appropriate URL based on your backend setup from Step 1.

    ```env
    # Use this URL if you chose Option A (Deployed Backend)
    VITE_API_BASE_URL=https://shine-ticket-clone-backend.onrender.com

    # Use this URL if you chose Option B (Local Backend)
    # Make sure your local backend is running on port 8080
    VITE_API_BASE_URL=http://localhost:8080
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will now be running at `http://localhost:3000` (this can be configured in vite.config.js) and connected to the specified backend.
