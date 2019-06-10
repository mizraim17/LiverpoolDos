import React from 'react'
import {Card,Col,CardTitle} from 'react-materialize'
import "../css/tableProduct.css"


const TableProduct = (props)=> {
  return(


      <Col m={4} s={12}  className="container color-liv2">
        <Card
          key={props.index}
          className='small red-txt'
          header={<CardTitle  className="txtcard" image={props.imageProduct}> <br/> </CardTitle>}
          actions={[<a className="price">{props.priceProduct}</a>]}>
         <p className="txtcard"> {props.nameProduct}</p>
        </Card>
      </Col>



  )
}
export default TableProduct

