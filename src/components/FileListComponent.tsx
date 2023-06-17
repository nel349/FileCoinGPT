import axios from 'axios';
import React from 'react';

interface File {
  fileName: string;
  id: string;
  downloadLink: string;
}

interface Props {
  apiKey: string;
}

export const FileList: React.FC<Props> = ({ apiKey }) => {

    const [files, setFiles] = React.useState<File[]>([]);

    React.useEffect(() => {
        let isMounted = true;
        (async () => {
          try {
            const response = await axios.post(`http://localhost:3333/api/viewFiles`, { apiKey });
            if (isMounted) {
              setFiles(response.data.files);
            }
          } catch (error) {
            console.error(error);
          }
        })();
        return () => {
          isMounted = false;
        };
      }, [apiKey]);

  return (
    <div>
      {files.map((file) => (
        <div key={file.id}>
          <p>File Name: {file.fileName}</p>
          <p>ID: {file.id}</p>
          <p>Download Link: <a href={file.downloadLink}>{file.downloadLink}</a></p>
        </div>
      ))}
    </div>
  );
};

export default FileList;