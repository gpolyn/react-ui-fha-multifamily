/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ParkingIncomeSource} from './ParkingIncomeSource';

function setup(propOverrides: any) {
  const props = Object.assign({
    onDelete: jasmine.createSpy('onDelete'),
    totalSquareFeet: 420,
    monthlyFee: 503,
    spaces: 53,
    incomeSourceContainerName: 'parking-income',
    isIndoor: true
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<ParkingIncomeSource {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ParkingIncomeSource', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('div');
    expect(output.props.className).toBe(props.incomeSourceContainerName);
    const [spaces, isIndoor, squareFeet, fee, deleteBtn] = output.props.children;

    expect(spaces.type).toBe('div');
    expect(spaces.props.className).toBe('spaces');
    expect(spaces.props.children.type).toBe('div');
    const spacesContent = spaces.props.children.props;
    expect(spacesContent.className).toBe('display');
    expect(spacesContent.children).toBe(props.spaces);

    expect(isIndoor.type).toBe('div');
    expect(isIndoor.props.className).toBe('indoor-or-outdoor');
    expect(isIndoor.props.children.type).toBe('div');
    const parkingStyleContent = isIndoor.props.children.props;
    expect(parkingStyleContent.className).toBe('display');
    expect(parkingStyleContent.children).toBe('indoor');

    expect(squareFeet.type).toBe('div');
    expect(squareFeet.props.className).toBe('total-square-feet');
    expect(squareFeet.props.children.type).toBe('div');
    const squareFeetContent = squareFeet.props.children.props;
    expect(squareFeetContent.className).toBe('display');
    expect(squareFeetContent.children).toBe(props.totalSquareFeet);

    expect(fee.type).toBe('div');
    expect(fee.props.className).toBe('monthly-fee');
    expect(fee.props.children.type).toBe('div');
    const feeContent = fee.props.children.props;
    expect(feeContent.className).toBe('display');
    expect(feeContent.children).toBe(props.monthlyFee);

    expect(deleteBtn.type).toBe('div');
    expect(deleteBtn.props.className).toBe('delete-container');
    expect(deleteBtn.props.children.type).toBe('button');
    const deleteContent = deleteBtn.props.children.props;
    const expectedClassNames = 'parking-income-destroy destroy-item';
    expect(deleteContent.className).toBe(expectedClassNames);
  });

  it('should call onDelete for delete button onClick', () => {
    const {props, output} = setup({});
    const [, , , , deleteBtn] = output.props.children;
    deleteBtn.props.children.props.onClick();
    expect(props.onDelete).toHaveBeenCalled();
  });
});
