import { createEffect, createSignal } from "solid-js";
import Mods from "../data/mods";
import Counter from "./counter";
import createModDownloads from "../hooks/createModDownloads";

const Downloads = () => {
	const now = Date.now();
	const localStorageDownloads = parseInt(localStorage.getItem("downloads"));
	const [count, setCount] = createSignal(
		localStorage.getItem("time") > now && localStorageDownloads
			? localStorageDownloads
			: 0
	);
	const [modsCounted, setModsCounted] = createSignal(0);
	const countingDone = () => modsCounted() === Mods.length;

	if (count() === 0) {
		console.log("getting mods download counts");
		Mods.forEach(async (mod) => {
			const { modrinthDownloads, curseforgeDownloads } = await createModDownloads(
				mod.modrinth,
				mod.curseforge
			);

			setModsCounted((prev) => prev + 1);
			setCount((prev) => prev + modrinthDownloads + curseforgeDownloads);
		});
	} else {
		console.log("using local storage count");
		setModsCounted(Mods.length);
	}

	createEffect(() => {
		if (countingDone()) {
			localStorage.setItem("downloads", count());
			localStorage.setItem("time", now + 300000);
			console.log(count().toLocaleString("en-GB"));
		}
	});

	return (
		<>
			<Counter
				counter={{
					startValue: 1000000, // start at 1 million to make sure the text doesn't change.
					finalValue: count, // total downloads counted separately. currently at ~3.0 million.
					canStart: countingDone, // true when all mods downloads have been added to the `count`.
					duration: 750, // how many milliseconds I want the counter to take.
				}}
				when={countingDone}
				fallback="calculating"
				valueCallback={(f) =>
					(Math.floor(f / 10000) * 10000).toLocaleString("en-GB", {
						notation: "compact",
						compactDisplay: "long",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				}
			/>
		</>
	);
};

export default Downloads;
