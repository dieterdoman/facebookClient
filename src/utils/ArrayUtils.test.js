import React from 'react';
import ArrayUtils from "./ArrayUtils";

const element1 = "what the test";
const element2 = "of the test";
const array = [element1, element2];

describe('ArrayUtils', () => {
    it('should filter array based on wildcard search matching case insensitive', () => {
        expect(ArrayUtils.caseInsensitiveFilterArray(array, "what")).toStrictEqual([element1]);
        expect(ArrayUtils.caseInsensitiveFilterArray(array, "of")).toStrictEqual([element2]);
        expect(ArrayUtils.caseInsensitiveFilterArray(array, "")).toStrictEqual(array);
        expect(ArrayUtils.caseInsensitiveFilterArray(array, "1")).toStrictEqual([]);
    });
});