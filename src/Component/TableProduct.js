import React from 'react'
import {Card,Col,CardTitle} from 'react-materialize'
import "../css/tableProduct.css"


const TableProduct = (props)=> {
  return(
    <Col m={4} s={12}  className="container color-liv2">
        <Card
          key={props.index}
          className='small red-txt'
          header={
            <CardTitle  className="txtcard " image={String(props.product.smallImage)}>
            </CardTitle>
          }
          actions={
            <>
              <span className=" ">{props.product.productDisplayName}</span> <br/>
              <span className=" txt-price">{`$ ${props.moneda}`}</span>
            </>
          }>
        </Card>
      </Col>
  )
}
export default TableProduct;

