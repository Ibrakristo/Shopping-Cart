import { useGetFeaturedQuery } from "../apiSlice";
import Item from "./Item";
import Box from '@mui/material/Box'
import Spinner from "./Spinner";


export default function Featured() {
    const {
        data: featuredItems,
        isLoading,
        isError,
        error
    } = useGetFeaturedQuery();
    if (isLoading) {
        return <Spinner />
    }
    if (isError)
        return <div>{error.message}</div>
    if (!featuredItems) return (
        <div>Not Found ...</div>
    )
    return (

        <Box display={"grid"} gridTemplateColumns={"repeat(auto-fill,minmax(300px,1fr))"} rowGap={5} columnGap={8}>{featuredItems.map(item => {
            return (

                <Item key={item._id} item={item} />
            )
        })}</Box>
    )

}