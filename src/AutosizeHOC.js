import React from 'react';
import ReactDOM from 'react-dom';
import autosize from 'autosize';

const UPDATE = 'autosize:update',
  DESTROY = 'autosize:destroy',
  RESIZED = 'autosize:resized';

const withAutosize = (TextareaComponent) => (
  class AutosizeHOC extends React.Component {

    static defaultProps = {
      rows: 1
    };

    state = {
      maxHeight: null
    }

    componentDidMount() {
      const { value, defaultValue, onResize } = this.props;
      this.textarea = ReactDOM.findDOMNode(this);
      autosize(this.textarea);

      if (this.hasReachedMaxRows(value || defaultValue)) {
        this.updateMaxHeight(value || defaultValue);

        // this trick is needed to force "autosize" to activate the scrollbar
        this.dispatchEvent(DESTROY);
        setTimeout(() => autosize(this.textarea));
      }

      if (onResize) {
        this.textarea.addEventListener(RESIZED, this.props.onResize);
      }
    }

    componentWillUnmount() {
      if (this.props.onResize) {
        this.textarea.removeEventListener(RESIZED, this.props.onResize);
      }
      this.dispatchEvent(DESTROY);
    }

    dispatchEvent = (EVENT_TYPE) => {
      const event = document.createEvent('Event');
      event.initEvent(EVENT_TYPE, true, false);

      this.textarea.dispatchEvent(event);
    };

    getValue = ({ valueLink, value }) => valueLink ? valueLink.value : value;

    hasReachedMaxRows = (value) => {
      const { maxRows } = this.props;

      const numberOfRows = (value || '').split('\n').length;

      return numberOfRows >= parseInt(maxRows);
    }

    updateMaxHeight = (value) => {
      const {
        props: { maxRows },
        state: { maxHeight }
      } = this;

      const hasReachedMaxRows = this.hasReachedMaxRows(value);

      if (!maxHeight && hasReachedMaxRows) {
        const numberOfRows = (value || '').split('\n').length;
        const computedStyle = window.getComputedStyle(this.textarea);

        const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
        const paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
        const verticalPadding = (paddingTop || 0) + (paddingBottom || 0);

        const borderTopWidth = parseInt(computedStyle.getPropertyValue('border-top-width'), 10);
        const borderBottomWidth =
          parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
        const verticalBorderWidth = (borderTopWidth || 0) + (borderBottomWidth || 0);

        const height = this.textarea.offsetHeight - verticalPadding - verticalBorderWidth;

        this.setState({
          maxHeight: height / numberOfRows * maxRows
        });

        return true;
      } else if (maxHeight && !hasReachedMaxRows) {
        this.setState({ maxHeight: null });

        return false;
      }

    }

    onChange = event => {
      this.updateMaxHeight(event.target.value);
      this.props.onChange && this.props.onChange(event);
    }

    getLocals = () => {
      const {
        props: { onRef, onResize, maxRows, onChange, style, ...props }, // eslint-disable-line no-unused-vars
        state: { maxHeight }
      } = this;

      return {
        ...props,
        style: maxHeight ? { ...style, maxHeight } : style,
        onChange: this.onChange
      };
    }

    onRef = (ref) => {
      this.props.autosizeRef && this.props.autosizeRef(ref);
    }

    render() {
      const { children, ...locals } = this.getLocals();
      return (
        <TextareaComponent {...locals}>
          {children}
        </TextareaComponent>
      );
    }

    componentDidUpdate(prevProps) {
      if (this.getValue(prevProps) !== this.getValue(this.props)) {
        this.dispatchEvent(UPDATE);
      }
    }

  }
);

export default withAutosize;
