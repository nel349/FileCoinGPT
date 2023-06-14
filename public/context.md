

## Resolving Names

The ENS namespace includes both .eth names (which are native to ENS) and DNS names imported into ENS. Because the DNS suffix namespace expands over time, a hardcoded list of name suffixes for recognizing ENS names will regularly be out of date, leading to your application not recognizing all valid ENS names. To remain future-proof, a correct integration of ENS treats any dot-separated name as a potential ENS name and will attempt a look-up.

These are the properties to be extracted from a question.

    ensName:
      type: string
      description: The ENS name we are trying to resolve.
    action:
      type: string
      description: Action to be performed on ensName resolve. (e.g. resolve ENS name)
      path: /api/ensResolver
      required: true
    pathFunction:
      type: string
      description: Path to the function to be called from our action. Associated with the action property.
      required: true

pathFunction should be equal to "/api/ensResolver" for resolving ENS names.

## Extracting ENS Names Examples:

1. Question: What is the contract address for yessi.eth?
The extracted JSON format should be
  ````
{
	"ensName": "yessi.eth",
	"pathFunction": "/api/ensResolver"
}
  ````

2. Question: Which address does yessi.eth belong to?

  ````
{
	"ensName": "yessi.eth",
	"pathFunction": "/api/ensResolver"
}
  ````

## ENS Responses

address - The EOA address linked to the ENS name
url - The url linking to the ENS domains address
urlContents - Contents inside the 'url'. This could be HTML, JSON, or any text.
summary - short summary of the ENS name.

This is an example of a JSON response:
{
	"address": "0x9584DD0D9bA9d81103020281B77EA23cAaC4e3A4",
	"url": "https://app.ens.domains/nick.eth",
	"urlContents": "The contents of the url",
	"summary": "This is the address of ensName"
}

Description: 
- The ENS name resolves to the contract "0x9584DD0D9bA9d81103020281B77EA23cAaC4e3A4".
- URL to ENS details: https://app.ens.domains/nick.eth
- Content of nick.eth



