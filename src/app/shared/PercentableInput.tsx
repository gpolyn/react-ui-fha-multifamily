import * as React from 'react';
import {MinMaxLimitedNumericInput} from './MaskedNumericInput';

export class PercentableInput extends React.Component<any, any> {

  private child: any;

  constructor(props: any){
    super(props);
    this.child = React.Children.only(props.children);
  }

  render() {
    console.log('PercentableInput#render', this.props)
    const {onChange, isPercent, value} = this.props;
    const childWithProps = React.cloneElement(this.props.children, {value: value, onChange: onChange});
    const percentNumericInput = React.createElement(MinMaxLimitedNumericInput,{...this.child.props, onChange: onChange, min: 0, max:100, value: value});

    if (isPercent){
      return percentNumericInput;
    } else {
      return React.Children.only(childWithProps);
    }
  }

}
