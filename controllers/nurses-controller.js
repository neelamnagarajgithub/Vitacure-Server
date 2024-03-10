const express = require("express");
const Nurse = require("../models/nursemodel");

const getallnurses = async (req, res) => {
  try {
    let queryObj={...req.query};

    let excludeFeilds=['page','sort','limit','feilds'];
    excludeFeilds.forEach(el=>delete queryObj[el]);
   
    let queryStr=JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=> `$${match}`);
    
    let query1= Nurse.find(JSON.parse(queryStr));  
   
      //sorting
      if(req.query.sort) {
        const sortBy=req.query.sort.split(',').join(' ');
        query1=query1.sort(sortBy);
      }
 
      const allnurse=await query1;
    res.status(200).json({
      status: "success",
      allnurse,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createnurse = async (req, res) => {
  try {
    const newnurse = await Nurse.create(req.body);
    res.status(201).json({
      status: "success",
      newnurse,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getnursebyid = async (req, res) => {
  try {
    const nurseid = await Nurse.findById(req.params.id);
    res.status(200).json({
      status: "success",
      nurseid,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
const UpdateNurse = async (req, res) => {
  try {
    const updatednurse = await Nurse.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.status(200).json({
      status: "success",
     updatednurse
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteNurse = async (req, res) => {
  try {
    const deletenurse = await Nurse.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    deletenurse,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports={getallnurses,createnurse,getnursebyid,UpdateNurse,deleteNurse};
