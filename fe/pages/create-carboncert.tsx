import { useState } from "react";
import Head from "next/head";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
// import DEPLOYED_CONTRACTS from "@/utilities/contractDetails";
import ApplicationLayout from "@/components/Utilities/ApplicationLayout";
import { useAccount } from "wagmi";
import axios from "axios";

export default function CreateCarbonCert() {
  const { address }: any = useAccount();

  const [inputs, setInputs] = useState({
    name: "",
    country: "",
    vintage: "",
    standard: "",
    methodology: "",
    creditsAmount: "",
    issuerName: "",
    issuerCountry: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInput = (event: {
    persist: () => void;
    target: { id: any; value: any };
  }) => {
    event.persist();
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.post("/api/register", { ...inputs, address });
    if (res.status == 200) {
      setIsLoading(false);
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <Head>
        <title>
          Dashboard - Carbonium | Empowering Sustainability Through Blockchain
          Innovation tokens
        </title>
      </Head>

      <ApplicationLayout customHeader="Register Certificate">
        <div className="rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-md my-2 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-zinc-900"
              >
                Project name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={inputs.name}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="EV Vehicle"
              />
            </div>

            <div className="rounded-md my-2 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="country"
                className="block text-xs font-medium text-zinc-900"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={handleInput}
                value={inputs.country}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="India"
              />
            </div>

            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="vintage"
                className="block text-xs font-medium text-zinc-900"
              >
                Vintage
              </label>
              <input
                type="text"
                name="vintage"
                id="vintage"
                onChange={handleInput}
                value={inputs.vintage}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="2022"
              />
            </div>

            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="standard"
                className="block text-xs font-medium text-zinc-900"
              >
                Standard
              </label>
              <input
                type="text"
                name="standard"
                id="standard"
                onChange={handleInput}
                value={inputs.standard}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Mandatory"
              />
            </div>
            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="methodology"
                className="block text-xs font-medium text-zinc-900"
              >
                Methodology
              </label>
              <input
                type="text"
                name="methodology"
                id="methodology"
                onChange={handleInput}
                value={inputs.methodology}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Removing carbon products"
              />
            </div>
            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="creditsAmount"
                className="block text-xs font-medium text-zinc-900"
              >
                Credits Amount
              </label>
              <input
                type="text"
                name="creditsAmount"
                id="creditsAmount"
                onChange={handleInput}
                value={inputs.creditsAmount}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="100"
              />
            </div>
            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="issuerName"
                className="block text-xs font-medium text-zinc-900"
              >
                Issuer Name
              </label>
              <input
                type="text"
                name="issuerName"
                id="issuerName"
                onChange={handleInput}
                value={inputs.issuerName}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="VC"
              />
            </div>
            <div className="rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-400">
              <label
                htmlFor="issuerCountry"
                className="block text-xs font-medium text-zinc-900"
              >
                Issuer Country
              </label>
              <input
                type="text"
                name="issuerCountry"
                id="issuerCountry"
                onChange={handleInput}
                value={inputs.issuerCountry}
                className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="India"
              />
            </div>

            {isSuccess && (
              <div className="mt-6 sm:col-span-2 rounded-md bg-green-600 px-4 py-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-50">
                      We have received your application!
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isError && (
              <div className="mt-6 sm:col-span-2 rounded-md bg-red-600 px-4 py-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-50">
                      Uh oh! Something went wrong. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="col-span-3 flex justify-end">
              <button
                type="submit"
                className={`rounded-md bg-primary-400 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400" ${
                  isLoading && "opacity-50 cursor-progress"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Registering Certificate"
                ) : (
                  <span className="flex justify-center gap-x-2">
                    Register <span aria-hidden="true">→</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </ApplicationLayout>
    </>
  );
}
