# **Full-Stack Job Board Application (Monolith SPA with Redux)**

A professional, full-stack job board application built with a modern **monolith SPA architecture**. This powerful setup features a **React frontend** (with **Redux Toolkit** for state management) which lives directly inside a single, robust **Laravel backend** project. The system is designed to be secure, scalable, and provide a seamless, app-like user experience for both job seekers and employers.  
This project was built following the architecture where a single Laravel application serves a React-powered frontend that handles all its own routing and data fetching via API calls.

## **Table of Contents**

* Features  
* Technical Overview  
* [Project Architecture: The Monolith SPA](https://www.google.com/search?q=%23project-architecture-the-monolith-spa)  
* [Installation & Setup](https://www.google.com/search?q=%23installation--setup)  
  * [Prerequisites](https://www.google.com/search?q=%23prerequisites)  
  * [1\. Local Development (Any OS)](https://www.google.com/search?q=%231-local-development-any-os)  
  * [2\. Production Deployment on Ubuntu with Apache](https://www.google.com/search?q=%232-production-deployment-on-ubuntu-with-apache)  
  * [3\. Production Deployment on Windows (XAMPP/WAMP)](https://www.google.com/search?q=%233-production-deployment-on-windows-xamppwamp)  
* [API Endpoints](https://www.google.com/search?q=%23api-endpoints)  
* Environment Variables

## **Features**

* **Centralized State Management:** The entire frontend state is professionally managed by **Redux Toolkit**, providing a predictable, scalable, and easily debuggable application structure.  
* **Job Listings:** The homepage displays a clean, paginated list of all available job postings, fetched asynchronously.  
* **Detailed Job View:** Clicking any job card navigates the user to a dedicated page with a full description and an "Apply Now" link, all handled by React Router without a full page reload.  
* **Powerful Search & Filtering:** Users can search for jobs by keywords and filter results by location and employment type.  
* **User Authentication:** Secure user registration and login functionality is handled by Laravel Sanctum, providing stateful authentication for the Single-Page Application.  
* **Protected Routes:** Key pages like "Post a Job" and "Favorites" are securely protected, automatically redirecting guest users to the login page.  
* **Post a Job:** Authenticated users can access a protected form to post new job listings, with full client-side and server-side validation.  
* **Favorites System:** Users can mark jobs as "favorites." This preference is managed by a dedicated Redux slice and saved in the browser's localStorage, persisting across sessions using an efficient ID-based system.  
* **Global Notifications:** A clean, non-blocking Snackbar notification system provides users with clear feedback for actions like logging in or posting a job.

## **Technical Overview**

* **Backend:** Laravel 11 (PHP 8.3)  
  * **Authentication:** Laravel Sanctum (SPA / Cookie-Based Authentication)  
  * **Database:** MySQL  
* **Frontend:** React 18 (located in resources/js)  
  * **State Management:** **Redux Toolkit**  
  * **Routing:** react-router-dom  
  * **API Communication:** Axios  
  * **Styling:** Bootstrap 5 & Bootstrap Icons  
  * **Build Tool:** Vite  
* **Server Environment:** Ubuntu Server / Windows (with Apache2)

## **Project Architecture: The Monolith SPA**

This application is built as a **Monolith Single-Page Application**. This architecture provides the power and security of a traditional Laravel application with the rich, fast, and interactive user experience of a modern React frontend, all within a single, unified codebase.  
Think of it like a high-tech restaurant:

* **The Laravel Project:** This is the **entire restaurant building**. It contains both the kitchen and the dining room under one roof.  
* **The Laravel Backend (PHP code in app/, routes/api.php):** This is the **Kitchen**. It is a powerful, private engine that handles all data, logic, and security. Its only job is to respond to API requests with pure JSON data.  
* **The React Frontend (JS code in resources/js/):** This is the **Interactive Dining Room Experience**. When a customer walks in, they are handed a "smart tablet" (your React application). This tablet is beautiful and fast, and it handles all their interactions, from viewing the menu to placing an order, without ever needing a full "page reload." The tablet's brain is the central Redux store.

### **How the Request Flow Works**

1. A user visits any page (e.g., http://job-board.test/login).  
2. Apache receives the request and, with the help of the .htaccess file, directs it to Laravel's main index.php router.  
3. Laravel's **routes/web.php** file has a special "catch-all" route. This route's only job is to serve the main HTML shell located at **resources/views/app.blade.php**.  
4. The browser loads this simple HTML shell, which in turn loads your main compiled JavaScript file.  
5. Your **React application starts up**. The react-router-dom library looks at the browser's URL (/login) and renders the correct React component (e.g., LoginPage.jsx).  
6. When a component needs data, it "dispatches an action" to the Redux store. The Redux logic then uses Axios to make an API call to a URL like /api/jobs.  
7. Laravel receives this new request. Because it starts with /api, the router looks in **routes/api.php**, calls the correct controller method, fetches the data from the database, and returns it as a JSON response.

## **Installation & Setup**

### **Prerequisites**

* PHP \>= 8.2  
* Composer  
* Node.js \>= 18.0  
* NPM (Node Package Manager)  
* A database server (MySQL recommended)

### **1\. Local Development (Any OS)**

This is the simplest way to run the project for development and testing.

1. **Clone the Repository:**  
   git clone \<repository\_url\_for\_the\_project\>

2. **Navigate to the Project Directory:**  
   cd your-project-name

3. **Setup the Laravel Backend:**  
   * Create a .env file from the example: cp .env.example .env.  
   * Configure your database credentials in the .env file.  
   * Install PHP dependencies: composer install.  
   * Generate an application key: php artisan key:generate.  
   * Run database migrations and seeders: php artisan migrate:fresh \--seed.  
4. **Setup the React Frontend:**  
   * Install JavaScript dependencies: npm install.  
5. Run the Application:  
   You will need two separate terminal windows open in the same project directory.  
   * **Terminal 1 (Start the Backend):** php artisan serve  
   * **Terminal 2 (Start the Frontend):** npm run dev

Your application is now running. The frontend is accessible at http://localhost:5173, and it will automatically talk to the backend at http://localhost:8000.

### **2\. Production Deployment on Ubuntu with Apache**

These instructions detail how to deploy the single, integrated application in a production environment using a single virtual host.

1. **Project Installation:**  
   * Place your single project folder in a directory like /var/www/html/Kush/:  
     * /var/www/html/Kush/job-board-api  
2. **Build the React Frontend:**  
   * Navigate to the project directory: /var/www/html/Kush/job-board-api.  
   * Install all dependencies: npm install.  
   * Create the final, optimized production build: npm run build. This will create the necessary assets in the public/build directory.  
3. **Configure Laravel and Set Permissions:**  
   * **Configure Environment:** Create and configure the .env file with your production database credentials and application URLs.  
   * **Set Permissions:** Navigate to /var/www/html/Kush and run the standard, secure Laravel permission commands:  
     sudo chown \-R www-data:www-data job-board-api  
     sudo find job-board-api \-type d \-print0 | sudo xargs \-0 chmod 775  
     sudo find job-board-api \-type f \-print0 | sudo xargs \-0 chmod 664  
     sudo chmod \-R ug+rwx job-board-api/storage  
     sudo chmod \-R ug+rwx job-board-api/bootstrap/cache

   * **Clear Caches:** Run php artisan config:clear and php artisan route:clear.  
4. **Configure the Single Apache Virtual Host:**  
   * Create **one** necessary virtual host file in /etc/apache2/sites-available/.  
   * **job-board.test.conf:**  
     \<VirtualHost \*:80\>  
         ServerName job-board.test  
         DocumentRoot /var/www/html/Kush/job-board-api/public

         \<Directory /var/www/html/Kush/job-board-api/public\>  
             AllowOverride All  
             FallbackResource /index.php  
         \</Directory\>  
     \</VirtualHost\>

5. **Finalize Server Setup:**  
   * **Enable Apache Modules:** sudo a2enmod rewrite  
   * **Enable Your New Site:** sudo a2ensite job-board.test.conf  
   * **Test and Restart Apache:**  
     sudo apache2ctl configtest  \# Must return "Syntax OK"  
     sudo systemctl restart apache2

   * **Edit Hosts File:** On your local machine, edit your hosts file to point job-board.test to the server's IP address.

Your application is now live.

### **3\. Production Deployment on Windows (XAMPP/WAMP)**

The process is conceptually the same as on Ubuntu, but the file paths and commands are different.

1. **Project Installation:** Place your project folder inside your htdocs directory (e.g., C:\\xampp\\htdocs\\job-board-api).  
2. **Build the React Frontend:** Open a command prompt, navigate to C:\\xampp\\htdocs\\job-board-api, and run npm install followed by npm run build.  
3. **Configure Laravel:** Create and configure your .env file as you would for local development.  
4. **Configure the Apache Virtual Host:**  
   * Open your Apache configuration file: C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf.  
   * Add the following virtual host block to the end of the file:  
     \<VirtualHost \*:80\>  
         ServerName job-board.test  
         DocumentRoot "C:/xampp/htdocs/job-board-api/public"  
         \<Directory "C:/xampp/htdocs/job-board-api/public"\>  
             AllowOverride All  
             FallbackResource /index.php  
         \</Directory\>  
     \</VirtualHost\>

   * **Enable Virtual Hosts:** Open C:\\xampp\\apache\\conf\\httpd.conf and ensure the line Include conf/extra/httpd-vhosts.conf is not commented out.  
5. **Edit the Windows Hosts File:**  
   * Open Notepad **as an Administrator**.  
   * Open the file at C:\\Windows\\System32\\drivers\\etc\\hosts.  
   * Add the following line to the bottom:  
     127.0.0.1   job-board.test

   * Save the file.  
6. **Restart Apache:** Use the XAMPP/WAMP control panel to stop and restart the Apache service. Your site is now live at http://job-board.test.

## **API Endpoints**

All data routes are prefixed with /api.

* POST /api/register: Register a new user.  
* POST /api/login: Authenticate a user and create a session.  
* GET /api/jobs: Get a paginated list of all jobs.  
* GET /api/jobs/{id}: Get the details for a single job.  
* POST /api/jobs/favorites: Get the full details for a list of favorited job IDs.

**Protected Routes (Require Authentication):**

* GET /api/user: Get the currently authenticated user.  
* POST /api/logout: Destroy the user's session.  
* POST /api/jobs: Create a new job posting.

## **Environment Variables**

The following variables in the Laravel project's .env file must be configured correctly for the production environment:

* APP\_ENV=production  
* APP\_DEBUG=false  
* APP\_URL=http://job-board.test  
* DB\_DATABASE, DB\_USERNAME, DB\_PASSWORD  
* SANCTUM\_STATEFUL\_DOMAINS=job-board.test  
* SESSION\_DOMAIN=.job-board.test