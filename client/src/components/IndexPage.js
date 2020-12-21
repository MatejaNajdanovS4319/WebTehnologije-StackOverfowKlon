import React from 'react';
import Card from './layout/Card';

const IndexPage = () => {
  return (
    <div id='indexPage'>
      <div className='index-page-container-img'>
        <div className='index-page-blur'>
          <div className='container index-container'>
            <h1>For developers...</h1>
            <h2>
              We build products that empower developers and connect them to
              solutions that enable productivity, growth, and discovery.
            </h2>
          </div>
        </div>
      </div>
      <div className='index-cards container'>
        <Card
          link = '/posts'
          title='Public Q & A'
          text='Give answers to questions and give back by sharing your knowledge with others.'
          buttonText='Posts'
        />
        <Card
          link = '/signup'
          title='Private chat'
          text='Contact other developersto get help and share experience'
          buttonText='Sign up'
        />
      </div>
    </div>
  );
};

export default IndexPage;
