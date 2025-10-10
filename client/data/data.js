const data = [
    {
        _id: "idx123i",
        name: "Alice Copper",
        icon: "./images/user.png",
        lastMessage: "Hey, how are you?",
        time: "2 min ago",
        active: true,
        messages: [
            { text: "Hello!", sender: "other", time: "10:00 AM" },
            { text: "Hi Alice!", sender: "me", time: "10:01 AM" },
            { text: "Hey, how are you?", sender: "other", time: "10:02 AM" }
        ]
    },
    {
        _id: "idx1234i",
        name: "Alina Lopez",
        icon: "./images/user.png",
        lastMessage: "Hey, Alina what are you doing?",
        time: "20 min ago",
        active: true,
        messages: [
            { text: "Hello!", sender: "other", time: "10:00 AM" },
            { text: "Hi Alice!", sender: "me", time: "10:01 AM" },
            {
                text: "Hey, Alina what are you doing?",
                sender: "other",
                time: "10:02 AM"
            }
        ]
    }
];

export default data;
