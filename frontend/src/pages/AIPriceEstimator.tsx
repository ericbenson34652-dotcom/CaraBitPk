import React, { useState } from "react";

function AIPriceEstimator() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEstimate = async () => {
    setLoading(true);
    setPrice("");

    try {
      const response = await fetch("http://localhost:5000/api/ai/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      setPrice(data.estimatedPrice || "No estimate returned");
    } catch (err) {
      console.error(err);
      setPrice("Error fetching estimate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Price Estimator</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your car, features, or product..."
        className="w-full border rounded p-2 mb-4"
        rows={5}
      />
      <button
        onClick={handleEstimate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Estimating..." : "Estimate Price"}
      </button>

      {price && (
        <div className="mt-4 text-lg">
          <strong>Estimated Price:</strong> {price}
        </div>
      )}
    </div>
  );
}

export default AIPriceEstimator;
