Full-Stack Job Board Application (Monolith SPA)
A professional, full-stack job board application built with a modern monolith SPA architecture. This powerful setup features a React frontend, which lives directly inside a single Laravel backend project. The system is designed to be secure, scalable, and provide a seamless, app-like user experience.

This project was built following the architecture you specified, where a single Laravel application serves a React-powered frontend that handles all its own routing and data fetching.

Table of Contents
Features

Technical Overview

Project Architecture

Local Development Setup

Production Deployment on Ubuntu with Apache

API Endpoints

Environment Variables

Features
Job Listings: The homepage displays a clean, paginated list of all available job postings.

Detailed Job View: Clicking any job card navigates the user to a dedicated page with a full description and an "Apply Now" link, all handled by React Router without a full page reload.

Powerful Search & Filtering: Users can search for jobs by keywords and filter results by location or employment type.

User Authentication: Secure user registration and login functionality is handled by Laravel Sanctum, providing stateful authentication for the Single-Page Application.

Post a Job: Authenticated users can access a protected form to post new job listings, with full client-side and server-side validation.

Favorites System: Users can mark jobs as "favorites." This preference is saved in the browser's localStorage, persisting across sessions and using an efficient ID-based system.

Technical Overview
Backend: Laravel 12 (PHP 8.3)

Authentication: Laravel Sanctum (SPA / Cookie-Based Authentication)

Database: MySQL

Frontend: React 18 (located in resources/js)

Routing: react-router-dom

API Communication: Axios

Styling: Bootstrap 5 & Bootstrap Icons

Build Tool: Vite

Server Environment: Ubuntu Server with Apache2

Project Architecture: The Monolith SPA
This application is built as a Monolith Single-Page Application. This architecture provides the power and security of a traditional Laravel application with the rich, fast, and interactive user experience of a modern React frontend.

Think of it like a high-tech restaurant:

The Laravel Project: This is the entire restaurant building. It contains both the kitchen and the dining room under one roof.

The Laravel Backend (PHP code in app/, routes/api.php): This is the Kitchen. It is a powerful, private engine that handles all data, logic, and security. Its only job is to respond to API requests with pure JSON data.

The React Frontend (JS code in resources/js/): This is the Interactive Dining Room Experience. When a customer walks in, they are handed a "smart tablet" (your React application). This tablet is beautiful and fast, and it handles all their interactions, from viewing the menu to placing an order, without ever needing a full "page reload."

How the Request Flow Works
A user visits any page (e.g., http://job-board.test/login).

Apache receives the request and, with the help of the .htaccess file, directs it to Laravel's main index.php router.

Laravel's routes/web.php file has a special "catch-all" route. This route's only job is to serve the main HTML shell located at resources/views/app.blade.php.

The browser loads this simple HTML shell, which in turn loads your main compiled JavaScript file.

Your React application starts up. The react-router-dom library looks at the browser's URL (/login) and renders the correct React component (e.g., LoginPage.jsx).

When a component needs data, it uses Axios to make an API call to a URL like /api/jobs.

Laravel receives this new request. Because it starts with /api, the router looks in routes/api.php, calls the correct controller method, fetches the data from the database, and returns it as a JSON response.

Local Development Setup
To run this project on a local development machine:

Clone the Repository:

git clone <repository_url_for_the_project>

Navigate to the Project Directory:

cd your-project-name

Setup the Laravel Backend:

Create a .env file from the example: cp .env.example .env.

Configure your database credentials in the .env file.

Install PHP dependencies: composer install.

Generate an application key: php artisan key:generate.

Run database migrations and seeders: php artisan migrate:fresh --seed.

Setup the React Frontend:

Install JavaScript dependencies: npm install.

Run the Application:
You will need two separate terminal windows open in the same project directory.

Terminal 1 (Start the Backend): php artisan serve

Terminal 2 (Start the Frontend): npm run dev

Your application is now running. The frontend is accessible at http://localhost:5173, and it will automatically talk to the backend at http://localhost:8000.

Production Deployment on Ubuntu with Apache
These instructions detail how to deploy the single, integrated application in a production environment using a single virtual host.

1. Prerequisites
   An Ubuntu server with Apache2, MySQL, and the correct PHP version installed.

Composer and Node.js (with npm) installed globally.

2. Project Installation
   Place your single project folder in /var/www/html/Kush/:

/var/www/html/Kush/job-board-api

3. Build the React Frontend
   Navigate to the project directory: /var/www/html/Kush/job-board-api.

Install all dependencies: npm install.

Create the final, optimized production build: npm run build. This will create the necessary assets in the public/build directory.

4. Configure Laravel and Set Permissions
   Configure Environment: Create and configure the .env file with your production database credentials and application URL.

Set Permissions: Navigate to /var/www/html/Kush and run the standard Laravel permission commands:

sudo chown -R www-data:www-data job-board-api
sudo find job-board-api -type d -print0 | sudo xargs -0 chmod 775
sudo find job-board-api -type f -print0 | sudo xargs -0 chmod 664
sudo chmod -R ug+rwx job-board-api/storage
sudo chmod -R ug+rwx job-board-api/bootstrap/cache

Clear Caches: Run php artisan config:clear and php artisan route:clear.

5. Configure the Single Apache Virtual Host
   Create one necessary virtual host file in /etc/apache2/sites-available/.

job-board.test.conf:

<VirtualHost \*:80>
ServerName job-board.test
DocumentRoot /var/www/html/Kush/job-board-api/public

    <Directory /var/www/html/Kush/job-board-api/public>
        AllowOverride All
        FallbackResource /index.php
    </Directory>

</VirtualHost>

6. Finalize Server Setup
   Enable Apache Modules: sudo a2enmod rewrite

Enable Your New Site: sudo a2ensite job-board.test.conf

Test and Restart Apache:

sudo apache2ctl configtest # Must return "Syntax OK"
sudo systemctl restart apache2
