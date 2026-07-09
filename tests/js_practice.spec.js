const { test } = require('@playwright/test');

test("Reverese string", async ()=>{
    let str="rahul";
    let rev="";
    for(let i=0; i<str.length; i++){
        rev=str[i]+rev;
    }
    console.log("reverse string: "+rev);
});

test("Count of a", async ()=>{
    let str="rahuldasfsafsfA";
    let count=0;
    for(let i=0; i<str.length; i++){
        if(str[i]=='a'||str[i]=='A'){
            count++;
        }
    }
    console.log("Count of a : "+count);
});