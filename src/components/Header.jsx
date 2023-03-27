import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

export const Header = ({jobs, setJobs, jobsStored, setPages}) => {

	const searchInp = useRef();

	const search = () => {
		setPages([1, 2, 3, null, 10]);
		const value = searchInp.current.value.toLowerCase();
		const results = jobsStored.filter((job) => {
			let title = job.title.toLowerCase();
			let companies = job.company_name.toLowerCase();		

			if (title.includes(value)) return job;

			if (companies.includes(value)) return job;

		})

		if (results.length <= 0) {
			alert('No jobs found');
			return null
		}

		setJobs(results);
	}

	return (
		<>
			<div className="title">
		        <h1>Github <span>Jobs</span></h1>
	      	</div>
			<header className="header">
				<div className="search-div">
					<FontAwesomeIcon icon={faBriefcase}/>
					<input type="text" name="search" placeholder="Title, companies, expertise or benefits" ref={searchInp}/>
					<button onClick={search}>Search</button>
				</div>
			</header>
		</>
	)
}