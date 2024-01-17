import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3523;
const API_URL = "https://rickandmortyapi.com/api/";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { results: [] }); 
});

app.get("/submit", async (req, res) => {
    const characterName = req.query.characterName;
    const status = req.query.status;
    const species = req.query.species;
    const gender = req.query.gender;

    try {
        const result = await axios.get(`${API_URL}/character?name=${encodeURIComponent(characterName)}&status=${status}&species=${species}&gender=${gender}`);

        res.render("results.ejs", {
            results: result.data.results || [],
            characterName: characterName,
            status: status,
            species: species,
            gender: gender
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.render("index.ejs", { results: [] });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
