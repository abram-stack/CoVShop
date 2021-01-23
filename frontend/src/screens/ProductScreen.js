import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


const ProductScreen = ({ match }) => {
  // --Fetching data from the frontend file
  // the screen is actualy for showing, so we can use the components here, while we only pass the props in matching

  // we have the array of the products..
  // so we loop through, and we want to match with the id on the params
  // we will need props.match or using destructure so we'll use only match
  // const product = products.find(p => p._id === match.params.id )
  

  const [ product , setProduct ] = useState([]);

  useEffect(() => {
    const fetchProduct = async() =>{
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    }

    fetchProduct();
  }, [])

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <h1>{product.name}</h1>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description : {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      
    </div>
  )
}

export default ProductScreen
