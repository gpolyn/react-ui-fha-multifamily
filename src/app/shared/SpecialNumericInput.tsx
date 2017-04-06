import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

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
let input;
const diff = 1;

export function commonNumericInputTests(component: any, more){

  describe(`${component}`, () => {

    beforeEach(()=>{
      spy = jasmine.createSpy('onChange');
      node = document.createElement('div');
      props = {...basicProps, ...more, onChange: spy};
      converted = squelchTS2345(ReactDOM.render(React.createElement(component, {...props}), node));
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
      const xconverted = squelchTS2345(ReactDOM.render(React.createElement(component, {...xprops}), xnode));
      const xinput = TestUtils.findRenderedDOMComponentWithTag(xconverted, 'input')
      expect(( xinput as HTMLInputElement).value).toBe('');
    });

  });

}

function errorCheck(component: any, initialVal: number, min?: number, max?: number){
  if (min && ( initialVal - diff <= min )){
    throw `minTests for ${component.name}, bad initial value: ${initialVal}`;
  }

  if (max && ( initialVal + diff >= max)){
    throw `minTests for ${component.name}, bad initial value: ${initialVal}`;
  }
}

export function minTests(component: any, more){

  errorCheck(component, more.value, more.min, more.max);

  describe(`${component}`, () => {

    beforeEach(()=>{
      spy = jasmine.createSpy('onChange');
      node = document.createElement('div');
      //props = {...basicProps, onChange: spy, value: initialVal,  min: min, max: max};
      props = {...basicProps, ...more, onChange: spy};
      converted = squelchTS2345(ReactDOM.render(React.createElement(component, {...props}), node));
      input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input') as HTMLInputElement;

    });

    it('should have min input value when initial props val < props.min', ()=>{
      const xnode = document.createElement('div');
      const invalidVal = props.min - diff;
      const xprops = {...basicProps, value: invalidVal, onChange: spy};
      const xconverted = squelchTS2345(ReactDOM.render(React.createElement(component, {...xprops}), xnode));
      const xinput = TestUtils.findRenderedDOMComponentWithTag(xconverted, 'input')
      expect(( xinput as HTMLInputElement).value).toBe(String(props.min));
      expect(spy).toHaveBeenCalledWith(props.min);
    });

    it('should have input value == given props.val > min', ()=> {
      expect(input.value).toBe(String(props.value));
    });

    it('should have expected effects when changed value > min and != props.value', ()=>{
      const changeVal = props.value + diff;
      input.value = String(changeVal);
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(changeVal);
      expect(input.value).toBe(String(changeVal));
    });

    it('should have expected effects when changed value > min and == props.value', ()=>{
      const changeVal = props.value + diff;
      input.value = String(changeVal);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(changeVal));
      expect(converted.props.value).toBe(props.value);
      expect(converted.state.value).toBe(changeVal);
      spy.calls.reset();
      input.value = String(props.value);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(props.value));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should have input value == min for changed value < min when entered', ()=>{
      const invalidVal = String(props.min - 1);
      (input as HTMLInputElement).value = invalidVal;
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(props.min);
      expect(input.value).toBe(invalidVal);
      spy.calls.reset();
      TestUtils.Simulate.keyDown(input, {key:"Enter", keyCode: 13, which: 13});
      expect(input.value).toBe(String(props.min));
      // note duplicative call with props.min
      expect(spy).toHaveBeenCalledWith(props.min);
    });

    it('should have expected effect when valid changed props.value != control value', () => {
      const newPropsValue = props.value + diff;
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newPropsValue}), node));
      expect(component.prototype.render).toHaveBeenCalled();
      expect(input.value).toBe(String(newPropsValue));
      expect(spy).not.toHaveBeenCalledWith(newPropsValue);
    });

    it('should have expected effect for new invalid props.value', () => {
      const newPropsValue = props.min - diff;
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newPropsValue}), node));
      expect(component.prototype.render).toHaveBeenCalled();
      expect(input.value).toBe(String(props.min));
      expect(spy).toHaveBeenCalledWith(props.min);
    });

    it('should have expected effect when changed props.value == control value', () => {
      const newValue = props.value + diff;
      input.value = String(newValue);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(newValue));
      expect(converted.state.value).toBe(newValue);
      expect(converted.props.value).toBe(props.value);
      spy.calls.reset();
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newValue}), node));
      expect(component.prototype.render).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should have input value == min for changed value < min when blurred', ()=>{
      const invalidVal = String(props.min - diff);
      input.value = invalidVal;
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(props.min);
      expect(input.value).toBe(invalidVal);
      spy.calls.reset();
      TestUtils.Simulate.blur(input);
      expect(input.value).toBe(String(props.min));
      // note duplicative call with props.min
      expect(spy).toHaveBeenCalledWith(props.min);
    });

  });
}

