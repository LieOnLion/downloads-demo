import Downloads from "./components/downloads";

const App = () => {
	return (
		<div className="flex justify-center items-center w-svw h-svh gap-3 bg-slate-900 text-slate-300 whitespace-normal">
			<div className="w-112 text-justify">
				I'm a solo Mod Developer for the game Minecraft. My mods have generated over
				<span className="inline-block italic font-bold mx-8 transform transition duration-250 hover:scale-110">
					<Downloads />
				</span>
				downloads across a number of platforms.
			</div>
		</div>
	);
};

export default App;
