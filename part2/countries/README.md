Search countries by name
If more than 10 matches → shows a warning
If 2–10 matches → displays a list of countries
If only 1 match → shows detailed information:
Capital
Area
Languages
Country flag
"Show" button to quickly view a country
Displays weather information for the capital city
 Technologies Used
React (useState, useEffect)
Axios
REST Countries API
OpenWeather API
 How to Run the Project
Clone the repository:
git clone https://github.com/Tejaswanth2406/Fullstack.git
Navigate to the countries app folder:
cd part2/countries
Install dependencies:
npm install
Create a .env file in the root of the project and add your API key:
VITE_API_KEY=your_openweather_api_key
Start the development server:
npm run dev
 APIs Used
Countries data:
https://studies.cs.helsinki.fi/restcountries/api/all
Weather data:
https://api.openweathermap.org
What I Learned
Fetching data from external APIs using Axios
Managing application state with React hooks
Conditional rendering in React
Handling user input and filtering data
Working with environment variables
 Notes
The app may not handle some edge cases (e.g., similar country names like Sudan / South Sudan)
API key is stored using environment variables for security
