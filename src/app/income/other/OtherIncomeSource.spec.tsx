/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeSource} from './OtherIncomeSource';

const initialSquareFeet = 420;
const initialMonthlyRent = 503;
const initialUsage = 'kart';
const containerClassName = 'other-income';

function setup(propOverrides: any) {
  const props = Object.assign({
    onDelete: jasmine.createSpy('onDelete'),
    squareFeet: initialSquareFeet,
    monthlyRent: initialMonthlyRent,
    containerClassName: containerClassName,
    usage: initialUsage
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
    const {output} = setup({});
    expect(output.type).toBe('div');
    expect(output.props.className).toBe(containerClassName);
    const [usage, squareFeet, rent, deleteBtn] = output.props.children;

    expect(usage.type).toBe('div');
    expect(usage.props.className).toBe('use');
    expect(usage.props.children.type).toBe('div');
    const usageContent = usage.props.children.props;
    expect(usageContent.className).toBe('display');
    expect(usageContent.children).toBe(initialUsage);

    expect(squareFeet.type).toBe('div');
    expect(squareFeet.props.className).toBe('square-feet');
    expect(squareFeet.props.children.type).toBe('div');
    const squareFeetContent = squareFeet.props.children.props;
    expect(squareFeetContent.className).toBe('display');
    expect(squareFeetContent.children).toBe(initialSquareFeet);

    expect(rent.type).toBe('div');
    expect(rent.props.className).toBe('monthly-rent');
    expect(rent.props.children.type).toBe('div');
    const rentContent = rent.props.children.props;
    expect(rentContent.className).toBe('display');
    expect(rentContent.children).toBe(initialMonthlyRent);

    expect(deleteBtn.type).toBe('div');
    expect(deleteBtn.props.className).toBe('delete-container');
    expect(deleteBtn.props.children.type).toBe('button');
    const deleteContent = deleteBtn.props.children.props;
    const expectedClassNames = 'simple-income-source-destroy destroy-item';
    expect(deleteContent.className).toBe(expectedClassNames);
  });

  it('should call onDelete for delete button onClick', () => {
    const {props, output} = setup({});
    const [, , , deleteBtn] = output.props.children;
    deleteBtn.props.children.props.onClick();
    expect(props.onDelete).toHaveBeenCalled();
  });
});
