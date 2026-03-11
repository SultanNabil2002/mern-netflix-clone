require("dotenv").config()
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('Resource /my-movies', () => {
    it('should return a success message', async () => {
        const response = await request(app).get(
            "/my-movies/nabil@gmail.com/zzz123"
        );
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Get Favorite Movies Success")
    });

    it('should return unauthorized message', async () => {
        const response = await request(app).get(
            "/my-movies/nabil@gmail.com/zzz12345" //sengaja disalahin
        );
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Error, Unauthorized")
    });

    it('should return failed to save favorite movies', async () => {
        const response = await request(app)
            .post("/my-movies/")
            .set("Content-Type", "application/json")
            .send({
                email: "sultan@gmail.com",
                token: "xxx1234", //sengaja disalahin
                data: {
                    id: 1,
                    title: "testing",
                    description: "testing"
                }
            })
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Error, Unauthorized")
    });

    it('should return success adding favorite movies', async () => {
        const response = await request(app)
            .post("/my-movies/")
            .set("Content-Type", "application/json")
            .send({
                email: "sultan@gmail.com",
                token: "xxx123",
                data: {
                    id: 1,
                    title: "testing",
                    description: "testing"
                }
            })
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("Add Favorite Movies Success")
    });

    it('should return failed deleting favorite movies', async () => {
        const response = await request(app)
            .delete("/my-movies/")
            .set("Content-Type", "application/json")
            .send({
                email: "sultan@gmail.com",
                token: "xxx123",
                movieID: 999 //sengaja salah
            })
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe("Movie ID Not Found!")
    });

    // ==========================================
    // TEST: DELETE FAVORITE MOVIES (SUCCESS)
    // ==========================================
    it('should return success deleting favorite movies', async () => {
        const response = await request(app)
            .delete("/my-movies/")
            .set("Content-Type", "application/json")
            .send({
                email: "sultan@gmail.com",
                token: "xxx123", // Token valid milik Sultan
                movieID: 1 // Menghapus film ID 1 (film ini baru saja ditambahkan di tes POST sebelumnya)
            })

        expect(response.statusCode).toBe(204)
        // Status 204 (No Content) berarti sukses menghapus dan tidak mereturn body
    });

    // ==========================================
    // TEST: SIGN UP (FAILED - EMAIL ALREADY EXISTS)
    // ==========================================
    it('should return failed sign-up due to existing email', async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "nabil@gmail.com", // Menggunakan email nabil yang sudah terdaftar di DB
                password: "password_apapun"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Email not available!")
    });

    // ==========================================
    // TEST: SIGN UP (SUCCESS)
    // ==========================================
    it('should return success sign-up', async () => {
        // Menggunakan Math.random() agar email selalu unik setiap npm test dijalankan
        const uniqueEmail = `userbaru_${Math.random()}@gmail.com`;

        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: uniqueEmail,
                password: "password123"
            })

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("Sign-up Success!")
    });

    // ==========================================
    // TEST: SIGN IN / TOKEN (FAILED - USER NOT FOUND)
    // ==========================================
    it('should return failed sign-in due to user not found', async () => {
        const response = await request(app)
            .post("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "email_ngasal_yang_ga_ada@gmail.com", // Sengaja disalahkan
                password: "123456789",
                token: "token_baru_123"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("User not found!")
    });

    // ==========================================
    // TEST: SIGN IN / TOKEN (SUCCESS)
    // ==========================================
    it('should return success sign-in', async () => {
        const response = await request(app)
            .post("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "sultan@gmail.com",
                password: "123456789",
                token: "token_super_baru_123" //menimpa token baru karena signin ulang
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Sign-in Token Saved")
    });

    // ==========================================
    // TEST: SIGN OUT (FAILED - UNAUTHORIZED)
    // ==========================================
    it('should return failed sign-out unauthorized', async () => {
        const response = await request(app)
            .delete("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "nabil@gmail.com",
                token: "token_salah_999" // Sengaja salah (token asli nabil adalah zzz123)
            })

        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Error, Unauthorized")
    });

    // ==========================================
    // TEST: SIGN OUT (SUCCESS)
    // ==========================================
    it('should return success sign-out', async () => {
        const response = await request(app)
            .delete("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "nabil@gmail.com",
                token: "zzz123" // Menggunakan token asli nabil dari database
            })

        expect(response.statusCode).toBe(204)
        // Status 204 berarti sukses log out
    });
});
