import React, { useState } from "react";
import axios from "axios";
import { PathAction } from "../pages/api/route";

interface Props {
    apiKey: string;
    style?: React.CSSProperties;
}

function LighthouseUpload({ apiKey }: Props) {
    const [uploadState, setUploadState] = useState<string>("");
    const [pendingUpload, setPendingUpload] = useState<boolean>(false);

    const generateCAR = async (file: File, apiKey: string) => {
        // Push file to lighthouse node
        // Both file and folder are supported by upload function
        try {
            // Set up FormData to hold the file
            const formData = new FormData();
            formData.append('file', file);
            formData.append('apiKey', process.env.LIGHTHOUSE_API_KEY_DEPOT ?? "");
            
            // Send a POST request to the endpoint
            setPendingUpload(true);
            const response = await axios.post(PathAction.GENERATE_CAR, formData);
            setPendingUpload(false);
            
            // Handle the response
            if (response.status == 200 ) {
                setUploadState("Upload successful");
            } else {
                setUploadState("Upload failed");
            }

        } catch (error) {
            console.log('LighthouseUpload Component Error:', error);
            setUploadState("Upload failed");
            setPendingUpload(false);
        }
    }

    return (
        <div className="App">
            <input onChange={e => {
                console.log("Files", e.target.files);
                const file = e.target.files?.[0];
                if (file) {
                  generateCAR(file, apiKey);
                }
            }} type="file" />
            {pendingUpload && <p>Uploading...</p>}
            {uploadState && <p>{uploadState}</p>}
        </div>
    );
}

export default LighthouseUpload;