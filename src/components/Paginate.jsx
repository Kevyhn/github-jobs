import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const Paginate = ({prevPages, pages, getPage, nextPages}) => {	

	return (
		<div className="paginate-div">				   			
			<button onClick={prevPages}><FontAwesomeIcon icon={faChevronLeft}/></button>	      			
				{
					pages.map((num, index) => {
					    if (index === 3) return <span className="nexts" key={index}>...</span>
					   	return <button key={index} onClick={getPage}>{num}</button>	      	
					})
		 		}
			<button onClick={nextPages}><FontAwesomeIcon icon={faChevronRight}/></button>				      		
		</div>
	)
}