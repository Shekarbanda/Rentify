Rentify
Overview
Rentify is a full-stack web application designed to connect users for renting and listing a variety of items, including vehicles, tools, and event spaces. This platform promotes a sharing economy, helping users reduce living costs by facilitating easy access to shared resources. Built with modern technologies, Rentify offers a responsive, user-friendly interface and robust backend functionality.
Features

Browse and Rent: Users can explore available items and book them with a seamless rental process.
List Items: Owners can list their items for rent with detailed descriptions and photos.
Search Filters: Advanced filtering options to find items by category, location, and price.
User Profiles: Personalized profiles with options to manage listings and rentals.
Secure Payments: Integrated payment system with document verification for enhanced security.
Admin Controls: Admin dashboard to monitor platform activity and manage users.
Real-Time Updates: Utilizes Socket.io for live notifications and updates.

Tech Stack

Frontend: React.js, Tailwind CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Real-Time: Socket.io
Other Tools: Git, Postman

Installation

Clone the Repository
git clone https://github.com/Shekarbanda/Rentify.git
cd Rentify


Install Dependencies

For the frontend:cd client
npm install


For the backend:cd server
npm install




Set Up Environment Variables

Create a .env file in the server directory with the following:PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret


Replace placeholders with your actual credentials.


Run the Application

Start the backend:cd server
npm start


Start the frontend:cd client
npm start


Open http://localhost:3000 in your browser.



Usage

Register or log in to create a user profile.
Use the search bar to find items or list your own with uploaded images.
Manage bookings and payments through the user dashboard.
Admins can access the control panel to oversee platform activities.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure you follow the existing code style and include tests where applicable.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

Thanks to the open-source community for tools like React, Node.js, and MongoDB.
Special thanks to Banao Technologies for the internship opportunity where I developed key skills used in this project.
Inspired by the need to create a cost-effective rental solution.

Contact

Email: bandashekar8688@gmail.com
LinkedIn: linkedin.com/in/shekar-banda-736815258
GitHub: github.com/Shekarbanda

Live Demo
Check out the live version here: https://rentify-furd.onrender.com/
