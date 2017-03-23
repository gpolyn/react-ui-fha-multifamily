import * as React from 'react';
import {MaskedNumericInput, MinMaxLimitedNumericInput} from './MaskedNumericInput';
import {OverrideableCheckboxControl} from './OverrideableCheckboxControl';

export class MaskedNumericIsPercentInput extends React.Component<any, any> {

  constructor(props: any){
    super(props);
    this.state = {
      value: props.value,
      isPercent: ( typeof(props.isPercent) === 'boolean' ? props.isPercent : false ),
      min: (props.isPercent ? 0 : undefined),
      max: (props.isPercent ? 100 : undefined)
    };
    this.onPercentChange = this.onPercentChange.bind(this);
    this.onNumericChange = this.onNumericChange.bind(this);
  }

  onNumericChange(val: number){
    this.state.value = val;
    this.props.onChange({isPercent: this.state.isPercent, numericValue: val});
  }

  onPercentChange(e: any){
    console.log('onPercentChange', e);

    const isPercent = !this.state.isPercent;

    if (isPercent && !(this.state.value < 0 || this.state.value > 100)) {
      
      let min = undefined;
      let max = undefined;

      if (isPercent) {
        min = 0;
        max = 100;
      }
      this.setState(prevState => ( {...prevState, isPercent: isPercent, min: min, max: max} ));
      this.props.onChange({isPercent: isPercent, numericValue: this.state.value});
    } else if (!isPercent){
      this.setState({isPercent: isPercent });
      this.props.onChange({isPercent: isPercent, numericValue: this.state.value});
    } else {
      this.setState({isPercent: ( !isPercent )});
    }
  }

  render (){

    const {onChange} = this.props;
    const isPercent = this.state.isPercent;

    const percentNumericInput = React.createElement(MinMaxLimitedNumericInput, {id: this.props.numericInputId, onChange:this.onNumericChange, min: 0, max:100, value: this.state.value});

    const numericInput = React.createElement(MaskedNumericInput, {id: this.props.numericInputId, onChange: this.onNumericChange, value: this.state.value});

    const whichInput = this.state.isPercent ? percentNumericInput : numericInput;

    return(
      <div>
        <label>{this.props.numericInputLabel}
          {whichInput}
        </label>
        <label>
          <OverrideableCheckboxControl id={this.props.isPercentId} onChange={this.onPercentChange} value={this.state.isPercent} />
        is %
        </label>
      </div>
    );
  }
}
