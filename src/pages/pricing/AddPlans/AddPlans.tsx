import React, { useState, useEffect } from "react";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Select from "react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Dropdown } from "flowbite-react";
import { Switch } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function AddPlans() {
    const router = useRouter();

    const { data: sessionData } = useSession();
    const createdBy = sessionData?.token
        ? sessionData?.token?.id
        : sessionData?.user?.id;

    console.log({ createdBy })

    const [formData, setFormData] = useState<any>({
        name: null,
        amount: null,
        currency: "USD",
        feeType: null, // Updated to lowercase
        recurringType: null,
        isProrata: true,
        isLate: false,
        lateFeeType: null,
        lateFee: null,
        createdBy: null,
    });

    useEffect(() => {
        if (createdBy) {
            setFormData((prev: any) => ({
                ...prev,
                createdBy: createdBy,
            }));
        }
    }, [createdBy]);

    console.log({ formData })
    const [errors, setErrors] = useState<any>({});

    const feeTypeOptions = [
        { value: "one_time", label: "One Time" },
        { value: "recurring", label: "Recurring" },
        { value: "free", label: "Free" },
    ];

    const recurringOptions = [
        { value: "bi_monthly", label: "Bi-Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "half_yearly", label: "Half Yearly" },
        { value: "annually", label: "Annually" },
    ];

    const { mutate: createFeePlanMutate } = api.feePlan.createFeePlan.useMutation({
        onSuccess: (response) => {
            console.log("Fee Plan Created:", response);

            router.push(`/pricing`);
        },
        onError: (error: any) => {

            const errObject = error.data.zodError.fieldErrors;

            setErrors(errObject || error || {});
        },
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "name" || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleCurrencyChange = (currency: any) => {
        setFormData((prev: any) => ({ ...prev, currency }));
    };

    const handleFeeTypeChange = (selectedOption: any) => {
        setFormData((prev: any) => ({
            ...prev,
            feeType: selectedOption.value,
            amount: selectedOption.value === "free" ? "0" : prev.amount,
            recurringType: selectedOption.value === "recurring" ? null : prev.recurringType,
        }));
    };

    const handleRecurringPeriodChange = (selectedOption: { value: any; }) => {
        setFormData((prev: any) => ({ ...prev, recurringType: selectedOption.value }));
    };

    const handleSwitchToggle = () => {
        setFormData((prev: any) => ({ ...prev, isProrata: !prev.isProrata }));
    };

    const handleLateFeeToggle = () => {
        setFormData((prev: any) => ({ ...prev, isLate: !prev.isLate }));
    };

    const handleSubmit = () => {
        const finalForm: any = {
            name: formData.name,
            amount: Number(formData.amount), // Ensuring number type for amount
            feeType: formData.feeType,
            createdBy: Number(formData.createdBy), // Ensuring createdBy is a number
            createdAt: new Date(),
            updatedAt: new Date(),
        };


        // Add optional fields only if they are not null
        if (formData.isProrata !== null) finalForm.isProrata = formData.isProrata;
        if (formData.recurringType !== null) finalForm.recurringType = formData.recurringType;
        if (formData.isLate !== null) finalForm.isLate = formData.isLate;
        if (formData.lateFeeType !== null) finalForm.lateFeeType = formData.lateFeeType;
        if (formData.lateFee !== null) finalForm.lateFee = Number(formData.lateFee); // Ensure lateFee is a number
        if (formData.currency !== null) finalForm.currency = formData.currency;

        console.log({ finalForm })
        // Send the finalForm to the mutation
        createFeePlanMutate(finalForm);
    };

    return (
        <div className="px-6 bg-s-gray pb-7">
            <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
                <CardTitle title="ADD FEE PLAN" />
                <div className="font-medium uppercase text-3xl font-heading text-center lg:text-left">
                    Fee Plan Details
                </div>
                <div className="mt-8 grid lg:grid-cols-2 grid-col-1 gap-x-8 lg:gap-y-8 gap-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Fee Plan Name"
                            className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors?.name && <div className="text-red-500 text-sm">{errors?.name}</div>}
                    </div>
                    <div>
                        <Select
                            options={feeTypeOptions}
                            value={feeTypeOptions.find((option) => option.value === formData.feeType)}
                            onChange={handleFeeTypeChange}
                            placeholder="Fee Type"
                            className="w-full border-1 border-gray-300 c-select"
                            classNamePrefix="react-select"
                        />
                        {errors.feeType && <div className="text-red-500 text-sm">{errors.feeType}</div>}
                    </div>
                    {formData.feeType === "recurring" && (
                        <div>
                            <Select
                                options={recurringOptions}
                                value={recurringOptions.find((option) => option.value === formData.recurringType)}
                                onChange={handleRecurringPeriodChange}
                                placeholder="Select Recurring Period"
                                className="w-full border-1 border-gray-300 c-select"
                                classNamePrefix="react-select"
                            />
                            {errors.recurringType && <div className="text-red-500 text-sm">{errors.recurringType}</div>}
                        </div>
                    )}
                    {(formData.feeType === "recurring" || formData.feeType === "one_time") && (
                        <div className="relative">
                            <input
                                type="text"
                                name="amount"
                                placeholder="Fee Amount"
                                className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600"
                                value={formData.amount}
                                onChange={handleInputChange}
                                onInput={(e: any) => (e.target.value = e.target.value.replace(/[^0-9.]/g, ""))}
                            />
                            <div className="dropdown absolute top-0 right-0 h-12 px-3 border-l border-[#d1d5db]">
                                <Dropdown label="" dismissOnClick={false}
                                    renderTrigger={() => (
                                        <button className="inline-flex items-center h-full">
                                            <span className="grow mr-2">{formData.currency || "Select Currency"}</span>
                                            <ChevronDownIcon width="20px" height="20px" />
                                        </button>
                                    )}
                                    className="rounded-lg">
                                    <Dropdown.Item className="text-start" onClick={() => handleCurrencyChange("USD")}>
                                        US Dollar
                                    </Dropdown.Item>
                                    <Dropdown.Item className="text-start" onClick={() => handleCurrencyChange("INR")}>
                                        Indian Rupees
                                    </Dropdown.Item>
                                    <Dropdown.Item className="text-start" onClick={() => handleCurrencyChange("GBP")}>
                                        UK Pound
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                            {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                        </div>

                    )}
                    <div>
                        <label>Prorata (Per Class)</label>
                        <div className="switch mt-1">
                            <Switch
                                color="green"
                                checked={formData.isProrata}
                                onChange={handleSwitchToggle}
                            />
                            <span className="text-sm ml-5">{formData.isProrata ? "On" : "Off"}</span>
                        </div>
                    </div>
                    <div>
                        <label>Late Fee</label>
                        <div className="switch mt-1">
                            <Switch
                                color="red"
                                checked={formData.isLate}
                                onChange={handleLateFeeToggle}
                            />
                            <span className="text-sm ml-5">{formData.isLate ? "On" : "Off"}</span>
                        </div>
                        {formData.isLate && (
                            <div className="mt-4">
                                <Select
                                    options={[{ value: "amount", label: "Amount" }, { value: "percentage", label: "Percentage" }]}
                                    value={{ value: formData.lateFeeType, label: formData.lateFeeType }}
                                    onChange={(option: any) => setFormData({ ...formData, lateFeeType: option.value })}
                                    placeholder="Select Late Fee Type"
                                    className="w-full border-1 border-gray-300 c-select"
                                    classNamePrefix="react-select"
                                />
                                {errors.lateFeeType && <div className="text-red-500 text-sm">{errors.lateFeeType}</div>}
                                <input
                                    type="text"
                                    name="lateFee"
                                    placeholder="Enter Value"
                                    className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 mt-2 focus:outline-none focus:ring-0 focus:border-gray-600"
                                    value={formData.lateFee}
                                    onChange={handleInputChange}
                                    onInput={(e: any) => (e.target.value = e.target.value.replace(/[^0-9.]/g, ""))}
                                />
                                {errors.lateFee && <div className="text-red-500 text-sm">{errors.lateFee}</div>}
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-end mt-10">
                    <button
                        className="!border-0 px-5 py-3 lg:py-1.5 lg:rounded rounded-full focus:ring-0 outline-0 bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white w-full lg:w-auto"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Add Fee Plan
                    </button>
                </div>
            </Card>
        </div>
    );
}
