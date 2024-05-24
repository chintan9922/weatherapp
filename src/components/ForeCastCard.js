import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./ForeCastCard.css";
import { Spin } from "antd";

const ForeCast = ({ data }) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [loadedItems, setLoadedItems] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (data && data.list) {
            setVisibleItems(data.list.slice(0, loadedItems));
            const container = containerRef.current;
            container.addEventListener("scroll", handleScroll);
            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [data, loadedItems]);

    const fetchMoreData = () => {
        setIsLoading(true);
        const endIndex = Math.min(loadedItems + 6, data.list.length);
        // console.log(endIndex, 'endindex');
        setTimeout(() => {
            setVisibleItems(data.list.slice(0, endIndex));
            setLoadedItems(endIndex);
            setIsLoading(false);
        }, 1500);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        // console.log(container);
        if (
            container.scrollLeft + container.clientWidth >=
                container.scrollWidth &&
            !isLoading
        ) {
            fetchMoreData();
        }

        if (container.scrollLeft === 0) {
            setLoadedItems(6);
            setVisibleItems(data.list.slice(0, 6));
        }
    };

    return (
        <div ref={containerRef} className="card">
            <>
                {visibleItems.map((item, idx) => (
                    <div className="card-content" key={idx}>
                        <Card data={item} />
                    </div>
                ))}
            </>
            {isLoading && visibleItems.length < data.list.length && (
                <div className="loading">
                    <Spin
                        tip="Loading..."
                        size="large"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ForeCast;
