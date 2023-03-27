export const formatDate = (date) => {
	const dateClear = date.slice(0, 10);

	const dateNow = new Date().getTime();

	const datePublication = new Date(dateClear).getTime();

	const day = 24 * 60 * 60 * 1000;

	const diff = Math.abs(dateNow - datePublication);

	const daysAgo = Math.round(diff/day);	

	return `${daysAgo} days ago`;
}