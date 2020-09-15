import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Ports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ports: this.props.ports.map(port => {
        return {
          ...port,
          exposeToHost: false
        }
      })
    }
    this.handlePortChange = this.handlePortChange.bind(this);
  }

  componentDidMount() {
    this.props.handlePortChange(this.props.ports);
  }

  handlePortChange(e, portId, type) {
    const changedValue = type === 'exposeToHost' ? e.target.checked : e.target.value;
    let changedPort = this.state.ports.find(port => port.id === portId);
    const otherPorts = this.state.ports.filter(port => port.id !== portId);
    changedPort = { ...changedPort, [type]: changedValue };
    const ports = (otherPorts.length ? [...otherPorts, changedPort] : [changedPort]).sort((a, b) => a.id - b.id);
    this.setState({
      ports
    });
    this.props.handlePortChange(ports);
  }

  render() {
    const portList = this.state.ports.map(port => {
      return (
        <div key={port.id} className={port.exposeToHost ? 'ports-checked' : 'ports'}>
          <TextField
            className="port-item"
            label="Port exposed to other containers"
            value={port.outward}
            onChange={(e) => this.handlePortChange(e, port.id, 'outward')}
            id={port.id + ''}
            style={{gridArea: "port-outward"}}
          />
          <FormControlLabel
            className="port-item"
            control={
              <Checkbox onChange={(e) => this.handlePortChange(e, port.id, 'exposeToHost')}/>
            }
            label="Publish port to host"
            style={{gridArea: "port-switch"}}
          />
          {port.exposeToHost ? (
            <TextField
              className="port-item"
              label="Port exposed to host"
              value={port.inward}
              onChange={(e) => this.handlePortChange(e, port.id, 'inward')}
              id={port.id + ''}
              style={{gridArea: "port-inward"}}
            />
          ) : null}
        </div>
      )
    });

    return (
      <>
        {portList}
      </>
    );
  }
}

export default Ports;