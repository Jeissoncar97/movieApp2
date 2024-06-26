'use client'

import {FormEvent, useState} from'react'

interface SearchBarProps {
    onSearchSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearchSubmit}) => {


    const [query, setQuery] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSearchSubmit(query)
        setQuery("")
    }

    
    return(
        <>
            <div className="text-center mb-10">
                <form id="form"  suppressHydrationWarning={true}  onSubmit={handleSubmit} className='grid  align-center justify-center  flex-grap ' >

                        <label htmlFor="searchQuery" className='text-xl pb-4'>Busca tu película favorita</label>
                        <input 
                        className=' mb-4 border-b-2 border-black p-2 focus:border-red-400'
                        type="text" 
                        id="searchQuery" 
                        placeholder="Marvel..."
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        />
                        
                    <button type="submit" className='px-4 py-2 bg-custom text-white rounded-md shadow-md hover:bg-custom focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all hover:bg-custom-2 hover:text-black duration-300'>Buscar</button>
                </form>
            </div>
        </>
    )
}
export default SearchBar