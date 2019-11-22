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

import React from 'react';
import { storiesOf } from '@storybook/react';

import { BpkGridContainer } from '../bpk-component-grid';

import BpkCarousel from './index';

const ITEMS = [
  {
    body:
      'card one. Bacon ipsum dolor amet picanha tri-tip ham hock pork chop flank frankfurter salami chislic short loin ham ribeye beef ribs ball tip hamburger. Meatball tail prosciutto leberkas t-bone tongue kevin ham doner bresaola landjaeger sirloin filet mignon shank. Flank pastrami tri-tip short loin kevin short ribs bresaola tail. Pork belly ribeye turducken doner, meatball chicken jowl corned beef. Bacon ipsum dolor amet picanha tri-tip ham hock pork chop flank frankfurter salami chislic short loin ham ribeye beef ribs ball tip hamburger. Meatball tail prosciutto leberkas t-bone tongue kevin ham doner bresaola landjaeger sirloin filet mignon shank. Flank pastrami tri-tip short loin kevin short ribs bresaola tail. Pork belly ribeye turducken doner, meatball chicken jowl corned beef.',
  },
  { body: 'card two' },
  { body: 'card three' },
  { body: 'card four' },
  { body: 'card five' },
  { body: 'card six' },
  { body: 'card seven' },
];

storiesOf('bpk-component-carousel', module).add('Default carousel', () => (
  <BpkGridContainer>
    <BpkCarousel
      config={{
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
      }}
      content={{
        items: ITEMS,
      }}
    />
  </BpkGridContainer>
));
