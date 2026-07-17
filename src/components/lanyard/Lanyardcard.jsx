import Lanyard from './Lanyard';

function LanyardCard() {
  return (
    <>
      <div style={{ height: '100vh', position: 'relative' }}>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      <div style={{ height: '100vh', position: 'relative' }}>
        <Lanyard
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          frontImage="/lanyard2.png"
          backImage="/lanyard.png"
          imageFit="cover"
          lanyardImage="/tali-lanyard.png"
          lanyardWidth={1}
        />
      </div>
    </>
  );
}
