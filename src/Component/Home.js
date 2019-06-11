import React,{Component} from "react"
import {Row, Button, Col, Card, Table} from 'react-materialize'
import axios from 'axios'
import "../css/home.css"
import TableProduct from "./TableProduct";
import Loader from 'react-loader-spinner'
import TableHistory from "./TableHistory";

class Home extends Component{

  state={
    history:"",hisTemp:"",temp:[],
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
    let {word, temp, hisTemp} = this.state;
    let find
    this.setState({loading:true})

    console.log("word",word)

      temp.push(word)
      console.log('temp',temp)
      localStorage.setItem("historySearch",JSON.stringify(temp))


    axios.get(`https://www.liverpool.com.mx/tienda/?s=${word}&d3106047a194921c01969dfdec083925=json`)
      .then((res)=> {
        // console.log("%c res request", "color:orange", res.data.contents[0].mainContent[2])
        find=  res.data.contents[0].mainContent[3].contents[0].records
        this.setState({product: res.data.contents[0].mainContent[3].contents[0].records})
        if(find.length===0){

          window.Materialize.toast('Tú búsqueda no arrojo ningún resultado', 10000,'red')
        }

        console.log("hisTemp", hisTemp)
        this.setState({loading:false, hisTemp})
      })
      .catch((err)=>{
        this.setState({loading:false})
        window.Materialize.toast('Error intento contacte al administrador', 10000,'red')

      })
  }

  browsingHistory= () =>{
    console.log("entro al listado ")
  }

   formatoMoneda=(number )=> {

    let  number1 = number.toString(), result = '', estado = true;
    if (parseInt(number1) < 0) {
      estado = false;
      number1 = parseInt(number1) * -1;
      number1 = number1.toString();
    }
    if (number1.indexOf(',') === -1) {
      while (number1.length > 3) {
        result = ',' + '' + number1.substr(number1.length - 3) + '' + result;
        number1 = number1.substring(0, number1.length - 3);
      }
      result = number1 + result;
      if (estado === false) {
        result = '-' + result;
      }
    }
    else {
      let  pos = number1.indexOf(',');
      let numberInt = number1.substring(0, pos);
      let numberDec = number1.substring(pos, number1.length);
      while (numberInt.length > 3) {
        result = ',' + '' + numberInt.substr(numberInt.length - 3) + '' + result;
        numberInt = numberInt.substring(0, numberInt.length - 3);
      }
      result = numberInt + result + numberDec;
      if (estado === false) {
        result = '-' + result;
      }
    }
    return(result) ;
  }

  componentWillMount() {
    let {hisTemp,temp} = this.state
    temp=JSON.parse(localStorage.getItem("historySearch"))
    hisTemp=JSON.parse(localStorage.getItem("historySearch"))
    this.setState({hisTemp,temp})
  }

  closeBar= (e)=>{
     document.getElementById('search').value=""
  }

  render() {
    let {product,loading,hisTemp}= this.state
    return(
      <>
      <nav>
        <div className="nav-wrapper color-liv1">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Teclea el producto a buscar"
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
                          key={String(el.productId)}
                          index={el.productId}
                          product={el}
                          moneda={this.formatoMoneda(parseFloat(el.productPrice))}

                        />
                        )

                    })
                }
              </>
            :
              <>
                <Row>
                  <Col s={12} m={6}>{console.log("**********",hisTemp)}
                    {
                      hisTemp
                        ?<>
                          <Card>
                            <Table  responsive={true} className="white">
                              <thead>
                                <tr>
                                  <th data-field="id">
                                    Historial de búsquedas
                                  </th>
                                </tr>
                              </thead>
                              <tbody>

                                  {
                                    hisTemp.map((el, i)=>{
                                      return(
                                        <TableHistory
                                          key={i}
                                          articulos={el}
                                        />
                                      )
                                    })
                                  }
                              </tbody>
                            </Table>
                          </Card>
                        </>

                        : "no"
                    }
                  </Col>
                  <Col s={12} m={6}>
                    <p className="txt-home">Realiza la búsqueda de tú producto en la barra superior</p>
                  </Col>
                </Row>
              </>


          }
        </Row>
            </>
        }
      </>
    )
  }

}

export default Home