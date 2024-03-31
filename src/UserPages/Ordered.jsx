import React from "react";
import Layout from "../Components/Layout";
import { Checkmark } from "react-checkmark";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Ordered() {
  const navigate = useNavigate()
  return (
    <>
      <Layout>
        <div className="flex justify-center m-11  ">
          <Card className="max-w-sm m-14 ">
          <p>Your Item has orderd Completed!</p>
            <h5 className="text-2xl  text-center  font-bold tracking-tight text-gray-900 dark:text-white">
              Payment Success
            </h5>
            <Checkmark />
            <Button className="bg-slate-950" onClick={()=>navigate('/')}>
              Back To Home
              
            </Button>
          </Card>
        </div>

       
      </Layout>
    </>
  );
}

export default Ordered;
