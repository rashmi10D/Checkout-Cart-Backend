const supertest = require ('supertest');
const { app} = require('../src/index');

describe("Testing the checkout API", () => {

    let productA = null;
    let productB = null;
    let productC = null;
    let productD = null;
    it ("add the product a", async () =>{

          productA = await supertest(app).post('/product').send({
    
            "name": "A",
            "price": 30
        });

         productB = await supertest(app).post('/product').send({
    
            "name": "B",
            "price": 20
        });


         productC = await supertest(app).post('/product').send({
    
            "name": "C",
            "price": 50
        });

        productD = await supertest(app).post('/product').send({
    
            "name": "D",
            "price": 15
        });


        await supertest(app).post('/promotion').send({
            "ruleId": "RULE001",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": productA._id,
            "productName": "A",
            "discount": 5,
            "discountType": 1,
            "quantity": 3,
            "price": null,
            "date": "2021-09-25",
            "isEnabled": true
        
        })

        await supertest(app).post('/promotion').send({
            "ruleId": "RULE002",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": productB._id,
            "productName": "B",
            "discount": 5,
            "discountType": 2,
            "quantity": 2,
            "price": null,
            "date": "2021-09-25",
            "isEnabled": true
        
        })

        await supertest(app).post('/promotion').send({
            "ruleId": "RULE003",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": "BASKET",
            "productName": "BASKET",
            "discount": 20,
            "discountType": 3,
            "quantity": null,
            "price": 150,
            "date": "2021-09-25",
            "isEnabled": true
        
        })


         await supertest(app).post('/cart').send({
    
            "productId": productA._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productB._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productC._id,
            "quantity": 1
        })

       let checkout =  await supertest(app).get('/cart/checout');

        expect(checkout.status).toBe(200);
        expect(checkout.body.status).toBe(true);
    })

    it ("add the product a", async () =>{

        product = await supertest(app).post('/product').send({
   
           "name": "A",
           "price": 15
       });

       expect(product.status).toBe(200);
       expect(product.body.status).toBe(true);
   })



    

	it("tests the base route and returns true for status", async () => {

        console.log("----response");
        //const response = [{ id: 3, url: "https://www.link3.dev" }];
		const response = await supertest(app).get('/cart/checkout');
    
		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);

	});

});
