/**
 *
 * SidebarMenu
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
} from 'semantic-ui-react';
import './sidebar.css';
import { Link } from 'react-router-dom';

function SidebarMenu({ children }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Grid style={{ paddingTop: '80px' }} columns={1}>
        <Grid.Column>
          <Button
            onClick={() => setVisible(true)}
            style={{ background: '#FFF' }}
          >
            <Icon
              style={{ color: 'rgb(29, 114, 106)' }}
              size="big"
              name="list"
            />
          </Button>
        </Grid.Column>

        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item as={Link} to="/">
                <Icon
                  style={{ color: 'rgb(29, 114, 106)' }}
                  name="block layout"
                />
                Main
              </Menu.Item>
              <Menu.Item as={Link} to="/organizational-chart">
                <Icon style={{ color: 'rgb(29, 114, 106)' }} name="gamepad" />
                Organization
              </Menu.Item>
              <Menu.Item as={Link} to="/payroll">
                <Icon style={{ color: 'rgb(29, 114, 106)' }} name="camera" />
                Payroll
              </Menu.Item>
              <Menu.Item as={Link} to="/human-resources">
                <Icon style={{ color: 'rgb(29, 114, 106)' }} name="camera" />
                Human Resources
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>{children}</Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    </>
  );
}

SidebarMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(SidebarMenu);
