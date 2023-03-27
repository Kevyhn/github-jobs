import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { defaultButton } from '../helpers/defaultButton';
import { List } from './List';
import { Paginate } from './Paginate';

export const Main = ({jobs, pages, setPages}) => {
	
	const [prevState, setPrevState] = useState([]);
	const [itemsPerPage, setItemsPerPage] = useState([]);

	useEffect(() => {
		getItemsPerPage(1);
	}, [jobs]);

	const getItemsPerPage = (n) => {
		const page = (n - 1) * 5;
		const items = jobs.slice(page, page + 5);
		setItemsPerPage(items);	
	}

	const totalPages = Math.ceil(jobs.length / 5);

	const nextPages = (e) => {
		defaultButton(e);
		let pagesUpdated = [];		
		pages.forEach((num, index) => {			
			if (index === 4) {
				if ((num + 10) >= totalPages) pagesUpdated[index] = totalPages;
				else pagesUpdated[index] = num + 10;
				return null;
			}

			if (index === 3) {
				pagesUpdated[index] = null;
				return null;
			}
										
			if (totalPages > (num + 3)) {		
				pagesUpdated[index] = (num + 3);				
				setPages(pagesUpdated);
				return null;					
			}		
			
			if ((num + 3) === totalPages) {					
				setPrevState(pages);
				delete pages[3];
				delete pages[4];
				let lastPages = [];
				pagesUpdated = pages.slice(0, index + 1);					
				pagesUpdated.forEach(num => lastPages.push(num + 3));						
				setPages(lastPages);		
			}																			 							
		})
	}

	const prevPages = (e) => {
		defaultButton(e);
		if (pages.length <= 3) {			
			prevState[3] = null;						
			prevState [4] = totalPages;
			setPages(prevState);
			return null;
		}

		if (pages[0] <= 1) {pages[0] = 1; return null;}
		if (pages[1] <= 2) {pages[1] = 2; return null;}
		if (pages[2] <= 3) {pages[2] = 3; return null;}
		let pagesUpdated = [];

		pages.forEach((num, index) => {
			if (index === 3) {
		 		pagesUpdated[index] = null;
			 	return null;
			}

			if (index === 4) {		
				if (num <= 10) {								
					pagesUpdated[index] = 10;			
					setPages(pagesUpdated);
					return null;
				}	

				let string = num.toString();
				let x = parseInt(string.slice(-1));
				pagesUpdated[index] = ((num - x) - 10);							
				setPages(pagesUpdated);
				return null;
			}
			
			pagesUpdated[index] = (num - 3);
			setPages(pagesUpdated);
		})
	}

	const getPage = (e) => {
		window.scrollTo(0, 0);
		defaultButton(e);
		e.target.style.background = "#2196f3";
		e.target.style.color = "#fff";
		e.target.style.border = "1px solid #2196f3";
		const page = parseInt(e.target.textContent);
		getItemsPerPage(page);
	}

	return (	
		<div className="info-jobs">
		    <div className="info">
		        <div className="time">
		            <input type="checkbox" name="type"/>
		          	<span>Full time</span>
		        </div>
			    <div className="location">
			        <p>Location</p>
			        <div className="location-div">
			            <FontAwesomeIcon icon={faEarthAmericas}/>
			            <input type="text" name="location" placeholder="City, state, zip code or country"/>
			        </div>	
			        <div className="city">
			            <input type="radio" name="city" value="london"/>
			            <span>London</span>
  			        </div>
		         	<div className="city">
		             <input type="radio" name="city" value="amsterdam"/>
			            <span>Amsterdam</span>
			        </div>
			        <div className="city">
			            <input type="radio" name="city" value="new york"/>
			            <span>New York</span>
			        </div>
			        <div className="city">
			            <input type="radio" name="city" value="berlin"/>
			            <span>Berlin</span>
			        </div>
			    </div>
		    </div>
		    {
		      	jobs.length <= 0 ? <div className="spinner"></div> : (
		   			<div className="jobs">
		      			<List itemsPerPage={itemsPerPage} prevPages={prevPages} pages={pages} getPage={getPage} nextPages={nextPages}/>			       		
		      			<Paginate prevPages={prevPages} pages={pages} getPage={getPage} nextPages={nextPages}/>
		      		</div>
	      		)		      	
	   		}
	    </div>	      	      	
	)
}