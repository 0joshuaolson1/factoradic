# Factoradic

semantic version 1.0.0

Apache 2.0 license

This ES6 Node package contains and exports four functions (and a test) providing invertible transformations on permutation representations:

- [`ntoa`](https://github.com/0joshuaolson1/factoradic/blob/f6419dd8884b0a737b080d2b46e371223ec6b9c0/index.js#L3) takes a permutation Number and returns its corresponding mixed radix (factorial number system) Array

  - inputs:

    (1) a non-negative integer ('uint') of JavaScript or bignum-like type (the permutation number's 'number type')

      - if this is an object, it will be modified

      - JS uints greater than `2^53 (9007199254740992)` lose precision

        - `18! (7387354275840000) < 2^53 << 19! (140359731240960000)`

    (2) a JS uint `>= 2` specifying the maximum radix

      - e.g. `4` means interpret the first argument in the range `[0, 4!)`

    (3) the number type's integer divmod function

      - inputs:

        (1) a uint `<=` the permutation number

        (2) a JS uint divisor in the range `[2, max radix]`

      - output: a map with JS uint values

        - 'div' indexes the division result

        - 'mod' indexes the remainder

  - output: a nonempty array of JS uints where `0 <= a[i] < i+2`

    - e.g. `ntoa(5, 4, divmod)` -> `[1, 2, 0]`, where `1` is base 2 and `0` is base 4

- [`aton`](https://github.com/0joshuaolson1/factoradic/blob/f6419dd8884b0a737b080d2b46e371223ec6b9c0/index.js#L12) takes a mixed radix Array and returns its corresponding permutation Number

  - inputs:

    (1) the array (not modified)

    (2) the number type's constructor function given a JS uint `<` the max radix

    (3) the number type's multiply-then-add function

      - inputs:

        (1) a uint

        (2) a JS uint multiplier in the range `[2, max radix]`

        (3) a JS uint addend in the range `[0, multiplier)`

      - output: `(number * multiplier) + addend`

  - output: a uint

- [`atop`](https://github.com/0joshuaolson1/factoradic/blob/f6419dd8884b0a737b080d2b46e371223ec6b9c0/index.js#L17) takes a mixed radix Array and optional array to permute in place and returns their corresponding Permutation

  - inputs:

    (1) the mixed radix array (not modified)

    (2) the array to permute in place (defaults to `[0, 1, 2...]`)

      - this is one element longer than the mixed radix array

      - the highest element is one less than the max radix

  - output: the in-place Fisher-Yates-Knuth shuffled array (not a copy)

- [`ptoa`](https://github.com/0joshuaolson1/factoradic/blob/f6419dd8884b0a737b080d2b46e371223ec6b9c0/index.js#L27) takes a Permutation of `[0, 1, 2...]` (will be modified) and returns its corresponding mixed radix Array

- [`test`](https://github.com/0joshuaolson1/factoradic/blob/master/index.js#L31) tests that all four transformations are invertible, but read it yourself:

  - for example code

  - to understand test use (e.g. test.js) and limitations

## Note

One reason for the particular choice of permutation-number bijection is the 'zero-extensibility property' (please tell me if you may know its actual name):

- `atop([1, 1], [1, 2, 3])` -> `[2, 3, 1]`
- `atop([1, 1, 0, 0], [1, 2, 3, 4, 5])` -> `[2, 3, 1, 4, 5]`

The facts that `4` and `5` are untouched and `1-3`'s new order is independent of maximum radix are analogous to a finite number's implicit leading zeroes.
