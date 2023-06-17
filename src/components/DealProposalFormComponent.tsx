import React, { useState } from "react";
import { DealProposalParams } from "../fevm/make-deal-proposal";

interface DealProposalFormProps {
  onSubmit: (params: DealProposalParams) => void;
}

export default function DealProposalForm({ onSubmit }: DealProposalFormProps) {
  const [contract, setContract] = useState("");
  const [pieceCid, setPieceCid] = useState("");
  const [pieceSize, setPieceSize] = useState(0);
  const [verifiedDeal, setVerifiedDeal] = useState(0);
  const [label, setLabel] = useState("");
  const [startEpoch, setStartEpoch] = useState(0);
  const [endEpoch, setEndEpoch] = useState(0);
  const [storagePricePerEpoch, setStoragePricePerEpoch] = useState(0);
  const [providerCollateral, setProviderCollateral] = useState(0);
  const [clientCollateral, setClientCollateral] = useState(0);
  const [extraParamsVersion, setExtraParamsVersion] = useState("");
  const [locationRef, setLocationRef] = useState("");
  const [carSize, setCarSize] = useState(0);
  const [skipIpniAnnounce, setSkipIpniAnnounce] = useState(false);
  const [removeUnsealedCopy, setRemoveUnsealedCopy] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params: DealProposalParams = {
      contract,
      pieceCid,
      pieceSize,
      verifiedDeal,
      label,
      startEpoch,
      endEpoch,
      storagePricePerEpoch,
      providerCollateral,
      clientCollateral,
      extraParamsVersion,
      locationRef,
      carSize,
      skipIpniAnnounce,
      removeUnsealedCopy,
    };
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contract:
        <input type="text" value={contract} onChange={(e) => setContract(e.target.value)} />
      </label>
      <br />
      <label>
        Piece CID:
        <input type="text" value={pieceCid} onChange={(e) => setPieceCid(e.target.value)} />
      </label>
      <br />
      <label>
        Piece Size:
        <input type="number" value={pieceSize} onChange={(e) => setPieceSize(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Verified Deal:
        <input type="number" value={verifiedDeal} onChange={(e) => setVerifiedDeal(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Label:
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </label>
      <br />
      <label>
        Start Epoch:
        <input type="number" value={startEpoch} onChange={(e) => setStartEpoch(Number(e.target.value))} />
      </label>
      <br />
      <label>
        End Epoch:
        <input type="number" value={endEpoch} onChange={(e) => setEndEpoch(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Storage Price per Epoch:
        <input type="number" value={storagePricePerEpoch} onChange={(e) => setStoragePricePerEpoch(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Provider Collateral:
        <input type="number" value={providerCollateral} onChange={(e) => setProviderCollateral(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Client Collateral:
        <input type="number" value={clientCollateral} onChange={(e) => setClientCollateral(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Extra Params Version:
        <input type="text" value={extraParamsVersion} onChange={(e) => setExtraParamsVersion(e.target.value)} />
      </label>
      <br />
      <label>
        Location Ref:
        <input type="text" value={locationRef} onChange={(e) => setLocationRef(e.target.value)} />
      </label>
      <br />
      <label>
        Car Size:
        <input type="number" value={carSize} onChange={(e) => setCarSize(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Skip IPNI Announce:
        <input type="checkbox" checked={skipIpniAnnounce} onChange={(e) => setSkipIpniAnnounce(e.target.checked)} />
      </label>
      <br />
      <label>
        Remove Unsealed Copy:
        <input type="checkbox" checked={removeUnsealedCopy} onChange={(e) => setRemoveUnsealedCopy(e.target.checked)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
