import * as React from 'react';
import {MinMaxLimitedNumericInput} from './MaskedNumericInput';

export class PercentableInput extends React.Component<any, any> {

  constructor(props: any){
    super(props);
  }

  render() {
    console.log('PercentableInput#render', this.props)
    const {onChange, isPercent, value} = this.props;
    const childWithProps = React.cloneElement(this.props.children, {value: value, onChange: onChange});
    const percentNumericInput = React.createElement(MinMaxLimitedNumericInput, {onChange: onChange, min: 0, max:100, value: value});

    if (isPercent){
      return percentNumericInput;
    } else {
      return React.Children.only(childWithProps);
    }
  }

}
