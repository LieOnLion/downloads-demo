import { createEffect, createSignal } from "solid-js";

const createCounter = ({
	startValue = 0,
	finalValue = () => 10,
	canStart = () => true,
	duration = 500,
	flipped = false,
}) => {
	const [countValue, setCountValue] = createSignal(startValue);

	const differnce = () => finalValue() - startValue; // finds the difference needed to be added.
	// Not accurate without the `* 15`
	const increaseAmount = () => (differnce() / duration) * 15; // how much needs to be added to the counter value for it to reach the final value in the set amount of time.

	createEffect(() => {
		if (canStart()) {
			let counter = setInterval(() => {
				// starts the interval.
				setCountValue((prev) => prev + increaseAmount()); // increases the couter value.

				if (
					(!flipped && countValue() >= finalValue()) ||
					(flipped && countValue() <= finalValue())
				) {
					// if counter value is the same or greater to the final value.
					clearInterval(counter); // stop the interval.
					setCountValue(finalValue()); // making sure the counter value is exactly the same as the final value (due to errors in calculations).
				}
			}, 1);
		}
	});

	return countValue; // returns counter value ranging from the starting value and the final value.
};

export default createCounter;
