import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from '../src/TextareaAutosize';
import withAutosize from '../src/AutosizeHOC';

const MyTextarea = ({ autosizeRef, ...options }) => (
  <textarea className='my_custon_texarea' {...options} ref={autosizeRef} />
);

const MyTextareaAutosize = withAutosize(MyTextarea);

class Example extends React.Component {

  componentDidMount() {
    this.my_textarea.focus();
    // document.querySelector("#my-textarea").focus();
  }

  textareaStyle = {
    width: 300,
    padding: '10px 8px',
    border: '1px solid rgba(39, 41, 43, .15)',
    borderRadius: 4,
    fontSize: 15
  }

  onResize = (event) => {
    console.log(event); // eslint-disable-line no-console
  }

  render() {
    return (
      <div style={{ fontFamily: 'sans-serif', margin: 15 }}>
        <h2>MyTextarea</h2>
        <MyTextareaAutosize
          autosizeRef={ref => this.my_textarea = ref}
          placeholder='My hoc textarea'
        />
        <h2>{'Plain "<TextareaAutosize />"'}</h2>
        <TextareaAutosize
          style={this.textareaStyle}
          placeholder='try writing some lines'
          onResize={this.onResize}
        />

        <h2>Minimum height is 3 "rows"</h2>
        <TextareaAutosize
          rows={3}
          style={this.textareaStyle}
          placeholder='minimun height is 3 rows'
        />

        <h2>Maximum height is 3 "rows"</h2>
        <TextareaAutosize
          maxRows={3}
          style={this.textareaStyle}
          placeholder='maximum height is 5 rows'
          defaultValue={'this\nis\na\nlong\ninitial\ntext'}
        />

        <h2>Prefilled with initial value</h2>
        <TextareaAutosize
          style={this.textareaStyle}
          defaultValue={'this\nis\na\nlong\ninitial\ntext'}
        />

        <h2>{'You can compare with this normal react "<textarea />""'}</h2>
        <textarea
          style={this.textareaStyle}
          defaultValue={'this\nis\na\nlong\ninitial\ntext'}
        />
      </div>
    );
  }

}

ReactDOM.render(<Example />, document.getElementById('container'));
