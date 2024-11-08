const request = require('supertest');
const API_URL = 'https://gorest.co.in/public/v2';
const TOKEN = '766ae6c027b88675f9881afd7420e1db177e553e4ca94ce26ab589fd0aae8b81'
const randomEmail = `john.doe${Date.now()}@example.com`;

describe('GoREST API Tests', function () {
    this.timeout(10000); // Збільшуємо тайм-аут до 10 секунд

    let userId;

    it('GET /users - Отримати список користувачів', async function () {
        const response = await request(API_URL)
            .get('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    it('POST /users - Створити нового користувача', async function () {
        const response = await request(API_URL)
            .post('/users')
            .send({
                name: "John Doe",
                gender: "male",
                email: randomEmail,
                status: "active"
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(201);
        userId = response.body.id; // Зберігаємо userId для наступних тестів
        console.log(response.body);
    });

    it('PUT /users/:id - Оновити інформацію про користувача', async function () {
        const response = await request(API_URL)
            .put(`/users/${userId}`)
            .send({
                name: "John Updated",
                status: "inactive"
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    it('GET /users/:id - Отримати інформацію про користувача', async function () {
        const response = await request(API_URL)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    it('DELETE /users/:id - Видалити користувача', async function () {
        const response = await request(API_URL)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(204);
        console.log('Користувач успішно видалений');
    });

    it('GET /users/:id - Спроба отримати видаленого користувача', async function () {
        const response = await request(API_URL)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(404); // Перевірка, що користувача більше не існує
        console.log(response.body);
    });
});
module.exports = { API_URL, TOKEN };