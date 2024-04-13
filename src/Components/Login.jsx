export default function Login() {
  const handleClick = async () => {
    const client_id = "127332baa9eb41bf8750ea037d9721e6";
    const redirect_uri = "http://localhost:3000";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-library-read",
      "user-library-modify",
      "streaming",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div>
      <button onClick={handleClick}>Get started</button>
    </div>
  );
}
