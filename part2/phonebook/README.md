# Phonebook App 

This project is part of the **Full Stack Open – Part 2 (Exercises 2.6–2.17)**.

It is a React application for managing contacts with a backend server.

---

##  Features

* Add new contacts (name and phone number)
* Prevent duplicate names
* Update existing contact numbers
* Delete contacts
* Filter/search contacts
* Display success and error notifications
* Data is stored on a server (JSON Server)

---

##  Technologies Used

* React (`useState`, `useEffect`)
* Axios
* JSON Server (mock backend)
* Vite

---

##  Component Structure

```id="gm9wdt"
App
 ├── Filter
 ├── PersonForm
 ├── Persons
 │     └── Person
 └── Notification
```

---

##  Backend (JSON Server)

Data is stored in `db.json`.

Run the server on:

```id="9p0wfy"
http://localhost:3001/persons
```

---

##  How to Run the Project

1. Clone the repository:

```bash id="twfb8p"
git clone https://github.com/Tejaswanth2406/Fullstack.git
```

2. Navigate to the phonebook folder:

```bash id="9o1d3j"
cd part2/phonebook
```

3. Install dependencies:

```bash id="7wr1nt"
npm install
```

4. Start JSON Server:

```bash id="hj27u6"
json-server --watch db.json --port 3001
```

5. Start the frontend:

```bash id="m2zw7w"
npm run dev
```

---

##  API Operations

* GET → fetch all contacts
* POST → add a new contact
* PUT → update an existing contact
* DELETE → remove a contact

---

##  What I Learned

* Managing state with React hooks
* Handling forms and controlled inputs
* Working with REST APIs using Axios
* Performing CRUD operations
* Error handling in React applications
* Component-based architecture

---

##  Notes

* Duplicate names are prevented
* If a contact already exists, the number can be updated
* Notifications are shown for successful and failed operations

---

##  Author

* GitHub: https://github.com/Tejaswanth2406
