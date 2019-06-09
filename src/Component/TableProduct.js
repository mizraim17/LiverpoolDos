import React from 'react'
import {Card,Table,Row,Col,CardTitle} from 'react-materialize'
import "../css/tableProduct.css"


const TableProduct = (props)=> {
  return(


      <Col m={4} s={12} className="apilar">
        <Card
          key ={props.i}
          className="z-depth-2 cards "
          header={

            <CardTitle
            className=" cards "
            image={props.imageProduct}
            title ="hola"

            >
              {props.priceProduct}
            </CardTitle>
          }
          actions={
            <a href="">   {props.priceProduct}</a>
          }>
          {props.nameProduct}

        </Card>
      </Col>



  )
}
export default TableProduct

