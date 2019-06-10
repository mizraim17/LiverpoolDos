import React,{Component} from "react"
import {Row,Button} from 'react-materialize'
import axios from 'axios'
import "../css/home.css"
import TableProduct from "./TableProduct";
import Loader from 'react-loader-spinner'

class Home extends Component{

  state={
    word:"",
    product: null,
    loading:false
  }

  onChange= (e) => {
    this.setState({word:e.target.value})
    e.preventDefault()
    if(e.key==='Enter') {
     this.findProduct()
    }
  }

  test= (e) => {
    e.preventDefault()
    this.setState({word:e.target.value})

    if(e.key==='Enter'){

      console.log("%c tecleo enter","color:red" )
      this.findProduct()
    }
  }

  findProduct=()=>{
    let {word} = this.state;
    let find;
    this.setState({loading:true})
    console.log("%c entro","color:green", word)

    axios.get(`https://www.liverpool.com.mx/tienda/?s=${word}&d3106047a194921c01969dfdec083925=json`)
      .then((res)=> {
        console.log("%c liver", "color:orange", res.data.contents[0].mainContent[3].contents[0].records)
        find=  res.data.contents[0].mainContent[3].contents[0].records
        this.setState({product: res.data.contents[0].mainContent[3].contents[0].records})
        if(find.length===0){
          console.log("entro a 0")
          window.Materialize.toast('Tú búsqueda no arrojo ningún resultado', 10000,'red')
        }
        this.setState({loading:false})
      })
      .catch((err)=>{

        console.log("err liver",err)
      })
  }

  closeBar= (e)=>{
     document.getElementById('search').value=""
  }

  render() {
    let {product,loading}= this.state
    return(
      <>
      <nav>
        <div className="nav-wrapper color-liv1">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              onChange={this.onChange}

            />
              <label className="label-icon"  ><i className="material-icons">search</i></label>
              <i className="material-icons" onClick={this.closeBar}>close</i>
          </div>
        </form>
      </div>
      </nav>
        <Row className="pad">
          <Button className="btn-search" onClick={this.findProduct}> buscar</Button>
        </Row>
        {
          loading?
            <Loader
              type="Rings"
              color="#ffffff"
              height="400"
              width="400"
            />
          :<>
              <Row className="container ">
          {
            product
            ?
              <>
                {
                  product
                    .map((el,i)=>{
                      return(
                        <TableProduct
                          className="color-liv2"
                          key={i}
                          nameProduct={el.productDisplayName}
                          priceProduct={el.maximumListPrice}
                          imageProduct={el.smallImage}

                        />
                        )

                    })
                }
              </>
            : <p className="txt-home">Realiza la búsqueda de tú producto en la barra superior</p>
          }
        </Row>
            </>
        }
      </>
    )
  }

}

export default Home