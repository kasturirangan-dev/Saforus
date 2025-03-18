import React from 'react';
import { NavigationItemProps } from '../interfaces';

export default class NavigationItem extends React.PureComponent<NavigationItemProps> {
  onClick = () => {
    // console.log('Clicked on', this.props.sectionName);
    this.props.onClick(this.props.sectionName);
  }

  render() {
    let { sectionName, href, active } = this.props;
    href = href === undefined ? '#' : href;
    // console.log('href', href, 'active', active, 'sectionName', sectionName)
    return (
      <a
        href={href}
        onClick={this.onClick}
        className={`line-height15 pad0x pad00y quiet block ${active ? 'fill-lighten0 round' : ''}`}>
        {sectionName}
      </a>
    );
  }
}