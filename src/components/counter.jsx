import { Show } from "solid-js";
import createCounter from "../hooks/createCounter";

const Counter = ({
	counter,
	when,
	fallback,
	valueCallback = (f) => Math.floor(f),
	className,
}) => {
	const displayCounter = createCounter(counter); // returns a value between the start value and the final value.

	return (
		<Show when={when()} fallback={fallback} className={className}>
			{valueCallback(displayCounter())}
		</Show>
	);
};

export default Counter;
