import { currentChain, publicClient, walletClient } from '../wallet/clients'
import { Address, ContractFunctionResult, Hex, getContract, hexToBytes } from 'viem'
import { DealClientContract } from './contracts'
import cbor from 'cbor';
import CID from 'cids';
interface DealProposal {
    piece_cid: string;
    piece_size: number;
    verified_deal: boolean;
    client: string;
    provider: string;
    label: string;
    start_epoch: number;
    end_epoch: number;
    storage_price_per_epoch: number;
    provider_collateral: number;
    client_collateral: number;
}

export async function fetchDealProposal(proposalId: string, contractAddr: Address): Promise<ContractFunctionResult> {
    console.log(`Fetching deal proposal with ID ${proposalId} on network ${currentChain.name} with address: ${contractAddr}`);

    const dealClientContract = getContract({
        address: contractAddr,
        abi: DealClientContract.abi,
        publicClient,
    });

    const response = await dealClientContract.read.getDealProposal([proposalId]) as Hex;

    // remove the "0x" prefix and convert hex to bytes
    let bytes = new Uint8Array(response.slice(2).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // decode the CBOR data
    let data = cbor.decode(bytes);

    // let decodedData = new TextDecoder().decode(data);
    console.log("Decoded data", data);

    // const bytesPieceCidHex = data[0].value;

    // let cid = CID.decode(data[0].value);
    // Assume bytes is a Uint8Array containing the CID data
    // let cidBytes = new Uint8Array(data[0].value.slice(2).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // const Uint8Arraycid: Uint8Array = data[0].value;
    // const hexString = Buffer.from(Uint8Arraycid).toString('hex');

    // let cid = new CID(hexString);
    // let cidString = cid.toString();

    // console.log("pieceid data:", cidString);

    // let bytesPieceCid = new Uint8Array(bytesPieceCidHex.slice(2).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    // const pieceCidString = cbor.decode(bytesPieceCid);

    // console.log("pieceid:", pieceCidString);
    // cast the decoded data to a DealProposal
    let proposal: DealProposal = {
        piece_cid: data[0] as string,
        piece_size: data[1] as number,
        verified_deal: data[2] as boolean,
        client: data[3] as string,
        provider: data[4] as string,
        label: data[5] as string,
        start_epoch: data[6] as number,
        end_epoch: data[7] as number,
        storage_price_per_epoch: data[8] as number,
        provider_collateral: data[9] as number,
        client_collateral: data[10] as number,
    } as DealProposal;

    console.log("deal proposal", proposal);


    return {proposal};
}


const convertToUtf8 = (obj) => {
    let buffer = Buffer.from(obj.value.data);

    return buffer.toString('utf-8');
}