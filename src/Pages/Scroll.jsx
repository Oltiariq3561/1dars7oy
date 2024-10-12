import React, { useEffect, useState, useRef } from 'react';

const App = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const loaderRef = useRef(null);

    const fetchPhotos = () => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                setPhotos(prevPhotos => [...prevPhotos, ...data]);
            })
            .catch(error => {
                console.error("Rasmlarni yuklashda xato:", error);
            });
    };

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rasmlar</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map(photo => (
                    <div className="border h-96 border-gray-200 rounded-lg p-2" key={photo.id}>
                        <img className="w-full h-auto rounded-md" src={photo.thumbnailUrl} alt={photo.title} />
                        <p className="mt-2 text-sm text-gray-700">{photo.title}</p>
                    </div>
                ))}
            </div>
            <div ref={loaderRef} className="mt-4 h-1" />
        </div>
    );
};

export default App;