export function maxTests(component: any, more){

  errorCheck(component, more.value, more.min, more.max);

  describe(`${component}`, () => {

    beforeEach(()=>{
      spy = jasmine.createSpy('onChange');
      node = document.createElement('div');
      props = {...basicProps, ...more, onChange: spy};
      converted = squelchTS2345(ReactDOM.render(React.createElement(component, {...props}), node));
      const subj = ReactDOM.findDOMNode(converted);
      input = TestUtils.findRenderedDOMComponentWithTag(converted, 'input') as HTMLInputElement;
    });

    it('should have max input value when initial props val > props.max', ()=>{
      const xnode = document.createElement('div');
      const invalidVal = props.max + diff;
      const xprops = {...props, value: invalidVal, onChange: spy};
      const xconverted = squelchTS2345(ReactDOM.render(React.createElement(component, {...xprops}), xnode));
      const xsubj = ReactDOM.findDOMNode(xconverted);
      const xinput = TestUtils.findRenderedDOMComponentWithTag(xconverted, 'input')
      expect(( xinput as HTMLInputElement).value).toBe(String(props.max));
      expect(spy).toHaveBeenCalledWith(props.max);
    });

    it('should have input value == given props.val < max', ()=> {
      expect(input.value).toBe(String(props.value));
    });

    it('should have expected effects when changed value < max and != props.value', ()=>{
      const changeVal = props.max - diff;
      input.value = String(changeVal);
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(changeVal);
      expect(input.value).toBe(String(changeVal));
    });

    it('should have expected effects when changed value < max and == props.value', ()=>{
      const changeVal = props.max - diff;
      input.value = String(changeVal);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(changeVal));
      expect(converted.props.value).toBe(props.value);
      expect(converted.state.value).toBe(changeVal);
      spy.calls.reset();
      input.value = String(props.value);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(props.value));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should have input value == max for changed value > max when entered', ()=>{
      const invalidVal = String(props.max + diff);
      input.value = String(invalidVal);
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(props.max);
      expect(input.value).toBe(invalidVal);
      spy.calls.reset();
      TestUtils.Simulate.keyDown(input, {key:"Enter", keyCode: 13, which: 13});
      expect(input.value).toBe(String(props.max));
      // note duplicative call with props.min
      expect(spy).toHaveBeenCalledWith(props.max);
    });

    it('should have expected effect when valid changed props.value != control value', () => {
      const newPropsValue = props.max - diff;
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newPropsValue}), node));
      expect(component.prototype.render).toHaveBeenCalled();
      expect(input.value).toBe(String(newPropsValue));
      expect(spy).not.toHaveBeenCalledWith(newPropsValue);
    });

    it('should have expected effect for new invalid props.value', () => {
      const newPropsValue = props.max + diff;
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newPropsValue}), node));
      expect(component.prototype.render).toHaveBeenCalled();
      expect(input.value).toBe(String(props.max));
      expect(spy).toHaveBeenCalledWith(props.max);
    });

    it('should have expected effect when changed props.value == control value', () => {
      const newValue = props.max - diff;
      input.value = String(newValue);
      TestUtils.Simulate.change(input);
      expect(input.value).toBe(String(newValue));
      expect(converted.state.value).toBe(newValue);
      expect(converted.props.value).toBe(props.value);
      spy.calls.reset();
      spyOn(component.prototype, 'render').and.callThrough();
      (ReactDOM.render(React.createElement(component, {...props, value: newValue}), node));
      expect(component.prototype.render).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should have input value == max for changed value > max when blurred', ()=>{
      const invalidVal = String(props.max + diff);
      input.value = String(invalidVal);
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalledWith(props.max);
      expect(input.value).toBe(invalidVal);
      spy.calls.reset();
      TestUtils.Simulate.blur(input);
      expect(input.value).toBe(String(props.max));
      // note duplicative call with props.min
      expect(spy).toHaveBeenCalledWith(props.max);
    });

  });
}

