import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage } = this.props;


        return (
          <nav aria-label="...">
            <ul className="pager">
              <li className="previous"><a href="#" onClick={() => prevPage()}><span aria-hidden="true">&larr;</span> Previous</a></li>
              <li className="next"><a href="#" onClick={() => nextPage()}>Next <span aria-hidden="true">&rarr;</span></a></li>
            </ul>
          </nav>
            
        )
    }
}

export default Pagination
