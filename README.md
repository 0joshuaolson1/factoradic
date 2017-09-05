##Factoradic

semantic version 1.0.0
Apache 2.0 license

This ES6 Node package contains and exports four functions (and a test) providing invertible transformations on permutation representations:

- [`ntoa`]() takes a permutation Number and returns its corresponding factorial number system (mixed radix) Array
  - inputs:
    1. a non-negative integer ('uint') of JavaScript or bignum-like type (the permutation number's 'number type')
      - if this is an object, it will be modified
      - JS uints greater than 2^53 (9007199254740992) lose precision
        - 18! (7387354275840000) < 2^53 << 19! (140359731240960000)
    2. a JS uint >= 2 specifying the maximum radix
      - e.g. 4 means interpret the first argument in the range [0, 4!)
    3. the number type's integer divmod function
      - inputs:
        1. a uint <= the permutation number
        2. a JS uint divisor in the range [2, max radix]
      - output: a map with JS uint values
        - 'div' indexes the division result
        - 'mod' indexes the remainder
  - output: a nonempty array of JS uints where 0 <= a[i] < i+2
    - e.g. ntoa(5, 4, divmod) -> [1, 2, 0], where 1 is base 2 and 0 is base 4
- [`aton`]() takes a mixed radix Array and returns its corresponding permutation Number
  - inputs:
    1. the array (not modified)
    2. the number type's constructor function given a JS uint less than the max radix
    3. the number type's multiply-then-add function
      - inputs:
        1. a uint of number type
        2. a JS uint multiplicand in the range [2, max radix]
        3. a JS uint addihend in the range [0, multiplicand)
      - output: (number * multiplicand) + addihend
  - output: a uint of number type
- [`atop`]() takes a mixed radix array and optional array to permute in place and returns their corresponding permutation
  - inputs:
    1. the mixed radix array (not modified)
    2. the array to permute in place (defaults to [0, 1, 2...]
      - this is one element longer than the mixed radix array
      - the highest element is one less than the max radix
  - output: the in-place Fisher-Yates-Knuth shuffled array (not a copy)
- [`ptoa`]() takes a permutation of [0, 1, 2...] (will be modified) and returns its corresponding mixed radix array
- [`test`]() tests that all four transformations are invertible, but read it yourself:
  - for example code
  - to understand test use (e.g. test.js) and limitations

#Note

One reason for the particular choice of permutation-number bijection is the 'zero-extensibility property' (please tell me if you may know its or ptoa's algorithm's actual names):

- atop([1, 1],       [1, 2, 3])       -> [2, 3, 1]
- atop([1, 1, 0, 0], [1, 2, 3, 4, 5]) -> [2, 3, 1, 4, 5]

The facts that 4 and 5 are untouched and 1-3's new order is independent of maximum radix are analogous to any finite number's infinite implicit leading zeroes.
