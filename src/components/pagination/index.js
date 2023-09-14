import { useEffect, useState } from 'react'
import './pagination.sass'

const Pagination = ({cards, setRenderCards}) => {

    const [page,setPage] = useState(1);

    const itemsPerPage = 6;
    const totalItems = cards.length;


    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageDown = () => {
        if(page > 1)
        setPage((page) => page-1)
    }

    const pageUp = () => {
        if(page < totalPages)
        setPage((page) => page+1)
    }

    const setPageNmber = (num) => {
        setPage(num)
    }


    useEffect(()=>{
        setRenderCards(cards.slice(startIndex, endIndex))
    },[startIndex, endIndex, cards, setRenderCards])

    const pagesArray = new Array(totalPages).fill("")
    
    return(
        <div className="pagination">
            <div onClick={pageDown}>◀️</div>
            {pagesArray?.map((_,i)=>{
                return(
                    <div onClick={()=>setPageNmber(i+1)} className={(i+1===page) && 'highlight'} key={i}>{i+1}</div>
                )
            })}
            <div onClick={pageUp}>▶️</div>
        </div>
    )

}

export default Pagination;