import React from 'react';
import StringUtil from './StringUtil';

describe('StringUtil', () => {
    it('should convert single wildcard string to wild card regex', () => {
        expect(StringUtil.convertWildcardStringToRegExp("*what*")).toStrictEqual(new RegExp('^.*what.*$', 'i'));
        expect(StringUtil.convertWildcardStringToRegExp("the*")).toStrictEqual(new RegExp('^the.*$', 'i'));
        expect(StringUtil.convertWildcardStringToRegExp("*the")).toStrictEqual(new RegExp('^.*the$', 'i'));
    });

    it('should convert multiple wildcard string to wild card regex', () => {
        expect(StringUtil.convertWildcardStringToRegExp("what*the")).toStrictEqual(new RegExp('^what.*the$', 'i'));
        expect(StringUtil.convertWildcardStringToRegExp("*what*the*")).toStrictEqual(new RegExp('^.*what.*the.*$', 'i'));
        expect(StringUtil.convertWildcardStringToRegExp("*what*the")).toStrictEqual(new RegExp('^.*what.*the$', 'i'));
        expect(StringUtil.convertWildcardStringToRegExp("what*the*")).toStrictEqual(new RegExp('^what.*the.*$', 'i'));
    });

    it('should escape regex characters', () => {
        expect(StringUtil.escapeRegExp(".*+?^${what}(the)|[\\]\\\\")).toStrictEqual( "\\.\\*\\+\\?\\^\\$\\{what\\}\\(the\\)\\|\\[\\\\\\]\\\\\\\\");
    });
});