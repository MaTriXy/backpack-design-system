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
import styled from 'styled-components';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowLeftIcon from 'bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import {
  borderSizeSm,
  buttonPaddingY,
  colorWhite,
} from 'bpk-tokens/tokens/base.es6';

import { getIntegerValueFromStyle } from '../utils/utils';

import './Carousel.scss';
import './slick.css';

const AlignedArrowLeft = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRight = withButtonAlignment(withRtlSupport(ArrowRightIcon));

class BpkCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };

    this.afterChangeHandler = this.afterChangeHandler.bind(this);
    this.renderItem = this.renderItem.bind(this);
    const { itemHeight, itemWidth, itemSpacing } = props.styling;

    // Styled components must be initialised here to avoid a full re-render on state change
    this.StyledSlider = styled(Slider)`
      .slick-slider {
        display: flex;
        flex-direction: row;
      }

      .slick-list {
        width: ${getIntegerValueFromStyle(itemWidth || '21.87rem') * 3 +
          getIntegerValueFromStyle(itemSpacing || buttonPaddingY) * 3}rem;
        margin: auto;
        overflow: hidden;
      }

      .slick-track {
        display: flex;
      }

      .slick-slide {
        padding-right: ${itemSpacing || buttonPaddingY};
        padding-bottom: ${itemSpacing || buttonPaddingY};
        padding-left: ${itemSpacing || buttonPaddingY};
      }

      .slick-slide > div {
        width: 333px;
      }
    `;
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

  afterChangeHandler(newActiveIndex) {
    this.setState({
      activeIndex: newActiveIndex,
    });
  }

  eventHandler(eventName, index) {
    return () => {
      this.props.eventHandler(eventName, {
        title: this.props.content.items[index].title,
        index,
      });
    };
  }

  renderItem(item, idx) {
    return (
      <div key={idx}>
        <div
          className={`${
            this.state.activeIndex + this.props.config.slidesToShow === idx + 1
              ? 'last-image'
              : ''
          }`}
          data-pagespeed-no-transform=""
        >
          <BpkCard style={{ height: '250px', border: 'black' }} />
        </div>
      </div>
    );
  }

  render() {
    const {
      dots,
      arrows,
      slidesToShow,
      slidesToScroll,
      variableWidth,
    } = this.props.config;

    const settings = {
      slidesToShow,
      slidesToScroll,
      infinite: false,
      touchThreshold: 25,
      nextArrow: (
        <div>
          <BpkButton iconOnly>
            <AlignedArrowRight />
          </BpkButton>
        </div>
      ),
      prevArrow: (
        <div>
          <BpkButton iconOnly>
            <AlignedArrowLeft />
          </BpkButton>
        </div>
      ),
      variableWidth,
    };

    return (
      <section className={this.props.config.className}>
        <div className="Carousel">
          <this.StyledSlider
            {...settings}
            afterChange={this.afterChangeHandler}
          >
            {this.props.content.items.map(this.renderItem)}
          </this.StyledSlider>
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
    dots: PropTypes.bool,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    variableWidth: PropTypes.bool,
  }),
  content: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        copy: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        callToAction: PropTypes.string.isRequired,
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
    dots: true,
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
