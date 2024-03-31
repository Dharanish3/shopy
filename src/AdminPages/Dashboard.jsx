import React ,{useState,useEffect}from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import AxiosService from "../Utils/AxiosService";
function Dashboard() {
  const navigate  = useNavigate()
  const [products, setProducts] = useState([]);
  const [users,setUser] = useState([])
  const [orders, setOrders] = useState([]);

    const getUserData= async()=> {
        try {
          const res =  await AxiosService.get('/user/all') 
          if(res.status=200){
            setUser(res.data.user)
          }

        } catch (error) {
            console.log(error)
        }
    }

    const getOrderData = async () => {
      try {
        const res = await AxiosService.get("/order");
        if (res.status === 200) {
          setOrders(res.data.order);
        }
      } catch (error) {
        console.log(error);
      }
    };


  const getData = async () => {
    try {
      const res = await AxiosService.get("/products");
      if (res.status === 200) {
        console.log(res);
        setProducts(res.data.product);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    getData()
    getUserData()
    getOrderData()
  },[])

  return (
    <>
      <Topbar />
      <Sidebar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <br />
          </div>
        </header>
        <div className="grid grid-cols-3 gap-4">
          <Card className="max-w-sm  m-2 bg-gradient-to-r from-blue-500 to-blue-500">
            <h5 className="text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
              Products
            </h5>
            <p className="font-black text-5xl text-slate-50 dark:text-gray-400  ">
              {products?.length}
            </p>
            <Button  className="bd-slate-950"  onClick={()=>navigate('/admin/all-products')}>View All</Button>
          </Card>
          <Card className="max-w-sm  m-2  bg-gradient-to-r from-indigo-500 to-blue-500">
            <h5 className="text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
              Orders
            </h5>
            <p className="font-black  text-5xl text-slate-50 dark:text-gray-400 ">
              {orders?.length}            </p>
            <Button  onClick={()=>navigate('/admin/order')}>View All</Button>
          </Card>
          <Card className="max-w-sm  m-2 bg-amber-500">
            <h5 className="text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
             Customers
            </h5>
            <p className="font-black text-5xl text-slate-50 dark:text-gray-400 ">
              {users?.length}
            </p>
            <Button  onClick={()=>navigate('/admin/user')}>View All</Button>
          </Card>
        </div>
      </Sidebar>
    </>
  );
}

export default Dashboard;
