import './App.css';

import box from "./assets/box.svg";
import img from "./assets/optimization2.png";
import advantages from "./assets/advantages.png";

function Home() {

  return (
    <div>
      <div className="px-0">
        <div class="row align-items-center m-0">
          <div class=" col-lg-6 order-lg-1 order-2">
            <div id="headingGroup" className="text-black text-center my-3">
              <h1>Wood Stok</h1>
              <img className="img-fluid" src={box} alt="" />
              <p className="lead mx-3">
                Our application is designed for small and medium business owners who want to effectively
                manage
                their
                sales and inventory. We will help you automate the process of accounting for goods, manage
                inventory and
                increase the efficiency of your business.
              </p>
            </div>
          </div>

          <div class="col-lg-6 order-lg-2 order-1 p-0">
            <img className="img-fluid" src={img} alt="" />
          </div>
        </div>
      </div>

      <div className="container-fluid px-0">
        <div class="row align-items-center m-0">
          <div class="col-lg-6 p-0">
            <img className="img-fluid" src={advantages} alt="" />
          </div>
          <div className="col-lg-6 p-0">
            <div id="headingGroup" className="text-black my-3">
              <h1 className='text-center'>Advantages</h1>
              <ul className="mx-3">
                <li>
                  <span>
                    User friendly interface: Our application has a simple and intuitive interface that
                    will
                    help
                    you quickly
                    master all the features.
                  </span>
                </li>
                <li>
                  <span>
                    Automatic accounting: the application allows you to automatically track the stock of
                    goods,
                    which will help you avoid
                    losses and shortages.
                  </span>
                </li>
                <li>
                  <span>
                    Sales Management: Easily track sales and manage orders to improve efficiency and
                    increase
                    profits.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
