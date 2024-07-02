import Image from 'next/image';

// Tipos para TypeScript
interface MovieProps {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Componente funcional Movie que muestra la información de cada película
const Movie: React.FC<MovieProps> = ({ Title, Year, Type, Poster }) => {
  return (
    // Contenedor principal que muestra la película
    <div className=" max-w-6xl sm:h-96 mx-auto sm:flex text-center font-semibold shadow-md bg-white">
      {/* Contenedor para la imagen de la película */}
      <div className="w-64 h-96 relative" >
        <Image
          src={Poster} // URL del póster de la película
          alt={Title} // Texto alternativo para la imagen
          className="object-fill w-full h-full" // Estilo CSS para la imagen
          layout='fill' // Configuración del layout para ocupar todo el contenedor
        />
      </div>
      {/* Contenedor para la información textual de la película */}
      <div className='flex flex-col h28 justify-center w-64 sm:h-96 relative p-4 sp-p2' >
        <h2 className='text-2xl sm:text-3xl inline-block align-middle mb-6 text-indigo-900'>{Title}</h2> 
        <p className='text-xl mb-2'><strong>Año:</strong> {Year}</p> 
        <p className='text-xl'><strong>Tipo:</strong> {Type}</p> 
      </div>
    </div>
  );
};

export default Movie;
