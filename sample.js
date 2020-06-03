const axios = require('axios');
const startTime = Date.now();
let success_cnt = 0;
let error_cnt = 0;
let N=530;
let cnter ={
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
    12:0,

}
const result = async function(){
    try{
        let res = await axios.get('http://localhost:3333');
        success_cnt++;
        cnter[`${res.data.data}`]++;
        if(error_cnt+success_cnt===N){
            console.log(`It takes ${Date.now()-startTime}ms`);
            console.log(`success : ${success_cnt} times, error : ${error_cnt} times`);
            console.log(cnter);
        }
    } catch (err){
        console.log(err);
        error_cnt++;
    }
    
};



for(let i=0; i<N; i++){
    result();
}