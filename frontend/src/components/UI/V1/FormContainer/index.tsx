import { Container, Row, Col } from 'react-bootstrap'

interface IProps {
  children: React.ReactNode
}

const FormContainer = ({ children }: IProps) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;
