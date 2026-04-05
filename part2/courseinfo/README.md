# Course Information App 

This project is part of the **Full Stack Open – Part 2 (Exercises 2.1–2.5)**.

It is a simple React application that displays course information and exercises.

---

##  Features

* Displays course name
* Lists all course parts dynamically
* Shows number of exercises for each part
* Calculates total number of exercises using `reduce()`
* Supports multiple courses

---

##  Technologies Used

* React
* JavaScript (ES6+)
* Vite

---

##  Component Structure

```id="1u5azj"
App
 └── Course
      ├── Header
      ├── Content
      │    └── Part
      └── Total
```

---

##  How to Run the Project

1. Clone the repository:

```bash id="l4b8cz"
git clone https://github.com/Tejaswanth2406/Fullstack.git
```

2. Navigate to the project folder:

```bash id="b9s8lt"
cd part2/courseinfo
```

3. Install dependencies:

```bash id="41u7i6"
npm install
```

4. Start the development server:

```bash id="0i8x3h"
npm run dev
```

---

##  What I Learned

* Creating and using React components
* Passing data using props
* Rendering lists with `map()`
* Calculating values using `reduce()`
* Structuring a React application into smaller components

---

##  Notes

* The application works dynamically regardless of the number of course parts
* No hardcoded components are used for rendering parts

---

##  Author

* GitHub: https://github.com/Tejaswanth2406
