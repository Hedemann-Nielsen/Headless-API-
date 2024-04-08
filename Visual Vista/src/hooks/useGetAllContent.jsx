import { useEffect, useState } from "react";
import { client }  from "../static/contentfulClient";

export function useGetAllContent() {
    const [data, setData] = useState();

useEffect(() => {
    client
        .getEntries()
        .then((res) => setData(res))
        .catch((err) => console.log(err));
}, []);

    return { data };

}