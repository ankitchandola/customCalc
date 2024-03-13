import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Props = {
  data: { name: string | number; [key: string]: any }[];
  cb?: (data: { name: string | number; [key: string]: any } | null) => void;
  label?: string;
  useDefault?: boolean;
};

export default function ListBox(props: Props) {
  const { useDefault = false } = props;
  const defaultobj = { name: "Select Value", value: 0 };
  const [selected, setSelected] = useState<{
    name: string | number;
    [key: string]: any;
  }>(props.useDefault ? defaultobj : props.data[0]); // Initially selected is null

  const handleSelection = (val: any) => {
    setSelected(val);
    props?.cb ? props.cb(val) : null; // If already selected, set to null
  };

  return (
    <div className="relative max-w-36">
      {props.label && <p>{props.label}</p>}
      <Listbox value={selected} onChange={(val) => handleSelection(val)}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected ? selected.name : "Select..."}
            </span>{" "}
            {/* Display "Select..." if nothing selected */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto hideScroll bg-white border border-gray-300 rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none text-xs">
              {useDefault && (
                <Listbox.Option
                  key="empty-option"
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                    cursor-default select-none relative py-2 pl-3 pr-9`
                  }
                  value={defaultobj}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        Select Value
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              )}
              {props.data.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
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
        </div>
      </Listbox>
    </div>
  );
}
