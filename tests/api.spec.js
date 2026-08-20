import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Мои первые API тесты', () => {
    const baseURL = 'https://restful-booker.herokuapp.com';

    let bookingId;
    let authToken;

    test.beforeAll(async ({ request }) => {
        const authResponse = await request.post(`${baseURL}/auth` , {
             data: { username: 'admin', password: 'password123' }
        })

        expect(authResponse.status()).toBe(200);
        const authData = await authResponse.json();
        authToken = authData.token;
        console.log('Токен получен:', authToken);
    })

    test('Получить все бронирования @api', async ({ request }) => {
       const bookingData = { 
        firstname: 'Ksenia', 
        lastname: 'Lukyanova', 
        totalprice: 150,
        depositpaid: true,                  
        bookingdates: {                      
        checkin: '2024-01-01',
        checkout: '2024-01-05'
    },
        additionalneeds: 'Breakfast'          
    };
        const response = await request.post(`${baseURL}/booking`, { data: bookingData });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');

        bookingId = responseBody.bookingid;
        console.log('Создано бронирование с ID', bookingId);

        expect(responseBody.booking.firstname).toBe(bookingData.firstname);
    });

    test('Получение информации о бронировании @api', async ({ request }) => {
        const response = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.firstname).toBe('Ksenia');
    });

    test('Обновление бронирования @api', async ({ request }) => {
    const updateData = { 
        firstname: 'Maria', 
        lastname: 'Lukyanova', 
        totalprice: 150,
        depositpaid: true,                    
        bookingdates: {                       
        checkin: '2024-01-01',
        checkout: '2024-01-05'
    },
        additionalneeds: 'Breakfast'          
    };
     const response = await request.put(`${baseURL}/booking/${bookingId}`, {
        headers: {Cookie: `token=${authToken}` },
        data: updateData
     });

     expect(response.status()).toBe(200);
     const responseBody = await response.json();
     expect(responseBody.firstname).toBe('Maria');
    });

    test('Удаление бронирования @api', async ({ request }) => {
        const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`,{
            headers: {Cookie: `token=${authToken}`}
        });

        expect(deleteResponse.status()).toBe(201);
        console.log('Бронирование успешно удалено');

        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404);
    });
})