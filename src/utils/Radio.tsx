export const Radio = () => {
  return (
    <div>
      {/* <label>
        <input type="radio" name="test" value="small" checked />
        <img
          src="https://www.kindpng.com/picc/m/185-1852863_google-beer-foam-emoji-png-download-android-beer.png"
          alt="Google Beer Foam Emoji , Png Download - Android Beer Emoji, Transparent Png@kindpng.com"></img>
      </label> */}

      <label>
        <input
          onClick={(e) => console.log(1)}
          type="radio"
          name="test"
          value="small"
          checked
          style={{ opacity: 0, cursor: "pointer" }}
        />
        <img
          style={{ height: "10px", width: "10px", cursor: "poiner" }}
          src="https://www.kindpng.com/picc/m/185-1852863_google-beer-foam-emoji-png-download-android-beer.png"
          alt="Google Beer Foam Emoji , Png Download - Android Beer Emoji, Transparent Png@kindpng.com"></img>
      </label>

      <label>
        <input
          type="radio"
          name="test"
          value="big"
          style={{ opacity: 0 }}
          onClick={(e) => console.log(2)}
        />
        <img
          style={{ height: "10px", width: "10px" }}
          src="https://www.kindpng.com/picc/m/185-1852863_google-beer-foam-emoji-png-download-android-beer.png"
          alt="Google Beer Foam Emoji , Png Download - Android Beer Emoji, Transparent Png@kindpng.com"></img>
      </label>
    </div>
  );
};
