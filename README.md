# Secret Note API

This is a simple CRUD (Create, Read, Update, Delete) API for managing encrypted notes, built using TypeScript, NestJS, Prisma ORM, PostgreSQL, and Jest for testing. The API allows a single user to store, retrieve, update, and delete encrypted notes.

## Features

- **Store a note**: Encrypts the note and stores it in the database.
- **Retrieve a list of all notes**: Provides the necessary information like creation date and ID.
- **Retrieve a single note**: Returns the decrypted value or the encrypted value based on the request.
- **Delete a single note**: Removes a note with a given ID.
- **Update a single note**: Updates a note with a given ID and encrypts it again before storing.

## Technologies Used

- **TypeScript**: Provides static typing for better code quality and maintainability.
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma ORM**: A next-generation ORM that makes working with databases easy and intuitive.
- **PostgreSQL**: A powerful, open source object-relational database system.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Docker**: Required for running the application in a container. You can download it from [docker.com](https://www.docker.com/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/secret-note-api.git
   cd secret-note-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/secret_notes"
   ENCRYPTION_KEY="your-encryption-key"
   ```

4. **Set up the database**:
   Run the following command to set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

### Running the Application

You can run the application using Docker:

```bash
docker-compose up --build
```
