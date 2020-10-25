import React, {useContext, useState} from 'react';
import to from "await-to-js";
import * as axios from "axios";

const UploadManagerContext = React.createContext({
    upload: () => {},
    loading: false,
    response: {},
    image: './images/default.png',
});

export const useUpload = () => useContext(UploadManagerContext);

export const UploadManager = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});

    const upload = (acceptedFiles) => {
        setLoading(true);

        (async () => {
            let data = new FormData();
            data.append('file', acceptedFiles[0]);

            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const [error, response] = await to(axios.post('https://hahaton.ngrok.io/upload', data, options));
            setLoading(false);

            if (error) {
                return;
            }

            setResponse(response.data);
        })();
    };

    return (
        <UploadManagerContext.Provider
            value={{
                upload,
                loading,
                response,
                image: response?.win ? `https://hahaton.ngrok.io/image.jpg?data=${response.without}` : './images/default.png',
            }}
        >
            {children}
        </UploadManagerContext.Provider>
    )
}
