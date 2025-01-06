import Headers from "../data/headers";

const createModDownloads = async (modrinth, curseforge) => {
	const modrinthDownloads = modrinth
		? await fetch(`https://api.modrinth.com/v2/project/${modrinth}`, {
				method: "GET",
				headers: Headers.modrinth,
		  })
				.then((res) => res.json())
				.then((data) => data.downloads)
				.catch(() => 0)
		: 0;
	const curseforgeDownloads = curseforge
		? await fetch(`https://api.curseforge.com/v1/mods/${curseforge}`, {
				method: "GET",
				headers: Headers.curseforge,
		  })
				.then((res) => res.json())
				.then((data) => data.data.downloadCount)
				.catch(() => 0)
		: 0;

	return { modrinthDownloads, curseforgeDownloads };
};

export default createModDownloads;
