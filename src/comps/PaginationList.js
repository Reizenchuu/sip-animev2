import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

//component that contains a list of N elements (n being an input prop)
//each element contains an ID, image, title, and rating.
//this component accepts two props:
//1- listSize
//2- object containing an array of objects(image...)
///Ex of object: {[{Id:dsqdsq, title:X, image:I, Rating:3}, {Id:dsq65d4q, title:X, image:I, Rating:3}]}
//Each list element contains a <Link> which, for the time being, is going to link to /Series wihtout params
//to test the component, we will load it in App.js and give it manual input (props)
export default class PaginationList extends React.Component {
	render() {
		return;
	}
}
