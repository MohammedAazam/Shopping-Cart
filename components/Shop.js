"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Shop = ({ shopItemsData }) => {
  const [basket, setBasket] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Update localStorage when basket changes
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(basket));
  }, [basket]);

  const calculateTotalItems = () => {
    return basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };

  const increment = (id) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) => {
        if (item.id === id) {
          item.item += 1;
        }
        return item;
      });
      if (!updatedBasket.some((item) => item.id === id)) {
        updatedBasket.push({ id, item: 1 });
      }
      return updatedBasket;
    });
  };

  const decrement = (id) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) => {
        if (item.id === id && item.item > 0) {
          item.item -= 1;
        }
        return item;
      });
      return updatedBasket.filter((item) => item.item > 0);
    });
  };

  const removeItem = (id) => {
    setBasket((prevBasket) => {
      return prevBasket.filter((item) => item.id !== id);
    });
  };

  return (
    <div id="shop" className="space-y-8">
      {shopItemsData.map(({ id, name, price, desc, img }) => {
        const itemInBasket = basket.find((item) => item.id === id);
        const itemQuantity = itemInBasket ? itemInBasket.item : 0;

        return (
          <div
            key={id}
            id={`product-id-${id}`}
            className="flex space-x-8 p-6 bg-white shadow-lg rounded-lg"
          >
            <img className="w-56 h-auto object-cover rounded-lg" src={img} alt={name} />
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-green-600">${price}</h2>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => decrement(id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    -
                  </Button>
                  <div className="text-lg font-semibold">{itemQuantity}</div>
                  <Button
                    onClick={() => increment(id)}
                    variant="outline"
                    size="sm"
                    className="text-green-500 hover:text-green-700"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <Button
              onClick={() => removeItem(id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        );
      })}
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Total Items: {calculateTotalItems()}</h2>
      </div>
    </div>
  );
};

export default Shop;
