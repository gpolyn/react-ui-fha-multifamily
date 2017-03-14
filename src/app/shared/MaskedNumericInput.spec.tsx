import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {MaskedNumericInput} from './MaskedNumericInput';

function setup(propOverrides: any) {
  const props = Object.assign({
    onChange: jasmine.createSpy('onChange'),
    max: undefined,
    min: undefined,
    className: 'some-class-name',
    id: 'some-id'
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<MaskedNumericInput {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ParkingIncomeForm', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('input');
    expect(output.props.className).toBe(props.className);
    expect(output.props.id).toBe(props.id);
  });
  it('should limit value to max when max is supplied', () => {
    const {output, props} = setup({max: 100});
    output.props.onChange({target: {value: 101}});
    expect(props.onChange).toHaveBeenCalledWith(100);
  });
  it('should not limit value when neithe max or min is supplied', () => {
    const {output, props} = setup({});
    output.props.onChange({target: {value: 101}});
    expect(props.onChange).toHaveBeenCalledWith(101);
  });
  it('should limit value to min when min is supplied', () => {
    const {output, props} = setup({min: 100});
    output.props.onChange({target: {value: 10}});
    expect(props.onChange).toHaveBeenCalledWith(100);
  });
  it('should limit value to min or max when min and is supplied', () => {
    const {output, props} = setup({min: 100, max: 108});
    output.props.onChange({target: {value: 10}});
    expect(props.onChange).toHaveBeenCalledWith(100);
    props.onChange.calls.reset();
    output.props.onChange({target: {value: 109}});
    expect(props.onChange).toHaveBeenCalledWith(108);
  });
});
