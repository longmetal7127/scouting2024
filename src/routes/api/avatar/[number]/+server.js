import { error, json } from '@sveltejs/kit';

export const GET = async (request) => {
	const session = await request.locals.auth();
	if (!session) {
		return error(401, 'Unauthorized');
	}
	const teamNumber = request.params.number;
	const response = await fetch(
		`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}/media/2024`,
		{
			headers: {
				'X-TBA-Auth-Key': 'mdeudiGgHAr9kKjE8M0sxhK1tfQwuJ0KDCnMlwf24msgKoCc1A1JtXueTLH1s43L'
			}
		}
	);
	const data = await response.json();
	let avatarUrl =
		'iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQtSURBVHgBxZnPSxtBFMdftjFG22qkP0CNklxVqD2JXhoPgscWRK+t4Fmjf4DmD9DqWbT2qAi9Kh7Ui15TEK9JUdRDW4Narakmfd9xJsS42cyEJX5h2c3uzO5n3sx7M/PioTJ1fHwcyWaznXz5jg+cA/KAUvws6fF4knz+blnWVmNj4xaVIY9J4UQiEfD7/aP80bE8GF0BdothYwyb1K2kBQiw6urqSb4cIxfEoEu6oCUBT05ORjOZzBSZW6yUkvzeWDAYXHIq5Ah4dHT0mVyymoNmm5qaosUe2gLKLv3GlxGqgLjL4+l0ujccDqcKn1l2FXw+3yZVCA5ib++UBnmgB4DoVlSgyisih9Q93etijm0f2dxf6HEV5TE5q37kABkuxHDo2hA9rlLX19dhNR69eQ8Q50JkKM/ZGdUuL1PV/j49OTgQ9zJ1dfS3v5/S3d1029JChlIxV3i2sKC0XsLkLYB5Pj1NNSsr4jdAFIx3b48sBoeuhobofHzcGJSt2AArKgtOmlT27exQw/CwuD6fmKCrwcEHAGjAM24ArIvyZ7GYsKr2N3w+xN8pYUH2HlgvpFPRv7Ym4NCNPzc2SloGoC8GBsT51+oqpXt6SFMpdpYGC6sSXTh8pG5yUsChC2tl9zoJDUBDbjo6RMPUONVQAGwWz4cR3RoYc/gAPoiuRRfiXimhQb8XFu7eMTNDusJyzuKg/EanMMDgEJc86GGVCwY0gUSdPyMjVMNj0iMdSAMwgpkkpFMYAx26YI9UMoWEM0FwHB3BeF5dQP/6uuiqQqcAJKQAz+VvO6lQ5OWYqakAALXWeXAKDHQ7mUJ6DRzFSy7JBNJEAMScV9KKN8EgVe/uOpbRgcQsYxIL9QHb20Xcgzc7BWcnSNTFUDGYUZLw4rhOScypUI1GcC7m3eoaiwgdcZj5AQtu8/G+VGF48CWHiafz87Zzrx1kPhTq5sdRTcU9cgO+qVMaXfSyr49uW1vFvJpl6FJSVkQDs/X1op4uIMfBXkvu+FM6FfDi08VFquKB/opBdeZVWFvN3VjRGFgvCTaxJ2ELzunWggcCEnrd1UWBaNQWVK0XYXEIljNZbiELgbNYbslt5ikZKLfek04DK6lAjmcKGmPuoowFK3dvGJmH3J7k8PBwltMRo2QogGCexlSoVtGA+dfWJuB0xmmhkBppbm7+JEDVTWlFLFzdTnGYClmxXpW3ye2L5S4qRo8s5Gvyk0r3Nu7Yj3IBbYdxW/h2YTLJNjfDe5SKpj4g5Gd43L0tvG+bm+Et3wfSnAJd0haSR3YPHNNv5Xq2iWS3Fk3xWU6VUZE9Cu6eJPcFp4w6wUGOgBB71BLcni+/kkuC1ZB/yU8SFZNREl2mSKboLrMfIjMh8z/HY23WLlFJbgDmC6sg7KnltjUkj9zfEPKAo21zmXi5f0P8B8KnFih87X2pAAAAAElFTkSuQmCC';
	for (const media of data) {
		if (media.type === 'avatar') {
			avatarUrl = media.details.base64Image;
		}
	}
	var buf = Buffer.from(avatarUrl, 'base64');

	return new Response(buf, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
