import React, { useState } from "react";

import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

const AuthPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const isLogged = () => {
    return localStorage.getItem("logged_in") == "true";
  };

  const handleOpen = () => {
    if (localStorage.getItem("logged_in")) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleKeyDid = () => {
    localStorage.setItem("ceramic:auth_type", "key");
    setIsVisible(false);
    authenticateCeramic(ceramic, composeClient);
  };

  const handleEthPkh = () => {
    localStorage.setItem("ceramic:auth_type", "eth");
    setIsVisible(false);
    authenticateCeramic(ceramic, composeClient);
  };

  return (
    <div>
      {isVisible && (
        <div className="absolute top-20 left-24 w-1/2 border border-stone-400 shadow-lg rounded-lg bg-white px-6 py-4 ">
          <div className="mx-6 my-8">
            <p className="text-xl text-center mb-12">Authenticate</p>

            <div className="flex gap-4 justify-center">
              <button
                className="bg-black px-4 py-2 rounded-lg text-white"
                onClick={handleKeyDid}
              >
                Key DID
              </button>
              <button
                className="bg-black px-4 py-2 rounded-lg text-white"
                onClick={handleEthPkh}
              >
                Ethereum Wallet (DID PKH)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPrompt;
