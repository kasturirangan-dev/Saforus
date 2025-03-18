import React from 'react';
import NavigationItem from './navigation_item';
// import { footerContent } from '../custom';

import { Heading, NavigationProps } from '../interfaces';

function getAllInSectionFromChild(headings: Heading[], idx: number): string[] {
  for (let i = idx; i > 0; i--) {
    if (headings[i].depth === 2) {
      return getAllInSection(headings, i);
    }
  }
  return [];
}

function getAllInSection(headings: Heading[], idx: number): string[] {
  let activeHeadings: string[] = [];
  for (let i = idx + 1; i < headings.length; i++) {
    if (headings[i].depth === 3) {
      activeHeadings.push(headings[i].children[0].value);
    } else if (headings[i].depth === 2) {
      break;
    }
  }
  return activeHeadings;
}

export default class Navigation extends React.PureComponent<NavigationProps> {
  render() {
    let activeHeadings: string[] = [];
    let headings = this.props.ast.children.filter(
      (child) => child.type === 'heading'
    );

    if (this.props.activeSection) {
      let activeHeadingIdx = headings.findIndex(
        (heading) => heading.children[0].value === this.props.activeSection
      );
      let activeHeading = headings[activeHeadingIdx];
      // console.log('activeHeading', activeHeading);

      if (activeHeading && activeHeading.depth === 3) {
        activeHeadings = [this.props.activeSection].concat(
          getAllInSectionFromChild(headings, activeHeadingIdx)
        );
      }

      // this could potentially have children, try to find them
      if (activeHeading && activeHeading.depth === 2) {
        activeHeadings = [this.props.activeSection].concat(
          getAllInSection(headings, activeHeadingIdx)
        );
      }
    }

    let activeHeadingsSet = activeHeadings.reduce(
      (memo: { [key: string]: boolean }, heading) => {
        memo[heading] = true;
        return memo;
      },
      {}
    );

    return (
      <div className="pad0x small">
        {headings.map((child, i) => {
          let sectionName = child.children[0].value;
          // console.log('sectionName', sectionName);
          let active = sectionName === this.props.activeSection;
          if (child.depth === 1) {
            // console.log('child', child);
            return (
              <div
                key={i}
                onClick={() => this.props.navigationItemClicked(sectionName)}
                className="small pad0x quiet space-top1"
              >
                {sectionName}
              </div>
            );
          } else if (child.depth === 2) {
            // console.log('child', child);
            return (
              <NavigationItem
                key={i}
                href={`docs#${child.children?.[0].value.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => this.props.navigationItemClicked(sectionName)}
                active={active}
                sectionName={sectionName}
              />
            );
          } else if (child.depth === 3) {
            if (activeHeadingsSet.hasOwnProperty(sectionName)) {
              return (
                <div key={i} className="space-left1">
                  <NavigationItem
                    href={`docs#${child.children?.[0].value.toLowerCase().replace(/ /g, '-')}`}
                    onClick={() =>
                      this.props.navigationItemClicked(sectionName)
                    }
                    active={active}
                    sectionName={sectionName}
                  />
                </div>
              );
            }
          }
        })}
        {/* {footerContent} */}
      </div>
    );
  }
}
