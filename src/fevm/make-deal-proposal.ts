import CID from 'cids'
import { currentChain, publicClient, walletClient } from '../wallet/clients'
import { Address, TransactionReceipt, getContract } from 'viem'
import { DealClientContract } from './contracts'

export interface DealProposalParams {
    contract: string,
    pieceCid: string,
    pieceSize: number,
    verifiedDeal: number,
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
        verifiedDeal: 0,
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


    const registryWriteContract = getContract({
        address: contractAddr as Address,
        abi: DealClientContract.abi,
        walletClient: await walletClient(),
    });

    let makeDealProposalTxReceipt: TransactionReceipt;
    let proposalId: string;

    publicClient.watchContractEvent({
        address: contractAddr as Address,
        abi: DealClientContract.abi,
        eventName: 'DealProposalCreate',
        onLogs: logs => {
            // proposalId = (logs[0] as any).args.id.toString();
            console.log("DealProposalCreate event logs: ", logs)
            console.log(`Complete! Event Emitted. ProposalId is: ${proposalId}`)
        }
    });


    try {
        const makeDealProposalTx = await registryWriteContract.write.makeDealProposal([DealRequestStruct]);

        makeDealProposalTxReceipt = await publicClient.waitForTransactionReceipt(
            { hash: makeDealProposalTx }
        );

        console.log(`Transaction hash: ${makeDealProposalTxReceipt.transactionHash}`);


        while (!proposalId) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // wait for 10 seconds
        }

        return {
            hash: makeDealProposalTxReceipt.transactionHash
        }
        // const event = transactionReceipt.events[0].topics[1]

    } catch (error) {
        console.log("Error making deal proposal: ", error);
        return {
            message: `Error: making deal proposal - ${error}`
        }
    }
}
