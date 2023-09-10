import { useParams } from "react-router-dom";
import { useGetItemQuery } from "../apiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { itemAdded } from "../cartSlice";


export default function Details() {
    let [media, setMedia] = useState(true)
    let [indexOfScreenShots, setIndexOfScreenShots] = useState(0);
    let [indexOfMovies, setIndexOfMovies] = useState(0);
    let params = useParams();
    let dispatch = useDispatch();
    let id = params.id;
    let {
        data: item,
        isLoading,
        isError,
        error
    } = useGetItemQuery(id);

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

    return (
        <>
            <div>{item.name}</div>
            <div>
                <div>
                    <div>
                        <div><span onClick={() => {
                            setMedia(true)
                        }}>ScreenShots</span> <span onClick={() => {
                            setMedia(false);
                        }}>Movies</span></div>
                    </div>
                    <div>{media ? (item.screenshots ? <img src={item.screenshots[indexOfScreenShots]} alt="screenshot" /> : "") : item.movies ? <video autoPlay controls muted src={item.movies[indexOfMovies]}> </video> : ""}
                        <div>{media ? item.screenshots.map((screenshot, index) => (<li key={index} onClick={(e) => { setIndexOfScreenShots(index) }}><img width="50px" height="50px" src={screenshot} alt={`screenshot_${index}`} /></li>)) :
                            item.movies.map((movie, index) => (<li key={index} onClick={(e) => { setIndexOfMovies(index) }}><video muted width="50px" height="50px" src={movie} alt={`movie_${index}`} /></li>))}</div>
                    </div>
                </div>
                <div>
                    <div>{item.genres.map(genre => (
                        <li key={genre}>{genre}</li>
                    ))}</div>
                    <div>{item.desc}</div>
                    {item.score ? <div>Score : {item.score}</div> : ""}
                    <div>Developers : {item.developers.map(developer => (<li key={developer}>{developer}</li>))}</div>
                    {item.publishers ? <div>Publishers : {item.publishers.map(pub => (<li key={pub}>{pub}</li>))}</div> : ""}
                    {item.releaseDate ? item.releaseDate.coming_soon === false ? <div>release Date : {(new Date(item.releaseDate.date)).toDateString()}</div> : <div>Coming soon</div> : ""}
                    <div>Price : {"$" + item.original_price / 100}</div>
                    <button>Add to Cart</button>
                </div>
            </div>
            <div>
                {item.dlc ? item.dlc.map((dlc) => (<div key={dlc.id || dlc._id} data-key={dlc.id || dlc._id}>
                    <img src={dlc.header_image} alt={`img for ${dlc.name}`} />
                    <div>{dlc.name}</div>
                    <div>{"$" + dlc.original_price / 100}</div>
                    <button onClick={() => {
                        dispatch(itemAdded({ name: dlc.name, img: dlc.header_image, price: dlc.original_price, id: dlc.id || dlc._id }))
                    }}>Add to Cart</button>
                </div>)) : ""}
            </div>
        </>
    )
}
