import Image from "next/image";
import Visa from "../../../images/visa.svg";


export default function PaymentMethods() {

    return (
        <div className="rounded-lg border border-gray-300 p-4 ">
            <div className="mb-5 font-heading text-2xl font-medium uppercase">
                Payment Methods
            </div>
            <div className="scroll max-h-[225px] overflow-auto">
                <div className="mb-3 flex items-center rounded-lg bg-[#F9F9FB] px-5 py-3">
                    <Image
                        width={0}
                        height={0}
                        src={Visa}
                        alt=""
                        className="h-auto w-auto"
                    />
                    <div className="ml-3">
                        <div className="text-lg">
                            Visa ending in **4567
                        </div>
                        <div className="text-lg text-[#6E7280]">
                            Expiry 06/2024
                        </div>
                    </div>
                </div>
                <div className="mb-3 flex items-center rounded-lg bg-[#F9F9FB] px-5 py-3">
                    <Image
                        width={0}
                        height={0}
                        src={Visa}
                        alt=""
                        className="h-auto w-auto"
                    />
                    <div className="ml-3 text-lg">
                        <div>
                            Visa ending in **4567
                        </div>
                        <div className="text-[#6E7280]">
                            Expiry 06/2024
                        </div>
                    </div>
                </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-[#974062] py-2 text-white">
                Edit{" "}
            </button>
        </div>
    );
}