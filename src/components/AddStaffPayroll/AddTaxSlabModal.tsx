import React from "react";

function AddTaxSlabModal({
  show,
  setShow,
  submitTaxSlab,
  setTaxSlab,
  taxSlab,
}: any) {
  const handleDesignationChange = (name: string, value: string) => {
    const obj: any = { ...taxSlab };
    obj[name] = value;
    setTaxSlab(obj);
  };

  return (
    <>
      <div
        // tabindex="-1"
        aria-hidden="true"
        className={`${
          !show ? `hidden` : ``
        } absolute right-10 top-0 z-50 w-80   
            items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0`}
      >
        <div className="relative max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Designation
              </h3>
              <button
                type="button"
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShow(false)}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input
                    type="number"
                    name="fromAmount"
                    id="fromAmount"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500
                         dark:focus:border-primary-500 w-50 block rounded-lg
                         border border-gray-300 bg-gray-50 p-2.5 text-sm
                         text-gray-900 dark:border-gray-500 dark:bg-gray-600
                         dark:text-white dark:placeholder-gray-400"
                    placeholder="From Amount"
                    required
                    onChange={(e) =>
                      handleDesignationChange("fromAmount", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    name="toAmount"
                    id="toAmount"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500
                         dark:focus:border-primary-500 w-50 block rounded-lg
                         border border-gray-300 bg-gray-50 p-2.5 text-sm
                         text-gray-900 dark:border-gray-500 dark:bg-gray-600
                         dark:text-white dark:placeholder-gray-400"
                    placeholder="To Amount"
                    required
                    onChange={(e) =>
                      handleDesignationChange("toAmount", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    name="tax_percent"
                    id="tax_percent"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500
                         dark:focus:border-primary-500 w-50 block rounded-lg
                         border border-gray-300 bg-gray-50 p-2.5 text-sm
                         text-gray-900 dark:border-gray-500 dark:bg-gray-600
                         dark:text-white dark:placeholder-gray-400"
                    placeholder="Deduction Percent"
                    required
                    onChange={(e) =>
                      handleDesignationChange("percentage", e.target.value)
                    }
                  />
                </div>
                {/* button div */}
                <div>
                  <button
                    type="submit"
                    className=" w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => submitTaxSlab(e)}
                  >
                    Add Tax Slab
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTaxSlabModal;
