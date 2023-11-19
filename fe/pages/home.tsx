import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import DEPLOYED_CONTRACTS from "@/utilities/contractDetails";
import ApplicationLayout from "@/components/Utilities/ApplicationLayout";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const standards = [1, 2, 3];

export default function Home() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [attestation, setAtteststations] = useState<any>([]);
  const [carboniumTokenBalance, setCarboniumTokenBalance] = useState<any>(0);
  const [standardOneBalance, setStandardOneBalance] = useState<any>(0);
  const [standardTwoBalance, setStandardTwoBalance] = useState<any>(0);
  const [standardThreeBalance, setStandardThreeBalance] = useState<any>(0);
  const [quotationOne, setQuotationOne] = useState<any>(null);
  const [quotationTwo, setQuotationTwo] = useState<any>(null);
  const [quotationThree, setQuotationThree] = useState<any>(null);
  const [tokenAmount, setTokenAmount] = useState<any>(0);

  const {
    data: balance,
    isLoading,
    refetch: refetchCarboniumBalance,
  } = useContractRead({
    abi: DEPLOYED_CONTRACTS.CARBONIUM_TOKEN.abi,
    address: DEPLOYED_CONTRACTS.CARBONIUM_TOKEN.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: standardOne, refetch: refetchStandardOne } = useContractRead({
    abi: DEPLOYED_CONTRACTS.CARBON_CREDITS.abi,
    address: DEPLOYED_CONTRACTS.CARBON_CREDITS.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address, 1],
  });

  const { data: standardTwo, refetch: refetchStandardTwo } = useContractRead({
    abi: DEPLOYED_CONTRACTS.CARBON_CREDITS.abi,
    address: DEPLOYED_CONTRACTS.CARBON_CREDITS.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address, 2],
  });

  const { data: standardThree, refetch: refetchStandardThree } =
    useContractRead({
      abi: DEPLOYED_CONTRACTS.CARBON_CREDITS.abi,
      address: DEPLOYED_CONTRACTS.CARBON_CREDITS.address as `0x${string}`,
      functionName: "balanceOf",
      args: [address, 3],
    });

  const { write: swapValues } = useContractWrite({
    abi: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.abi,
    address: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.address as `0x${string}`,
    functionName: "swapERC1155ForERC20",
  });

  const { data: quoteOne, refetch: refetchQuoteOne } = useContractRead({
    abi: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.abi,
    address: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.address as `0x${string}`,
    functionName: "getQuoteERC1155ToERC20",
    args: [tokenAmount, 1],
  });

  const { data: quoteTwo, refetch: refetchQuoteTwo } = useContractRead({
    abi: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.abi,
    address: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.address as `0x${string}`,
    functionName: "getQuoteERC1155ToERC20",
    args: [tokenAmount, 2],
  });

  const { data: quoteThree, refetch: refetchQuoteThree } = useContractRead({
    abi: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.abi,
    address: DEPLOYED_CONTRACTS.LIQUIDITY_POOL.address as `0x${string}`,
    functionName: "getQuoteERC1155ToERC20",
    args: [tokenAmount, 3],
  });

  useEffect(() => {
    console.log(isConnected);

    async function fetchBalances() {
      await refetchCarboniumBalance().then(() =>
        setCarboniumTokenBalance(balance)
      );
      await refetchStandardOne().then(() => setStandardOneBalance(standardOne));
      await refetchStandardTwo().then(() => setStandardTwoBalance(standardTwo));
      await refetchStandardThree().then(() =>
        setStandardThreeBalance(standardThree)
      );
    }

    if (address) {
      fetchBalances();
    }
  }, [standardOne, standardTwo, standardThree]);

  const range: any = (n: number) =>
    Array.from(Array(n).keys()).map((n) => n + 1);

  return (
    <>
      <Head>
        <title>
          Dashboard - Carbonium | Like, Comment & Subscribe to earn Pego tokens
        </title>
      </Head>

      <ApplicationLayout customHeader="Your Dashboard">
        {/* Tokens Balance Start */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div>
            <div className="font-black text-zinc-900 text-2xl">
              Carbonium Token Balance
            </div>
            <div className="mt-1 font-medium text-gray-500 text-sm">
              Total tokens you have claimed
            </div>
            <div className="mt-5 font-black text-5xl text-gray-900">
              {carboniumTokenBalance ? carboniumTokenBalance.toString() : 0}{" "}
              <span className="text-base text-gray-500 font-medium">CT</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="font-black text-zinc-900 text-4xl">
            Carbon Credits Balance
          </div>
          <div className="mt-4">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="-ml-2 -mt-2 flex-col flex-wrap items-center justify-between sm:flex-nowrap p-6">
                  <div className="font-black text-zinc-800 text-2xl">
                    Standard One Balance
                  </div>
                  <div className="mt-5 font-black text-5xl text-gray-800">
                    {standardOneBalance ? standardOneBalance.toString() : 0}{" "}
                    <span className="text-base text-gray-500 font-medium">
                      NFTs
                    </span>
                  </div>
                </div>
                <div className="m-3">
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className=" mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="1"
                  />
                  {quotationOne && (
                    <p className="text-center mt-3">
                      Equivalent ERC20 is: {quotationOne.toString()}
                    </p>
                  )}
                  <div
                    className={
                      quotationOne
                        ? "mt-2 grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                        : "mt-2 justify-center"
                    }
                  >
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                      onClick={async () =>
                        await refetchQuoteOne().then(() =>
                          setQuotationOne(quoteOne)
                        )
                      }
                    >
                      Get Quote
                    </button>
                    {quotationOne && (
                      <button
                        type="submit"
                        className="flex justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                        onClick={() => swapValues({ args: [1, tokenAmount] })}
                      >
                        Deposit
                      </button>
                    )}
                  </div>
                </div>
              </li>
              <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="-ml-2 -mt-2 flex-col flex-wrap items-center justify-between sm:flex-nowrap p-6">
                  <div className="font-black text-zinc-800 text-2xl">
                    Standard Two Balance
                  </div>
                  <div className="mt-5 font-black text-5xl text-gray-800">
                    {standardTwoBalance ? standardTwoBalance.toString() : 0}{" "}
                    <span className="text-base text-gray-500 font-medium">
                      NFTs
                    </span>
                  </div>
                </div>
                <div className="m-3">
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className=" mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="1"
                  />
                  {quotationTwo && (
                    <p className="text-center mt-3">
                      Equivalent ERC20 is: {quotationTwo.toString()}
                    </p>
                  )}
                  <div
                    className={
                      quotationTwo
                        ? "mt-2 grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                        : "mt-2 justify-center"
                    }
                  >
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                      onClick={async () =>
                        await refetchQuoteTwo().then(() =>
                          setQuotationTwo(quoteTwo)
                        )
                      }
                    >
                      Get Quote
                    </button>
                    {quotationTwo && (
                      <button
                        type="submit"
                        className="flex justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                        onClick={() => swapValues({ args: [2, tokenAmount] })}
                      >
                        Deposit Carbon Credits
                      </button>
                    )}
                  </div>
                </div>
              </li>
              <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="-ml-2 -mt-2 flex-col flex-wrap items-center justify-between sm:flex-nowrap p-6">
                  <div className="font-black text-zinc-800 text-2xl">
                    Standard Three Balance
                  </div>
                  <div className="mt-5 font-black text-5xl text-gray-800">
                    {standardThreeBalance ? standardThreeBalance.toString() : 0}{" "}
                    <span className="text-base text-gray-500 font-medium">
                      NFTs
                    </span>
                  </div>
                </div>
                <div className="m-3">
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className=" mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="1"
                  />
                  {quotationThree && (
                    <p className="text-center mt-3">
                      Equivalent ERC20 is: {quotationThree.toString()}
                    </p>
                  )}
                  <div
                    className={
                      quotationThree
                        ? "mt-2 grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                        : "mt-2 justify-center"
                    }
                  >
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                      onClick={async () =>
                        await refetchQuoteThree().then(() =>
                          setQuotationThree(quoteThree)
                        )
                      }
                    >
                      Get Quote
                    </button>
                    {quotationThree && (
                      <button
                        type="submit"
                        className="flex justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                        onClick={() => swapValues({ args: [3, tokenAmount] })}
                      >
                        Deposit Carbon Credits
                      </button>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ApplicationLayout>
    </>
  );
}
