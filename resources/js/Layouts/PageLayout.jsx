import React from "react";
import { Outlet } from "react-router-dom";
// --- THIS IS THE FIX ---
// The import path is now corrected to use the '@/' alias.
import Navbar from "@/Components/Navbar.jsx";

const PageLayout = () => {
    return (
        <>
            {/* The Navbar will appear on every page */}
            <Navbar />

            {/* The main content of your pages will be rendered inside this container */}
            <main className="container" style={{ maxWidth: "1140px" }}>
                <div className="py-4 py-md-5">
                    {/* The <Outlet/> is the placeholder for your page content */}
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default PageLayout;
