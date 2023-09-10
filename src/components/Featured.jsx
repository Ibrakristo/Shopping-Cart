import { useGetFeaturedQuery } from "../apiSlice";
import Item from "./Item";



export default function Featured() {
    const {
        data: featuredItems,
        isLoading,
        isError,
        error
    } = useGetFeaturedQuery();
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError)
        return <div>{error.message}</div>
    if (!featuredItems) return (
        <div>Not Found ...</div>
    )
    return (
        <div>{featuredItems.map(item => {
            return (
                <Item key={item._id} item={item} />
            )
        })}</div>
    )

}