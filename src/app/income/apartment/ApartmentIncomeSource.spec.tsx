/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ApartmentIncomeSource} from './ApartmentIncomeSource';

function setup(propOverrides: any) {
  const props = Object.assign({
    onDelete: jasmine.createSpy('onDelete'),
    squareFeet: 420,
    monthlyRent: 503,
    units: 53,
    incomeSourceContainerName: 'apartment-income',
    bedroomCount: 1
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<ApartmentIncomeSource {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ApartmentIncomeSource', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('div');
    expect(output.props.className).toBe(props.incomeSourceContainerName);
    const [bedroomCount, units, squareFeet, rent, deleteBtn] = output.props.children;

    expect(units.type).toBe('div');
    expect(units.props.className).toBe('unit-count');
    expect(units.props.children.type).toBe('div');
    const unitsContent = units.props.children.props;
    expect(unitsContent.className).toBe('display');
    expect(unitsContent.children).toBe(props.units);

    expect(bedroomCount.type).toBe('div');
    expect(bedroomCount.props.className).toBe('bedroom-count');
    expect(bedroomCount.props.children.type).toBe('div');
    const bedroomCountContent = bedroomCount.props.children.props;
    expect(bedroomCountContent.className).toBe('display');
    expect(bedroomCountContent.children).toBe(props.bedroomCount);

    expect(squareFeet.type).toBe('div');
    expect(squareFeet.props.className).toBe('square-feet');
    expect(squareFeet.props.children.type).toBe('div');
    const squareFeetContent = squareFeet.props.children.props;
    expect(squareFeetContent.className).toBe('display');
    expect(squareFeetContent.children).toBe(props.squareFeet);

    expect(rent.type).toBe('div');
    expect(rent.props.className).toBe('monthly-rent');
    expect(rent.props.children.type).toBe('div');
    const rentContent = rent.props.children.props;
    expect(rentContent.className).toBe('display');
    expect(rentContent.children).toBe(props.monthlyRent);

    expect(deleteBtn.type).toBe('div');
    expect(deleteBtn.props.className).toBe('delete-container');
    expect(deleteBtn.props.children.type).toBe('button');
    const deleteContent = deleteBtn.props.children.props;
    const expectedClassNames = 'apartment-income-destroy destroy-item';
    expect(deleteContent.className).toBe(expectedClassNames);
  });

  it('should call onDelete for delete button onClick', () => {
    const {props, output} = setup({});
    const [, , , , deleteBtn] = output.props.children;
    deleteBtn.props.children.props.onClick();
    expect(props.onDelete).toHaveBeenCalled();
  });
});
