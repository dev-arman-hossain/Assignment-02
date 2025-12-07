# Vehicle Booking System

## Project Overview

The **Vehicle Booking System** is a comprehensive backend API designed to streamline the vehicle rental process. It provides functionalities for customers to view available vehicles, manage bookings, and update their profiles. Admins can efficiently manage vehicles, users, and bookings through a secure admin interface.

### Live Demo
Explore the live version of the Vehicle Booking System:  
[Live Demo](https://new-folder-coral-six.vercel.app)

---

## Key Features & Technology Stack

### Features:
- **Vehicle Management**: Admins can add, update, or remove vehicles from the platform.
- **Customer Management**: Customers can create accounts, browse vehicles, and create booking requests.
- **Booking System**: Supports vehicle rental bookings, automatic price calculation, and status management for bookings.
- **Authentication**: Secure login and registration mechanism using JWT (JSON Web Token) for both users and admins.

### Technology Stack:
- **Node.js** + **TypeScript**: Used for backend development, ensuring type safety and scalability.
- **Express.js**: A fast and minimalist web framework for building the API.
- **PostgreSQL**: A powerful relational database to store user, vehicle, and booking information.
- **bcrypt**: For hashing passwords securely.
- **jsonwebtoken**: Used for user and admin authentication with token-based authorization.

---

## Setup & Usage Instructions

### Installation

To set up the project locally, follow the steps below:

1. **Install Dependencies**:
    - Clone the repository and navigate to the project directory.
    ```bash
    git clone https://github.com/dev-arman-hossain/Assignment-02.git
    cd Assignment-02
    ```
    - Install the required npm dependencies.
    ```bash
    npm install
    ```

2. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory of the project.
    - Add the following environment variables:
    ```bash
    SECRET_KEY=your_secret_key
    DATABASE_URL=your_database_url
    ```

3. **Start the Server**:
    - Once dependencies are installed and the environment variables are configured, start the server with the following command:
    ```bash
    npm run dev
    ```
    - The server will run on `http://localhost:3000`.

### Live API Access:
To interact with the live API, you can access it at the following URL:  
[Live API](https://new-folder-coral-six.vercel.app)

---

## Prerequisites

Ensure that you have the following installed on your machine before setting up the project:

- **Node.js** (v12.x or higher)
- **npm** (Node Package Manager)

---

## API Documentation

The API offers several endpoints for managing vehicles, bookings, and user authentication. For detailed information on available routes and their usage, please refer to the API documentation (add link if available).

---

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please feel free to submit an issue or pull request.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Node.js**, **Express.js**, and **PostgreSQL** for providing a reliable and scalable backend platform.
- **JWT** and **bcrypt** for implementing secure authentication and password hashing.

---

## Support

For further assistance, please open an issue on the repository or reach out to the project maintainers.