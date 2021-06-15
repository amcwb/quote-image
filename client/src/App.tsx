import React from 'react';
import { AppProvider, TextField, ColorPicker, Layout, FooterHelp, Link, hsbToRgb, rgbToHex } from '@shopify/polaris';
import './App.css'


function App() {
  let imageRef = React.useRef(null);
  const [imageLink, setImageLink] = React.useState("./placeholder.png");
  const [quote, setQuote] = React.useState("Here is a quote");
  const [color, setColor] = React.useState({
    hue: 180,
    brightness: 0,
    saturation: 1,
  });
  
  React.useEffect(() => {
    // Run request
    // Build URL safely!
    let urlparams = new URLSearchParams([
      ["quote", quote],
      ["color", rgbToHex(hsbToRgb(color)).slice(1)]
    ]);
    
    setImageLink("/generate?" + urlparams.toString());
  }, [quote, color]);

  return (
    <AppProvider i18n={{}}>
      <div className="body">
        <Layout>
          <Layout.Section oneHalf>
            <TextField label="Quote" value={quote} onChange={setQuote} maxLength={20} />
          </Layout.Section>
          <Layout.Section oneHalf>
            <ColorPicker onChange={setColor} color={color} />
          </Layout.Section>
          <Layout.Section fullWidth>
            <img src={imageLink} alt="" className="resultImg" ref={imageRef} />
          </Layout.Section>
        </Layout>
      </div>
      <FooterHelp>
        <Link external url="https://github.com/starsflower/quote-image">GitHub</Link>
      </FooterHelp>
    </AppProvider>
  );
}

export default App;
