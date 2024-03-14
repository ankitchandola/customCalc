import useTotalSumStore from "@/store/sumStore";
import React from "react";

const Summary = () => {
  const { kitchenWood, kitchenAccessories, wardrobeAccessories, wardrobeWood } =
    useTotalSumStore((state) => state);

  return (
    <div className="w-full h-full px-4 py-16">
      <div className="mx-auto w-full max-w-[80%] rounded-2xl bg-white p-2 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Kitchen Summary</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">Wooden part with installation:</td>
                <td className="py-2">{kitchenWood}</td>
              </tr>
              <tr>
                <td className="py-2">Accessories:</td>
                <td className="py-2">{kitchenAccessories}</td>
              </tr>
              <tr>
                <td className="py-2">Total with GST:</td>
                <td className="py-2">{kitchenAccessories + kitchenWood}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Wardrobe Summary</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">Wooden part with installation:</td>
                <td className="py-2">{wardrobeWood}</td>
              </tr>
              <tr>
                <td className="py-2">Accessories:</td>
                <td className="py-2">{wardrobeAccessories}</td>
              </tr>
              <tr>
                <td className="py-2">Total with GST:</td>
                <td className="py-2">{wardrobeAccessories + wardrobeWood}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-t-2 border-black flex justify-between py-4 font-bold">
          <p>Grand Total:</p>
          <p>
            {kitchenAccessories +
              kitchenWood +
              wardrobeAccessories +
              wardrobeWood}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
