const delayedColor=(color,delay)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.body.style.backgroundColor=color;
            resolve();
        },delay)
    })
}

delayedColor('red',1000)
.then(()=>delayedColor('orange',1000));

const req=new XMLHttpRequest();

req.onload=function(){
    console.log("request completed");
    const data=JSON.parse(this.responseText);
    console.log(data.ticker.price);
}

req.onerror=function(){
    console.log("request failed");
    console.log(this);
}

req.open('GET','https://api.cryptonator.com/api/ticker/btc-usd');
req.send();

fetch('https://api.cryptonator.com/api/ticker/btc-usd')
.then(res=>{console.log("Fetching using the fetch method");
return res.json();})
.then(fetched_data=>{console.log("FETCHED DATA");
console.log(fetched_data);
})

const btcprice=async()=>{
    console.log("Fetching using async");
    const obj=await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
    const data_obj=await obj.json();
    console.log(data_obj.ticker.price);
}

btcprice();

console.log("Parsing data using axios");
axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
.then(obj=>{console.log(obj.data.ticker.price);})
.catch(err=>console.log("Error is",err));

const get_jokes=async()=>{
    const data_jokes=
}