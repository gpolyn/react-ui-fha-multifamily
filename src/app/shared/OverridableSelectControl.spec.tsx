import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import setup from '../shared/TestUtils';

import {OverrideableSelectControl} from './OverrideableSelectControl';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

const basicProps = {
  onChange: ()=>{},
  name:'selectControlName',
  id:'selectControl',
  className:'selectControlClass'
};

basicProps['data-options'] = ['one', 'two', 'three', 'four'];

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

function getIndexForInputValue(inputValue: string): number {
  const map = {
    'one': 0,
    'two': 1,
    'three': 2,
    'four': 3
  };
  return map[inputValue];
}

let spy;
let props;
let node;
let converted;
let input;
let options;

describe('OverrideableSelectControl', () => {

  beforeEach(()=>{
    spy = jasmine.createSpy('onChange');
    node = document.createElement('div');
    props = {...basicProps, value: 'three', onChange: spy};
    converted = squelchTS2345(ReactDOM.render(<OverrideableSelectControl {...props} />, node));
    const subj = ReactDOM.findDOMNode(converted);
    input = TestUtils.findRenderedDOMComponentWithTag(converted, 'select')
    options = subj.querySelectorAll('option');
  });

  it('should be noted that TestUtils.Simulate.change results in re-rendering', () => {
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
    input.value = 'one';
    TestUtils.Simulate.change(input);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  });

  // 0
  it('should have expected initial setup', () => {
    expect(converted.state.value).toBe(props.value);
    expect(converted.props.value).toBe(props.value);
    expect(options.length).toBe(4)
    const parent = input;
    expect(parent.parentElement === node).toBe(true);
    expect(parent.className).toBe(props.className);
    expect(parent.name).toBe(props.name);
    expect(parent.multiple).toBe(false);
    expect(parent.id).toBe(props.id);

    const opts = basicProps['data-options'];
    opts.forEach((val, idx) => {
      expect(parent.contains(options[getIndexForInputValue(val)])).toBe(true);
      expect(getIndexForInputValue(val)).toBe(idx);
      expect(options[getIndexForInputValue(val)].value).toBe(val);
    });

    expect(props.value).toBe('three');
    expect(options[getIndexForInputValue('three')].selected).toBe(true);
  });

  // 1
  it('should have expected effects when changed ctrl value != props.value', () => {
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    spy.calls.reset();
    input.value = 'one';
    TestUtils.Simulate.change(input);
    expect(spy).toHaveBeenCalledWith('one');
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
    expect(options[getIndexForInputValue('one')].selected).toBe(true);
  });

  // 2
  xit('should have expected effects when changed ctrl value == props.value', () => {
    input.value = 'one';
    TestUtils.Simulate.change(input);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    spy.calls.reset();
    expect(converted.state.value).toBe('one');
    expect(converted.props.value).toBe(props.value);
    expect(props.value === 'one').toBe(false);
    input.value = props.value;
    TestUtils.Simulate.change(input);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
    expect(options[getIndexForInputValue(props.value)].selected).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });

  // 3
  it('should have expected effect when changed props.value != control value', () => {
    expect(options[getIndexForInputValue(props.value)].selected).toBe(true);
    const newPropsValue = 'two';
    expect(newPropsValue === props.value).toBe(false)
    spy.calls.reset();
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} value={newPropsValue} />, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newPropsValue);
    expect(options[getIndexForInputValue(newPropsValue)].selected).toBe(true);
  })

  // 4
  it('should have expected effect when changed props.value == control value', () => {
    const controlVal = 'one'
    input.value = controlVal;
    TestUtils.Simulate.change(input);
    const newPropsValue = controlVal;
    spy.calls.reset();
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} value={newPropsValue} />, node);
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
    expect(options[getIndexForInputValue(newPropsValue)].selected).toBe(true);
  })

});
