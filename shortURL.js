function shortURL(req,res,next){
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789"
    let arr =  str.split("");
    let shortURL =  arr.sort(()=>{
        return Math.random() - 0.5;
    }).slice(0, 7).join("");
    res.shortURL = shortURL;
    next()
}
module.exports = shortURL