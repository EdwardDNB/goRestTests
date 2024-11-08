const request = require('supertest');
const { API_URL, TOKEN } = require('/Users/User/react/Testing/goRest/apiTests');

const USER_ID = 6942363; // Ідентифікатор користувача

describe('GoREST Nested Resources Tests', function () {
    this.timeout(10000); // Збільшуємо тайм-аут до 10 секунд

    // GET /users/:userId/posts - Отримати пости користувача
    it('GET /users/:userId/posts - Отримати пости користувача', async function () {
        const response = await request(API_URL)
            .get(`/users/${USER_ID}/posts`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    // GET /posts/:postId/comments - Отримати коментарі до посту
    it('GET /posts/:postId/comments - Отримати коментарі до посту', async function () {
        const postId = 52939; // ID існуючого посту, замініть при необхідності
        const response = await request(API_URL)
            .get(`/posts/${postId}/comments`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    // GET /users/:userId/todos - Отримати завдання користувача
    it('GET /users/:userId/todos - Отримати завдання користувача', async function () {
        const response = await request(API_URL)
            .get(`/users/${USER_ID}/todos`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200);
        console.log(response.body);
    });

    // POST /users/:userId/posts - Створити пост користувача
    it('POST /users/:userId/posts - Створити пост користувача', async function () {
        const response = await request(API_URL)
            .post(`/users/${USER_ID}/posts`)
            .send({
                title: "My New Post",
                body: "This is the content of the post."
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(201);
        console.log(response.body);
    });

    // POST /posts/:postId/comments - Створити коментар до посту
    it('POST /posts/:postId/comments - Створити коментар до посту', async function () {
        const postId = 166320; // ID існуючого посту (замініть на актуальний ID)
        const response = await request(API_URL)
            .post(`/posts/${postId}/comments`)
            .send({
                name: "Commenter Name",
                email: `commenter${Date.now()}@example.com`,
                body: "This is a comment."
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/);

        console.log(response.body); // Додаткове логування для перевірки тіла відповіді

        // Перевірка статусу відповіді на створення
        expect(response.status).to.equal(201);
    });

    // POST /users/:userId/todos - Створити завдання користувача
    it('POST /users/:userId/todos - Створити завдання користувача', async function () {
        const response = await request(API_URL)
            .post(`/users/${USER_ID}/todos`)
            .send({
                title: "New Task",
                due_on: "2024-12-31T00:00:00.000+05:30",
                status: "pending"
            })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(201);
        console.log(response.body);
    });
});

