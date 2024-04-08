import { useEffect, useState } from "react";

export function useGetGallery(client) {
    const [data, setData] = useState();

useEffect(() => {
    client
        .getEntries({ content_type: "gallery" })
        .then((res) => setData(res))
        .catch((err) => console.log(err));
}, []);

    return {data};

}