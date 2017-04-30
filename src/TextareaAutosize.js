import React from 'react';
import PropTypes from 'prop-types';
import withAutosize from './AutosizeHOC';

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 */

const Textarea = ({ autosizeRef, ...options }) => (
  <textarea {...options} ref={autosizeRef} />
);
const TextareaAutosize = withAutosize(Textarea);

TextareaAutosize.propTypes = {
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  onResize: PropTypes.func
};

export default TextareaAutosize;
