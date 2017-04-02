/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeSource} from './OtherIncomeSource';

function setup(propOverrides: any) {
  const props = Object.assign({
    onDelete: jasmine.createSpy('onDelete'),
    squareFeet: 420,
    monthlyRent: 503,
    incomeSourceContainerName: 'other-residential-income',
    usage: 'kart'
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<OtherIncomeSource {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('OtherIncomeSource', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('tr');
    expect(output.props.className).toBe(props.incomeSourceContainerName);
    const [usage, squareFeet, rent, deleteBtn] = output.props.children;

    expect(usage.type).toBe('td');
    expect(usage.props.className).toBe('use');
    expect(usage.props.children.type).toBe('div');
    const usageContent = usage.props.children.props;
    expect(usageContent.className).toBe('display');
    expect(usageContent.children).toBe(props.usage);

    expect(squareFeet.type).toBe('td');
    expect(squareFeet.props.className).toBe('square-feet');
    expect(squareFeet.props.children.type).toBe('div');
    const squareFeetContent = squareFeet.props.children.props;
    expect(squareFeetContent.className).toBe('display');
    expect(squareFeetContent.children).toBe(props.squareFeet);
    expect(rent.type).toBe('td');
    expect(rent.props.className).toBe('monthly-rent');
    expect(rent.props.children.type).toBe('div');
    const rentContent = rent.props.children.props;
    expect(rentContent.className).toBe('display');
    expect(rentContent.children).toBe(props.monthlyRent);

    expect(deleteBtn.type).toBe('td');
    const innerDiv = deleteBtn.props.children;
    expect(innerDiv.props.className).toBe('delete-container');
    expect(innerDiv.props.children.type).toBe('button');
    const deleteContent = innerDiv.props.children.props;
    const expectedClassNames = 'simple-income-source-destroy destroy-item';
    expect(deleteContent.className).toBe(expectedClassNames);
  });

  it('should call onDelete for delete button onClick', () => {
    const {props, output} = setup({});
    const [, , , deleteCtr] = output.props.children;
    const deleteBtn = deleteCtr.props.children;
    deleteBtn.props.children.props.onClick();
    expect(props.onDelete).toHaveBeenCalled();
  });

});
