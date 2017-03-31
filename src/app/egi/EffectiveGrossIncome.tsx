/// <reference path="../interfaces.d.tsx"/>
import * as React from 'react';
import {MaskedNumericInput, MinMaxLimitedNumericInput} from '../shared/MaskedNumericInput';
import {DollarSpan} from '../shared/DollarSpan';
import {OnChangePayloadObjectInterceptor} from '../shared/OnChangePayloadObjectInterceptor';

export class EffectiveGrossIncome extends React.Component<IEffectiveGrossIncome, any> {

  constructor(props: any){
    super(props);
    this.state = {occupancyPercent: props.occupancyPercent}
    this.onChange = this.onChange.bind(this);
  }

  onChange(data: any){
    //console.log('EffectiveGrossIncome#onChange', data);
    this.setState(prevState => ({...prevState, ...data}));
    this.props.onChange({[this.props.name]: data});
  }

  private fmt(num: number){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$$1,");
  };

  render() {
    //console.log('EffectiveGrossIncome#render', this.props);
    return (
      <div id={this.props.containerId} className='income'>
        <div>
          <div className='left'>gross {this.props.type}</div>
          <div className='right'>
            <DollarSpan value={this.props.grossIncome} />
          </div>
        </div>
        <div>
          <div className='left'>
            <label htmlFor=''>
              occupancy rate
            </label>
          </div>
          <div className='right'>
            <MinMaxLimitedNumericInput
              max={this.props.maxOccupancyPercent}
              id={this.props.inputId}
              className={this.props.inputClassName}
              min={0}
              onChange={this.onChange}
              value={this.state.occupancyPercent}
              />
          </div>
        </div>
        <div>
          <div className='left'>{this.props.type} income</div>
          <div className='right'>
            <DollarSpan value={this.props.egi} />
          </div>
        </div>
      </div>
    )
  }
}
