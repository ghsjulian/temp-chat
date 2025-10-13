const seedUsers = require("../controllers/seeder.controller");

const users = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "123456"
    },
    {
        name: "Michael Smith",
        email: "michael.smith@example.com",
        password: "123456"
    },
    {
        name: "Sophia Brown",
        email: "sophia.brown@example.com",
        password: "123456"
    },
    {
        name: "Ethan Williams",
        email: "ethan.williams@example.com",
        password: "123456"
    },
    {
        name: "Olivia Davis",
        email: "olivia.davis@example.com",
        password: "123456"
    },
    {
        name: "Liam Miller",
        email: "liam.miller@example.com",
        password: "123456"
    },
    { name: "Ava Wilson", email: "ava.wilson@example.com", password: "123456" },
    { name: "Noah Moore", email: "noah.moore@example.com", password: "123456" },
    {
        name: "Isabella Taylor",
        email: "isabella.taylor@example.com",
        password: "123456"
    },
    {
        name: "James Anderson",
        email: "james.anderson@example.com",
        password: "123456"
    },
    { name: "Mia Thomas", email: "mia.thomas@example.com", password: "123456" },
    {
        name: "Benjamin Jackson",
        email: "benjamin.jackson@example.com",
        password: "123456"
    },
    {
        name: "Charlotte White",
        email: "charlotte.white@example.com",
        password: "123456"
    },
    {
        name: "Lucas Harris",
        email: "lucas.harris@example.com",
        password: "123456"
    },
    {
        name: "Amelia Martin",
        email: "amelia.martin@example.com",
        password: "123456"
    },
    {
        name: "Henry Thompson",
        email: "henry.thompson@example.com",
        password: "123456"
    },
    {
        name: "Ella Garcia",
        email: "ella.garcia@example.com",
        password: "123456"
    },
    {
        name: "Alexander Martinez",
        email: "alexander.martinez@example.com",
        password: "123456"
    },
    {
        name: "Grace Robinson",
        email: "grace.robinson@example.com",
        password: "123456"
    },
    {
        name: "Daniel Clark",
        email: "daniel.clark@example.com",
        password: "123456"
    }
];

const seedNow = async () => {
    let count = 0;
    users.forEach(async (user, index) => {
        await seedUsers(user.name, user.email, user.password);
        count = index;
    });
    return `[+] Users Seeded Successfully\n`
};

module.exports = seedNow