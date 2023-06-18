import CID from 'cids'
import { currentChain, publicClient, walletClient } from '../wallet/clients'
import { Account, Address, ContractFunctionResult, TransactionReceipt, getContract, parseAbi } from 'viem'
import { privateKeyToAccount, publicKeyToAddress } from 'viem/accounts'
import { DealClientContract } from './contracts'
import { Log, ethers } from 'ethers'

export interface DealProposalParams {
    contract: string,
    pieceCid: string,
    pieceSize: number,
    verifiedDeal: boolean,
    label?: string,
    startEpoch: number,
    endEpoch: number,
    storagePricePerEpoch: number,
    providerCollateral: number,
    clientCollateral: number,
    extraParamsVersion: string,
    locationRef: string,
    carSize: number,
    skipIpniAnnounce: boolean,
    removeUnsealedCopy: boolean
}

export async function makeDealProposal(params: DealProposalParams) {

    params = {
        contract: "0xFd562F20E65e0d87598cDA7F2a1Ac348a008fA0D",
        pieceCid: "baga6ea4seaqhedb2m6yyr4wejjgxrrehujv5yp6ujzgebqaz22qlm6v74apw6oq",
        pieceSize: 4096,
        verifiedDeal: false,
        label: "file-1686957219783.png",
        startEpoch: 100000,
        endEpoch: 1000000,
        storagePricePerEpoch: 0,
        providerCollateral: 0,
        clientCollateral: 0,
        extraParamsVersion: "1",
        locationRef: "https://data-depot.lighthouse.storage/api/download/download_car?fileId=c52f62f1-dd4d-4f02-8352-2af72442818d.car",
        carSize: 2061,
        skipIpniAnnounce: false,
        removeUnsealedCopy: false,

    }

    const cid = params.pieceCid
    const cidHexRaw = new CID(cid).toString('base16').substring(1)
    const cidHex = "0x" + cidHexRaw
    const contractAddr = params.contract

    const verified = params.verifiedDeal
    const skipIpniAnnounce = (params.skipIpniAnnounce)
    const removeUnsealedCopy = (params.removeUnsealedCopy)

    const extraParamsV1 = [
        params.locationRef,
        params.carSize,
        skipIpniAnnounce,
        removeUnsealedCopy,
    ]

    const DealRequestStruct = [
        cidHex,
        params.pieceSize,
        verified,
        params.label,
        params.startEpoch,
        params.endEpoch,
        params.storagePricePerEpoch,
        params.providerCollateral,
        params.clientCollateral,
        params.extraParamsVersion,
        extraParamsV1,
    ]

    console.log("Making deal proposal on network", currentChain.name);

    const wallet = await walletClient()

    const registryWriteContract = getContract({
        address: contractAddr as Address,
        abi: DealClientContract.abi,
        walletClient: wallet,
    });

    let makeDealProposalTxReceipt: TransactionReceipt;
    try {
        const makeDealProposalTx = await registryWriteContract.write.makeDealProposal([DealRequestStruct]);

        makeDealProposalTxReceipt = await publicClient.waitForTransactionReceipt(
            { hash: makeDealProposalTx }
        );
        console.log(`Transaction hash: ${makeDealProposalTxReceipt.transactionHash}`);

        const proposalIdResponse = (await fetchProposalId(makeDealProposalTxReceipt.transactionHash));

        console.log(`Proposal id is: ${proposalIdResponse.proposalId}`)

        return {
            hash: makeDealProposalTxReceipt.transactionHash,
            message: proposalIdResponse.message
        }

    } catch (error) {
        console.log("Error making deal proposal: ", error);
        return {
            message: `Error: making deal proposal - ${error}`
        }
    }
}

interface TransactionReceiptWithTopics extends ethers.TransactionReceipt {
    logs: ethers.Log[];
  }


export async function fetchProposalId(txHash: Address) {
    console.log(`Fetching receipt logs for transaction ${txHash}`);
  
  
    const receipt: TransactionReceiptWithTopics = await publicClient.waitForTransactionReceipt(
        { hash: txHash}
    );

    const proposalId = receipt.logs[0].topics[1];
    if (!proposalId)
        return {
            message: `Error: fetching propsal id`
        }

    console.log(`Proposal id is: ${proposalId}`);
  
    return {
        proposalId: proposalId,
        hash: txHash,
        message: `Success! Proposal id is: ${proposalId}`
    }
  }