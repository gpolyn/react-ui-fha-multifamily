import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ElevatorStatus} from './ElevatorStatus';
import setup from '../shared/TestUtils';

describe('ElevatorStatus', () => {

  it('initial render', () => {
    const initialValue = 'false';
    const {output} = setup({value: initialValue}, ElevatorStatus);
    expect(output.type).toBe('div');
    expect(output.props.id).toBe('elevator-status');
    expect(output.props.children[0]).toBe('project has elevator?');
    expect(output.props.children[1].type).toBe('select');
    expect(output.props.children[1].props.name).toBe('is_elevator_project');
    ['true', 'false'].forEach((bool, idx) => {
      expect(output.props.children[1].props.children[idx].type).toBe('option');
      expect(output.props.children[1].props.children[idx].props.value).toBe(bool);
    });
  });
  it('should call onChange for select onChange', () => {
    const initProps = {onChange: jasmine.createSpy('onChange')};
    const {output, props} = setup(initProps, ElevatorStatus);
    output.props.children[1].props.onChange()
    expect(props.onChange).toHaveBeenCalled();
  });
});
