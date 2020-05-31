import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import authors from '../util/authors';
import { Button, Card, CardText, CardBody, CardTitle, Row } from 'reactstrap';
import jyoonImg from '../images/jyoon.jpeg';
// import miroImg from '../images/miro.jpeg';
import { slugify } from '../util/utilityFunctions';

const TeamPage = () => {
	return (
		<Layout pageTitle={'Our Team'}>
			<SEO title='Team' keywords={[ `gatsby`, `application`, `react` ]} />
			<Row className='mb-4'>
				<div className='col-md-3'>
					<img src={jyoonImg} style={{ maxWidth: '100%' }} alt='jyoon' />
				</div>
				<div className='col-md-8'>
					<Card style={{ minHeight: '100%' }}>
						<CardBody>
							<CardTitle>{authors[0].name}</CardTitle>
							<CardText>{authors[0].bio}</CardText>
							<Button
								className='text-uppercase'
								color='primary'
								href={`/author/${slugify(authors[0].name)}`}
							>
								View Posts
							</Button>
						</CardBody>
					</Card>
				</div>
			</Row>
			{/* <Row className="mb-4">
          <div className="col-md-3">
            <img src={miroImg} style={{ maxWidth: '100%' }} alt="jyoon"/>
          </div>
          <div className="col-md-8">
            <Card style={{ minHeight: '100%' }}>
              <CardBody>
                <CardTitle>{authors[1].name}</CardTitle>
                <CardText>{authors[1].bio}</CardText>
                <Button
                  className="text-uppercase"
                  color="primary"
                  href={`/author/${slugify(authors[1].name)}`}>
                  View Posts
                </Button>
              </CardBody>
            </Card>
          </div>
        </Row> */}
		</Layout>
	);
};

export default TeamPage;
