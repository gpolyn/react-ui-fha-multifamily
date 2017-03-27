import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import setup from '../shared/TestUtils';

import {MaskedNumericInput} from './MaskedNumericInput';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

const basicProps = {
  onChange: ()=>{},
  min: 23.5,
  id:'some-input-id',
  className:'some-input-class',
  name:'some-input-name'
};

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

let spy;
let renderSpy;
let props;
let node;
let converted;
let subj;
let input;
const nodeId = 'document';

describe('MaskedNumericInput', () => {

  beforeEach(()=>{
    spy = jasmine.createSpy('onChange');
    node = document.createElement('div');
    props = {...basicProps, value: 40, onChange: spy};
    converted = squelchTS2345(ReactDOM.render(<MaskedNumericInput {...props} />, node));
    subj = ReactDOM.findDOMNode(converted);
    input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input') as HTMLInputElement;

  });

  it('should have expected initial setup', ()=>{
    expect(input.id).toBe(props.id);
    expect(input.className).toBe(props.className);
    expect(input.name).toBe(props.name);
    expect(input.value).toBe(String(props.value));
  });

  it('should have empty input value when no props.val', ()=>{
    const xnode = document.createElement('div');
    const xprops = {...basicProps, onChange: spy};
    const xconverted = squelchTS2345(ReactDOM.render(<MaskedNumericInput {...xprops} />, xnode));
    const xsubj = ReactDOM.findDOMNode(xconverted);
    const xinput = TestUtils.findRenderedDOMComponentWithTag(xconverted, 'input')
    expect(( xinput as HTMLInputElement).value).toBe('');
  });

  it('should have min input value when initial props val < props.min', ()=>{
    const xnode = document.createElement('div');
    const invalidVal = props.min - 1;
    const xprops = {...basicProps, value: invalidVal, onChange: spy};
    const xconverted = squelchTS2345(ReactDOM.render(<MaskedNumericInput {...xprops} />, xnode));
    const xsubj = ReactDOM.findDOMNode(xconverted);
    const xinput = TestUtils.findRenderedDOMComponentWithTag(xconverted, 'input')
    expect(( xinput as HTMLInputElement).value).toBe(String(props.min));
    expect(spy).toHaveBeenCalledWith(props.min);
  });

  it('should have input value == given props.val > min', ()=> {
    expect(input.value).toBe(String(props.value));
  });

  it('should have expected effects when changed value > min and != props.value', ()=>{
    const changeVal = 56.7;
    TestUtils.Simulate.change(input, getChangeEvent(String(changeVal)));
    expect(spy).toHaveBeenCalledWith(changeVal);
    expect(input.value).toBe(String(changeVal));
  });

  it('should have expected effects when changed value > min and == props.value', ()=>{
    const changeVal = 56.7;
    TestUtils.Simulate.change(input, getChangeEvent(String(changeVal)));
    expect(input.value).toBe(String(changeVal));
    expect(converted.props.value).toBe(props.value);
    expect(converted.state.value).toBe(changeVal);
    spy.calls.reset();
    TestUtils.Simulate.change(input, getChangeEvent(String(props.value)));
    expect(input.value).toBe(String(props.value));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have input value == min for changed value < min when entered', ()=>{
    const invalidVal = '2';
    TestUtils.Simulate.change(input, getChangeEvent(invalidVal));
    expect(spy).toHaveBeenCalledWith(props.min);
    expect(input.value).toBe(invalidVal);
    spy.calls.reset();
    TestUtils.Simulate.keyDown(input, {key:"Enter", keyCode: 13, which: 13});
    expect(input.value).toBe(String(props.min));
    // note duplicative call with props.min
    expect(spy).toHaveBeenCalledWith(props.min);
  });

  it('should have expected effect when valid changed props.value != control value', () => {
    const newPropsValue = props.value + 5;
    spyOn(MaskedNumericInput.prototype, 'render').and.callThrough();
    ReactDOM.render(<MaskedNumericInput {...props} value={newPropsValue} />, node);
    expect(MaskedNumericInput.prototype.render).toHaveBeenCalled();
    expect(input.value).toBe(String(newPropsValue));
    expect(spy).not.toHaveBeenCalledWith(newPropsValue);
  });

  it('should have expected effect for new invalid props.value', () => {
    const newPropsValue = props.min - 1;
    spyOn(MaskedNumericInput.prototype, 'render').and.callThrough();
    ReactDOM.render(<MaskedNumericInput {...props} value={newPropsValue} />, node);
    expect(MaskedNumericInput.prototype.render).toHaveBeenCalled();
    expect(input.value).toBe(String(props.min));
    expect(spy).toHaveBeenCalledWith(props.min);
  });

  it('should have expected effect when changed props.value == control value', () => {
    const newValue = props.value + 5;
    TestUtils.Simulate.change(input, getChangeEvent(newValue));
    expect(input.value).toBe(String(newValue));
    expect(converted.state.value).toBe(newValue);
    expect(converted.props.value).toBe(props.value);
    spy.calls.reset();
    spyOn(MaskedNumericInput.prototype, 'render').and.callThrough();
    ReactDOM.render(<MaskedNumericInput {...props} value={newValue} />, node);
    expect(MaskedNumericInput.prototype.render).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have input value == min for changed value < min when blurred', ()=>{
    const invalidVal = '2';
    TestUtils.Simulate.change(input, getChangeEvent(invalidVal));
    expect(spy).toHaveBeenCalledWith(props.min);
    expect(input.value).toBe(invalidVal);
    spy.calls.reset();
    TestUtils.Simulate.blur(input);
    expect(input.value).toBe(String(props.min));
    // note duplicative call with props.min
    expect(spy).toHaveBeenCalledWith(props.min);
  });

});
