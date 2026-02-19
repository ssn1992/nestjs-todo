# NestJs MySQL TypeORM Sample

This project is sample application that demonstrates storing and receiving data in MySQL database using NestJS framework and TypeORM.

![](https://cdn-images-1.medium.com/max/800/1*zeOv4blDpgcoqTLUvfmbXQ.png)

It's a source code for the following article on the medium:

- https://medium.com/@zoransasko/using-nestjs-mysql-typeorm-in-building-simple-notes-app-5cdbee9712e0

## Setup

In order to start this sample, please make sure that you specify the right data for establishing MySQL connection (in 'app.module.ts' file, make sure that 'username', 'password' and 'database' values matches your MySQL server values):
```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "test",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```
Then please install all the app depencencies by executing the following command:
```
npm install
```

**Note**: `better-sqlite3` requires native compilation. Build tools should be pre-installed on most systems.

and you can run the app by executing the following command:
```
npm run start:dev
```

## AWS Deployment

Perfect for AWS student exercises:

### Single Instance Deployment (Recommended for Students):
- **AWS EC2**: SQLite file stored on EBS volume
- **AWS Elastic Beanstalk**: Single instance configuration
- **Docker Container**: Each student gets their own container

### Environment Variables:
```bash
# Optional: Custom database location
export DB_PATH=/var/app/data/todo.db
```

### Database File:
- Default location: `todo.db` in project root
- Automatically created on first run
- Reset by deleting the file: `rm todo.db`

### Why SQLite for Students?
✅ No external database server needed  
✅ Zero configuration required  
✅ Lightweight and portable  
✅ Anti-locking configuration prevents common errors  
✅ Perfect for learning and exercises  

## API Documentation (Swagger)

This project includes Swagger API documentation. Once the application is running, you can access the interactive API documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:
- Interactive API documentation
- Try out API endpoints directly from the browser
- View request/response schemas
- Test all CRUD operations for todos
- **Export collection buttons** to download the OpenAPI specification

### Export Collection Features

The Swagger UI includes two export buttons in the top-right corner:

1. **📥 Export OpenAPI JSON** - Opens the raw OpenAPI specification in a new tab (available at `/api-json`)
2. **📤 Download Collection** - Downloads the OpenAPI specification as a JSON file that can be imported into:
   - Postman
   - Insomnia
   - Swagger Editor
   - Any other API tool that supports OpenAPI 3.0

### Available Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo by ID
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `GET /todos/clear/all` - Clear all todos


