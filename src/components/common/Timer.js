import React, { useState } from 'react';

import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row,Col
} from 'reactstrap';

function Timer(props) {
  // localStorage.setItem('email', 'james@test.com');
  const [count, setCount] = useState(0);

  return (
    <Row>
      <Col sm="6" md="6">
        <Card>
          <CardBody>
            <CardTitle>Today</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>{count}</CardText>
            <Button onClick={ ()=>setCount(count+1) }>Test button</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Timer;
