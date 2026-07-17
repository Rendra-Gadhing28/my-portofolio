// TestLanyard.jsx
import Lanyard from "../components/lanyard/Lanyard";

export default function TestLanyard() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Lanyard position={[0, 0, 20]} gravity={[0, -20, 0]} />
    </div>
  );
}