import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import {OverrideableSelectControl} from './OverrideableSelectControl';
import setup from '../shared/TestUtils';

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

const basicProps = {onChange: ()=>{}}
basicProps['data-options'] = ['one', 'two', 'three', 'four'];

describe('OverrideableSelectControl', () => {

  // 0
  it('should have expected initial setup', () => {
    const props = {...basicProps, value: 'two', className: 'some-class', id: 'some-id'};
    const {output} = setup(props, OverrideableSelectControl);
    expect(output.props.className).toBe(props.className);
    expect(output.props.id).toBe(props.id);
    expect(output.props.value).toBe(props.value);
    expect(output.props.children.length).toBe(props['data-options'].length);
  });

  // 1 (HAPPY)
  it('should not re-render when new props.value == control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} value={'three'} />, node);
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
  })

  // (1A1)
  xit('should not re-render when changed props.value == control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    const converted = component as React.Component<any,any>; 
    converted.props.onChange(getChangeEvent('one'));
    ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} value={'one'} />, node);
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
  })

  // (2A1)
  xit('should re-render when unchanged props.value == new control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    const converted = component as React.Component<any,any>; 
    converted.props.onChange(getChangeEvent('one'));
    ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    converted.props.onChange(getChangeEvent('three'));
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props}/>, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  })

  // 15 (HAPPY)
  it('should not re-render when neither control or props values changed ', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
  })

  // 9 (3B1)
  it('should re-render when new props.value !== new control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    const converted = component as React.Component<any,any>; 
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    converted.props.onChange(getChangeEvent('one'));
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
    ReactDOM.render(<OverrideableSelectControl {...props} value={'four'} />, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  })

  // (2B1)
  xit('should re-render when props unchanged and component onChange ', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    const converted = component as React.Component<any,any>; 
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
    converted.props.onChange(getChangeEvent('one'));
    ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  })

  // 10 (3A1)
  it('should re-render when changed props.value === new control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    const component = ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    const converted = component as React.Component<any,any>; 
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    converted.props.onChange(getChangeEvent('one'));
    expect(OverrideableSelectControl.prototype.render).not.toHaveBeenCalled();
    ReactDOM.render(<OverrideableSelectControl {...props} value={'one'} />, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  })

  // 2 (1B1)
  it('should re-render when new props.value != control value', () => {
    const props = {...basicProps, value: 'three'};
    const node = document.createElement('div');
    ReactDOM.render(<OverrideableSelectControl {...props} />, node);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    ReactDOM.render(<OverrideableSelectControl {...props} value={'two'} />, node);
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  })

  // 3 (HAPPY)
  it('should not call props.onChange when new props.value == control value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'two', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    expect(spy).not.toHaveBeenCalled();
    props.value = 'two';
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    expect(spy).not.toHaveBeenCalled();
  })

  // 11 (3A2, 3A3)
  it('should not call props.onChange when new props.value == new control value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    comp.props.onChange(getChangeEvent('two'));
    props.value = 'two';
    spy.calls.reset();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    expect(updatedComp.props.value).toBe('two');
    expect(spy).not.toHaveBeenCalled();
  })

  // 13 (HAPPY)
  it('should not call props.onChange when unchanged props.value == new control value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    expect(spy).not.toHaveBeenCalled();
    comp.props.onChange(getChangeEvent('one'));
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    expect(updatedComp.props.value).toBe('one');
    expect(spy).not.toHaveBeenCalled();
  })

  // 14 (2B2, 2B3)
  xit('should call props.onChange when unchanged props.value != new control value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    expect(spy).not.toHaveBeenCalled();
    comp.props.onChange(getChangeEvent('two'));
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    expect(spy).toHaveBeenCalled();
    expect(updatedComp.props.value).toBe('two');
  })

  // 12 (3B2)
  xit('should not call props.onChange and should adopt new props.value if != new ctrl value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    expect(spy).not.toHaveBeenCalled();
    comp.props.onChange(getChangeEvent('three'));
    props.value = 'two';
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    expect(updatedComp.props.value).toBe('two');
    expect(spy).not.toHaveBeenCalled();
  })

  // (3A2, 3A3)
  it('should not call props.onChange when new props and ctrl vals are equal', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    comp.props.onChange(getChangeEvent('three'));
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    comp.props.onChange(getChangeEvent('two'));
    spy.calls.reset();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, { ...props, value: 'two' }));
    const nextUpdatedComp = shallowRenderer.getRenderOutput();
    expect(nextUpdatedComp.props.value).toBe('two');
    expect(spy).not.toHaveBeenCalled();
  })

  // (2A2, 2A3)
  it('should not call props.onChange when changed ctrl val == props val', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'one', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const comp = shallowRenderer.getRenderOutput();
    comp.props.onChange(getChangeEvent('three'));
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updatedComp = shallowRenderer.getRenderOutput();
    spy.calls.reset();
    comp.props.onChange(getChangeEvent('one'));
    expect(spy).not.toHaveBeenCalled();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const nextUpdatedComp = shallowRenderer.getRenderOutput();
    expect(nextUpdatedComp.props.value).toBe('one');
    expect(spy).not.toHaveBeenCalled();
  })

  // 4 (1B2)
  it('should call props.onChange when new props.value != control value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'two', onChange: spy};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    expect(spy).not.toHaveBeenCalled();
    props.value = 'three'
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    expect(spy).toHaveBeenCalledWith(props.value);
  })

  // 5 (1B3)
  it('should have value === new props.value when new props.value != control value', () => {
    const props = {...basicProps, value: 'two'};
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const output = shallowRenderer.getRenderOutput();
    expect(output.props.value).toBe('two');
    props.value = 'three';
    shallowRenderer.render(React.createElement(OverrideableSelectControl, props));
    const updated = shallowRenderer.getRenderOutput();
    expect(updated.props.value).toBe('three');
  })

  // 6 (2B1)
  it('should re-render when control value changes', () => {
    const props = {...basicProps, value: 'two'};
    const {output} = setup(props, OverrideableSelectControl);
    spyOn(OverrideableSelectControl.prototype, 'render').and.callThrough();
    output.props.onChange(getChangeEvent('three'));
    expect(OverrideableSelectControl.prototype.render).toHaveBeenCalled();
  });

  // 7 (2B2)
  it('should call props.onChange when new control value != props.value', () => {
    const spy = jasmine.createSpy('onChange');
    const props = {...basicProps, value: 'two', onChange: spy};
    const {output} = setup(props, OverrideableSelectControl);
    output.props.onChange(getChangeEvent('three'));
    expect(spy).toHaveBeenCalledWith('three');
  });

  // 8 (2B3)
  it('should change control value to control onChange value', () => {
    const props = {...basicProps, value: 'two'};
    const {output, renderer} = setup(props, OverrideableSelectControl);
    output.props.onChange(getChangeEvent('three'));
    const updated = renderer.getRenderOutput();
    expect(updated.props.value).toBe('three');
  });

});
