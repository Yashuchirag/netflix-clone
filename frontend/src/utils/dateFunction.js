const formatReleaseDate = (date) => {
    const releaseDate = new Date(date);
    return releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default formatReleaseDate;
