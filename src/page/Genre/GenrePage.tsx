interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: number;
    rating: number;
    releaseDate: string | null;
}

export default function GenrePage() {
    return (
        <div className="max-w-7xl mx-auto p-8 mt-16 min-h-screen">
            <h2>Movies of Genre</h2>
        </div>
    );
}
