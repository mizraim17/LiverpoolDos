import React from 'react'
import {Card,Table} from 'react-materialize'

const TableProduct = ()=> {
  return(
    <Card>
      <Table  responsive={true} className="white">
        <tbody>
        <tr>
          <td><strong> Nombre</strong></td>
        </tr>
        <tr>
          <td><strong> Producto</strong></td>
        </tr>
        </tbody>
      </Table>
    </Card>
  )
}
export default TableProduct

