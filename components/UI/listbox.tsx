import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Props = {
  data: { name: string | number | undefined; [key: string]: any }[] | undefined;
  cb?: (data: { name: string | number; [key: string]: any } | null) => void;
  label?: string;
  useDefault?: boolean;
  selectedVal?: string;
};

export default function ListBox(props: Props) {
  const [selected, setSelected] = useState<
    | {
        name: string | number | undefined;
        [key: string]: any;
      }
    | undefined
  >(props?.data?.[0]);

  const handleSelection = (val: any) => {
    setSelected(val);
    props?.cb ? props.cb(val) : null;
  };
  useEffect(() => {
    // Set selected to the first item in props.data when props.data changes
    if (props.data && props.data.length > 0) {
      setSelected(props.data[0]);
    }
  }, [props.data]);
  useEffect(() => {
    if (props.selectedVal && props.data) {
      const foundObject = props.data.find(
        (item) => item.name === props.selectedVal
      );
      if (foundObject) {
        setSelected(foundObject);
      }
    }
  }, [props.selectedVal, props.data]);
  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  return (
    <div className="relative max-w-36">
      {props.label && <p>{props.label}</p>}
      <Listbox value={selected} onChange={(val) => handleSelection(val)}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected && selected.name && props?.data && props.data.length
                ? selected.name
                : "No Data available"}
            </span>{" "}
            {/* Display "Select..." if nothing selected */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {props?.data && (
            <Transition
              as={"div"}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="w-[300px] absolute z-10 w-full mt-1 overflow-auto hideScroll bg-white border border-gray-300 rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none text-xs">
                {props?.data?.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
                      cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          )}
        </div>
      </Listbox>
    </div>
  );
}
