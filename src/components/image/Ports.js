import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Ports = ({ports, handlePortChange}) => {
  const [portsState, setPortsState] = useState(ports.map(port => {
    return {...port, exposeToHost: false}
  }));

  const handlePortsStateChange = (e, portId, type) => {
    const changedValue = type === 'exposeToHost' ? e.target.checked : e.target.value;
    let changedPort = portsState.find(port => port.id === portId);
    const otherPorts = portsState.filter(port => port.id !== portId);
    changedPort = { ...changedPort, [type]: changedValue };
    const ports = (otherPorts.length ? [...otherPorts, changedPort] : [changedPort]).sort((a, b) => a.id - b.id);
    setPortsState(ports);
    handlePortChange(ports);
  }

  return (
    <>
      {portsState && portsState.length ? portsState.map(port => {
      return (
        <div key={port.id} className={port.exposeToHost ? 'ports-checked' : 'ports'}>
          <TextField
          className="port-item"
          label="Port exposed to other containers"
          value={port.outward}
          onChange={(e) => handlePortsStateChange(e, port.id, 'outward')}
          id={port.id + ''}
          style={{gridArea: "port-outward"}}
          />
          <FormControlLabel
          className="port-item"
          control={
            <Checkbox onChange={(e) => handlePortsStateChange(e, port.id, 'exposeToHost')}/>
          }
          label="Publish port to host"
          style={{gridArea: "port-switch"}}
          />
          {port.exposeToHost ? (
            <TextField
              className="port-item"
              label="Port exposed to host"
              value={port.inward}
              onChange={(e) => handlePortsStateChange(e, port.id, 'inward')}
              id={port.id + ''}
              style={{gridArea: "port-inward"}}
            />
          ) : null}
        </div>
      )
    }) : null}
    </>
  );
}

export default Ports;