import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchService from '../comps/SearchService';
import SearchConfig from '../comps/SearchConfig';


import Pagination from '../comps/Pagination';
import Posts from '../comps/Posts'

const data = [
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },
  {
    title : "Boku No hero1",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },  
  {
    title : "La La Land",
    url : "https://www.google.com",
    imageSrc : "http://via.placeholder.com/500x707",
    alt : "Boku No hero1",
    value : 0.83,
    rating : 8.3,
    fill : "{&quot;color&quot;: &quot;#42b740&quot;}"
  },
  
];

export default class SearchRoute extends React.Component {


	state = {
		posts: [],
		loading: false,
		currentPage: 1,
		postsPerPage: 12,
	  };
	
	  componentDidMount() {
		const getPosts = async () => {
		  this.setState({ loading: true });
		  
		  this.setState({ posts: data });
		  this.setState({ loading: false });
    };  
	
		getPosts();
    }
    
    	
	  render() {
		const { currentPage, postsPerPage, posts, loading } = this.state;
	
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	
		const paginate = pageNum => this.setState({ currentPage: pageNum });
	
		const nextPage = () => {this.setState({ currentPage: currentPage + 1 });}
	
    const prevPage = () => this.setState({ currentPage: currentPage - 1 });
    const mainView = () => {
      return( <div className="container-fluid">   
          
          <Posts posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
        
       </div> );
    }
		return (
			<main id="col-main">
				<SearchService isPhone={true} />
				<SearchConfig />
        {mainView()}         
        

			</main>

		);
	}
}
