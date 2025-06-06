class APIFeatures {
    constructor(query , queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = {...this.queryString};
        const excludeFieleds=['page' , 'sort' , 'limit' , 'fields'];
        excludeFieleds.forEach(el => delete queryObj[el]);
    
        // advanced fillter 
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b( gte|gt|lte|lt)\b/g, match =>`$ ${match}`);
        // console.log(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));
   
        return this;
        // let tours =   Tour.find(queryObj);
    }
    sort(){
        if(this.queryString.sort){
            // Fix: Change req.query to this.queryString
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            // Fix: Change req.query to this.queryString
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit  = this.queryString.limit * 1 || 100;  
        const skip = (page - 1 ) * limit;
    
        this.query = this.query.skip(skip).limit(limit);


        return this;
    }
}

module.exports = APIFeatures;