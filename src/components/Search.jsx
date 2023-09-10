import { useSearchParams } from "react-router-dom";
import { useGetSearchedItemsQuery } from "../apiSlice";
import Item from "./Item";

export default function Search() {
    let [searchParams, setSearchParams] = useSearchParams();
    let name = searchParams.get("name")
    let { data: items,
        isLoading,
        isError,
        error } = useGetSearchedItemsQuery(name);

    if (isLoading) {
        return (
            <div>Loading...</div>
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
        <>
            {items.map((item, index) => (
                <Item key={item._id} item={item} />
            ))}
        </>
    )


}