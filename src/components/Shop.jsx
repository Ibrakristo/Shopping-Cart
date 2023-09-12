import { useGetBestSellersQuery } from "../apiSlice";
import Item from "./Item"
import Box from '@mui/material/Box'
import Spinner from "./Spinner";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { useOutletContext } from "react-router-dom";

export default function Shop() {
    const [fetching, setFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    let {
        data: games,
        isLoading,
        isError,
        error
    } = useGetBestSellersQuery()

    useEffect(() => {
        setItems(games);
    }, [games])
    const fetchData = useCallback(async () => {
        if (fetching) {
            return;
        }
        setFetching(true);
        try {
            const ids = items.map((item) => (item.id || item._id))
            let data = await fetch("http://localhost:3000/search/loadingcontent", {
                mode: "cors",
                method: "post",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(ids)
            })
            data = await data.json();
            if (data.length === 0) {
                setHasMore(false);
            }
            setItems([...items, ...data]);
        } catch (ex) {

        }
        finally {
            setFetching(false)
        }
    }, [items, fetching]);

    if (isLoading) {
        return (<Spinner />)
    }
    if (isError) {
        return (<div>{error.message}</div>)
    }
    if (!items) return (
        <div>Not Found ...</div>
    )
    return (
        <InfiniteScroll
            loadMore={fetchData}
            hasMore={hasMore}
            loader={<Spinner />}
            useWindow={true}

        >
            <Box display={"grid"} gridTemplateColumns={"repeat(auto-fill,minmax(300px,1fr))"} rowGap={5} columnGap={8}>

                {items.map((item) => {
                    return <Item key={item._id || item.id} item={item} />
                })}
            </Box >
        </InfiniteScroll>

    )
}