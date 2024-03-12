"use client"
import axios from 'axios';
import React, { useState,useEffect } from 'react'






 function Cart({setCartToggle}) {
  
  const [totalCouponsToDistribute, setTotalCouponsToDistribute] = useState(0);
  const [distributionRecords, setDistributionRecords] = useState([]);
        useEffect(() => {

          (async function() {

            try {

                const response = await axios.get('http://192.168.1.78:5000/api/v1/superadmin/view-cart');
                console.log('1234')
           response.data.distributionRecords.map((i)=>{
            console.log(i)
           })
               
           setDistributionRecords([...response.data.distributionRecords]); 
           setTotalCouponsToDistribute(response.data.totalCouponsToDistribute); 
            } catch (err) {
              console.log('qwerty')

                console.error('Error fetching data:', err);
            }
        })()


        }, []);




        //handleRemove
  
        async function handleRemove (UId)  {
          try {

            const response = await axios.post('http://192.168.1.78:5000/api/v1/superadmin/revoke-coupons', {
             
              UIds: [UId]
            });
           console.log(response.data ,"fbnujk") 
          } catch (error) {
            console.error('Error occurred while removing:', error);
          }
        };
        async function handleRemoveAll(UIds)  {
          try {


            const UIdfrom = distributionRecords.map((i,ind)=>{
              return i.UId
            
            })
            const response = await axios.post('http://192.168.1.78:5000/api/v1/superadmin/revoke-coupons', {
             
              UIds: [...UIdfrom]
            });
           console.log(response.data ,"fbnujk") 
          } catch (error) {
            console.error('Error occurred while removing:', error);
          }
        };

        async function handleSend(UIds)  {
          try {


            const UIdfrom = distributionRecords.map((i,ind)=>{
              return i.UId
            
            })
            const response = await axios.post('http://192.168.1.78:5000/api/v1/superadmin/distributetousers', {
             
              UIds: [...UIdfrom]
            });
           console.log(response    ,"fbnujk") 
           if(response.data.message)
          
           {
            setCartToggle(false);
           }
          } catch (error) {
            console.error('Error occurred while removing:', error);
          }
        };
    
  return (
   <div className='h-[50vh] w-[43vw] bg-slate-300 flex flex-col items-center justify-center '>

<div className='flex justify-between w-full px-[1.5vw]'>
 <h1 className='text-black '>Cart Items</h1> 
 <div className = "flex justify-between w-32">
  <span className='text-black'>Total Coupons   </span>

  <span className='text-black'>{totalCouponsToDistribute}</span>
 </div>
 <div className='flex justify-center items-center text-black font-semibold  relative bottom-5 ' onClick={()=>setCartToggle(false)}>X</div>

</div>
    <div className="overflow-scroll h-[40vh] max-h-[40vh] w-[40vw] ">
      <table className="table rounded-lg bg-white">
      <thead className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]" style={{ borderRadius: "11px" }}>
      
        <tr>
          <th className="text-center">UserName</th>
          <th className="text-center">UserId</th>
          <th className="text-center">CouponDistribute</th>
          <th className="text-center">Remove</th>
        </tr>
      </thead>
      <tbody className="my-10">
        {distributionRecords.map((item, index) => (
          <tr key={index} className="font-semibold text-[0.8rem] text-black my-10">
            <td className="text-center">{item.firstName}</td>
            <td className="text-center">{item.UId}</td>
            <td className="text-center text-indigo-600">{item.coupons_to_distribute}</td>
            <td className="text-center">
              <button className="w-20 h-7 text-center bg-slate-300 rounded-[7px] focus:ring-1 focus:ring-teal-500"onClick={handleRemove}>Remove</button>
        
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
    </div>
    

<div class="flex gap-4">
    <button class="w-20 h-7 text-center bg-blue-600 focus:ring-teal-500" onClick={()=>handleSend()}>Send</button>
    <button class="w-20 h-7 text-center bg-red-500 rounded-[7px]  focus:ring-teal-500" onClick={()=>handleRemoveAll()}>RemoveAll </button>
</div>

    </div>


 
  )
}




export default Cart;