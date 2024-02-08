import { Faker, en, ko } from '@faker-js/faker';


const faker = new Faker({
    locale: [ko, en],
});
const main = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = lastName + firstName;

    console.log(fullName);
    

    const productName = faker.commerce.productName();
    const price = faker.commerce.price();
    console.log(productName);
    console.log(price);


    for(let i = 0; i <= 10; i++){
        const date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-02-08T00:00:00.000Z' });
        console.log(date);
    }
};

main();