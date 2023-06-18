import React, { useState } from "react";
import { Address } from "viem";

interface DealProposalFormProps {
  onSubmit: (proposalId: string, smartContract: Address) => void;
}

export default function GetExistingDealProposalDetails({ onSubmit }: DealProposalFormProps) {
  const [proposalId, setProposalId] = useState("0x8c3a0e4cc043393ee937d7e372d54e91025ddeae17726d9eb1207e43571b1fe8");
  const [smartContract, setSmartContract] = useState("0xFd562F20E65e0d87598cDA7F2a1Ac348a008fA0D");

  const handleSubmit = () => {
    onSubmit(proposalId, smartContract as Address);
  };

  return (
    <div style={{ marginBottom: '16px', backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="proposalId" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Proposal ID:</label>
        <input type="text" id="proposalId" value={proposalId} onChange={(e) => setProposalId(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="smartContract" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Smart Contract:</label>
        <input type="text" id="smartContract" value={smartContract} onChange={(e) => setSmartContract(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <button onClick={handleSubmit} style={{ backgroundColor: '#0070f3', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Get Deal Proposal</button>
    </div>
  );
}