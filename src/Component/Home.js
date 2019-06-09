import React,{Component} from "react"
import {Row,Button} from 'react-materialize'
import axios from 'axios'
import "../css/home.css"
import TableProduct from "./TableProduct";

class Home extends Component{

  state={
    word:"",
    product: null
  }

  onChange= (e) => {
    this.setState({word:e.target.value})
  }

  findProduct=()=>{
    let {word} = this.state;
    console.log("%c entro","color:green", word)

    axios.get(`https://www.liverpool.com.mx/tienda/?s=${word}&d3106047a194921c01969dfdec083925=json`)
      .then((res)=>{
        // res.json(res.data)
        console.log("%c liver","color:orange",res.data.contents[0].mainContent[3].contents[0].records)
        this.setState({product:res.data.contents[0].mainContent[3].contents[0].records})
      })
      .catch(err=>console.log("err liver"))
  }

  componentWillMount() {

  }

  render() {
    let {product}= this.state
    return(
      <>
      <nav>
        <div className="nav-wrapper color-liv1">
        <form>
          <div className="input-field">
            <input id="search" type="search" required
            onChange={this.onChange}
            />
              <label className="label-icon"  ><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
          </div>
        </form>
      </div>
      </nav>
        <Row className="pad">
          <Button onClick={this.findProduct}> buscar</Button>
        </Row>

        <Row className="container">

          {
            product
            ?
              <>
                {
                  product
                    .map((el,i)=>{
                      return(
                        <TableProduct
                          key={i}
                          nameProduct={el.productDisplayName}
                          priceProduct={el.maximumListPrice}
                          imageProduct={el.smallImage}

                        />
                        )

                    })
                }
              </>
            : <p>Usa la barra de búsqueda para buscar tu producto</p>
          }
        </Row>
      </>
    )
  }

}

export default Home