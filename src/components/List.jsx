import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faClock, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../helpers/formatDate';

export const List = ({itemsPerPage}) => {

	const [loading, setLoading] = useState(true);
	const [jobInfo, setJobInfo] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		setLoading(true);
		clearTimeout(imgLoading);
		setTimeout(imgLoading, 1500);
	}, [itemsPerPage]);

	const imgLoading = () => setLoading(false);

	const getJob = (id) => {
		window.scrollTo(0, 0);
		const details = itemsPerPage.filter(job => job.id === id);
		setJobInfo(details[0]);
		setShow(true);	
	}

	return (
		<div className="jobs">
			{
			    itemsPerPage.map(item => {			    
     				return (     					
				        <div className="job" key={item.id} onClick={e => getJob(item.id)}>
				       		<div className="company-logo">			  
				       			{
				       				loading === true ? (
										<span className="skeleton-loader"></span> 
				         			) : <img src={item.company_logo} alt={item.company_name}/>			         							         				
				         		}   				       									       								         		
				       		</div>
				         	<div className="details">
				       			<div className="company-info">
				       				<p className="company-name">{item.company_name}</p>
				       				<p className="company-title">{item.title}</p>
				       				{item.job_type === 'full_time' ? <p className="type">Full time</p> : ''}			         								
				       			</div>
			        			<div className="company-location">
									<div className="date-location">
										<FontAwesomeIcon icon={faEarthAmericas}/>
										<span>{item.candidate_required_location}</span>
									</div>
									<div className="date-location">
										<FontAwesomeIcon icon={faClock}/>
										<span>{formatDate(item.publication_date)}</span>										
									</div>															         																	
				         		</div>
				         	</div>
				   		</div>				   													   		
			        )
			   	})
			}	
			{
				show === true ? (
					<div className="job-details">
						<div>
							<div className="button-back" onClick={() => setShow(false)}>
								<FontAwesomeIcon icon={faArrowLeftLong}/>
								<span>Back to search</span>
							</div>							
							<h4>HOW TO APPLY</h4>							
							<a className="apply-button" href={jobInfo.url}>APPLY HERE</a>
						</div>
						<div>
							<div className="title">
								<h1>{jobInfo.title}</h1>
								{jobInfo.job_type === 'full_time' ? <p className="type">Full time</p> : ''}
							</div>							
							<div className="date">
								<FontAwesomeIcon icon={faClock}/>						
								{formatDate(jobInfo.publication_date)}
							</div>
							<div className="company">
								<div className="logo">
									<img src={jobInfo.company_logo} alt={jobInfo.company_name}/>
								</div>
								<div className="info">
									<h2>{jobInfo.company_name}</h2>
									<p>
										<FontAwesomeIcon icon={faEarthAmericas}/>
										{jobInfo.candidate_required_location}
									</p>																		
								</div>								
							</div>
							<p className="description">
								{jobInfo.description}
							</p>							
						</div>
					</div>
				) : ''
			}			
		</div>
	)
}