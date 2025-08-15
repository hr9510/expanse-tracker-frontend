import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="w-[90%] bg-white mx-auto flex justify-between text-center space-x-4 items-center my-10 px-6 py-4 rounded-xl shadow-lg">
        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl">
          ℹ️ About Us — Expense Tracker
        </h1>
        <Link
          to="/"
          className="text-lg font-semibold text-blue-600"
        >
          🏠 Go to HOME Page
        </Link>
      </div>

      {/* Body Content */}
      <div className="w-[90%] md:w-[80%] bg-white mx-auto p-6 rounded-lg shadow-md text-gray-700 leading-relaxed text-[1.05rem] space-y-5">
        <p>
          Welcome to <strong className="text-blue-700">Expense Tracker</strong>, your personal financial assistant designed to help you take control of your money, habits, and future.
        </p>

        <p>
          In today’s fast-moving world, expenses grow silently and savings often take a backseat. That's why it’s more important than ever to know where your money goes. That’s where we come in.
        </p>

        <p>
          Our journey began with a simple idea — to build a platform that is simple, intuitive, and efficient for everyone: students, professionals, entrepreneurs, and homemakers.
          No spreadsheets, no complex software — just a clean interface that shows you how you earn, spend, and save.
        </p>

        <p>
          With <strong>Expense Tracker</strong>, you can:
        </p>

        <ul className="pl-2 space-y-1 list-disc list-inside">
          <li>📥 Log your income and expenses</li>
          <li>📊 Categorize your spending</li>
          <li>📈 Analyze trends with charts</li>
          <li>🎯 Set savings goals and track progress</li>
          <li>🚨 Create custom spending limits</li>
        </ul>

        <p>
          Unlike bulky finance apps, Expense Tracker is lightweight yet powerful — designed to feel fast, clean, and distraction-free.
        </p>

        <div className="p-4 text-sm bg-gray-100 rounded-md md:text-base">
          <p>💡 Personal finance shouldn’t feel like a chore.</p>
          <p>🔍 We believe that clarity brings control.</p>
          <p>💪 Anyone — regardless of income — can build wealth with the right awareness and habits.</p>
        </div>

        <p>
          Whether you’re saving for a gadget, tracking freelance income, or managing household budgets, Expense Tracker grows with you. It’s not just an app — it’s a mindset shift.
        </p>

        <p>
          We're constantly improving, adding smarter features, integrating new tools, and listening to our community to make Expense Tracker your most loved financial companion.
        </p>

        <p className="font-semibold text-gray-800">
          Thank you for being a part of the <span className="font-bold text-blue-600">Expense Tracker</span> family.
          Let’s build a financially fearless future — one log at a time. 💙📘
        </p>
      </div>
    </div>
  );
}
