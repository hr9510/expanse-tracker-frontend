import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactUs() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="w-[90%] bg-white mx-auto flex justify-between space-x-4 items-center my-10 px-6 py-4 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl">📞 Contact Us — Expense Tracker</h1>
        <Link to="/" className="text-lg font-semibold text-blue-600">
          🏠 Go to HOME Page
        </Link>
      </div>

      {/* Body Content */}
      <div className="w-[90%] md:w-[80%] bg-white mx-auto p-6 rounded-lg shadow-md text-gray-700 leading-relaxed text-[1.05rem] space-y-5">
        <p>
          We’re here to help you every step of the way on your journey to better financial health.
          Whether you’re facing an issue, have a suggestion, or just want to say hello — our team is just a message away.
        </p>

        <p>
          At <strong>Expense Tracker</strong>, we believe that real connection builds real solutions.
          Your feedback, questions, and experiences help us improve and evolve — because this app isn't just built <em>for you</em>,
          it's built <em>with you</em>.
        </p>

        <div className="p-4 text-sm bg-gray-100 rounded-md md:text-base">
          <p>💡 Got a feature idea?</p>
          <p>🐞 Found a bug?</p>
          <p>💬 Need help with tracking or categories?</p>
          <p>📈 Want to suggest a new feature like budgeting, goal tracking, or sync with bank accounts?</p>
          <p className="mt-2 font-medium">Whatever it is — we’re listening.</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-gray-800">📬 How You Can Reach Us:</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>📧 <strong>Email:</strong> support@expensetrackerapp.com</li>
            <li>🌐 <strong>Website:</strong> www.expensetrackerapp.com/contact</li>
            <li>📱 <strong>In-App Help:</strong> Go to the Help & Support section in the app</li>
            <li>📸 <strong>Social:</strong> DM us on Instagram, Twitter, or Facebook → <code>@ExpenseTrackerApp</code></li>
          </ul>
        </div>

        <p>
          ⏳ We aim to respond within <strong>24–48 hours</strong> on working days.
          You matter to us — and so does your time and trust.
        </p>

        <p>
          🤝 <strong>Let’s Build Together:</strong> Whether you're a passionate user, a developer with ideas, or someone just beginning their financial journey — don’t hesitate to reach out.
          Your voice shapes our product, and your trust fuels our growth.
        </p>

        <p className="font-semibold text-gray-800">
          Thank you for being a part of the <span className="font-bold text-blue-600">Expense Tracker</span> family. Let’s build smarter habits, stronger savings,
          and a more stable financial future — together. 💪📊
        </p>
      </div>
    </div>
  )
}
