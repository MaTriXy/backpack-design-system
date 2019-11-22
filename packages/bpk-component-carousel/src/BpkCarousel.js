/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow strict */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowLeftIcon from 'bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import { buttonPaddingY, colorWhite } from 'bpk-tokens/tokens/base.es6';

import './BpkCarousel.scss';

const AlignedArrowLeft = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRight = withButtonAlignment(withRtlSupport(ArrowRightIcon));

class BpkCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftDisabled: false,
      rightDisabled: false,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  // Disable window scrolling while swiping horizontally
  // https://github.com/akiran/react-slick/issues/1240
  componentDidMount() {
    if (this.props.isClientSide) {
      window.addEventListener('touchstart', this.touchStart);
      window.addEventListener('touchmove', this.preventTouch, {
        passive: false,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.isClientSide) {
      window.removeEventListener('touchstart', this.touchStart);
      window.removeEventListener('touchmove', this.preventTouch, {
        passive: false,
      });
    }
  }

  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  // eslint-disable-next-line consistent-return
  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  // afterChangeHandler(newActiveIndex) {
  // }

  eventHandler(eventName, index) {
    return () => {
      this.props.eventHandler(eventName, {
        index,
      });
    };
  }

  renderItem(item, idx) {
    return (
      <div key={idx}>
        <div>
          <BpkCard style={{ width: '333px' }}> {item.body}</BpkCard>
        </div>
      </div>
    );
  }

  render() {
    const { slidesToShow, slidesToScroll } = this.props.config;

    const settings = {
      slidesToShow,
      slidesToScroll,
      infinite: false,
      touchThreshold: 25,
      nextArrow: (
        <div>
          <BpkButton iconOnly disabled={this.state.rightDisabled}>
            <AlignedArrowRight />
          </BpkButton>
        </div>
      ),
      prevArrow: (
        <div>
          <BpkButton iconOnly disabled={this.state.leftDisabled}>
            <AlignedArrowLeft />
          </BpkButton>
        </div>
      ),
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <section className={this.props.config.className}>
        <div>
          <Slider {...settings}>
            {this.props.content.items.map(this.renderItem)}
          </Slider>
        </div>
      </section>
    );
  }
}

BpkCarousel.propTypes = {
  isClientSide: PropTypes.bool,
  config: PropTypes.shape({
    arrows: PropTypes.bool,
    className: PropTypes.string,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    variableWidth: PropTypes.bool,
  }),
  content: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string.isRequired,
      }),
    ),
  }),
  styling: PropTypes.shape({
    callToActionColour: PropTypes.string,
    chevronColour: PropTypes.string,
    itemHeight: PropTypes.string,
    itemWidth: PropTypes.string,
    itemSpacing: PropTypes.string,
    separatorColour: PropTypes.string,
    titleColour: PropTypes.string,
  }),
  eventHandler: PropTypes.func,
};

BpkCarousel.defaultProps = {
  isClientSide: false,
  config: {
    arrows: true,
    className: '',
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: false,
  },
  content: {
    items: [],
  },
  styling: {
    callToActionColour: colorWhite,
    chevronColour: colorWhite,
    itemHeight: '19.5rem',
    itemWidth: '21.87rem',
    itemSpacing: buttonPaddingY,
    separatorColour: colorWhite,
    titleColour: colorWhite,
  },
  eventHandler: () => {},
};

export default BpkCarousel;
