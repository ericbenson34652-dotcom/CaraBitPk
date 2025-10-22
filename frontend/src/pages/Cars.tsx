import React, { useEffect, useState } from "react";
import axios from "axios";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold">
              {car.make} {car.model}
            </h3>
            <p>Year: {car.year}</p>
            <p className="text-green-600 font-semibold">${car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
