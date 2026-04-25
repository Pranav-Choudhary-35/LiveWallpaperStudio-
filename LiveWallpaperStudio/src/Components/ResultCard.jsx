/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../Redux/features/CollectionSlice'
import { useRef, useEffect, useState } from 'react'

const ResultCard = ({ item }) => {

    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const videoRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsLoaded(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        const targetElement = imageRef.current || videoRef.current
        if (targetElement) {
            observer.observe(targetElement)
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement)
            }
        }
    }, [])

    const addToCollection = (item) => {
        dispatch(addCollection(item))
        dispatch(addedToast())

    }

    return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
            <a target='_blank' className='h-full' href={item.url}>
                {item.type == 'photo' ? (
                    <img
                        ref={imageRef}
                        className='h-full w-full object-cover object-center'
                        src={isLoaded ? item.src : item.thumbnail}
                        alt={item.title}
                        loading='lazy'
                    />
                ) : ''}
                {item.type == 'video' ? (
                    <video
                        ref={videoRef}
                        className='h-full w-full object-cover object-center'
                        autoPlay
                        loop
                        muted
                        src={isLoaded ? item.src : undefined}
                        poster={item.thumbnail}
                    ></video>
                ) : ''}
                {item.type == 'gif' ? (
                    <img
                        ref={imageRef}
                        className='h-full w-full object-cover object-center'
                        src={isLoaded ? item.src : item.thumbnail}
                        alt={item.title}
                        loading='lazy'
                    />
                ) : ''}
            </a>
            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white'>
                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>
                <button
                    onClick={() => {
                        addToCollection(item)
                    }}
                    className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default ResultCard