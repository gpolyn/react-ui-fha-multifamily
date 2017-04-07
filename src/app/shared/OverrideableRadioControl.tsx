import * as React from 'react';

export class OverrideableRadioControl extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {value: props.value};
    this.onChange = this.onChange.bind(this);
  }

  protected onChange(e: any){
    let val = e.target.value;
    this.setState(prevState => ({...prevState, value: val}));
  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log('shouldComponentUpdate', {nxt: nextState.value, curr: this.state.value, nxtProps: nextProps.value, currProps: this.props.value});
    
    if (nextState.value === nextProps.value){
      return false;
    } else {
      this.state.value = nextProps.value;
      this.props.onChange(nextState.value);
    }

    return true;

  }

  render() {
    // console.log("OverrideableRadioControl#render")
    const options = this.props['data-options'];
    const controlName = this.props.name;
    const containerText = this.props['data-containerText'];
    const optionEles = options.map(opt =>
      <label key={opt.value}>
        {opt.label}
        <input type='radio' id={opt.id} name={controlName} value={opt.value} checked={this.state.value === opt.value} />
      </label>
    );
    return(
      <div {...this.props} onChange={this.onChange}>
        {containerText}&nbsp;
        {optionEles}
      </div>
    );
  }

}
