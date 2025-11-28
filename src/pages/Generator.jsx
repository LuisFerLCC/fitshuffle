import Navbar from "../components/Navbar";
import OutfitGenerator from "../components/OutfitGenerator";

export default function Generator() {
  return (
    <div className="page generator-page black-bg">

      {/* HEADER IMPORTADO COMO COMPONENTE */}
      <Navbar generatorActive dark={true} />

      {/* GENERADOR DE OUTFITS */}
      <OutfitGenerator />
    </div>
  );
}
