import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import './GnomeList.css'
import GnomeItem from '../../components/GnomeItem/GnomeItem';
import Notification from '../../components/Notifications/Notification';

export class UnConnectedGnomeList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            headers: ["ID", "Name", "Thumbnail", "Actions"],
        };
      }

    handleChange = event=>{
        if(this.validateInput( event.target.value)){
            this.setState({value: event.target.value});
        }
        
    }
    
    validateInput(value){
        return value.length === 0 ? false : true;
    }

    handleSearch = event=>{
        event.preventDefault();
        if(this.validateInput(this.state.value)){
            this.props.updateSearchedGnome(this.state.value);
        }
        
    }

    handleCleanSearch = () =>{
        this.props.cleanSearch();
        this.setState({
            value: ""
        })
        
    }

    goToDetailPage = id =>{
        this.props.updateGnomeId(id);
        this.props.history.push({
            pathname: `/${id}`
        })
    }

    componentDidMount(){
        if(this.props.gnomeList.length === 0){
            this.props.getGnomes()
        }
        
    }

    componentWillUnmount(){
        this.props.cleanSearch();
    }

    render(){
        const notification = this.props.error ? <Notification /> : null;
        const { headers } = this.state;
        const headersContent = headers.map((header, index)=><th key={index}>{header}</th>)
        const gnomesToRender = this.props.gnomeSearched.length === 0 ? "gnomeList" : "gnomeSearched";
        const rowsContent = this.props[gnomesToRender].map((gnome, index)=> <GnomeItem key={index} gnome={gnome} index={index} goToDetailPage={this.goToDetailPage} />);
        
        return(
            <div>
                {notification}
                <div className="container">
                <div className="row">
                    <h2>GnomeList</h2>
                    
                </div>
                
                <div className="row">
                    <h4>Search by name: </h4>
                </div>
                <div className="row">
                    <form onSubmit={this.handleSearch}>
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" className="btn btn-danger" value="Submit" />
                    <button className="btn btn-warning" onClick={()=> this.handleCleanSearch()}>
                    <i className="fa fa-refresh"></i>
                    Clean Search
                    </button>
                    </form>
                </div>
                <div className="row">
                    <div className="table-responsive">          
                    <table className="table">
                        <thead>
                        <tr>
                            {headersContent}
                        </tr>
                        </thead>
                        <tbody>
                            {rowsContent}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    const gnomeList = state.gnomeList.length !== 0 ? state.gnomeList : [];
    const gnomeId = state.gnomeId;
    const gnomeSearched = state.gnomeSearched;
    const error = state.fetchError.gnomeApiError;
    return{
        gnomeList,
        gnomeId,
        gnomeSearched,
        error
    }
}

const mapDispatchToProps = dispatch =>{

    return{
        getGnomes: ()=>dispatch(actions.getGnomes()),
        updateGnomeId: id=>dispatch(actions.updateGnomeId(id)),
        updateSearchedGnome: name=>dispatch(actions.updateSearchedGnome(name)),
        cleanSearch: ()=> dispatch(actions.cleanSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnConnectedGnomeList);