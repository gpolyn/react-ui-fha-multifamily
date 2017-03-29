import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import {PercentableInput} from './PercentableInput';
import {MinLimitedNumericInput, MinMaxLimitedNumericInput} from './MaskedNumericInput';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

const basicProps = {
  onChange: ()=>{}
};

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

let spy;
let props;
let node;
let converted;
let input;

describe('PercentableInput', () => {

  beforeEach(()=>{
    spy = jasmine.createSpy('onChange');
    node = document.createElement('div');
  });

  it('should initially render MinMaxLimitedNumericInput if props.isPercent == true', ()=>{
    props = {...basicProps, value: 75.8, isPercent: true};
    const child = <MinLimitedNumericInput min={10} />;
    const subj = <PercentableInput {...props}>child</PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const comp = TestUtils.findRenderedComponentWithType(converted, MinMaxLimitedNumericInput);
    expect(comp).not.toBe(null);
    const xinput = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(( xinput as HTMLInputElement).value).toBe(String(props.value));
  });

  it('should initially render given child if props.isPercent != true', ()=>{
    props = {...basicProps, value: 75.8, isPercent: false};
    const subj = <PercentableInput {...props}><MinLimitedNumericInput min={10} /></PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const comp = TestUtils.findRenderedComponentWithType(converted, MinLimitedNumericInput);
    expect(comp.props.min).toBe(10);
    const xinput = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(( xinput as HTMLInputElement).value).toBe(String(props.value));
  });

  it('should present valid value if props.isPercent is changed to true', () =>{
    props = {...basicProps, value: 101, isPercent: false};
    const subj = <PercentableInput {...props}><MinLimitedNumericInput min={10} /></PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const nextSubj = ( <PercentableInput {...props} isPercent={true}><MinLimitedNumericInput min={10} /></PercentableInput> );
    const input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(( input as HTMLInputElement).value).toBe(String(101));
    ReactDOM.render(nextSubj, node);
    const nextInput = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(( nextInput as HTMLInputElement).value).toBe(String(100));
  });

  it('should present valid value if props.isPercent is changed to false', ()=> {
    props = {...basicProps, value: 99, isPercent: true};
    const subj = <PercentableInput {...props}><MinLimitedNumericInput min={10} /></PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const nextSubj = ( <PercentableInput {...props} isPercent={false}><MinLimitedNumericInput min={10} /></PercentableInput> );
    ReactDOM.render(nextSubj, node);
    const input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(( input as HTMLInputElement).value).toBe(String(99));
  });

  it('should call props.onChange when field is changed and props.isPercent is true', ()=>{
    props = {...basicProps, value: 99, isPercent: true, onChange: spy};
    const subj = <PercentableInput {...props}><MinLimitedNumericInput min={10} /></PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(spy).not.toHaveBeenCalled()
    TestUtils.Simulate.change(input, getChangeEvent(95));
    expect(spy).toHaveBeenCalledWith(95);
  });

  it('should call props.onChange when field is changed and props.isPercent is false', ()=>{
    props = {...basicProps, value: 99, isPercent: false, onChange: spy};
    const subj = <PercentableInput {...props}><MinLimitedNumericInput min={10} /></PercentableInput>;
    converted = squelchTS2345(ReactDOM.render(subj, node));
    const input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input')
    expect(spy).not.toHaveBeenCalled()
    TestUtils.Simulate.change(input, getChangeEvent(95));
    expect(spy).toHaveBeenCalledWith(95);
  });

});
