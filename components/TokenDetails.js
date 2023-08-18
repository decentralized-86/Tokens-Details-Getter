import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const logoPath = "/uniswap-uni-logo.png";

const TOKEN_DETAILS_QUERY = gql`
  query GetTokenBySymbol($symbol: String!) {
    tokens(where: { symbol: $symbol }) {
      id
      name
      symbol
      decimals
      totalSupply
    }
  }
`;

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  cache: new InMemoryCache(),
});

const FetchTokenDetailsBySymbol = () => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDetails, setTokenDetails] = useState(null);

  const handleFetchDetails = async () => {
    try {
      const result = await client.query({
        query: TOKEN_DETAILS_QUERY,
        variables: { symbol: tokenSymbol },
      });
      setTokenDetails(result.data.tokens[0]);
    } catch (error) {
      console.error("Error fetching token details: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-pink-300 w-1/4">
        <div className="flex justify-center items-center mb-4">
          <img src={logoPath} alt="Uniswap" className="w-12" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Token Symbol</label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
          />
        </div>
        <button
          onClick={handleFetchDetails}
          className="px-4 py-2 text-white rounded-xl w-full bg-gradient-to-r from-pink-300 to-pink-400"
        >
          Fetch Details
        </button>
        {tokenDetails && (
          <div className="mt-4">
            <div className="text-white font-mono text-sm font-medium">
              Name: {tokenDetails.name}
            </div>
            <div className="text-white font-mono text-sm font-medium">
              Symbol: {tokenDetails.symbol}
            </div>
            <div className="text-white font-mono text-sm font-medium">
              Decimals: {tokenDetails.decimals}
            </div>
            <div className="text-white font-mono text-sm font-medium">
              Total Supply: {tokenDetails.totalSupply}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchTokenDetailsBySymbol;