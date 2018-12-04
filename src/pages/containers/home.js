import React, {Component} from 'react';
import HomeLayout from "../components/home-layout";
import Categories from "../../categories/components/categories";
import Related from "../components/related";
import ModalContainer from "../../widgets/containers/modal";
import Modal from "../../widgets/components/modal";
import HandleError from "../../error/containers/handle-error";
import VideoPlayer from "../../player/containers/video-player";
import { connect } from 'react-redux';

import { List as list } from 'immutable';
import search from "../../widgets/containers/search";

import * as actions  from "../../actions/index";

import { bindActionCreators } from 'redux'

class Home extends Component {
   /* state = {
        modalVisible: false,
    }*/
    handleOpenModal=(id)=>{
        /*this.setState({
            modalVisible: true,
            media
        })*/
        this.props.actions.openModal(id);
    }
    handleCloseModal= (event)=>{
        /*this.setState({
            modalVisible:false,
        })*/
        this.props.actions.closeModal();
    }
    render() {
        return(
            <HandleError>
                <HomeLayout>
                    <Related/>

                    <Categories
                        categories={this.props.categories}
                        handleOpenModal={this.handleOpenModal}
                        search={this.props.search}
                        isLoading={this.props.isLoading}
                    />
                    {
                        this.props.modal.get('visibility') &&
                        <ModalContainer>
                            <Modal
                                handleClick={this.handleCloseModal}
                            >
                                <VideoPlayer
                                    autoplay={true}
                                    id={ this.props.modal.get('mediaId')}
                                    //src={this.state.media.src}
                                    //title={this.state.media.title}
                                />
                            </Modal>
                        </ModalContainer>
                    }

                </HomeLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    const categories = state.get('data').get('categories').map((categoryId)=>{
        return state.get('data').get('entities').get('categories').get(categoryId);
    });
    let searhResults = list();
    const search = state.get('data').get('search');

    if(search){
        const mediaList = state.get('data').get('entities').get('media');
        searhResults = mediaList.filter((item)=>(
            item.get('author').toLowerCase().includes(search.toLowerCase())
        )).toList();
    }

    return {
        categories: categories,
        search: searhResults,
        modal: state.get('modal'),
        isLoading: state.get('isLoading').get('active')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);