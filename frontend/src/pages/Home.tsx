import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CaraBit</h1>
      <p className="text-gray-600 mb-6">
        Buy, sell, and estimate car prices instantly using AI.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/cars" className="bg-blue-600 text-white px-4 py-2 rounded">
          View Cars
        </Link>
        <Link
          to="/ai-price"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          AI Price Estimator
        </Link>
      </div>
    </div>
  );
};

export default Home;
