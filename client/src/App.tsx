import React from 'react';
import { AppProvider, TextField, ColorPicker, Layout, FooterHelp, Link } from '@shopify/polaris';
import './App.css'

function hslToHex(h: number, s: number, l: number): string {
  // https://stackoverflow.com/a/44134328
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

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
      ["color", hslToHex(color.hue, color.saturation*100, color.brightness*100)]
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
