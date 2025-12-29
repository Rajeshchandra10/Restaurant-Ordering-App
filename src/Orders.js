import React from 'react'
import { connect } from 'react-redux'
import Header from './Container/Header'
const Orders = ({list}) => {
  return (
    <div>
      <Header/>
     <center>
      {list.length > 0 ? (
        <div className="row">
          {list.map((item, index) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card">
                <img
                  src={item.url}
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p>Billing Amount Rs.{item.prize}</p>
                  <p>Table Number:{item.table_number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h4">
          No order Place yet
        </div>
      )}
     </center> 
    </div>
  )
}
const mapStateToProps=state=>({
  list:state.orderreducer
})

export default connect(mapStateToProps)(Orders)
