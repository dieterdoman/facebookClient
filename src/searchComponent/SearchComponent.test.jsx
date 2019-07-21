import React from "react";
import TestRenderer from 'react-test-renderer';
import SearchComponent from "./SearchComponent";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const data = ["hello there", "testing 101"];

describe('SearchComponent', () => {
    it('searching renders the correct amount of items', () => {
        const testRenderer = TestRenderer.create(<SearchComponent data={data}/>);
        const children = testRenderer.root.find((el) => el.type === 'ul').children;
        expect(children.length).toBe(2);
        children.forEach( s => expect(s.type).toBe('li'));
        const searchComponent = mount(<SearchComponent data={data}/>);
        const event = {target: {value: "h"}};
        searchComponent.find('input').simulate('change', event);
        expect(searchComponent.find('li').length).toBe(1);
        const newEvent = {target: {value: "bla"}};
        searchComponent.find('input').simulate('change', newEvent);
        expect(searchComponent.find('li').length).toBe(0);
    });
});