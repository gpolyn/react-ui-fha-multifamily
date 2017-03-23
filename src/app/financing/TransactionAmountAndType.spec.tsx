import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {TransactionAmountAndType} from './TransactionAmountAndType';
import setup from '../shared/TestUtils';

describe('TransactionAmountAndType', () => {
  /*
  xit('initial render', () => {
    const initialValue = 'subsidized';
    const {output} = setup({value: initialValue}, Affordability);
    expect(output.type).toBe('div');
    expect(output.props.id).toBe('affordability');
    ['market', 'affordable', 'subsidized'].forEach((txt, idx) => {
      expect(output.props.children[idx + 1].props.children[0]).toBe(txt);
      expect(output.props.children[idx + 1].type).toBe('label');
      expect(output.props.children[idx + 1].props.children[1].type).toBe('input');
      expect(output.props.children[idx + 1].props.children[1].props.type).toBe('radio');
      expect(output.props.children[idx + 1].props.children[1].props.name).toBe('affordability');
      expect(output.props.children[idx + 1].props.children[1].props.value).toBe(txt);
    });
    expect(output.props.children[3].props.children[1].props.checked).toBe(true);
  });
  xit('should call onChange for select onChange', () => {
    const initProps = {onChange: jasmine.createSpy('onChange')};
    const {output, props} = setup(initProps, Affordability);
    [1, 2, 3].forEach( child => {
      props.onChange.calls.reset();
      output.props.children[child].props.children[1].props.onChange(child);
      expect(props.onChange).toHaveBeenCalledWith(child);
    });
  });
  */
});
