import React from 'react';
import { connect } from 'react-redux';
import { addorder, resetfilter, resettablenumber } from '../Action';
const Card = ({ filter_name, addorder, table_number, resetfilter, resettablenumber }) => {
  const [data, setData] = React.useState([]);
  const [cloneData, setCloneData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://restaurants-api-35603-default-rtdb.firebaseio.com/items.json")
      .then(res => res.json())
      .then(json => {
        const itemsArray = json ? Object.values(json) : [];
        setData(itemsArray);
        setCloneData(itemsArray);
      })
      .catch(err => {
        console.error(err);
        setData([]);
      });
  }, []);

  React.useEffect(() => {
    if (filter_name !== "All Items") {
      const specific = cloneData.filter(
        item => item.category === filter_name
      );
      setData(specific);
    } else {
      setData(cloneData);
    }
  }, [filter_name, cloneData]);

  const Handler = async (id, name, prize, url) => {
  if (table_number != null) {
    await addorder(id, name, prize, table_number, url);

    resetfilter();        // ✅ NOW DISPATCHED
    resettablenumber();   // ✅ NOW DISPATCHED

    alert("Order Placed Successfully");
  } else {
    alert("Please Select the Table Number");
  }
};

console.log("resetfilter fn:", resetfilter);


  return (
    <div className="container text-center">
      {data.length > 0 ? (
        <div className="row">
          {data.map((item, index) => (
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
                  <p>Rs.{item.prize}</p>
                  <button className="btn btn-primary" onClick={()=>Handler(item.id,item.name,item.prize,item.url)}>Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner-border text-primary"></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter_name: state.filterreducer.filter_name,
  table_number:state.tablereducer.table_number
});

export default connect(
  mapStateToProps,
  { addorder, resetfilter, resettablenumber }
)(Card);

