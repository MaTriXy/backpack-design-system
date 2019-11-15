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

import PropTypes from 'prop-types';
import React from 'react';
// import { cssModules } from 'bpk-react-utils';
import Slider from 'react-slick';
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved  */
import '!style-loader!css-loader!slick-carousel/slick/slick.css';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowLeftIcon from 'bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
// import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';

import STYLES from './BpkCarousel.scss';

// const getClassName = cssModules(STYLES);

const AlignedArrowLeft = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRight = withButtonAlignment(withRtlSupport(ArrowRightIcon));

export type Props = {
  className: ?string,
};

const cards = [
  <BpkCard style={{ width: '50px' }}>Lol</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Wow</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Lol 2</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Wow 2</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Lol 3</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Wow 3</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Lol 4</BpkCard>,
  <BpkCard style={{ width: '50px' }}>Wow 4</BpkCard>,
];

const BpkCarousel = (props: Props) => {
  const { className } = props;
  // const classNames = getClassName('bpk-carousel', className);

  const settings = {
    adaptiveHeight: false,
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <div>
        <AlignedArrowRight className={STYLES['scroll-icon']} />
      </div>
    ),
    prevArrow: (
      <div>
        <AlignedArrowLeft className={STYLES['scroll-icon']} />
      </div>
    ),
    slide: 'span',
    useCSS: false,
    useTransform: false,
  };
  return <Slider {...settings}>{cards}</Slider>;
};

BpkCarousel.propTypes = {
  className: PropTypes.string,
};

BpkCarousel.defaultProps = {
  className: null,
};

export default BpkCarousel;
