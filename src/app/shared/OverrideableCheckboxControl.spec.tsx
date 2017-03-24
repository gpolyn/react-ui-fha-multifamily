import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import {OverrideableCheckboxControl} from './OverrideableCheckboxControl';
import setup from '../shared/TestUtils';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

const financing = squelchTS2345(TestUtils.renderIntoDocument(<OverrideableCheckboxControl />));
const divs = TestUtils.scryRenderedDOMComponentsWithTag(financing, 'DIV');
const inputs = TestUtils.scryRenderedDOMComponentsWithTag(financing, 'input')

describe('OverrideableCheckboxControl', () => {

  it('should have expected initial setup', () => {
    const props = {className: 'some-class', id: 'some-id'};
    const subj = squelchTS2345(TestUtils.renderIntoDocument(<OverrideableCheckboxControl { ...props} />));
    const input = TestUtils.findRenderedDOMComponentWithTag(subj, 'input');
    expect(input.className).toBe(props.className);
    expect(input.id).toBe(props.id);
    expect(input.checked).toBe(false);
  });

  it('should have expected initial setup', () => {
    const props = {className: 'some-class', id: 'some-id'};
    const {output} = setup(props, OverrideableCheckboxControl);
    expect(output.props.className).toBe(props.className);
    expect(output.props.id).toBe(props.id);
    expect(output.props.checked).toBe(false);
  });

  it('should have expected initial setup when props.value is false', () => {
    const initProps = {value: false};
    const {output} = setup(initProps, OverrideableCheckboxControl);
    expect(output.props.checked).toBe(false);
  });

  it('should have expected initial setup when props.value is true', () => {
    const initProps = {value: true};
    const {output} = setup(initProps, OverrideableCheckboxControl);
    expect(output.props.checked).toBe(true);
  });

  it('should not re-render when new props.value == control value', () => {
    const node = document.createElement('div');
    ReactDOM.render(<OverrideableCheckboxControl value={true} />, node);
    spyOn(OverrideableCheckboxControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableCheckboxControl value={true} />, node);
    expect(OverrideableCheckboxControl.prototype.render).not.toHaveBeenCalled();
  })

  it('should re-render when new props.value != control value', () => {
    const node = document.createElement('div');
    ReactDOM.render(<OverrideableCheckboxControl value={true} />, node);
    spyOn(OverrideableCheckboxControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableCheckboxControl value={false} />, node);
    expect(OverrideableCheckboxControl.prototype.render).toHaveBeenCalled();
  })

  it('should not call props.onChange when new props.value == control value', () => {
    const spy = jasmine.createSpy('onChange');
    const initProps = {value: true, onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, initProps));
    expect(spy).not.toHaveBeenCalled();
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, initProps));
    expect(spy).not.toHaveBeenCalled();
  })

  xit('should call props.onChange when new props.value != control value', () => {
    const spy = jasmine.createSpy('onChange');
    const initProps = {value: true, onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, initProps));
    expect(spy).not.toHaveBeenCalled();
    initProps.value = false
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, initProps));
    expect(spy).toHaveBeenCalled();
  })

  it('should toggle checked when new props.value != control value', () => {
    const props = {value: true};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, props));
    const output = shallowRenderer.getRenderOutput();
    expect(output.props.checked).toBe(true);
    props.value = false;
    shallowRenderer.render(React.createElement(OverrideableCheckboxControl, props));
    const updated = shallowRenderer.getRenderOutput();
    expect(updated.props.checked).toBe(false);
  })

  it('should re-render when control value changes', () => {
    const initProps = {onChange: ()=>{}};
    const {output} = setup(initProps, OverrideableCheckboxControl);
    spyOn(OverrideableCheckboxControl.prototype, 'render').and.callThrough();
    output.props.onChange();
    expect(OverrideableCheckboxControl.prototype.render).toHaveBeenCalled();
  });

  it('should call props.onChange when new control value != props.value', () => {
    const spy = jasmine.createSpy('onChange');
    const initProps = {value: true, onChange: spy};
    const {output} = setup(initProps, OverrideableCheckboxControl);
    output.props.onChange();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should toggle checked value after control onChange', () => {
    const initProps = {value: true, onChange: () => {}};
    const {output, renderer} = setup(initProps, OverrideableCheckboxControl);
    output.props.onChange();
    const updated = renderer.getRenderOutput();
    expect(updated.props.checked).toBe(false);
  });

  it('should render when new props.value differs from control value');

  it('should not call props.onChange when new props.value equals control value');

  it('should render when control value changes');

  it('should call props.onChange when props.value differs from new control value');

});
