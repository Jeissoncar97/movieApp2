import Image from 'next/image';

interface MovieProps {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Movie: React.FC<MovieProps> = ({ Title, Year, Type, Poster }) => {
  return (
    <div className=" max-w-6xl mx-auto flex text-center font-semibold shadow-md bg-white">
      <div className="" style={{width:"270px", position:"relative", height:"400px"}}>
        <Image
          src={Poster}
          alt={Title}
          className="object-cover"
          layout='fill'
        />
      </div>
      <div className='flex flex-col justify-center ' style={{width:"300px", position:"relative", height:"400px"}}>
        <h2 className='text-3xl inline-block align-middle mb-6 text-indigo-900'>{Title}</h2>
        <p className='text-xl mb-2'><strong>Año:</strong> {Year}</p>
        <p className='text-xl'><strong>Tipo:</strong> {Type}</p>
      </div>
      
    </div>
  );
};

export default Movie;
