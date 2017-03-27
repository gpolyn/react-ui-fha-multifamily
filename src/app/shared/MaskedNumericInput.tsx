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

    if (this.props.value !== nextProps.value){
      /*
      if (typeof(nextProps.value) === 'string') {
        const trimmed = nextProps.value.trim();
        if (trimmed === '' && typeof(nextState.value) === 'number'){
          nextState.value = undefined;
          return true;
        } else {
        */
          const nextPropsNum = Number(nextProps.value);
          if (!isNaN(nextPropsNum)) {
            const xFormedNewPropVal = this.xFormVal(nextPropsNum);
            if (xFormedNewPropVal !== nextPropsNum) {
              this.props.onChange(xFormedNewPropVal);
            }
            if (nextState.value !== xFormedNewPropVal){
              nextState.value = xFormedNewPropVal;
              return true;
            }
          }
          /*
        }
      }
      */
    }

    let xFormedStateVal;

    if (nextState.value === ''){
      xFormedStateVal = '';
    } else {
      xFormedStateVal = this.xFormVal(nextState.value);
      if (Number.isNaN(xFormedStateVal)){
        return false;
      }
    }

    if (this.state.value !== xFormedStateVal) {
      this.state.value = xFormedStateVal;

      if (xFormedStateVal !== nextProps.value){
        if (xFormedStateVal === ''){
          this.props.onChange(xFormedStateVal);
          return true;
        }

        if (typeof(nextProps.value) === 'string') {

          const trimmed = nextProps.value.trim();

          if (trimmed === '') {
            this.props.onChange(trimmed);
          } else {
            const nextPropsNum = Number(nextProps.value);

            if (!isNaN(nextPropsNum) && (nextPropsNum !== xFormedStateVal)) {
              this.props.onChange(xFormedStateVal);
            }
          }
        } else if (nextProps.value !== xFormedStateVal) {
          this.props.onChange(xFormedStateVal);
        }
      }

      return true;
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
    console.log('MaskedNumericInput for ', this.props.id, this.props);
    this.xFormVal = this.xFormWithMinAndMax;
  }

}
