import * as React from 'react';
import {OverrideableCheckboxControl} from './shared/OverrideableCheckboxControl';

export class SharedCheckboxContainer extends React.Component<any, any> {

  private currentValue: any;

  constructor(props: any) {
    super(props);
    this.masterChange = this.masterChange.bind(this);
    this.sharedInputHandler = this.sharedInputHandler.bind(this);
    this.currVal = this.currVal.bind(this);
    this.currentValue = props.value || '';
    this.state = {value: props.value};
  }

  protected sharedInputHandler(e: any){
    console.log('input from child', e);
  }

  currVal(){
    return this.currentValue;
  }

  masterChange(e: any) {
    const val = e.target.checked;
    console.log('master changed', val)
    this.currentValue = val;
    this.setState(prevState => ({...prevState, value: val}));
  }

  render() {
    console.log('SharedInputContainer#render')
    const options = ['fart', 'wet', 'gr8'];
    return(
      <div id='pair-1'>
        <label>dependent input 1
          <OverrideableCheckboxControl onChange={this.sharedInputHandler} value={this.currVal()} />
        </label>
        <label>master input 1
          <input type='checkbox' onChange={this.masterChange} />
        </label>
      </div>
    );
  }
}
