import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/16/solid";
import ListBox from "../UI/listbox";
import dummyData from "@/data/dummy";

type Props = {
  data: {
    value: number;
    name: string;
  }[];
  deleteRow: (id: number, total: number) => void;
  updateTotal: (grandTotal: number) => void;
  id: number;
};

type accessories = {
  data: {
    value?: number;
    name: string;
  }[];
  brand: { name: string }[];
  size: { name: number }[];
  deleteRow: (id: number, total: number) => void;
  updateTotal: (grandTotal: number) => void;
  id: number;
  isKitchen?: boolean;
};

export const WardrobeRow = (props: Props) => {
  const { data, updateTotal, id, deleteRow } = props;

  const [cost, setCost] = useState(data[0].value);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const grandTotal = Math.round(height * length * cost);

  useEffect(() => {
    updateTotal(grandTotal);
  }, [grandTotal]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-x-4 w-full min-w-full  border-b-2 border-gray-300">
      <div className=" flex justify-between  w-full ">
        <ListBox data={data} cb={(val) => setCost(val?.value)} label="Finish" />

        <div>
          <p>Length</p>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="p-2  border rounded-lg focus:outline-none focus:border-indigo-500 max-w-32"
          />
        </div>

        <div>
          <p>Height</p>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="p-2  border rounded-lg focus:outline-none focus:border-indigo-500 max-w-32"
          />
        </div>
      </div>
      <div className="flex w-full gap-x-4 mt-4 font-bold mb-4">
        <div className="min-w-20">
          <p>Total Sqrft</p>
          <p className="my-2">{Math.round(height * length)}</p>
        </div>
        <div className="min-w-20">
          <p>Grand Total</p>
          <p className="my-2">{grandTotal}</p>
        </div>
      </div>
      <TrashIcon
        className="absolute bottom-[3px] h-5 w-5 cursor-pointer text-red-600"
        onClick={() => deleteRow(id, grandTotal)}
      />
    </div>
  );
};

export const RowAccessories = (props: accessories) => {
  const {
    data,
    updateTotal,
    id,
    deleteRow,
    brand,
    size,
    isKitchen = false,
  } = props;

  const [cost, setCost] = useState(data[0].name);
  const [Brand, setBrand] = useState({ name: brand[0].name, isDefault: true });

  const [Size, setSize] = useState({ name: size[0].name, isDefault: true });

  const [uom, setUom] = useState(0);

  const findCombineValue = (
    combine: { name: string; value: number }[],
    cost: string,
    Brand: { name: string; isDefault: boolean },
    Size: { name: number; isDefault: boolean }
  ) => {
    let key: string;
    let brand = Brand.name;
    let size = Size.name;
    if (Brand.isDefault) {
      brand = "";
    }
    if (Size.isDefault) {
      key = cost + brand;
    } else {
      key = cost + brand + size;
    }
    const foundItem = combine.find((item) => item.name === key);
    return foundItem ? foundItem.value * uom : 0; // Return 0 if the item is not found
  };

  const grandTotal = findCombineValue(
    isKitchen ? dummyData.combine : dummyData.combineWardrobe,
    cost,
    Brand,
    Size
  );

  useEffect(() => {
    updateTotal(grandTotal);
  }, [grandTotal]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-x-4 w-full min-w-full  border-b-2 border-gray-300">
      <div className=" flex justify-between  w-full ">
        <ListBox
          data={data}
          cb={(val) => setCost(String(val?.name))}
          label="Accessories"
        />
        <div>
          <p>UOM</p>
          <input
            type="number"
            value={uom}
            onChange={(e) =>
              setUom(Number(e.target.value) < 0 ? 0 : Number(e.target.value))
            }
            className="p-2  border rounded-lg focus:outline-none focus:border-indigo-500 max-w-32"
          />
        </div>
        <ListBox
          data={brand}
          cb={(val) =>
            setBrand({
              name: String(val?.name),
              isDefault: val?.value === 0 ? true : false,
            })
          }
          label="Brand"
          useDefault={true}
        />
        <ListBox
          data={size}
          cb={(val) =>
            setSize({
              name: Number(val?.name),
              isDefault: val?.value === 0 ? true : false,
            })
          }
          label="Size"
          useDefault={true}
        />
      </div>
      <div className="flex w-full gap-x-4 mt-4 font-bold mb-4">
        <div>
          <p>Amount</p>
          <p className="my-2">{grandTotal}</p>
        </div>
      </div>

      <TrashIcon
        className="absolute bottom-[3px] h-5 w-5 cursor-pointer text-red-600"
        onClick={() => deleteRow(id, grandTotal)}
      />
    </div>
  );
};
