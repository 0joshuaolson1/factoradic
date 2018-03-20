# Changelog

## Table of Contents

- [2.0.3 from 2.0.2](#203-from-202)
- [2.0.2 from 2.0.1](#201-from-200)
- [2.0.1 from 2.0.0](#201-from-200)
- [2.0.0 from 1.1.0](#200-from-110)
- [1.1.0 from 1.0.0](#110-from-100)

## 2.0.3 from 2.0.2

Fix the [syntax error](https://github.com/0joshuaolson1/factoradic/commit/dd61bfc43f149cefdd31319937d25507be0c5266).

## 2.0.2 from 2.0.1

Fixed issues:

- https://github.com/0joshuaolson1/factoradic/issues/28
- https://github.com/0joshuaolson1/factoradic/issues/29

## 2.0.1 from 2.0.0

Documentation fixes

## 2.0.0 from 1.1.0

Fixed issues:

- https://github.com/0joshuaolson1/factoradic/issues/17
- https://github.com/0joshuaolson1/factoradic/issues/23
- https://github.com/0joshuaolson1/factoradic/issues/24

I think we're ES5-compliant now ((how to) test this?). 

## 1.1.0 from 1.0.0

Removed ES6 requirement (2.0.0 EDIT: I hadn't). Added `pton` and `ntop`. Improved documentation. Added `test` return value and failure information.

MAJOR RELEASE, ACTUALLY: Changed `aton` to use a bigint `zero` instead of a `nctor` constuctor.

^ But nobody was really using 1.0.0. ~I still need to fix this with a release that includes this changelog...~ (2.0.0 EDIT)
