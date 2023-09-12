import { useSearchParams } from "react-router-dom";
import { useGetSearchedItemsQuery } from "../apiSlice";
import Item from "./Item";
import Box from '@mui/material/Box'
import Spinner from "./Spinner";
export default function Search() {
    let [searchParams, setSearchParams] = useSearchParams();
    let name = searchParams.get("name")
    let { data: items,
        isLoading,
        isError,
        error } = useGetSearchedItemsQuery(name);

    if (isLoading) {
        return (
            <Spinner />
        )
    }
    if (isError) {
        return (
            <div>{error.message}</div>
        )
    }
    if (!items) return (
        <div>Not Found ...</div>
    )
    return (
        <Box display={"grid"} gridTemplateColumns={"repeat(auto-fill,minmax(300px,1fr))"} rowGap={5} columnGap={8}>
            {
                items.map((item, index) => (
                    <Item key={item._id} item={item} />
                ))
            }
        </Box >
    )


}