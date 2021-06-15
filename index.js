const express = require('express')
const path = require('path');
const Jimp = require('jimp');
const app = express()
const port = process.env.PORT || 8000;
app.get('/generate', (req, res) => {
    const quote = req.query.quote;
    const color = req.query.color;

    if (quote === undefined || color === undefined) {
        return;
    }

    let image = new Jimp(900, 400, color, (err, image) => {
        // Create new image
        if (err) throw err;
    });

    Jimp.loadFont("Lato-Regular.fnt").then(
        font => {
            // Measure text to center it
            let textWidth = Jimp.measureText(font, quote);
            let textHeight = Jimp.measureTextHeight(font, quote);
            image.print(font, image.bitmap.width/2 - textWidth/2, image.bitmap.height/2 - textHeight/2, {
                text: quote,
            });

            image.getBuffer("image/png", (err, val) => {
                if (err) throw err;

                res.write(val);

                // Make sure to end the stream!
                res.end();
            });
        }
    );
});

app.get('*', (req, res) => {
    // Let's return express data
    const name = req.path === "/" ? "index.html" : req.path;
    res.sendFile(path.join(__dirname, 'client', 'build', name));
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});