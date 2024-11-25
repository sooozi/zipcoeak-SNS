export const fetchReleaseDate = async (movieId: number) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const movieUrl = process.env.REACT_APP_TMDB_BASE_URL;
    const url = `${movieUrl}/${movieId}/release_dates?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch release dates');
        }
        const data = await response.json();
        const releaseDates = data.results;
        const koreanRelease = releaseDates.find(
            (release: { iso_3166_1: string }) => release.iso_3166_1 === 'KR',
        );
        return koreanRelease?.release_dates[0].release_date || null;
    } catch (error) {
        console.error('Error fetching release date:', error);
        return null;
    }
};
