import React from 'react'
import useCustomCursor from '../hooks/useCustomCursor';

const CostumeCusor = () => {
    const { cursor1, cursor2, isOverLink } = useCustomCursor();

    return (
        <>
            <div
                className={`cursor cursor_1 ${isOverLink ? "overLink" : ""}`}
                style={{ left: `${cursor1.x}px`, top: `${cursor1.y}px` }}
            />
            <div
                className={`cursor cursor_2 ${isOverLink ? "overLink" : ""}`}
                style={{ left: `${cursor2.x}px`, top: `${cursor2.y}px` }}
            />
        </>

    )
}

export default CostumeCusor