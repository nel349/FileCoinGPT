import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

interface File {
  fileName: string;
  id: string;
  downloadLink: string;
}

interface Props {
  apiKey: string;
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e5e5;
`;

const FileName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const Id = styled.p`
  font-size: 14px;
  margin: 0;
`;

const DownloadLink = styled.a`
  font-size: 14px;
  margin: 0;
`;

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
    <List>
      {files.map((file) => (
        <ListItem key={file.id}>
          <div>
            <FileName>{file.fileName}</FileName>
            <Id>ID: {file.id}</Id>
          </div>
          <DownloadLink href={file.downloadLink}>Download</DownloadLink>
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;