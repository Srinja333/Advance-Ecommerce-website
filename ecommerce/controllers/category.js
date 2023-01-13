const Category=require("../models/category");
const {errorHandler}=require('../helpers/dbErrorHandler');
const { JsonWebTokenError } = require("jsonwebtoken");

exports.categoryById=(req,res,next,id)=>{
    //console.log(req);

    Category.findById(id).exec((err,category)=>{
        //console.log(id);
        //console.log(category);
        if(err||!category)
        {
            return res.status(400).json({
                error:"category does not exist"
            });
        }
       
        req.category=category;
        //console.log(req.category);
        next();
    });

}

exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
       if(err)
       {
        return res.status(400).json({
            error:errorHandler(err)
        });
       }
       res.json({ data });
    });

};

exports.read=(req,res)=>{  
    
    return res.json(req.category); //till now i observed if i console.log res we get same data as req but if i want to get res.category we get undefined unlike req.category
}


exports.update=(req,res)=>{
const category=req.category;
category.name=req.body.name;
category.save((err,data)=>{
    if(err)
    {
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
    res.json(data);
})
}

exports.remove=(req,res)=>{
const category=req.category;
category.remove((err,data)=>{
    if(err)
    {
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
    res.json({
        message:"category deleted successfully"
    });
});
    
};

exports.list=(req,res)=>{
    //console.log(req);
    Category.find().exec((err,data)=>{
        if(err)
        {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            })

        }
        res.json(data);
        console.log(res);
        //console.log(data); 
        
        
        
    })
}