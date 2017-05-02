// @flow

// ----- Imports ----- //

import React from 'react';

import Svg from 'components/svg/svg';

import BodyCopy from 'components/bodyCopy/bodyCopy';


// ----- Copy ----- //

const copy = {
  top: [
    'Like many other media organisations, the Guardian is operating in an incredibly challenging financial climate. Our advertising revenues are falling fast. We have huge numbers of readers, and we are increasingly reliant upon their financial support.',
    'We don’t have a wealthy owner pulling the strings. No shareholders, advertisers or billionaire owners can edit our editor.',
  ],
  bottom: [
    'Our owner, the Scott Trust, safeguards our editorial independence from commercial or political interference. It reinvests revenue into our journalism, as opposed to into shareholders\' pockets.',
    'But while the Scott Trust ensures our independence, we need our readers, now more than ever before, to help secure our future.',
    'We know that not everyone is in a position to fund our journalism. But if you can, you’ll be an integral part of our mission to make the world a better, fairer place, for everyone.',
  ],
  videoCaption: 'Katharine Viner, editor-in-chief, explains the Guardian\'s unique ownership model',
};


// ----- Component ----- //

export default function WhySupport() {

  return (
    <section className="why-support">
      <div className="why-support__image">I am an image!</div>
      <div className="why-support__content gu-content-margin">
        <div className="why-support__top-content">
          <div className="why-support__top-copy">
            <h1 className="why-support__heading">why do we need your support?</h1>
            <BodyCopy copy={copy.top} />
          </div>
          <div className="why-support__video-preview">I am a video!</div>
        </div>
        <div className="why-support__bottom-content">
          <p className="why-support__video-caption">
            <Svg svgName="video" />
            {copy.videoCaption}
          </p>
          <BodyCopy copy={copy.bottom} />
        </div>
      </div>
    </section>
  );

}