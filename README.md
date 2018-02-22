# Factoradic

[semantic version](https://semver.org/) [1.1.0](CHANGELOG.md#110-from-100)

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) [license](LICENSE)

## Table of Contents

- [Overview](#Overview)
- [`ptoa`](#ptoa)
- [`pton`](#pton)
- [`atop`](#atop)
- [`aton`](#aton)
- [`ntop`](#ntop)
- [`ntoa`](#ntoa)
- [`test`](#test)
- [Notes](#notes)

## Overview

This ES5-compatible Node.js module/package exports functions (and a test) providing transformations between three equivalent permutation representations:

- p: Permutation of builtin ints incrementing from 0 (uints), like `[2, 0, 1]`
- a: mixed-radix (factorial number system) builtins Array (`[1, 1]` (base 2, 3))
- n: uint permutation Number (builtin or bigint) (`742` (in base 10))

`p`'s have a minimum length of 2. `a`'s have a minimum length of 1.

The four functions that involve Numbers ([`pton`](#pton), [`atop`](#atop), [`aton`](#aton), and [`ntop`](#ntop)) accept optional functions necessary to use bigint objects of the user's choice. Note that JavaScript uints lose precision when greater than `Math.pow(2, 53)` (`9007199254740992`, or [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)` + 1`), which is between `18! (7387354275840000)` and `19!`.

The two functions that return a permutation ([`atop`](#atop) and [`ntop`](#ntop)) can alternatively permute (Fisher-Yates-Knuth shuffle) existing arrays in place.

Except as documented, Factoradic functions don't mutate their arguments.

Uncomment the [first line](index.js#L1) in `index.js` to make it browser compatible...meaning you can load the functions into an `exports` object in a developer console and play around; I don't know your bundler.

## ptoa

`ptoa(p) -> a` ([source](index.js#L13)) takes a Permutation `p` and returns its corresponding Array `a`.

`p` may be modified. To pass in a copy, consider [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

Example: `ptoa([1, 0]) // [1]`

## pton

`pton(p[, zero, muladd]) -> n` ([source](index.js#L26)) takes a Permutation `p` and returns its corresponding Number `n`. To make the return value a bigint, the bigint type's zero value `zero` and a multiply-add function `muladd` like

`function(N, m, a){return N*m + a;}`

must be provided. `N` is a bigint that `muladd` is free to modify. `m` is a builtin uint between `2` and `p.length`, inclusive. `a` is a builtin uint less than `m`. A bigint must be returned.

`p` may be modified. To pass in a copy, consider [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

When `muladd` is needed, its implementation determines whether `n` and `zero` reference the same object and whether `zero` may be modified.

Example: `pton([0, 1, 2]) // 0`

## atop

`atop(a[, p]) -> p'` ([source](index.js#L39)) takes an Array `a` and optional array `p` to modify (Fisher-Yates-Knuth shuffle) and returns their corresponding Permutation `p'`.

When provided, `p` refers to the same object as `p'`.

Examples:

- `atop([1]) // [1, 0]`
- `atop([1], ['a', 'b']) // ['b', 'a']`

## aton

`aton(a[, zero, muladd]) -> n` ([source](index.js#L49)) takes an Array `a` and returns its corresponding Number `n`. To make the return value a bigint, the bigint type's zero value `zero` and a multiply-add function `muladd` like

`function(N, m, a){return N*m + a;}`

must be provided. `N` is a bigint that `muladd` is free to modify. `m` is a builtin uint between `2` and `a.length + 1`, inclusive. `a` is a builtin uint less than `m`. A bigint must be returned.

When `muladd` is needed, its implementation determines whether `n` and `zero` reference the same object and whether `zero` may be modified.

Example: `aton([1, 0]) // 1`

## ntop

`ntop(n[, maxRadix][, p][, divmod]) -> p'` ([source](index.js#L60)) takes a Number `n` and either the size `maxRadix` of the permutation it applies to or an optional array `p` to modify (Fisher-Yates-Knuth shuffle) and returns their corresponding Permutation `p'`. When `n` is a bigint, a combined integer division and modulus function `divmod` like

`function(N, d){return {div:Math.floor(n/d), mod:n%d}}`

must be provided. `N` is a bigint that `divmod` is free to modify. `d` is a builtin uint between `2` and `maxRadix` (`p.length`), inclusive. `div`'s value must be a bigint. `mod`'s value must be a builtin uint.

When providing `p`, or `divmod` without `p`, unneeded arguments should be falsy.

When `divmod` is needed, its implementation determines whether `n` may be
modified.

When provided, `p` refers to the same object as `p'`.

Examples:

- `ntop(0, 2) // [0, 1]` (0 is one of `maxRadix! = 2!` permutations)
- `ntop(1, 3) // [1, 0, 2]` (1 is one of `maxRadix! = 3!`permutations)
- `ntop(1, null, ['a', 'b', 'c']) // ['b', 'a', 'c']` (falsy `maxRadix`)
- `ntop(0, 2, 0, function(N, d){...}) // [0, 1]` (falsy `p`)

## ntoa

`ntoa(n, maxRadix[, divmod]) -> a` ([source](index.js#L73)) takes a Number `n` and the size `maxRadix` of the permutation it applies to and returns its corresponding Array `a`. When `n` is a bigint, a combined integer division and modulus function `divmod` like

`function(N, d){return {div:Math.floor(n/d), mod:n%d}}`

must be provided. `N` is a bigint that `divmod` is free to modify. `d` is a builtin uint between `2` and `maxRadix`, inclusive. `div`'s value must be a bigint. `mod`'s value must be a builtin uint.

When `divmod` is needed, its implementation determines whether `n` may be modified.

Examples:

- `ntop(5, 3) // [1, 2]` (5 is one of `3! = 2 * 3` permutations)
- `ntop(5, 4) // [1, 2, 0]` (5 is one of `4! = 2 * 3 * 4` permutations)

## test

`test([maxMaxRadix], [onpass], [onfail])` ([source](index.js#L84)), used by [test.js](test.js) and `npm test`, tests that the transformations preserve permutation information. All arguments are optional. Placeholder arguments must be falsy.

`maxMaxRadix` defaults to `4`, testing all 2! through 4! permutations.

`onpass` defaults to `console.log('pass')` to output when the test succeeds.

`onfail` defaults to `console.error` to output information to reproduce a bug.

A successful test returns `0` (like an exit code). Otherwise, the `onfail` information is returned.

## Notes

### Number representations are not unique

Notice that `0` is equivalent to `[0, 1]` and `['a', 'b', 'c'], depending on context.

### Permuting in Stages

`atop` shuffling starts with lower radices:

`atop([1, 2])`

can be split as the equivalent

`atop([0, 2], atop([1, 0]))`

but not as `atop([1, 0], atop([0, 2]))`.

### Zero Extension

One reason for the particular choice of permutation-number bijection is the 'zero-extensibility property' (please tell me if you may know its actual name):

- `atop([1, 1], [1, 2, 3])` // `[2, 3, 1]`
- `atop([1, 1, 0, 0], [1, 2, 3, 4, 5])` // `[2, 3, 1, 4, 5]`

The facts that `4` and `5` are untouched and `1-3`'s new order is independent of maximum radix are analogous to a finite number's implicit leading zeroes.
