/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeSource} from './OtherIncomeSource';

const initialSquareFeet = 420;
const initialMonthlyRent = 503;
const initialUsage = 'fart';

function setup(propOverrides: any) {
  const props = Object.assign({
    onDelete: jasmine.createSpy('onDelete'),
    squareFeet: initialSquareFeet,
    monthlyRent: initialMonthlyRent,
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
    expect(output.props.className).toBe('other-income');
    const [usage, squareFeet, rent] = output.props.children;

    expect(usage.type).toBe('div');
    expect(usage.props.className).toBe('usage');
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
  });

  it('should call onDelete for button onClick', () => {
    const {props, output} = setup({});
    output.props.children[3].props.children.props.onClick();
    expect(props.onDelete).toHaveBeenCalled();
  });
});
