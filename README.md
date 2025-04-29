# Book Search Engine

## Description
Most modern websites are driven by two things: data and user demands. This shouldn't come as a surprise, as the ability to personalize user data is the cornerstone of real-world web development today. And as user demands evolve, applications need to be more performant.

**Book Search Engine**  
This week, you'll take a fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. It’s already set up to allow users to save book searches to the back end.

To fulfill the challenge, you’ll need to:
- Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.
- Modify the existing authentication middleware so that it works in the context of a GraphQL API.
- Create an Apollo Provider so that requests can communicate with an Apollo Server.
- Deploy the application to Render with a MongoDB database using MongoDB Atlas.  
  Use the [Deploy with Render and MongoDB Atlas](https://learn.render.com/tutorials/deploy-mongodb-atlas) walkthrough for instructions.

> **Important:**  
> Make sure to download and unzip the starter code files provided, then initialize your own repository using these files.

## Table of Contents
- [Installation](#installation)  
- [Usage](#usage)  
- [Screenshot](#screenshot)  
- [Deployment](#deployment)  
- [Contribution](#contribution)  
- [Tests](#tests)  
- [License](#license)  
- [Questions](#questions)  

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   npm install

   In the server directory, create a .env file with the following:

MONGODB_URI='mongodb+srv://michaelmangieri1098:tjmQWqE9Vd2Pyig4@cluster0.carxjcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECRET_KEY='fadofhgiuaghueaybfnklEHFDPUERGHIAEURNLKSDFLAKDFMAOHGAER'

## Usage

Start in development mode:

npm run dev

This concurrently launches your Express/Apollo server and React client.

Production build & start:

npm run build
npm start
Access the app
Open your browser to http://localhost:3000 (or the port configured by Render).

## Screenshot

![alt text](<screenshot/Screenshot 2025-04-29 190651.png>)

## Deployment

https://book-search-engine-hjpb.onrender.com/

## Contribution

Contributions are welcome! To get started:

Fork this repository.

Create a feature branch:

bash
Copy
Edit
git checkout -b feature/YourFeatureName
Commit your changes and push to your fork.

Submit a pull request with a detailed description of your work.

## Tests

GraphQL Testing:
Use Apollo Studio Explorer or GraphQL Playground in development to run queries and mutations against your local server.

Functional Testing:

1. Launch the app.

2. Verify the search functionality (non-authenticated & authenticated).

3. Test sign up and login flows.

4. Confirm that saving/removing books updates your account.

5. Ensure logout clears your session and redirects to the search page.

## License

This project is licensed under the MIT License.

## Questions

If you have any questions or run into issues, feel free to:

Open an issue on GitHub

Contact the me at michael.mangieri@yahoo.com

