import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {MSA} from './MSA';
import setup from '../shared/TestUtils';

describe('MSA', () => {
  it('initial render', () => {
    const initialValue = 'Phildelphia, PA';
    const {output} = setup({value: initialValue}, MSA);
    expect(output.type).toBe('div');
    expect(output.props.id).toBe('metropolitan-area');
    expect(output.props.children.type).toBe('label');
    expect(output.props.children.props.children[0]).toBe('Metropolitan Statistical Area Waiver:');

    expect(output.props.children.props.children[1].type).toBe('select');
    expect(output.props.children.props.children[1].props.name).toBe('metropolitan_area_waiver');
    expect(output.props.children.props.children[1].props.id).toBe('high-cost-setting');
    expect(output.props.children.props.children[1].props.value).toBe(initialValue);
    expect(output.props.children.props.children[1].props.children.length).toBe(80);
    output.props.children.props.children[1].props.children.forEach(opt =>
      expect(opt.type).toBe('option')
    );
  });
  it('should call onChange for select onChange', () => {
    const initProps = {onChange: jasmine.createSpy('onChange')};
    const {output, props} = setup(initProps, MSA);
    output.props.children.props.children[1].props.onChange({});
    expect(props.onChange).toHaveBeenCalled();
  });
});
