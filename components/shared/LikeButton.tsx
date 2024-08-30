"use client"
import Image from 'next/image';
import React, { useState } from 'react'

export const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(prevLiked => !prevLiked);
    };
            
    return (
        <div
            className="absolute right-2 top-2 rounded-xl bg-white/30 p-3 backdrop-blur-lg transition-all"
            onClick={toggleLike}
            style={{ cursor: 'pointer' }}
            >
            <Image
                src={liked ? "/assets/icons/heart_filled.svg" : "/assets/icons/heart_outline.svg"}
                alt="like button"
                width={20}
                height={20}
            />
        </div>
    )
}