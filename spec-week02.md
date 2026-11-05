# Books API Week 02 Spec Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author ID (rather than the author's name directly), and then update the API to provide the remaining CRUD operations for books (create, update, and delete).

### Data Model

Book documents will be stored in the `books` collection.
Required book fields:

- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id`.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The valid authors will exist in an `authors` collection.
When creating or updating a book, the API should reject the request if the `authorId` does not match an existing author in the database.

### Routes

#### GET /books

- **Purpose**: Return all books.
- **Success**:
  - Status code: `200`
  - Response body: an array of book objects
- **Errors**:
  - `500` if an unexpected server or database error occurs

#### GET /books/:id

- **Purpose**: Return one book by its custom id.
- **Success**:
  - Status code: `200`
  - Response body: the matching book object
- **Errors**:
  - `404` if no book exists with that id
  - `500` if an unexpected server or database error occurs

#### POST /books

- **Purpose**: Create a new book.
- **Request body**:
  ```json
  {
    "id": "b4",
    "authorId": "a1",
    "title": "Example Book Title",
    "publicationDate": "2026-01-15"
  }
  ```

# Books API Week 02 Spec Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing book API so book documents include a reference to an author ID, provide full CRUD operations, and enforce data validation and pagination.

### Data Model

Book documents will be stored in the `books` collection.
Required book fields:

- `id`: string, required, immutable custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author
- `title`: string, required, maximum 100 characters
- `publicationDate`: string, required, YYYY-MM-DD format

### Relationship to Authors

Each book will identify its author with an `authorId` field. The API must reject the request if the `authorId` does not match an existing author in the `authors` collection.

### Routes

#### GET /books

- **Purpose**: Return books with pagination to prevent database overload.
- **Query Parameters**: `page` (default 1), `limit` (default 10)
- **Success**:
  - Status code: `200`
  - Response body: an array of book objects
- **Errors**:
  - `500` if an unexpected server or database error occurs

#### GET /books/:id

- **Purpose**: Return one book by its custom id.
- **Success**:
  - Status code: `200`
  - Response body: the matching book object
- **Errors**:
  - `404` if no book exists with that id
  - `500` if an unexpected server or database error occurs

#### POST /books

- **Purpose**: Create a new book.
- **Request body**: JSON containing `id`, `authorId`, `title`, and `publicationDate`.
- **Success**:
  - Status code: `201`
  - Response body: the newly created book object
- **Errors**:
  - `400` if a required field is missing or invalid length/format
  - `400` if the `id` already exists
  - `400` if the `authorId` does not match an existing author
  - `500` if an unexpected server or database error occurs

#### PUT /books/:id

- **Purpose**: Update an existing book (requires full document replacement).
- **Request body**: JSON containing `authorId`, `title`, and `publicationDate`.
- **Success**:
  - Status code: `200`
  - Response body: the updated book object
- **Errors**:
  - `400` if a required field is missing or the user attempts to modify the `id`
  - `400` if the `authorId` does not match an existing author
  - `404` if no book exists with that id
  - `500` if an unexpected server or database error occurs

#### DELETE /books/:id

- **Purpose**: Delete an existing book.
- **Success**:
  - Status code: `204`
  - Response body: none
- **Errors**:
  - `404` if no book exists with that id
  - `500` if an unexpected server or database error occurs

---

## Feature 2: Author CRUD Operations

### Goal

Add an authors collection with full CRUD operations, data validation, and safe deletion constraints.

### Data Model

Author documents will be stored in the `authors` collection.
Required author fields:

- `id`: string, required, immutable custom id such as `a1`
- `name`: string, required, maximum 100 characters
- `birthYear`: number, required, must be a realistic past year (e.g., `< 2025`)

### Routes

#### GET /authors

- **Purpose**: Return authors with pagination.
- **Query Parameters**: `page` (default 1), `limit` (default 10)
- **Success**:
  - Status code: `200`
  - Response body: an array of author objects
- **Errors**:
  - `500` if an unexpected server or database error occurs

#### GET /authors/:id

- **Purpose**: Return one author by their custom id.
- **Success**:
  - Status code: `200`
  - Response body: the matching author object
- **Errors**:
  - `404` if no author exists with that id
  - `500` if an unexpected server or database error occurs

#### POST /authors

- **Purpose**: Create a new author.
- **Request body**: JSON containing `id`, `name`, and `birthYear`.
- **Success**:
  - Status code: `201`
  - Response body: the newly created author object
- **Errors**:
  - `400` if a required field is missing or birth year is invalid
  - `400` if the `id` already exists
  - `500` if an unexpected server or database error occurs

#### PUT /authors/:id

- **Purpose**: Update an existing author (requires full document replacement).
- **Request body**: JSON containing `name` and `birthYear`.
- **Success**:
  - Status code: `200`
  - Response body: the updated author object
- **Errors**:
  - `400` if a required field is missing or the user attempts to modify the `id`
  - `404` if no author exists with that id
  - `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

- **Purpose**: Delete an existing author.
- **Success**:
  - Status code: `204`
  - Response body: none
- **Errors**:
  - `400` if the author still has books (Response: `{"error": "Cannot delete author with existing books"}`)
  - `404` if no author exists with that id
  - `500` if an unexpected server or database error occurs
