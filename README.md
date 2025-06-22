# Rent-A-Motel - Hotel Booking Platform

Rent-A-Motel is a full-stack web application designed to seamlessly connect property owners with potential renters. It provides a comprehensive platform for users to search, book, and review motel/hotel rooms, while offering property management tools for owners and administrative oversight for system managers.

## ✨ Features

### For Customers
- **User Authentication**: Secure registration and login using JWT.
- **Advanced Search**: Easily find properties with search and filtering options.
- **Detailed Listings**: View comprehensive property details, including amenities, photos, and location.
- **Online Booking**: A straightforward booking process.
- **Payment Integration**: Secure online payment system.
- **User Reviews**: Read and write reviews for properties.
- **Profile Management**: Users can view their booking history and manage their profile information.

### For Property Owners (Landlords)
- **Property Management**: Create, update, and manage property listings.
- **Image Uploads**: Showcase properties by uploading multiple images.
- **Booking Management**: View and manage incoming bookings for their properties.

### For Administrators
- **User Management**: Oversee and manage all user accounts (customers, landlords).
- **Platform Oversight**: Manage all property listings on the platform to ensure quality and compliance.

## 🛠️ Tech Stack

The project is built with a modern technology stack, separating the frontend and backend for scalability and maintainability.

- **Backend**:
  - **Framework**: Spring Boot 3.3.1
  - **Language**: Java 17
  - **API**: RESTful APIs
  - **Database**: Spring Data JPA, Hibernate, MySQL
  - **Security**: Spring Security, JSON Web Tokens (JWT)
  - **Utilities**: Lombok, Kaptcha (for CAPTCHA), Spring Mail
  - **Build Tool**: Maven

- **Frontend**:
  - **Framework**: Next.js
  - **Language**: TypeScript
  - **UI Library**: React
  - **Styling**: Tailwind CSS
  - **API Communication**: Axios

## 📂 Project Structure

The repository is organized into two main parts:

-   `Client/`: Contains the entire Next.js frontend application.
-   `ProjectEXE/`: Contains the Spring Boot backend application.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   JDK 17 or later
-   Maven
-   Node.js and npm
-   MySQL Server

### Backend Setup (Spring Boot)

1.  Navigate to the backend directory:
    ```sh
    cd ProjectEXE/ProjectEXE
    ```
2.  Configure the database connection:
    -   Open `src/main/resources/application.yml`.
    -   Update the `spring.datasource.url`, `username`, and `password` to match your local MySQL setup.
    -   Configure your JWT secret key and other sensitive properties.
3.  Install dependencies and run the application:
    ```sh
    mvn spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

### Frontend Setup (Next.js)

1.  Navigate to the frontend directory:
    ```sh
    cd Client
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  If needed, create a `.env.local` file to specify the backend API URL:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.
