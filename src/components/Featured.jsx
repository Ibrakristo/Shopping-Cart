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
    if (isError) {
        return (
            <div style={{ margin: "auto", width: "fit-content", marginTop: "50px" }}>Sorry we Encountred A {error.status} of Status {error.originalStatus} with Content of "{error.data}"</div>
        )
    }
    return (

        <Box display={"grid"} gridTemplateColumns={"repeat(auto-fill,minmax(300px,1fr))"} rowGap={5} columnGap={8}>{featuredItems.map(item => {
            return (

                <Item key={item._id} item={item} />
            )
        })}</Box>
    )

}