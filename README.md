# Visitor Management App

# Table of Contents

- [Visitor Management App](#visitor-management-app)
- [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Database](#database)
    - [Source Code](#source-code)
    - [Path](#path)
    - [Dependencies](#dependencies)
    - [Running the project](#running-the-project)

## Setup

### Database

This project is using [MySQL](https://www.mysql.com/) as it's main database, to download MySQL database, first head to this [link](https://devmysql.com/downloads) then download the one matching your operating system

Make sure you download both the server and the client tools to avoid any issues running the project

> If you're facing any problems, we recommend following the beginning of this [tutorial](https://youtu.be/7S_tz1z_5bA)

After running the database, you must run everything inside these pre-made SQL files inside the `./sql` folder to create the tables and insert the dummy data used for testing the webapp

### Source Code

Download all the files of this repository then open two terminals

### Path

In the first terminal, use the following command to move to the frontend folder

```bash
cd frontend
```

And in the second terminal, use the following command to move to the backend folder

```bash
cd backend
```

### Dependencies

After that, use this command on both terminals to download all the project dependencies

```bash
npm run install
```

### Running the project

Finally, use this command on both terminals to run the backend and frontend locally

```bash
npm run dev
```

The frontend will run on this url: https://localhost:5173/

While the backend will run on this url: https://localhost:8888