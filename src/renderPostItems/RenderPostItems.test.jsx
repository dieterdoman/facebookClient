import React from "react";
import TestRenderer from 'react-test-renderer';
import RenderPostItems from "./RenderPostItems";

const items = ["hello there", "testing 101"];

describe('RenderPostItems', () => {
    it('render items correctly', () => {
        const testRenderer = TestRenderer.create(<RenderPostItems data={items} />);
        const children = testRenderer.root.find((el) => el.type === 'ul').children;
        expect(children.length).toBe(2);
        children.forEach( s => expect(s.type).toBe('li'));
    });
});