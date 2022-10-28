/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"upload.wikimedia.org",
			"www.paisesbajosytu.nl",
			"flagcdn.com",
			"img2.freepng.es",
			"cdn.pixabay.com",
			"www.guiadealemania.com",
			"www.pnguniverse.com",
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
