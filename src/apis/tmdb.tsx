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
        //catch 블록에서 오류를 console.error로만 출력하고, null을 반환
        //이 방식은 호출한 쪽에서 실제로 발생한 오류를 인지하지 못할 수 있음
        console.error('Error fetching release date:', error);
        // return null;
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있게 함
    }
};
