import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-js-pagination';

import Post from './Post';
import { startSetPosts } from './../action/postActions';
import Loading from './Loading';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: parseInt(new URLSearchParams(this.props.history.location.search).get('pageNo')) || 1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
            this.props.startSetPosts();
    }
    handlePageChange(page) {
        this.setState(() => ({
            activePage: page
        }), () => {
            this.props.history.push(`?pageNo=${page}`);
            this.props.startSetPosts();
        });
    }

    render() {
        const { posts, isLoading } = this.props;
        if (isLoading) {
            return <Loading />
        }
        return (
            <div className="container">
                <h2>Posts</h2>
                <div className="row">
                    {posts.data.length > 0 ? (
                        posts.data.map((post, index) => {
                            return (<div className="col-lg-4" key={post._id}>
                                <Post sn={(this.state.activePage - 1) * 10 + (index + 1)} post={post} />
                            </div>)
                        })
                    ) : (
                            <h3>No Posts Found</h3>
                        )}
                </div>
                {posts.data.length > 0 && (
                    <div className="mt-3">
                        <ReactPaginate 
                            totalItemsCount={posts.count}
                            itemsCountPerPage={10}
                            onChange={this.handlePageChange}
                            activePage={this.state.activePage}
                            activeLinkClass="active-page"
                            
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        isLoading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetPosts: () => dispatch(startSetPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);