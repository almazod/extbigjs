import { default as BigOriginal } from 'big.js';

BigOriginal.DP = 32;
BigOriginal.RM = BigOriginal.roundDown;
BigOriginal.strict = false;

type BigSource = string | number | bigint | BigOriginal;

interface BigExtendedInstance extends BigOriginal {
	plus(value: BigSource): BigExtendedInstance;
	minus(value: BigSource): BigExtendedInstance;
	times(value: BigSource): BigExtendedInstance;
	div(value: BigSource): BigExtendedInstance;
	mod(value: BigSource): BigExtendedInstance;
	pow(exponent: number): BigExtendedInstance;
	abs(): BigExtendedInstance;

	eq(value: BigSource): boolean;
	gt(value: BigSource): boolean;
	gte(value: BigSource): boolean;
	lt(value: BigSource): boolean;
	lte(value: BigSource): boolean;
	cmp(value: BigSource): BigOriginal.Comparison;

	min(value: BigSource): BigExtendedInstance;
	max(value: BigSource): BigExtendedInstance;
}

interface BigFactory {
	(value: BigSource): BigExtendedInstance;
	new (value: BigSource): BigExtendedInstance;

	DP: number;
	RM: number;
	NE: number;
	PE: number;
	strict: boolean;

	readonly roundDown: 0;
	readonly roundHalfUp: 1;
	readonly roundHalfEven: 2;
	readonly roundUp: 3;

	min: (...values: BigSource[]) => BigExtendedInstance;
	max: (...values: BigSource[]) => BigExtendedInstance;
}

const big = ((value: BigSource) => {
	const val = typeof value === 'bigint' ? value.toString() : value;

	return new BigOriginal(val) as BigExtendedInstance;
}) as BigFactory;

Object.assign(big, BigOriginal);
big.min = (...values: BigSource[]) => {
	if (values.length === 0) throw new Error('big.min requires at least one argument');
	return values.reduce((min, val) => {
		const b = big(val);
		return b.lt(min) ? b : min;
	}, big(values[0])) as BigExtendedInstance;
};
big.max = (...values: BigSource[]) => {
	if (values.length === 0) throw new Error('big.max requires at least one argument');
	return values.reduce((max, val) => {
		const b = big(val);
		return b.gt(max) ? b : max;
	}, big(values[0])) as BigExtendedInstance;
};

export { big };
export { type BigSource, type BigExtendedInstance as Big, type BigFactory };
