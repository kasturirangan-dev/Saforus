import React from 'react';
import PropTypes from 'prop-types';

import { RoundedToggleProps, RoundedToggleOptionProps } from '../interfaces';


export default class RoundedToggle extends React.PureComponent<RoundedToggleProps> {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
      short: PropTypes.string
    })).isRequired,
    active: PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
      short: PropTypes.string
    }),
    short: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { options, active, short } = this.props;
    return (<div className='rounded-toggle inline short'>
      {options.map(option => (
        <RoundedToggleOption
          key={option.value}
          option={option}
          short={short}
          onClick={this.props.onChange}
          className={`strong ${option.value === active.value ? 'active' : ''}`} />
      ))}
    </div>);
  }
}

class RoundedToggleOption extends React.PureComponent<RoundedToggleOptionProps> {
  static propTypes = {
    option: PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
      short: PropTypes.string
    }),
    className: PropTypes.string.isRequired,
    short: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }

  onClick = () => {
    this.props.onClick(this.props.option);
  }

  render() {
    const { className, option, short } = this.props;
    return (
      <a
        onClick={this.onClick}
        className={className}>
        {short ? option.short : option.title}
      </a>
    );
  }
}