import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div className="bg-lightGray min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 fixed w-full top-0 left-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="text-primary text-2xl font-bold">
            <Link to="/">
              <span>Leave</span><span className="text-secondary">Management</span>
            </Link>
          </div>

          {/* Navigation Links: Login and Sign Up */}
          <div className="space-x-6">
            <Link to="/signin" className="text-primary font-semibold text-lg hover:text-secondary transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-secondary text-white py-2 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-8">
        <div className="text-center max-w-3xl mx-auto mt-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to Leave Management Service</h1>
          <p className="text-xl mb-6">
            Simplifying leave requests and approvals for your organization.
          </p>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Key Features</h2>
          <p className="text-lg text-gray-700 mb-8">
            Discover the powerful features that make managing leaves easy and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Easy Leave Requests</h3>
            <p className="text-gray-700">Submit leave requests with just a few clicks, and track their approval status in real time.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Manager Approvals</h3>
            <p className="text-gray-700">Managers can quickly approve or reject leave requests with streamlined interfaces.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Leave Balance Tracking</h3>
            <p className="text-gray-700">Easily view and manage your leave balance, upcoming leave days, and historical data.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-lightGray py-16 px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 mb-8">
            It’s simple! Get started in a few easy steps to manage your leaves effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Sign Up or Log In</h3>
            <p className="text-gray-700">Create an account or log in to get started with managing your leaves.</p>
          </div>
          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Submit Leave Requests</h3>
            <p className="text-gray-700">Submit your leave requests through the easy-to-use form. Select dates and reasons for leave.</p>
          </div>
          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Track and Approve</h3>
            <p className="text-gray-700">Managers can approve or reject requests, and users can track their leave status in real time.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Optional) */}
      <section className="py-16 px-8 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-secondary mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-700 mb-8">
            Hear from those who are already using our service and simplifying their leave management.
          </p>
        </div>
        <div className="flex justify-center space-x-8">
          {/* Testimonial 1 */}
          <div className="bg-lightGray p-6 rounded-lg shadow-md w-1/3">
            <p className="text-gray-700 mb-4">
              "This app has saved us so much time and effort. Our employees can now submit and track their leaves easily."
            </p>
            <p className="text-sm font-semibold text-primary">John Doe</p>
            <p className="text-xs text-gray-500">HR Manager</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-lightGray p-6 rounded-lg shadow-md w-1/3">
            <p className="text-gray-700 mb-4">
              "As an employee, I love how simple it is to apply for leave and get timely responses from my managers."
            </p>
            <p className="text-sm font-semibold text-primary">Jane Smith</p>
            <p className="text-xs text-gray-500">Employee</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Manage Your Leaves?</h2>
        <p className="text-lg mb-8">
          Get started today and experience seamless leave management for your organization.
        </p>

        <Link
          to="/signin"
          className="bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90  transition"
        >
          Get started
        </Link>
        
      </section>

      {/* Footer */}
      <footer className="bg-darkGray text-white py-8 px-8 text-center">
        <p className="text-sm">© 2025 Leave Management Service. All rights reserved.</p>
        <div className="mt-4">
          <a href="/terms" className="text-sm text-secondary hover:underline mx-4">Terms of Service</a>
          <a href="/privacy" className="text-sm text-secondary hover:underline mx-4">Privacy Policy</a>
        </div>
      </footer>
    </div>


  )
}

export default Homepage