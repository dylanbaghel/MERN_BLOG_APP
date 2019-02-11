import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startSetMyPosts } from './../action/postActions';
import truncate from './../utils/truncate';
import Loading from './Loading';
import ReactPaginate from 'react-js-pagination';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        }
    }
    componentDidMount() {
        this.props.startSetMyPosts();
    }

    render() {
        const { loading, posts, count, userName, startSetMyPosts } = this.props;
        if (loading) {
            return <Loading />;
        }
        return (
            <div className="container">
                <h2>Welcome, {userName}</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Published</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, index) => {
                                return (
                                    <tr key={post._id}>
                                        <th>{(this.state.activePage - 1) * 10 + (index + 1)}</th>
                                        <td>{truncate(post.title, 40, '....')}</td>
                                        <td>{post.published.toString()}</td>
                                        <td>
                                            {
                                                post.published ? (
                                                    <Link
                                                        className="btn btn-dark"
                                                        to={`/posts/${post._id}`}
                                                    >
                                                        View Post
                                                    </Link>
                                                ) : (
                                                        <Link
                                                            to={`/posts/${post._id}`}
                                                            className="btn btn-dark"
                                                        >
                                                            Preview
                                                        </Link>
                                                    )
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {count > 10 && <div className="mt-3">
                    <ReactPaginate
                        totalItemsCount={count}
                        itemsCountPerPage={10}
                        onChange={(page) => {
                            this.setState(() => ({ activePage: page }), () => {
                                startSetMyPosts(page);
                            });
                        }}
                        activePage={this.state.activePage}
                        activeLinkClass="active-page"
                    />
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.posts.count,
        posts: state.posts.data,
        userName: state.auth.name,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetMyPosts: (pageNo) => dispatch(startSetMyPosts(pageNo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);