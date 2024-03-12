"use client";
import { create } from "zustand";

export const useFilterStore = create((set) => ({
  FieldValues :["DOJ","firstName","UId","coupons","Phone","Email","Status"],
  dojOperator: [
    "Today",
    "Current week",
    "Current month",
    "Last two months",
    "Between",
  ],
  stringOperator: ["starts with", "equal to"],
  integerOperator: ["greater than","less than","equalto","not equalto"],

  statusOperator: ["Active", "Inactive", "Blocked"],

  



  appointmentData:[],
     setAppointmentData: (data) => set(state => {//console.log(data);
      return ({appointmentData:[...data]}) }),


  distributedList: new Set(),
  setDistributedList: (UId) => set(state => {state.distributedList.add(UId);return ({distributedList:state.distributedList})}),
  setRemoveIdFromDistList: (uid) => set(state => { state.distributedList.delete(uid);return ({distributedList:state.distributedList})}),


  couponCount:"",
  setCouponCount:  (count) => set(state => {return ({couponCount:count}) }),
  

  toastData: {
    toggle:false,
    message:""
  },
  


  setToastData:(tog,message) => set(state => {return ({toastData : {toggle : tog ,message: message}})}),


  selectAll: false,
  setSelectAll: (tog) => set(state => {return ({selectAll:tog})}),




  cartToggle: false,
  setCartToggle: (tog) => set(state => {return ({cartToggle:tog})}),

      
  
  fetchData:[],
     setFetchData: (data) => set(state => {//console.log(data);
      return ({fetchData:[...data]})}),


  FieldValue : "",
    setFieldText : (text) => set(state => ({FieldValue:text})),

    filters : [],
    setFilter : (filter)  => set(state =>  { return ({filters:[...state.filters,filter]} ) } ),
    deleteFilter : (index) => set(state => { console.log(index,);const fil = [...state.filters]; fil.splice(index,1); return ({filters:[...fil]})}) 
}))
