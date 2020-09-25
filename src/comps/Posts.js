import React, { Component } from 'react'

export class Posts extends Component {
    render() {
        const { posts, loading } = this.props;

        if (loading) {
            return <h2>Loading...</h2>
        }

        return (    
            <div className="row">
                {posts.map(post => (
                    
                   <div className="col-xs-12 col-md-2">
                        <div className="item-listing-container-skrn">
                        <a href={post.url}><img src={post.imageSrc} alt={post.alt} /></a>
                                <div className="item-listing-text-skrn">
                                    <div className="item-listing-text-skrn-vertical-align"><h6><a href={post.url}>{post.title}</a></h6>
                                    <div
                                        className={"circle-rating-pro"}
                                        data-value={post.value}
                                        data-animation-start-value={post.value}
                                        data-size={32}
                                        data-thickness={3}
                                        data-fill="{
                                        &quot;color&quot;: &quot;#42b740&quot;
                                        }"
                                        data-empty-fill={"#def6de"}
                                        data-reverse={"true"}
                                    ><span>{post.rating}</span></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Posts
