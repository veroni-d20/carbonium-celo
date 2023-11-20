import Head from "next/head";
import ApplicationLayout from "@/components/Utilities/ApplicationLayout";
import { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
import axios from "axios";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import DEPLOYED_CONTRACTS from "@/utilities/contractDetails";

export default function Attestation() {
  const [attestation, setAtteststations] = useState<any>([]);

  useEffect(() => {
    async function calldb() {
      try {
        const res = await axios.get("/api/details");
        console.log(res.data);

        setAtteststations(res.data.details);
      } catch (error) {
        console.log(error);
      }
    }

    calldb();
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard - Carbonium | Empowering Sustainability Through Blockchain
          Innovation tokens
        </title>
      </Head>

      <ApplicationLayout customHeader="Attestation">
        {" "}
        {attestation?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-5">
            {attestation.map((attestation: any, index: number) => (
              <AttestationCard detail={[attestation, index]} key={index} />
            ))}
          </div>
        ) : (
          <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Create a new database
            </span>
          </div>
        )}
      </ApplicationLayout>
    </>
  );
}

function AttestationCard({ detail }: any) {
  const [loading, setLoading] = useState(false);

  const {
    data,
    isLoading,
    isSuccess,
    write: attest,
  } = useContractWrite({
    address: DEPLOYED_CONTRACTS.ATTESTATION.address as `0x${string}`,
    abi: DEPLOYED_CONTRACTS.ATTESTATION.abi,
    functionName: "attestUint",
  });

  console.log(detail[0]._id);

  const handleAttestation = async (id: any) => {
    setLoading(true);
    attest({
      args: [
        "0x3f17a7f40601bd688d1547af02db7aa4a35f7111c0f80be9f2471e7acffc3aa7",
        [
          detail[0].name,
          detail[0].country,
          detail[0].vintage,
          detail[0].standard,
          detail[0].methodology,
          detail[0].creditAmount,
          detail[0].issuerName,
          detail[0].issuerCountry,
        ],
        "0xd69a4dd0dfb261a8EF37F45925491C077EF1dBFb",
      ],
    });

    const updateData = await axios.put("/api/updateDetail", { id });
    console.log(updateData);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="px-5 sm:px-6 lg:px-8 pt-5 font-black text-xl">
        Request #{detail[1] + 1}
      </div>

      {/* Addresses Start */}
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Prjoect Name
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].name}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Country
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].country}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Vintage
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].vintage}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Standard
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].standard}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Methodology
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].methodology}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Credits Amount
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].creditAmount}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Issuer Name
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].issuerName}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                Issuer Country
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                {detail[0].issuerCountry}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Addresses End */}
      <div className="px-5 sm:px-6 pb-4">
        {loading ? (
          <button
            disabled={loading}
            className="disabled:opacity-50 disabled:bg-zinc-800 w-full rounded-md bg-primary-400 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            Loading
          </button>
        ) : (
          <button
            disabled={isSuccess}
            className="disabled:opacity-50 disabled:bg-zinc-800 w-full rounded-md bg-primary-400 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            onClick={() => handleAttestation(detail[0]._id)}
          >
            Validate
          </button>
        )}
      </div>
      {isSuccess && (
        <div className="mb-5 mx-5 sm:col-span-2 rounded-md bg-green-600 px-4 py-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-300"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-50">
                Claimed Successfully!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
