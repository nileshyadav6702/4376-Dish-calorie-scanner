import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Example from './nav'
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();
    let [ides,setids]=useState('')
    let [dishes,setdish]=useState('')
    let [itemname,setitemname]=useState('')
    let [quantity,setquantity]=useState('')
    let [calorie,setcalorie]=useState('')
    let [edit,setedit]=useState(false)
    let [success,setsuccess]=useState(false)
    let url = "http://localhost:3000";
    if(!localStorage.getItem('user')){
        navigate('/signup')
    }

    function clearsuccess() {
      setsuccess(false);
    }
     function changeitem(e) {
       e.preventDefault();
       if (!itemname || !quantity || !calorie) {
         alert("Please fill all the fields");
         return;
       }
       axios.put(`${url}/api/dishes?dishid=${ides.dishid}&itemid=${ides.itemid}`, {
            name: itemname,
            quantity: quantity,
            calories: calorie,
        })
        .then(res=>{
            setedit(false)
            setsuccess(true)
            setTimeout(() => {
                clearsuccess();
            }, 3000);
            setids('')
            setitemname("");
            setquantity("");
            setcalorie("");

        })
        .catch(error=>console.log(error))
     }
    useEffect(()=>{
        axios.get(`${url}/api/dishes`)
        .then(res=>{
            setdish(res.data)
        })
    },[])

    function dlitem(dishid,itemid){
        axios.delete(`${url}/api/dishes?dishid=${dishid}&itemid=${itemid}`)
        .then(res=>console.log(res.data))
    }
    function getalldishdata(dish){
        let para=''
        let totalcalori=0
        para+=dish.name+'\n'
        dish.items.map((item)=>{
            totalcalori+=parseInt(item.calories)
            para+=item.name+' '
            para+=item.quantity+' '
            para+=item.calories+'\n'
        })
        para+='Total Calories: '+totalcalori
        return para
    }

    function edititem(dishid,itemid){   
        setids({dishid,itemid})
        setedit(true)
        axios.get(`${url}/api/dishes/${dishid}`)
        .then(res=>{
            let item=res.data.items.filter((item)=>item._id===itemid)[0]
            setitemname(item.name)
            setquantity(item.quantity)
            setcalorie(item.calories)
        })
    }
  return (
    <>
      <Example />
      <div className="w-[100%] h-[500px] m-auto">
        <img
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/1259984250/photo/calories-counting-diet-food-control-and-weight-loss-concept-calorie-counter-application-on.jpg?s=2048x2048&w=is&k=20&c=BTdWM4Z6NO-JXVPxIhIAPQyinsQQ2nWO7RAg-m2bUm4="
          alt=""
        />
      </div>
      <h3 className='text-center text-2xl m-3 font-bold'>
        Your ultimate companion for achieving your health goals. Easily log your
        meals, track calories, and gain insights into your nutritional intake.
        Whether you aim to lose weight, maintain your fitness, or simply eat
        healthier, our intuitive platform makes it effortless. Start your
        journey to a healthier you today!
      </h3>
      {success ? (
        <div
          class="bg-green-100 border w-1/3 mx-auto mt-3 border-green-400 text-green-700 px-4 py-3 rounded relative "
          role="alert"
        >
          <strong class="font-bold">Hey there!</strong>
          <span class="block sm:inline">Item Updated successfully.</span>
        </div>
      ) : null}
      {edit ? (
        <div className="flex flex-wrap w-1/2 mx-auto  mt-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="itemname"
            >
              Item Name
            </label>
            <input
              value={itemname}
              onChange={(e) => setitemname(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="itemname"
              type="text"
              placeholder="Item name"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="quantity"
            >
              Quantity
            </label>
            <input
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="quantity"
              type="number"
              placeholder="Quantity"
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="calorie"
            >
              Calories
            </label>
            <input
              value={calorie}
              onChange={(e) => setcalorie(e.target.value)}
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="calorie"
              type="number"
              placeholder="Calorie"
            />
          </div>
          <button
            onClick={changeitem}
            className="w-full text-center bg-blue-400 text-white rounded-lg p-2 hover:bg-blue-600 mt-4"
          >
            Change Item
          </button>
        </div>
      ) : null}
      <div className=" flex-wrap w-full flex  justify-space-evenly">
        {dishes
          ? dishes.map((dish, i) => {
              return dish.items.length > 0 ? (
                <div className="border-2 mx-auto  p-4 m-4 shadow-[13px_18px_15px_-3px_rgba(0,_0,_0,_0.1)] w-[330px] h-[400px] rounded-md overflow-hidden">
                  <h1 className="font-bold text-2xl text-gray-500 uppercase mb-2 text-center">
                    {dish.name}
                  </h1>
                  <div
                    style={{
                      height: "auto",
                      margin: "0 auto",
                      maxWidth: 100,
                      width: "100%",
                    }}
                  >
                    <QRCode
                      className="mb-4"
                      size={456}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={getalldishdata(dish)}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <ul
                    key={i}
                    className="flex flex-col justify-between gap-3 overflow-y-scroll h-full no-scrollbar  "
                  >
                    {dish.items.map((item, j) => {
                      return (
                        <ul
                          key={j}
                          className=" border-2 border-gray-400 rounded-md "
                        >
                          <li className="flex justify-between px-2 ">
                            <span className="font-bold">ItemName:</span>
                            <span>{item.name}</span>
                          </li>
                          <li className="flex justify-between px-2">
                            <span className="font-bold">Quantity:</span>
                            <span>{item.quantity}</span>
                          </li>
                          <li className="flex justify-between px-2">
                            <span className="font-bold">Calorie:</span>
                            <span>{item.calories}</span>
                          </li>
                          <li className="grid grid-cols-2 gap-4 p-4">
                            <button
                              onClick={() => edititem(dish._id, item._id)}
                              class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => dlitem(dish._id, item._id)}
                              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      );
                    })}
                  </ul>
                </div>
              ) : null;
            })
          : null}
      </div>
    </>
  );
}

export default Home