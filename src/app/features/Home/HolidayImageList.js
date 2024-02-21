import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { get } from "../../services/Service";
import { Holiday_Package, IMAGE_BASE } from "../../services/Url";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "react-loading-skeleton";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export default function HolidayImageList() {
    const [cols, setCols] = useState(1); // Initial number of columns
    const [imageNo, setImageNo] = useState(1);
    const [height, setHeight] = useState(180);
    const [holidayData, setHolidayData] = useState([]);
    useEffect(() => {
        get(Holiday_Package, setHolidayData);
    }, []);

    useEffect(() => {
        function handleResize() {
            // Update the number of columns based on the screen width
            if (window.innerWidth >= 1280) {
                setCols(5); // screens wider than or equal to 1280px
                setImageNo(5);
                setHeight(180);
            }
            else if (window.innerWidth >= 991) {
                setCols(4); // screens wider than or equal to 1280px
                setImageNo(8);
            } else if (window.innerWidth >= 767) {
                setCols(3); //screens between 960px and 1280px
                setImageNo(6);
            } else if (window.innerWidth >= 481) {
                setCols(2);
                setImageNo(4);
                setHeight(150);
            } else {
                setCols(1); // screens smaller than 600px
                setImageNo(4);
                setHeight(100);
            }
        }
        handleResize();

        //  update cols on screen size changes
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    return (
        <Box className="holiday-list">
            {holidayData.length > 0 ?
                <ImageList variant="masonry" cols={cols} gap={10}>
                    {
                        holidayData?.slice(0, imageNo).map((item) => (
                            <ImageListItem key={item._id}>
                                <LazyLoadImage
                                    alt="img"
                                    effect="blur"
                                    src={`${ImageBase}coverimage/${item.cover_image}?w=248&fit=crop&auto=format`}
                                />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.stayDuration}
                                />
                            </ImageListItem>
                        ))}
                </ImageList> :
                <ImageList variant="masonry" cols={cols} gap={10}>
                    {arr.slice(0, imageNo).map((item, i) => {
                        return <ImageListItem key={i}>
                            <Skeleton count={1} height={height}/>
                        </ImageListItem>
                    })}
                </ImageList>}
        </Box>
    );
}
