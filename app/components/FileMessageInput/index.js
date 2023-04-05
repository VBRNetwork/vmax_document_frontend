/* eslint-disable no-unused-vars */
/**
 *
 * FileMessageInput
 *
 */

import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './styles.css';

function FileMessageInput({ files, handleRemoveFile }) {
  const { useEffect } = React;

  const getPrettyFileName = file => {
    const splited = file.split('/');
    return splited[splited.length - 1];
  };
  useEffect(() => {
    console.log('files', files);
  }, [files]);

  return (
    <div className="inputContainer">
      <div className="files">
        {files &&
          files.map((file, index) => (
            <div className="file" key={[index]}>
              <div className="content">
                <Icon name="file" />
                <span className="name">{getPrettyFileName(file.name)}</span>
              </div>
              <Icon
                name="trash"
                className="trash"
                onClick={() => handleRemoveFile(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

FileMessageInput.propTypes = {
  files: PropTypes.func,
  handleRemoveFile: PropTypes.func,
};

export default memo(FileMessageInput, isEqual);
