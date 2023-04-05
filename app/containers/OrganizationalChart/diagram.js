/**
 *
 * OrganizationalChart
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DiagramOriginal, {
  createSchema,
  useSchema,
} from 'beautiful-react-diagrams';
// eslint-disable-next-line react/prop-types
export function CustomNode(props, teams) {
  // eslint-disable-next-line react/prop-types
  const { inputs } = props;

  return (
    <div style={{ background: 'rgb(29, 114, 106)', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>VBR Labs</div>

      <div style={{ marginTop: '20px' }}>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: '50px', height: '25px', background: '#1B263B' },
          }),
        )}
      </div>
    </div>
  );
}

export function Diagram({ teams }) {
  const newSchema = createSchema({
    nodes: [
      {
        id: 'node-custom',
        coordinates: [850, 60],
        render: CustomNode,
        inputs: [{ id: 'custom-port-1', alignment: 'left' }],
      },
      ...teams.results.map((team) => ({
        id: team.id,
        content: team.team_name,
        coordinates: [850, 200],
        outputs: [{ id: 'port-1', alignment: 'right' }],
      })),
      // ...teams.results.map((team) => ({
      //   id: team.team_manager.user.id,
      //   content: team.team_manager.user.username,
      //   coordinates: [150, 60],
      //   outputs: [{ id: 'port-2', alignment: 'right' }],
      // })),
    ],
  });
  console.log('newSchema', newSchema);
  const [schema, { onChange }] = useSchema(newSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <DiagramOriginal teams={teams} schema={schema} onChange={onChange} />
    </div>
  );
}

Diagram.propTypes = {
  organizations: PropTypes.any,
  getTeamsPage: PropTypes.func.isRequired,
};

export default Diagram;
