import React, { useState } from 'react'
import Example from './nav'
import axios from 'axios'

const Adddish = () => {
    const [allitems,setallitems]=useState([])
    const [dishname,setdishname]=useState('')
    const [itemname,setitemname]=useState('')   
    const [quantity,setquantity]=useState('')
    const [calorie,setcalorie]=useState('')
    const [success,setsuccess]=useState(false)
    let url = "https://four376-dish-calorie-scanner.onrender.com";

    function createitem(e){
        e.preventDefault()
        if(!itemname || !quantity || !calorie){
            alert('Please fill all the fields')
            return
        }
        setallitems([
          ...allitems,
          { name: itemname, quantity: quantity, calories:calorie },
        ]);
        setitemname('')
        setquantity('')
        setcalorie('')
    }
    function clearsuccess(){
        setsuccess(false)
    }
    function addDish(e){
        e.preventDefault()
        if(!dishname || allitems.length===0){
            alert('Please fill all the fields')
            return
        }
         axios
           .post(`${url}/api/dishes` ,{name:dishname,items:allitems})
           .then(function (res) {
            setdishname('')
            setallitems([])
            setsuccess(true)
            setTimeout(()=>{
                clearsuccess()
            },3000)
            console.log(res)
           })
    }
   
  return (
    <>
      <Example />
      {success ? (
        <div
          class="bg-green-100 border w-1/3 mx-auto mt-3 border-green-400 text-green-700 px-4 py-3 rounded relative "
          role="alert"
        >
          <strong class="font-bold">Hey there!</strong>
          <span class="block sm:inline">Dish Added successfully.</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
      <div className="flex justify-center mt-10 h-screen px-10">
        <form class="w-full max-w-lg  ">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="dishname"
              >
                Dish Name
              </label>
              <input
                value={dishname}
                onChange={(e) => setdishname(e.target.value)}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="dishname"
                type="text"
                placeholder="Enter Your Dish name"
              />
            </div>
          </div>
          {allitems.length > 0 ? (
            <div className="flex flex-col gap-4 mb-4">
              {allitems.map((item) => {
                return (
                  <div className="grid grid-cols-3 gap-4 bg-gray-200 rounded-md p-3">
                    <p className="text-black font-semibold">{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>{item.calories}</p>
                  </div>
                );
              })}

              <div className="w-full bg-green-600 hover:bg-green-400 text-white rounded-md px-2 py-1 text-center">
                <button onClick={(e) => addDish(e)}>Add Dish</button>
              </div>
            </div>
          ) : null}

          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="itemname"
              >
                Item Name
              </label>
              <input
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="itemname"
                type="text"
                placeholder="Item name"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="quantity"
              >
                Quantity
              </label>
              <input
                value={quantity}
                onChange={(e) => setquantity(e.target.value)}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="quantity"
                type="number"
                placeholder="Quantity"
              />
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
              onClick={createitem}
              className="w-full text-center bg-blue-400 text-white rounded-lg p-2 hover:bg-blue-600 mt-4"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Adddish