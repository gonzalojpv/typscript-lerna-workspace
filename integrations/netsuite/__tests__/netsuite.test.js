'use strict';

const netsuite = require('..');
const assert = require('assert').strict;

assert.strictEqual(netsuite(), 'Hello from netsuite');
console.info('netsuite tests passed');
