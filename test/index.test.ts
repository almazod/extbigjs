import { test, assert } from 'vitest';
import { big } from '../src';

test('simple', () => {
	assert.equal(big(1).toString(), '1');
});
