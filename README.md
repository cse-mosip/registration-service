# registration-service

## Getting Started

1. Create a new file named .env in the same directory as the code file.
2. Open the .env file and add the following environment variables with their corresponding values:
    ```
    DB_NAME=your_database_name
    DB_USER=your_database_username
    DB_PW=your_database_password
    DB_HOST=your_database_host
    DB_DIALECT=your_database_dialect
    JWT_SECRET=secret
    ```
3. Install the required dependencies by running the following command:
    ```
        npm i
    ```
4. Run the following command to start the server:
    ```
        npm start
    ```
   For development purposes, you can run the following command:
    ```
        npm run start:dev
    ```
5. The server will start running on port 8080.