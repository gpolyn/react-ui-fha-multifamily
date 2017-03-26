import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import setup from '../shared/TestUtils';

import {OverrideableRadioControl} from './OverrideableRadioControl';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

const basicProps = {
  onChange: ()=>{},
  name:'radioControlName',
  id:'radioControl',
  className:'radioControlClass'
};

basicProps['data-options'] = [
  {label: 'one', value: 'one', id: 'one'},
  {label: 'two', value: 'two', id: 'two'},
  {label: 'three', value: 'three', id: 'three'},
  {label: 'four', value: 'four', id: 'four'}
];

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
let subj;
let inputs;
const nodeId = 'document';

describe('OverrideableRadioControl', () => {

  beforeEach(()=>{
    spy = jasmine.createSpy('onChange');
    node = document.createElement('div');
    node.setAttribute('id', nodeId);
    props = {...basicProps, value: 'three', onChange: spy};
    converted = squelchTS2345(ReactDOM.render(<OverrideableRadioControl {...props} />, node));
    subj = ReactDOM.findDOMNode(converted);
    inputs = TestUtils.scryRenderedDOMComponentsWithTag(converted, 'input')
  });

  it('should be noted that TestUtils.Simulate.change results in re-rendering', () => {
    expect(subj.querySelectorAll('input')[getIndexForInputValue(props.value)].checked).toBe(true);
    spyOn(OverrideableRadioControl.prototype, 'render').and.callThrough();
    expect(OverrideableRadioControl.prototype.render).not.toHaveBeenCalled();
    TestUtils.Simulate.change(inputs[getIndexForInputValue('one')], getChangeEvent('one'));
    expect(OverrideableRadioControl.prototype.render).toHaveBeenCalled();
    expect(subj.querySelectorAll('input')[getIndexForInputValue('one')].checked).toBe(true);
    TestUtils.Simulate.change(inputs[getIndexForInputValue('two')], getChangeEvent('two'));
    expect(subj.querySelectorAll('input')[getIndexForInputValue('two')].checked).toBe(true);
  });

  // 0
  it('should have expected initial setup', () => {
    expect(props.value).toBe('three');
    expect(converted.state.value).toBe(props.value);
    expect(converted.props.value).toBe(props.value);
    expect(subj.querySelectorAll('input')[getIndexForInputValue(props.value)].checked).toBe(true);
    const testInputs = subj.querySelectorAll('input');
    expect(testInputs.length).toBe(4)
    const labels = TestUtils.scryRenderedDOMComponentsWithTag(converted, 'label')
    expect(labels.length).toBe(4)
    const parent = TestUtils.findRenderedDOMComponentWithTag(converted, 'div')
    expect(parent.parentElement.id).toBe(nodeId);
    expect(parent.className).toBe(props.className)
    expect(parent.id).toBe(props.id)

    const opts = basicProps['data-options'];
    opts.forEach((val, idx) => {
      expect(parent.contains(labels[idx])).toBe(true);
      expect(labels[idx].contains(testInputs[idx])).toBe(true);
      expect(labels[idx].textContent).toBe(val.value);
      expect(getIndexForInputValue(val.value)).toBe(idx);
      expect(testInputs[getIndexForInputValue(val.value)].type).toBe('radio');
      expect(testInputs[getIndexForInputValue(val.value)].value).toBe(val.value);
      expect(testInputs[getIndexForInputValue(val.value)].id).toBe(val.value);
    });
  });

  // 1
  it('should have expected effects when changed ctrl value != props.value', () => {
    spyOn(OverrideableRadioControl.prototype, 'render').and.callThrough();
    spy.calls.reset();
    TestUtils.Simulate.change(inputs[getIndexForInputValue('one')], getChangeEvent('one'));
    expect(spy).toHaveBeenCalledWith('one');
    expect(OverrideableRadioControl.prototype.render).toHaveBeenCalled();

    expect(subj.querySelectorAll('input')[getIndexForInputValue('one')].checked).toBe(true); 
  });

  // 2
  xit('should have expected effects when changed ctrl value == props.value', () => {
    TestUtils.Simulate.change(inputs[getIndexForInputValue('one')], getChangeEvent('one'));
    expect(subj.querySelectorAll('input')[getIndexForInputValue('one')].checked).toBe(true);
    spyOn(OverrideableRadioControl.prototype, 'render').and.callThrough();
    spy.calls.reset();
    expect(converted.props.value).toBe(props.value);
    TestUtils.Simulate.change(inputs[getIndexForInputValue(props.value)], getChangeEvent(props.value));
    expect(spy).not.toHaveBeenCalled();
    expect(OverrideableRadioControl.prototype.render).toHaveBeenCalled();
    expect(subj.querySelectorAll('input')[getIndexForInputValue(props.value)].checked).toBe(true);

  });

  // 3
  it('should have expected effect when changed props.value != control value', () => {
    spy.calls.reset();
    spyOn(OverrideableRadioControl.prototype, 'render').and.callThrough();
    const newPropsValue = 'two';
    ReactDOM.render(<OverrideableRadioControl {...props} value={newPropsValue} />, node);
    expect(OverrideableRadioControl.prototype.render).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newPropsValue);
    expect(subj.querySelectorAll('input')[getIndexForInputValue(newPropsValue)].checked).toBe(true);
  })

  // 4
  it('should have expected effect when changed props.value == control value', () => {
    TestUtils.Simulate.change(inputs[getIndexForInputValue('one')], getChangeEvent('one'));
    expect(subj.querySelectorAll('input')[getIndexForInputValue('one')].checked).toBe(true);
    spy.calls.reset();
    spyOn(OverrideableRadioControl.prototype, 'render').and.callThrough();
    const newPropsValue = 'one';
    ReactDOM.render(<OverrideableRadioControl {...props} value={newPropsValue} />, node);
    expect(OverrideableRadioControl.prototype.render).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled()
    expect(subj.querySelectorAll('input')[getIndexForInputValue('one')].checked).toBe(true);
  })

});
