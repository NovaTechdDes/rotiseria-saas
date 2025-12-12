import '../styles/global.css';

const Home = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Bienvenido a la página de rotiserías</h1>
        <p className="text-lg text-gray-700 leading-relaxed">Descubre las mejores opciones de comida casera cerca de ti. Explora, elige y disfruta de sabores únicos.</p>
      </div>
    </div>
  );
};

export default Home;
