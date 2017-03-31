import * as React from 'react';

interface INumericInputProps {
  max?: number;
  min?: number;
  value?: number;
  [index: string]: any;
}

export class MaskedNumericInput extends React.Component<INumericInputProps, any> {

  protected readonly enterKeyCode: number = 13;
  protected minMaxInput: any;

  constructor(props: INumericInputProps) {
    super(props);
    this.maskInput = this.maskInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {value: props.value};
    if (props.min && props.max){
      this.xFormVal = this.xFormWithMinAndMax;
    } else if (props.min)  {
      this.xFormVal = this.xFormWithMin;
    } else if (props.max) {
      this.xFormVal = this.xFormWithMax;
    }
  }

  componentWillMount(){
    if (!Number.isNaN(this.props.value)){
      if (this.props.value < this.props.min){
        this.state.value = this.props.min;
        this.props.onChange(this.props.min);
      } else if (this.props.value > this.props.max){
        this.state.value = this.props.max;
        this.props.onChange(this.props.max);
      }
    }
  }

  protected maskInput(e: any){
    //console.log('MaskedNumericInput#maskInput')
    let val = (e.target.value);
    if (val !=='' && val !== undefined){
      val = Number(val);
    } 
    this.setState(prevState => ({...prevState, value: val}));
  }

  protected xFormVal(val: number) {
    return val;
  }

  protected xFormWithMin(val: number){
    return Math.max(val, this.props.min);
  }

  protected xFormWithMax(val: number){
    return Math.min(val, this.props.max);
  }

  protected xFormWithMinAndMax(val: number){
    return Math.min(this.props.max, Math.max(val, this.props.min));
  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log("MaskedNumericInput#shouldComponentUpdate", this.props.id, {nxtVal: nextState.value, currVal: this.state.value, nxtPropVal: nextProps.value, currPropsVal: this.props.value});
    
    const propsAreSame = nextProps.value === this.props.value;
    const stateIsSame = nextState.value === this.state.value;

    if (propsAreSame && stateIsSame){
      return false;
    }

    if (!stateIsSame){

      if (nextState.value === ''){
        if (nextProps.value !== ''){
          this.props.onChange('');
        }
        return true;
      }

      const xFormedVal = this.xFormVal(nextState.value);

      if (xFormedVal !== this.state.value){
        nextState.value = xFormedVal;
        if (nextProps.value !== xFormedVal){
          this.props.onChange(xFormedVal);
        }
        return true;
      } else if (xFormedVal !== nextProps.value){
        this.props.onChange(xFormedVal);
        return false;
      }
    }

    if (!propsAreSame){
      if (nextProps.value === ''){
        if (nextState.value !== ''){
          nextState.value = '';
          if (this.state.value !== ''){
            this.props.onChange('');
          }
          return true;
        }
        return false;
      }

      const xFormedProp = this.xFormVal(nextProps.value);
      if (xFormedProp != nextState.value){
        nextState.value = xFormedProp;
        this.props.onChange(xFormedProp);
        return true;
      }

    }

    return false;

  }

  protected onKeyDown(e: any){
    if(e.keyCode === this.enterKeyCode) {
      this.updateState(e);
      this.minMaxInput.blur();
    }
  }
  
  protected updateState(e: any){
    let val = e.target.value.trim();
    if (val === '') {
      this.setState(prevState => ( {...prevState, value: val} ))
    } else {
      const xFormedNum = this.xFormVal(Number(val));
      this.setState(prevState => ( {...prevState, value: xFormedNum} ))
    }
  }

  render() {
    console.log('MaskedNumericInput#render');
    return(
      <input {...this.props} ref={(input) => {this.minMaxInput = input;}} onBlur={this.updateState} onKeyDown={this.onKeyDown} type='number' value={this.state.value || ''} onChange={this.maskInput} />
    );
  }

}

export class MinMaxLimitedNumericInput extends MaskedNumericInput {

  constructor(props: INumericInputProps) {
    super(props);
    this.xFormVal = this.xFormWithMinAndMax;
  }

}

export class MinLimitedNumericInput extends MaskedNumericInput {

  constructor(props: INumericInputProps) {
    super(props);
    this.xFormVal = this.xFormWithMin;
  }

}
