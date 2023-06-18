

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

This is an example of our result:
{
	"address": "0x9584DD0D9bA9d81103020281B77EA23cAaC4e3A4",
	"url": "https://app.ens.domains/nick.eth",
	"urlContents": "The contents of the url",
	"summary": "This is the address of ensName"
}

This is an interpretation of our result: 
- The ENS name resolves to the contract "0x9584DD0D9bA9d81103020281B77EA23cAaC4e3A4"
- URL to ENS details: https://app.ens.domains/nick.eth

## show upload detials
1. Question: get recent upload details from address "0xc44E801873978EC0836A40C5BA9e5aC4204591f8"

  ````
{
	"address": "0xc44E801873978EC0836A40C5BA9e5aC4204591f8"
  "pathFunction": "/api/getUploads"
}
  ````

## Upload a CAR file to the Lighthouse data depot.
Data prep for deal making made easy.
Upload files, generate CAR and get CAR links - all in one place
Let user know that upload can be done throught the UI interface that will be shown if the action is supported.
1. Request: I would like to upload a file to the data depot.
Question: Can you help me uploading a Car file?

  ````
{
  "pathFunction": "/api/uploadFile"
}
  ````
## Making a deal proposal example.
Present a form data for user to make a deal proposal over the FileCoin network.
1. Request: I would like to make a deal proposal.
Question: Can you help me send a deal proposal?

  ````
{
  "pathFunction": "/api/makeDealProposal"
}
  ````
