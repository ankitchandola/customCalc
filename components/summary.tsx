import useTotalSumStore from "@/store/sumStore";
import React from "react";

const Summary = () => {
  const {
    kitchenWood,
    kitchenAccessories,
    wardrobeAccessories,
    wardrobeWood,
    solution,
  } = useTotalSumStore((state) => state);

  return (
    <div className="w-full h-full px-4 py-16">
      <div className="mx-auto w-full max-w-[80%] rounded-2xl bg-white p-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Kitchen Summary</h2>
          <table className="w-full">
            <tbody>
            /*  <tr>
               <td className="py-2">Wooden part with installation:</td>
                <td className="py-2 flex justify-end">{kitchenWood}</td>
             </tr>
              <tr>
                <td className="py-2">Accessories:</td>
               <td className="py-2 flex justify-end">{kitchenAccessories}</td>
             </tr> */
              <tr>
                <td className="py-2">Total with GST:</td>
                <td className="py-2 flex justify-end">
                  {kitchenAccessories + kitchenWood}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Wardrobe Summary</h2>
          <table className="w-full">
            <tbody>
         /*     <tr>
                <td className="py-2">Wooden part with installation:</td>
                <td className="py-2 flex justify-end">{wardrobeWood}</td>
              </tr>
              <tr>
                <td className="py-2">Accessories:</td>
                <td className="py-2 flex justify-end">{wardrobeAccessories}</td>
              </tr>
              <tr>   */
                <td className="py-2">Total with GST:</td>
                <td className="py-2 flex justify-end">
                  {wardrobeAccessories + wardrobeWood}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Services Summary</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">Total without GST:</td>
                <td className="py-2 flex justify-end">{solution.withoutGst}</td>
              </tr>
              <tr>
                <td className="py-2">Total with GST:</td>
                <td className="py-2 flex justify-end">{solution.withGst}</td>
              </tr>
              <tr>
                <td className="py-2">Discount:</td>
                <td className="py-2 flex justify-end">
                  {solution.discountTotal}
                </td>
              </tr>
              <tr>
                <td className="py-2">Handling fee:</td>
                <td className="py-2 flex justify-end">
                  {solution.handlingFee}
                </td>
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
              wardrobeWood +
              solution.withGst +
              solution.handlingFee -
              solution.discountTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
