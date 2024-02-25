# Rick & Morty API Challenge Documentation
#   Link to hosted site:  https://rickandmorty-eight-mu.vercel.app/

## Project Overview

Build an app using the Rick & Morty API to perform the following functionalities:

- Retrieve a list of locations (name and type), along with the residents of that location and their status.
- Implement the ability to search or filter location results by location name, character name, or episode name.
- Display the data in a manner that allows you to view the location, its residents, and see an image of the resident with a representation of their name & status.
- Tapping on a resident will navigate to a screen with the resident’s details. On this screen, you should be able to open a form that allows you to add persisted notes about the character.

## Technologies Used

- Language: TypeScript
- Frontend Framework: Next.js
- CSS Framework: tailwindcss
- Database/Storage: MongoDB

## Implementation Decisions

- **Choice of API:** REST API was chosen for its simplicity and ease of integration.
- **Stack Rationale:** Next.js, TypeScript, tailwindcss, and MongoDB were chosen for their combination of efficiency, developer-friendliness, and scalability. They allow for rapid development while ensuring maintainability and performance.
- **Persistence:** MongoDB was selected as the database to enable access from anywhere using different machines, unlike localhost. This decision was made to facilitate collaboration and ensure accessibility across different environments.
- **Optimization Techniques:** Lazy loading was applied on images and pagination was implemented to optimize performance and enhance user experience. This ensures faster loading times and smoother navigation, especially when dealing with large datasets.
- **Responsive Design:** The site is fully responsive, ensuring compatibility and usability across various devices and screen sizes.
- **Search Functionality:** Users can search by location name and character name, enhancing the usability and efficiency of the app.

## Design Decisions

**Server-Side API Routes:**

1. **API Routes for get and search locations Functionality**
   - The `/api/locations` route was used to fetch locations data and perform searches by location name. This approach reduces the workload of processing large datasets directly from the browser, enhancing performance and scalability.
2. **API Routes for Search by charactername Functionality:**
   - The `/api/searchchar` route was implemented for searching data by character name. By offloading the search functionality to the server-side, it reduces the burden on the client-side and provides a more efficient way to retrieve relevant data.
3. **API Route for Notes Management:**
   - The `/api/notes` route was utilized for adding, getting, and editing notes stored in the database. This centralized approach simplifies data management and ensures consistency across the application.
     **client-Side API Routes:** -`/` - CSR page for displaying locations ,residents , search results -`/residents/[id]` - SSR page for displaying resident details

## How to Run

-npm install
-npm run dev
