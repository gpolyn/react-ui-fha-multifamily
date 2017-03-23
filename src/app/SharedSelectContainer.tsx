import * as React from 'react';
import {OverrideableSelectControl} from './shared/OverrideableSelectControl';

export class SharedSelectContainer extends React.Component<any, any> {

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
    const val = e.target.value;
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
          <OverrideableSelectControl data-options={options} onChange={this.sharedInputHandler} value={this.currVal()} />
        </label>
        <label>master input 1
          <select onChange={this.masterChange}>
            {options.map(opt =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
        </label>
      </div>
    );
  }
}
