# Factoradic

semantic version 1.1.0

Apache 2.0 license

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

This ES5-compatible Node.js module/package exports functions (and a test)
providing transformations between three equivalent permutation representations:

- p: Permutation of builtin ints incrementing from 0 (uints), like (`[1, 0, 2]`)
- a: mixed-radix (factorial number system) builtins Array (`[1, 1]` (base 2, 3))
- n: uint permutation Number (builtin or bigint) (`442`)

The four functions that involve Numbers ([`pton`](#pton), [`atop`](#atop),
[`aton`](#aton), and [`ntop`](#ntop)) accept optional functions necessary to use
bigint objects of the user's choice. Note that JavaScript uints lose precision
when greater than `Math.pow(2, 53) (9007199254740992)`, which is between
`18! (7387354275840000)` and `19!`.

The two functions that return a permutation ([`atop`](#atop) and [`ntop`](#ntop))
can alternatively permute (Fisher-Yates-Knuth shuffle) existing arrays in place.

Except as documented, Factoradic functions don't mutate their arguments.

Uncomment the first line in `index.js` to make it browser compatible...meaning
you can load the functions into an `exports` object in a developer console and
play around; I don't know your bundler.

## ptoa

[`ptoa(p) -> a`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L13)
takes a Permutation `p` and returns its corresponding Array `a`.

Example: `ptoa([1, 0]) // [1]`

`p` is modified. To pass in a copy, consider `Array.prototype.slice`.

## pton

[`pton(p[, zero, muladd]) -> n`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L26)`
takes a Permutation `p` and returns its corresponding Number `n`. To make the
return value a bigint, `zero` must be provided with the bigint type's zero value
and `muladd` must be provided with a multiply-add function like

`function(N, m, a){return N*m + a;}`

`N` is a bigint that `muladd` is free to modify. `m` is a builtin uint between
`2` and `p.length`, inclusive. `a` is a builtin uint no greater than `m`. A
bigint must be returned.

Example: `pton([0, 1, 2]) // 0`

`p` is modified. To pass in a copy, consider `Array.prototype.slice`.

When provided, the `muladd` implementation determines whether `n` and `zero`
reference the same object and whether `zero` is modified.

## atop

[`atop(a[, p]) -> p'`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L39)
takes an Array `a` and optional array `p` to modify (Fisher-Yates-Knuth shuffle)
and returns their corresponding Permutation `p'`.

Example: `atop([1]) // [1, 0]`
Example: `atop([1], ['a', 'b']) // ['b', 'a']`

When provided, `p` refers to the same object as `p'`.

## aton

[`aton(a[, zero, muladd]) -> n`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L49)
takes an Array `a` and returns its corresponding Number `n`. To make the return
value a bigint, `zero` must be provided with the bigint type's zero value and
`muladd` must be provided with a multiply-add function like

`function(N, m, a){return N*m + a;}`

`N` is a bigint that `muladd` is free to modify. `m` is a builtin uint between
`2` and `a.length + 1`, inclusive. `a` is a builtin uint no greater than `m`. A
bigint must be returned.

Example: `aton([1, 0]) // 1`

When provided, the `muladd` implementation determines whether `n` and `zero`
reference the same object and whether `zero` is modified.

## ntop

[`ntop(n[, maxRadix][, p][, divmod]) -> p'`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L60)
takes a Number `n` and either the size `maxRadix` of the permutation it applies
to or an optional array `p` to modify (Fisher-Yates-Knuth shuffle) and returns
their corresponding Permutation `p'`. When `n` is a bigint, `divmod` must be
provided with a combined integer division and modulus function like

`function(N, d){return {div:Math.floor(n/d), mod:n%d}}`

`N` is a bigint that `divmod` is free to modify. `d` is a builtin uint between
`2` and `maxRadix` (`p.length`), inclusive. `div`'s value must be a bigint.
`mod`'s value must be a builtin uint.

When providing `p`, or `divmod` without `p`, a falsy argument is ignored.

Example: maxRadix
Example: falsy
Example: falsy

When provided, `p` refers to the same object as `p'`.

## ntoa

[`ntoa`](https://github.com/0joshuaolson1/factoradic/blob/UPDATEME/index.js#L73)(number, maxRadix[, divmod]) returns a Number's corresponding mixed radix (factorial number system) Array. The optional divmod function defaults

  - inputs:

    (2) a JS uint `>= 2` specifying the maximum radix

      - e.g. `4` means interpret the first argument in the range `[0, 4!)`

    (3) the number type's integer divmod function

      - inputs:

        (1) a uint `<=` the permutation number

        (2) a JS uint divisor in the range `[2, max radix]`

      - output: a map with uint values

        - 'div' indexes the division result

        - 'mod' indexes the remainder (JS uint)

  - output: a nonempty array of JS uints where `0 <= a[i] < i+2`

    - e.g. `ntoa(5, 4, divmod)` -> `[1, 2, 0]`, where `1` is base 2 and `0` is base 4

- [`test`](https://github.com/0joshuaolson1/factoradic/blob/master/index.js#L45) tests that the transformations preserve permutation information, but read it yourself:

  - for example code

  - to understand test use (e.g. test.js) and limitations

## Notes

### Permuting in Stages

Note that atop shuffling starts with lower radices
E.g. atop([1,2]) can be split as atop([0,2], atop([1,0])), but not commutative with atop([1,0], atop([0,2])).

### Zero Extension

One reason for the particular choice of permutation-number bijection is the 'zero-extensibility property' (please tell me if you may know its actual name):

- `atop([1, 1], [1, 2, 3])` -> `[2, 3, 1]`
- `atop([1, 1, 0, 0], [1, 2, 3, 4, 5])` -> `[2, 3, 1, 4, 5]`

The facts that `4` and `5` are untouched and `1-3`'s new order is independent of maximum radix are analogous to a finite number's implicit leading zeroes.
