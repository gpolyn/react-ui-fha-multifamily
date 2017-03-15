import * as React from 'react';

export class ElevatorStatus extends React.PureComponent<any, any> {
  render() {
    const options = ['true', 'false'].map(opt =>
      <option key={opt} value={opt}>{opt}</option>
    );
    return (
      <div id='elevator-status'>
          project has elevator?
        <select id='elevator-status' name='is_elevator_project' value={this.props.value} onChange={this.props.onChange}>
          {options}
        </select>
      </div>
    );
  }
}
