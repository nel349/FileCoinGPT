import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

import { ENS } from "@ensdomains/ensjs";

import style from "./ENSComponent.module.css";

interface ENSProfile {
  name: string;
  address: string;
  content: string;
  email: string;
  url: string;
}

interface ENSProfileComponentProps {
  name?: string;
}

function ENSProfileComponent(props: ENSProfileComponentProps) {
  const [ensProfile, setENSProfile] = useState<ENSProfile | null>(null);
  const [textRecords, setTextRecords] = useState<{ key: string; type: string; value: string }[]>([]);
  const [coinTypes, setCoinTypes] = useState<{ key: string; type: string; coin: string; addr: string }[]>([]);

  useEffect(() => {
    const provider = new JsonRpcProvider(process.env.ALCHEMY_API_KEY_MAINNET);
    const ENSInstance = new ENS();

    async function fetchENSProfile() {
      const callWithProvider = await ENSInstance.withProvider(provider).getProfile("nick.eth", {
        texts: true,
        coinTypes: true,
        contentHash: true,
      });

      const ensProfile = {
        name: callWithProvider.decryptedName,
        address: callWithProvider.address,
        content: "",
        email: "",
        url: "",
      };

      const textRecords = [];
      for (const text of callWithProvider.records.texts) {
        if (text.key === "email") {
          ensProfile.email = text.value;
        } else if (text.key === "url") {
          ensProfile.url = text.value;
        }
        textRecords.push(text);
      }

      const coinTypes = [];
      for (const coinType of callWithProvider.records.coinTypes) {
        coinTypes.push(coinType);
      }

      setENSProfile(ensProfile);
      setTextRecords(textRecords);
      setCoinTypes(coinTypes);
    }

    fetchENSProfile();
  }, [props.name]);

  if (!ensProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style["ens-profile"]}>
        <div className={style["ens-profile-header"]}>
            <h1>{ensProfile.name}</h1>
            <p className={style["ens-profile-address"]}>{ensProfile.address}</p>
        </div>

        <div className={style["ens-profile-content"]}>
            <p className={style["ens-profile-content-label"]}>Content:</p>
            <p className={style["ens-profile-content-value"]}>{ensProfile.content}</p>
        </div>

        <div className={style["ens-profile-contact"]}>
            <p className={style["ens-profile-contact-label"]}>Contact:</p>
            <p className={style["ens-profile-contact-value"]}>{ensProfile.email}</p>
            <p className={style["ens-profile-contact-value"]}>{ensProfile.url}</p>
        </div>

        <div className={style["ens-profile-text-records"]}>
            <h2>Text Records</h2>
            <ul>
                {textRecords.map((textRecord, index) => (
                    <li key={index}>
                        <span className={style["ens-profile-text-record-key"]}>{textRecord.key}:</span>{" "}
                        <span className={style["ens-profile-text-record-value"]}>{textRecord.value}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className={style["ens-profile-coin-types"]}>
            <h2>Coin Types</h2>
            <ul>
                {coinTypes.map((coinType, index) => (
                    <li key={index}>
                        <span className={style["ens-profile-coin-type-coin"]}>{coinType.coin}</span>{" "}
                        <span className={style["ens-profile-coin-type-key"]}>({coinType.key}):</span>{" "}
                        <span className={style["ens-profile-coin-type-addr"]}>{coinType.addr}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
}

export default ENSProfileComponent;