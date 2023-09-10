import { useGetBestSellersQuery } from "../apiSlice";
import Item from "./Item"
export default function Shop() {
    let {
        data: items,
        isLoading,
        isError,
        error
    } = useGetBestSellersQuery()

    if (isLoading) {
        return (<div>Loading...</div >)
    }
    if (isError) {
        return (<div>{error.message}</div>)
    }
    if (!items) return (
        <div>Not Found ...</div>
    )
    return (
        items.map((item) => {
            return <Item key={item._id} item={item} />
        })
    )
}